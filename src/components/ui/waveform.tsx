"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface WaveformProps {
  /** Amplitude multiplier (0.1-0.5) */
  amplitude?: number;
  /** FFT size for analysis (256-2048) */
  fftSize?: 256 | 512 | 1024 | 2048;
  /** Smoothing time constant (0-0.95) */
  smoothing?: number;
  /** Line width in pixels */
  lineWidth?: number;
  /** Stroke color */
  strokeColor?: string;
  /** Show baseline */
  showBaseline?: boolean;
  /** Height in pixels */
  height?: number;
  /** Additional class names */
  className?: string;
}

export function Waveform({
  amplitude = 0.18,
  fftSize = 1024,
  smoothing = 0.85,
  lineWidth = 1.5,
  strokeColor = "currentColor",
  showBaseline = true,
  height = 64,
  className,
}: WaveformProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isRecording, setIsRecording] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Store audio resources in refs to persist across renders
  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const analyserRef = React.useRef<AnalyserNode | null>(null);
  const dataRef = React.useRef<Uint8Array<ArrayBuffer> | null>(null);
  const rafIdRef = React.useRef<number | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const sourceRef = React.useRef<MediaStreamAudioSourceNode | null>(null);

  // Resize canvas for HiDPI displays
  const resizeCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    const cssW = canvas.clientWidth || 720;
    const cssH = canvas.clientHeight || height;
    canvas.width = Math.floor(cssW * DPR);
    canvas.height = Math.floor(cssH * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }, [height]);

  // Drawing function
  const draw = React.useCallback(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    const data = dataRef.current;

    if (!canvas || !analyser || !data) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const midY = h / 2;

    analyser.getByteTimeDomainData(data);

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Set stroke color
    ctx.strokeStyle = strokeColor;

    // Baseline (subtle)
    if (showBaseline) {
      ctx.globalAlpha = 0.25;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(w, midY);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // Wave line
    ctx.lineWidth = lineWidth;
    ctx.beginPath();

    const slice = w / (data.length - 1);
    let x = 0;

    const amp = h * amplitude;

    for (let i = 0; i < data.length; i++) {
      const v = (data[i] - 128) / 128; // -1..1
      const y = midY + v * amp;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);

      x += slice;
    }
    ctx.stroke();

    rafIdRef.current = requestAnimationFrame(draw);
  }, [amplitude, lineWidth, strokeColor, showBaseline]);

  // Start recording
  const start = React.useCallback(async () => {
    try {
      setError(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      const audioCtx = new (window.AudioContext ||
        (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = fftSize;
      analyser.smoothingTimeConstant = smoothing;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const data = new Uint8Array(analyser.fftSize);

      // Store refs
      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;
      dataRef.current = data;
      streamRef.current = stream;
      sourceRef.current = source;

      setIsRecording(true);
    } catch (e) {
      console.error(e);
      setError("Microphone access denied");
    }
  }, [fftSize, smoothing]);

  // Stop recording
  const stop = React.useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }

    analyserRef.current = null;
    dataRef.current = null;

    // Clear canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      }
    }

    setIsRecording(false);
  }, []);

  // Start draw loop when recording starts
  React.useEffect(() => {
    if (isRecording && analyserRef.current && dataRef.current) {
      draw();
    }
  }, [isRecording, draw]);

  // Update analyser settings when props change during recording
  React.useEffect(() => {
    if (analyserRef.current) {
      analyserRef.current.smoothingTimeConstant = smoothing;
    }
  }, [smoothing]);

  // Handle resize
  React.useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (sourceRef.current) sourceRef.current.disconnect();
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div
        className="relative w-full rounded-lg border bg-background"
        style={{ height: `${height}px` }}
      >
        <canvas
          ref={canvasRef}
          className="block h-full w-full"
          style={{ height: `${height}px` }}
        />
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <div className="flex gap-2">
        <button
          onClick={start}
          disabled={isRecording}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
          Start
        </button>
        <button
          onClick={stop}
          disabled={!isRecording}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="14" height="14" x="5" y="5" rx="2" />
          </svg>
          Stop
        </button>
      </div>
    </div>
  );
}

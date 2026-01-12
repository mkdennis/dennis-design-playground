"use client";

import * as React from "react";
import {
  LiveWaveform,
  LiveWaveformMode,
} from "@/components/ui/live-waveform";
import { ComponentDefinition } from "../types";
import { cn } from "@/lib/utils";

// Wrapper component to handle active/processing state toggle
function LiveWaveformDemo({
  mode,
  barWidth,
  barGap,
  barRadius,
  barColor,
  fadeEdges,
  fadeWidth,
  barHeight,
  height,
  sensitivity,
  smoothingTimeConstant,
  fftSize,
  historySize,
  updateRate,
}: {
  mode: LiveWaveformMode;
  barWidth: number;
  barGap: number;
  barRadius: number;
  barColor: string;
  fadeEdges: boolean;
  fadeWidth: number;
  barHeight: number;
  height: number;
  sensitivity: number;
  smoothingTimeConstant: number;
  fftSize: number;
  historySize: number;
  updateRate: number;
}) {
  const [active, setActive] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleStart = () => {
    setError(null);
    setProcessing(false);
    setActive(true);
  };

  const handleStop = () => {
    setActive(false);
  };

  const handleProcess = () => {
    setActive(false);
    setProcessing(true);
  };

  const handleIdle = () => {
    setActive(false);
    setProcessing(false);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="relative w-full rounded-lg border bg-background overflow-hidden">
        <LiveWaveform
          active={active}
          processing={processing}
          mode={mode}
          barWidth={barWidth}
          barGap={barGap}
          barRadius={barRadius}
          barColor={barColor}
          fadeEdges={fadeEdges}
          fadeWidth={fadeWidth}
          barHeight={barHeight}
          height={height}
          sensitivity={sensitivity}
          smoothingTimeConstant={smoothingTimeConstant}
          fftSize={fftSize}
          historySize={historySize}
          updateRate={updateRate}
          onMicError={(err) => setError(err.message)}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleStart}
          disabled={active}
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
          Record
        </button>
        <button
          onClick={handleStop}
          disabled={!active}
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
        <button
          onClick={handleProcess}
          disabled={processing}
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
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          Process
        </button>
        <button
          onClick={handleIdle}
          disabled={!active && !processing}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          Idle
        </button>
      </div>
    </div>
  );
}

export const liveWaveformComponent: ComponentDefinition = {
  id: "live-waveform",
  name: "Live Waveform",
  description:
    "Advanced audio waveform with scrolling/static modes, processing state animation, and edge fading effects.",
  category: "Animation",
  props: {
    mode: {
      type: "select",
      label: "Mode",
      defaultValue: "static",
      options: [
        { value: "static", label: "Static (symmetric)" },
        { value: "scrolling", label: "Scrolling (timeline)" },
      ],
    },
    barWidth: {
      type: "number",
      label: "Bar Width",
      defaultValue: 3,
      min: 1,
      max: 10,
      step: 1,
    },
    barGap: {
      type: "number",
      label: "Bar Gap",
      defaultValue: 1,
      min: 0,
      max: 8,
      step: 1,
    },
    barRadius: {
      type: "number",
      label: "Bar Radius",
      defaultValue: 1.5,
      min: 0,
      max: 5,
      step: 0.5,
    },
    barHeight: {
      type: "number",
      label: "Min Bar Height",
      defaultValue: 4,
      min: 1,
      max: 20,
      step: 1,
    },
    barColor: {
      type: "color",
      label: "Bar Color",
      defaultValue: "#3b82f6",
    },
    fadeEdges: {
      type: "boolean",
      label: "Fade Edges",
      defaultValue: true,
    },
    fadeWidth: {
      type: "number",
      label: "Fade Width",
      defaultValue: 24,
      min: 0,
      max: 60,
      step: 4,
    },
    height: {
      type: "number",
      label: "Height (px)",
      defaultValue: 64,
      min: 32,
      max: 200,
      step: 8,
    },
    sensitivity: {
      type: "number",
      label: "Sensitivity",
      defaultValue: 1,
      min: 0.5,
      max: 3,
      step: 0.1,
    },
    smoothingTimeConstant: {
      type: "number",
      label: "Smoothing",
      defaultValue: 0.8,
      min: 0,
      max: 0.95,
      step: 0.05,
    },
    fftSize: {
      type: "select",
      label: "FFT Size",
      defaultValue: "256",
      options: [
        { value: "128", label: "128 (Fast)" },
        { value: "256", label: "256 (Default)" },
        { value: "512", label: "512 (Detailed)" },
        { value: "1024", label: "1024 (Very detailed)" },
      ],
    },
    historySize: {
      type: "number",
      label: "History Size",
      defaultValue: 60,
      min: 20,
      max: 200,
      step: 10,
    },
    updateRate: {
      type: "number",
      label: "Update Rate (ms)",
      defaultValue: 30,
      min: 16,
      max: 100,
      step: 1,
    },
  },
  render: (props) => (
    <LiveWaveformDemo
      mode={props.mode as LiveWaveformMode}
      barWidth={props.barWidth as number}
      barGap={props.barGap as number}
      barRadius={props.barRadius as number}
      barColor={props.barColor as string}
      fadeEdges={props.fadeEdges as boolean}
      fadeWidth={props.fadeWidth as number}
      barHeight={props.barHeight as number}
      height={props.height as number}
      sensitivity={props.sensitivity as number}
      smoothingTimeConstant={props.smoothingTimeConstant as number}
      fftSize={Number(props.fftSize)}
      historySize={props.historySize as number}
      updateRate={props.updateRate as number}
    />
  ),
  code: (props) => {
    const lines: string[] = [];

    lines.push("<LiveWaveform");
    lines.push("  active={isRecording}");
    lines.push("  processing={isProcessing}");

    if (props.mode !== "static") {
      lines.push(`  mode="${props.mode}"`);
    }
    if (props.barWidth !== 3) {
      lines.push(`  barWidth={${props.barWidth}}`);
    }
    if (props.barGap !== 1) {
      lines.push(`  barGap={${props.barGap}}`);
    }
    if (props.barRadius !== 1.5) {
      lines.push(`  barRadius={${props.barRadius}}`);
    }
    if (props.barHeight !== 4) {
      lines.push(`  barHeight={${props.barHeight}}`);
    }
    if (props.barColor !== "#3b82f6") {
      lines.push(`  barColor="${props.barColor}"`);
    }
    if (props.fadeEdges !== true) {
      lines.push(`  fadeEdges={false}`);
    }
    if (props.fadeWidth !== 24) {
      lines.push(`  fadeWidth={${props.fadeWidth}}`);
    }
    if (props.height !== 64) {
      lines.push(`  height={${props.height}}`);
    }
    if (props.sensitivity !== 1) {
      lines.push(`  sensitivity={${props.sensitivity}}`);
    }
    if (props.smoothingTimeConstant !== 0.8) {
      lines.push(`  smoothingTimeConstant={${props.smoothingTimeConstant}}`);
    }
    if (props.fftSize !== "256") {
      lines.push(`  fftSize={${props.fftSize}}`);
    }
    if (props.historySize !== 60) {
      lines.push(`  historySize={${props.historySize}}`);
    }
    if (props.updateRate !== 30) {
      lines.push(`  updateRate={${props.updateRate}}`);
    }

    lines.push("/>");
    return lines.join("\n");
  },
};

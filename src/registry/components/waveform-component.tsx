import { Waveform } from "@/components/ui/waveform";
import { ComponentDefinition } from "../types";

export const waveformComponent: ComponentDefinition = {
  id: "waveform",
  name: "Waveform",
  description: "Real-time audio waveform visualization using microphone input. Perfect for speech-to-text interfaces.",
  category: "Animation",
  props: {
    amplitude: {
      type: "number",
      label: "Amplitude",
      defaultValue: 0.18,
      min: 0.05,
      max: 0.5,
      step: 0.01,
    },
    fftSize: {
      type: "select",
      label: "FFT Size",
      defaultValue: "1024",
      options: [
        { value: "256", label: "256 (Fast, rough)" },
        { value: "512", label: "512 (Balanced)" },
        { value: "1024", label: "1024 (Smooth)" },
        { value: "2048", label: "2048 (Very smooth)" },
      ],
    },
    smoothing: {
      type: "number",
      label: "Smoothing",
      defaultValue: 0.85,
      min: 0,
      max: 0.95,
      step: 0.05,
    },
    lineWidth: {
      type: "number",
      label: "Line Width",
      defaultValue: 1.5,
      min: 0.5,
      max: 4,
      step: 0.5,
    },
    strokeColor: {
      type: "color",
      label: "Stroke Color",
      defaultValue: "#3b82f6",
    },
    showBaseline: {
      type: "boolean",
      label: "Show Baseline",
      defaultValue: true,
    },
    height: {
      type: "number",
      label: "Height (px)",
      defaultValue: 64,
      min: 32,
      max: 200,
      step: 8,
    },
  },
  render: (props) => (
    <Waveform
      amplitude={props.amplitude as number}
      fftSize={Number(props.fftSize) as 256 | 512 | 1024 | 2048}
      smoothing={props.smoothing as number}
      lineWidth={props.lineWidth as number}
      strokeColor={props.strokeColor as string}
      showBaseline={props.showBaseline as boolean}
      height={props.height as number}
    />
  ),
  code: (props) => {
    const lines: string[] = [];

    lines.push("<Waveform");

    if (props.amplitude !== 0.18) {
      lines.push(`  amplitude={${props.amplitude}}`);
    }
    if (props.fftSize !== "1024") {
      lines.push(`  fftSize={${props.fftSize}}`);
    }
    if (props.smoothing !== 0.85) {
      lines.push(`  smoothing={${props.smoothing}}`);
    }
    if (props.lineWidth !== 1.5) {
      lines.push(`  lineWidth={${props.lineWidth}}`);
    }
    if (props.strokeColor !== "#3b82f6") {
      lines.push(`  strokeColor="${props.strokeColor}"`);
    }
    if (props.showBaseline !== true) {
      lines.push(`  showBaseline={false}`);
    }
    if (props.height !== 64) {
      lines.push(`  height={${props.height}}`);
    }

    if (lines.length === 1) {
      return "<Waveform />";
    }

    lines.push("/>");
    return lines.join("\n");
  },
};

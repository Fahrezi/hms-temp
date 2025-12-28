
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeSeriesScale,
  Title as ChartTitle,
  Tooltip,
} from "chart.js";
import { useEffect,useMemo, useRef } from "react";
import { Line } from "react-chartjs-2";

import { withAlpha } from "@/utils/chart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend,
  Filler,
  TimeSeriesScale
);

// ---------- Types ----------
export type LineSeries = {
  label: string;
  data: number[];
  color?: string; // CSS color for line & points
  fill?: boolean | "origin" | "start" | "end";
};

export type LineChartProps = {
  labels: (string | number | Date)[];
  series: LineSeries[];
  title?: string;
  height?: number; // px
  tension?: number; // 0..1 line smoothing
  showLegend?: boolean;
  yMin?: number;
  yMax?: number;
  yStepSize?: number;
  grid?: boolean; // show grid lines
  showPoints?: boolean;
  formatTooltip?: (value: number) => string; // custom tooltip formatter
};

// ---------- Component ----------
export function LineChart({
  labels,
  series,
  title,
  height = 320,
  tension = 0.35,
  showLegend = true,
  yMin,
  yMax,
  yStepSize,
  grid = true,
  showPoints = false,
  formatTooltip,
}: LineChartProps) {
  const chartRef = useRef<ChartJS<"line"> | null>(null);

  // Provide a pleasant default palette if user doesn't pass colors
  const palette = [
    "#2563eb", // blue-600
    "#16a34a", // green-600
    "#f59e0b", // amber-500
    "#ef4444", // red-500
    "#8b5cf6", // violet-500
    "#06b6d4", // cyan-500
  ];

  const data = useMemo(() => {
    return {
      labels,
      datasets: series.map((s, idx) => ({
        label: s.label,
        data: s.data,
        borderColor: s.color ?? palette[idx % palette.length],
        backgroundColor: (ctx: any) => {
          const { chart } = ctx;
          const { ctx: c, chartArea } = chart || {};
          if (!chartArea) return s.color ?? palette[idx % palette.length];
          const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          const base = s.color ?? palette[idx % palette.length];
          gradient.addColorStop(0, withAlpha(base, 0.35));
          gradient.addColorStop(1, withAlpha(base, 0.05));
          return gradient;
        },
        pointRadius: showPoints ? 3 : 0,
        pointHoverRadius: 5,
        borderWidth: 2,
        fill: s.fill ?? false,
        tension,
      })),
    } as const;
  }, [labels, series, tension, showPoints]);

  const options = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "nearest" as const, intersect: false },
      plugins: {
        legend: { display: showLegend, position: "top" as const, labels: { usePointStyle: true } },
        title: title ? { display: true, text: title } : { display: false },
        tooltip: {
          callbacks: {
            label: (ctx: any) => {
              const raw = typeof ctx.raw === "number" ? ctx.raw : Number(ctx.raw);
              const v = Number.isFinite(raw) ? raw : 0;
              const formatted = formatTooltip ? formatTooltip(v) : v.toLocaleString();
              return `${ctx.dataset.label}: ${formatted}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: grid, drawBorder: false },
          ticks: { maxRotation: 0, autoSkipPadding: 8 },
        },
        y: {
          grid: { display: grid, drawBorder: false },
          ticks: {
            callback: (val: string | number) => {
              const n = Number(val);
              return formatTooltip ? formatTooltip(n) : n.toLocaleString();
            },
          },
          min: typeof yMin === "number" ? yMin : undefined,
          max: typeof yMax === "number" ? yMax : undefined,
          suggestedMin: typeof yMin === "number" ? yMin : undefined,
          suggestedMax: typeof yMax === "number" ? yMax : undefined,
        },
      },
    };
  }, [showLegend, title, grid, yMin, yMax, yStepSize, formatTooltip]);

  // Optional: y step control (Chart.js v4 doesn't accept stepSize on scale root; use ticks.stepSize)
  useEffect(() => {
    if (yStepSize && chartRef.current) {
      const chart = chartRef.current;
      const yScale = chart.options.scales?.y as any;
      if (yScale?.ticks) yScale.ticks.stepSize = yStepSize;
      chart.update();
    }
  }, [yStepSize]);

  return (
    <div style={{ height }}>
      <Line ref={chartRef} options={options} data={data} />
    </div>
  );
}

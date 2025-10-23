export function withAlpha(hexOrRgb: string, alpha: number) {
  // Accepts #RRGGBB or rgb(a)
  if (hexOrRgb.startsWith("#")) {
    const [r, g, b] = hexToRgb(hexOrRgb);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  // naive: if user passed rgb/rgba, just inject alpha
  if (hexOrRgb.startsWith("rgb")) {
    return hexOrRgb.replace(/rgba?\(([^)]+)\)/, (_m, inner) => {
      const parts = inner.split(",").slice(0, 3).map((s: string) => s.trim());
      return `rgba(${parts.join(",")}, ${alpha})`;
    });
  }
  return hexOrRgb;
}

export function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized.length === 3 ? normalized.split("").map((c) => c + c).join("") : normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}
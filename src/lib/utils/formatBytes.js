const UNITS = ["B", "KB", "MB", "GB", "TB"];

export function formatBytes(value) {
  if (!value) {
    return "0 B";
  }

  const exponent = Math.min(Math.floor(Math.log(value) / Math.log(1024)), UNITS.length - 1);
  const amount = value / 1024 ** exponent;

  return `${amount.toFixed(amount >= 10 || exponent === 0 ? 0 : 1)} ${UNITS[exponent]}`;
}

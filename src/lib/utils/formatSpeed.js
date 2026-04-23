import { formatBytes } from "./formatBytes";

export function formatSpeed(value) {
  return `${formatBytes(value)}/s`;
}

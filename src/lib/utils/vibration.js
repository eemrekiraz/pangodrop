export function triggerTransferHaptics() {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate([100, 80, 140]);
  }
}

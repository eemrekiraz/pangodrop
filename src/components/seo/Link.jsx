export function Link({ href, children, className = "" }) {
  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    window.history.pushState({}, "", href);
    window.dispatchEvent(new Event("popstate"));
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`text-cyan-300 transition hover:text-cyan-100 hover:underline ${className}`.trim()}
    >
      {children}
    </a>
  );
}

type AnchorActivation = {
  href: string;
  currentHref: string;
  target: string | null;
  download: boolean;
  button: number;
  defaultPrevented: boolean;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
};

/** Only ordinary, same-document fragment links belong to the scroll controller. */
export function resolveSamePageAnchor(activation: AnchorActivation) {
  if (
    activation.defaultPrevented ||
    activation.button !== 0 ||
    activation.altKey ||
    activation.ctrlKey ||
    activation.metaKey ||
    activation.shiftKey ||
    activation.download ||
    (activation.target && activation.target.toLowerCase() !== "_self")
  )
    return undefined;

  try {
    const current = new URL(activation.currentHref);
    const destination = new URL(activation.href, current);
    if (
      destination.origin !== current.origin ||
      destination.pathname !== current.pathname ||
      destination.search !== current.search ||
      destination.hash.length < 2
    )
      return undefined;

    const id = decodeURIComponent(destination.hash.slice(1));
    return id ? { id, href: destination.href } : undefined;
  } catch {
    // Invalid URLs/escapes retain the browser's ordinary link behavior.
    return undefined;
  }
}

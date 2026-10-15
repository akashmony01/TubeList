/*
 * TubeList — small helper for building page elements
 * ============================================================================
 * Used by both the YouTube panel and the toolbar popup.
 *
 * el('button', { class: 'x', onclick: doSomething }, ['Click me'])
 * creates <button class="x">Click me</button> and connects the click.
 *
 * We build elements this way instead of writing HTML text, because YouTube's
 * security rules don't allow HTML text, and because it keeps your own topic
 * text from ever being treated as code.
 */
function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key.startsWith('on')) {
      node.addEventListener(key.slice(2), value); // e.g. onclick -> click
    } else {
      node.setAttribute(key, value);
    }
  }
  node.append(...children);
  return node;
}

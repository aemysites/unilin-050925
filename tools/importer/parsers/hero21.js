/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main section containing the hero content
  const section = element.querySelector('section.c-page-intro');
  if (!section) return;

  // Get the image (background visual)
  let imageEl = null;
  const right = section.querySelector('.c-page-intro-right');
  if (right) {
    const img = right.querySelector('img');
    if (img) imageEl = img;
  }

  // Get the text content (title, subtitle)
  let textContent = [];
  const left = section.querySelector('.c-page-intro-left');
  if (left) {
    const body = left.querySelector('.c-page-intro-body');
    if (body) {
      // Title (h1)
      const title = body.querySelector('.c-page-intro-title');
      if (title) textContent.push(title);
      // Subtitle (p)
      const subtitle = body.querySelector('.c-page-intro-subtitle');
      if (subtitle) textContent.push(subtitle);
    }
  }

  // Table header row
  const headerRow = ['Hero (hero21)'];
  // Image row
  const imageRow = [imageEl ? imageEl : ''];
  // Content row (title, subtitle)
  const contentRow = [textContent.length ? textContent : ''];

  // Compose table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block guidelines
  const headerRow = ['Hero (hero22)'];

  // Defensive: find the main section containing the hero content
  const section = element.querySelector('section.c-page-intro');
  if (!section) return;

  // Find the image (background/decorative)
  let imageEl = section.querySelector('.c-page-intro-right img');
  // Defensive: if not found, try any img inside section
  if (!imageEl) imageEl = section.querySelector('img');

  // 2nd row: image only (if present)
  const imageRow = [imageEl ? imageEl : ''];

  // 3rd row: text content (title, subtitle, CTA)
  const body = section.querySelector('.c-page-intro-body');
  const content = [];
  if (body) {
    // Title (h1 or h2)
    const title = body.querySelector('h1, h2, h3, h4, h5, h6');
    if (title) content.push(title);
    // Subtitle (p)
    const subtitle = body.querySelector('p');
    if (subtitle) content.push(subtitle);
    // CTA: not present in this example, but if present, add
    const cta = body.querySelector('a, button');
    if (cta) content.push(cta);
  }
  const contentRow = [content];

  // Build the table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}

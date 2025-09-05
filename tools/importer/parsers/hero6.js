/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main section containing the hero content
  const section = element.querySelector('section.c-page-intro');
  if (!section) return;

  // --- Extract image (background visual) ---
  let imageEl = null;
  const right = section.querySelector('.c-page-intro-right');
  if (right) {
    const img = right.querySelector('img');
    if (img) imageEl = img;
  }

  // --- Extract heading and subheading ---
  let headingEl = null;
  let subheadingEl = null;
  const body = section.querySelector('.c-page-intro-body');
  if (body) {
    headingEl = body.querySelector('h1');
    subheadingEl = body.querySelector('p');
  }

  // --- Compose content cell for row 3 ---
  const contentCell = [];
  if (headingEl) contentCell.push(headingEl);
  if (subheadingEl) contentCell.push(subheadingEl);

  // --- Build table rows ---
  const headerRow = ['Hero (hero6)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  // --- Create block table ---
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // --- Replace original element ---
  element.replaceWith(block);
}

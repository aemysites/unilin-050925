/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main hero section
  const section = element.querySelector('section.c-page-intro');
  if (!section) return;

  // Find the background image (visual)
  let imageEl = '';
  const right = section.querySelector('.c-page-intro-right');
  if (right) {
    const img = right.querySelector('img');
    if (img) imageEl = img;
  }

  // Find the heading and subheading
  let headingEl = '';
  let subheadingEl = '';
  const body = section.querySelector('.c-page-intro-body');
  if (body) {
    const h = body.querySelector('h1');
    if (h) headingEl = h;
    const p = body.querySelector('p');
    if (p) subheadingEl = p;
  }

  // Compose the block table
  const headerRow = ['Hero (hero18)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [
    [headingEl, subheadingEl].filter(Boolean)
  ];

  // Flatten contentRow to a single cell with both elements (if present)
  const contentCell = document.createElement('div');
  [headingEl, subheadingEl].forEach(el => {
    if (el) contentCell.appendChild(el);
  });
  const contentRowFinal = [contentCell.childNodes.length ? contentCell : ''];

  // Create the table
  const cells = [
    headerRow,
    imageRow,
    contentRowFinal
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}

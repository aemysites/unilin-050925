/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header row as per instructions
  const headerRow = ['Cards (cards15)'];

  // Extract image (mandatory)
  const img = element.querySelector('img');

  // Extract tag (optional, as text content)
  let tagText = '';
  const tagSpan = element.querySelector('.c-project-card__tags span');
  if (tagSpan && tagSpan.textContent) {
    tagText = tagSpan.textContent.trim();
  }

  // Compose the text cell (tag only, as no title/desc/cta in this HTML)
  let textCell;
  if (tagText) {
    textCell = document.createElement('p');
    textCell.textContent = tagText;
  } else {
    textCell = document.createElement('div');
  }

  // Build table rows
  const rows = [headerRow, [img, textCell]];

  // Create and insert the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Cards block
  const headerRow = ['Cards (cards9)'];

  // Get the image (mandatory for cards)
  const img = element.querySelector('img');

  // Get the tag text (if present)
  let tagText = '';
  const tagSpan = element.querySelector('.c-tag');
  if (tagSpan) {
    tagText = tagSpan.textContent.trim();
  }

  // Compose the text cell: tag as heading if present
  let textCell = '';
  if (tagText) {
    const heading = document.createElement('p');
    heading.textContent = tagText;
    heading.style.fontWeight = 'bold';
    textCell = heading;
  }

  // Build the table rows
  const rows = [
    headerRow,
    [img, textCell || '']
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}

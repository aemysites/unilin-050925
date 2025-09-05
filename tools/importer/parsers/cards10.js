/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Always use the correct header row
  const headerRow = ['Cards (cards10)'];

  // Find the image (mandatory)
  const img = element.querySelector('img');

  // Find the tag text (text content for cell 2)
  let tagText = '';
  const tag = element.querySelector('.c-tag');
  if (tag) {
    tagText = tag.textContent.trim();
  }

  // First cell: image only
  const imageCell = img;
  // Second cell: tag text only (since there is no title/desc/cta in this HTML)
  const textCell = tagText;

  const rows = [
    headerRow,
    [imageCell, textCell]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

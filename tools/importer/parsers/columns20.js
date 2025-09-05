/* global WebImporter */
export default function parse(element, { document }) {
  // Find the anchor menu
  const menu = element.querySelector('.c-anchor-menu');
  if (!menu) return;

  // Get all button columns
  const buttons = Array.from(menu.querySelectorAll(':scope > button.c-anchor-menu-item'));
  if (!buttons.length) return;

  // Extract the text for each column
  const columns = buttons.map(btn => {
    const textDiv = btn.querySelector('.c-anchor-menu-item-text');
    return textDiv ? textDiv.textContent.trim() : btn.textContent.trim();
  });

  // Build the table rows: header row must be a single cell
  const headerRow = ['Columns (columns20)'];
  const contentRow = columns;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}

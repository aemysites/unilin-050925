/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the anchor menu container
  const container = element.querySelector('.c-anchor-menu');
  if (!container) return;

  // Find all direct button children (each is a column)
  const buttons = Array.from(container.querySelectorAll(':scope > button.c-anchor-menu-item'));
  if (!buttons.length) return;

  // For each button, extract the text div (column content)
  const columns = buttons.map(btn => {
    const textDiv = btn.querySelector('.c-anchor-menu-item-text');
    // Defensive: fallback to button text if div missing
    if (textDiv) {
      return textDiv;
    } else {
      // Create a span with the button's text
      const span = document.createElement('span');
      span.textContent = btn.textContent.trim();
      return span;
    }
  });

  // Table header
  const headerRow = ['Columns (columns23)'];
  // Table content row: one cell per column
  const contentRow = columns;

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the anchor menu container
  const menuDiv = element.querySelector('.c-anchor-menu');
  if (!menuDiv) return;

  // Find all direct button children (columns)
  const buttons = Array.from(menuDiv.querySelectorAll(':scope > button.c-anchor-menu-item'));
  if (!buttons.length) return;

  // For each button, get its text content element (usually a div)
  const cells = buttons.map(btn => {
    // Get the text container, fallback to button if not found
    const textDiv = btn.querySelector('.c-anchor-menu-item-text') || btn;
    // Use the actual DOM node for semantic preservation
    return textDiv;
  });

  // Build the table rows
  const headerRow = ['Columns (columns17)'];
  const contentRow = cells;
  const tableRows = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}

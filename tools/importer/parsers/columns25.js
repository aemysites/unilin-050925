/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the main grid container (should be the direct child)
  const grid = element.querySelector('.o-grid');
  if (!grid) return;

  // Get the two columns (cells) in order
  // Use :scope > * to get direct children (order matters)
  const cells = Array.from(grid.children);
  if (cells.length < 2) return;

  // First column: image block (content-block-image-component)
  const imageBlock = cells.find(
    (el) => el.tagName && el.tagName.toLowerCase().includes('content-block-image-component')
  );
  // Second column: wysiwyg block (content-block-wysiwyg-component)
  const wysiwygBlock = cells.find(
    (el) => el.tagName && el.tagName.toLowerCase().includes('content-block-wysiwyg-component')
  );

  // Defensive: ensure both columns exist
  if (!imageBlock || !wysiwygBlock) return;

  // Build the table rows
  const headerRow = ['Columns (columns25)'];
  const contentRow = [imageBlock, wysiwygBlock];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}

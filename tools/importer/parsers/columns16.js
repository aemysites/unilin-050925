/* global WebImporter */
export default function parse(element, { document }) {
  // Always replace the original element, not a child
  // Get the main wrapper that contains the columns
  const wrapper = element.querySelector('.o-wrapper');
  if (!wrapper) return;

  // Get the immediate children that represent columns
  // In this HTML, it's two children: one image block, one wysiwyg block
  const columns = Array.from(wrapper.children);
  if (columns.length < 2) return;

  // For the first column (image)
  const imageBlock = columns[0];
  // Find the desktop image (prefer desktop over mobile)
  let imgEl = imageBlock.querySelector('.c-content-block-image-media-desktop img');
  if (!imgEl) {
    // fallback to mobile image
    imgEl = imageBlock.querySelector('.c-content-block-image-media-mobile img');
  }

  // For the second column (text)
  const textBlock = columns[1];
  // Use the whole text block div for resilience
  const textContent = textBlock.querySelector('.c-content-block-wysiwyg');

  // Build the table rows
  const headerRow = ['Columns (columns16)'];
  const contentRow = [imgEl, textContent];

  // Create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main section containing the hero content
  const section = element.querySelector('section.c-page-intro');
  if (!section) return;

  // Find the image (background image)
  let imageEl = null;
  const right = section.querySelector('.c-page-intro-right');
  if (right) {
    imageEl = right.querySelector('img');
  }

  // Find the left content (headings, subheading, etc)
  let leftContent = null;
  const left = section.querySelector('.c-page-intro-left');
  if (left) {
    leftContent = left.querySelector('.c-page-intro-body');
  }

  // Build the table rows
  const headerRow = ['Hero (hero13)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [leftContent ? leftContent : ''];

  const cells = [headerRow, imageRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

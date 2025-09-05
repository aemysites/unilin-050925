/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main intro section
  const section = element.querySelector('section.c-page-intro');
  if (!section) return;

  // Find the image (background visual)
  let imageCell = '';
  const right = section.querySelector('.c-page-intro-right');
  if (right) {
    const media = right.querySelector('.c-page-intro-media');
    if (media) {
      const img = media.querySelector('img');
      if (img) {
        imageCell = img;
      }
    }
  }

  // Find the left side (textual content)
  let textCell = '';
  const left = section.querySelector('.c-page-intro-left');
  if (left) {
    // Get the body (title + subtitle)
    const body = left.querySelector('.c-page-intro-body');
    if (body) {
      // We'll include the entire body block for resilience
      textCell = body;
    }
  }

  // Table rows
  const headerRow = ['Hero (hero7)'];
  const imageRow = [imageCell];
  const textRow = [textCell];

  // Create table
  const cells = [headerRow, imageRow, textRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main section containing the hero block
  const section = element.querySelector('section.c-page-intro');
  if (!section) return;

  // Find the image (background)
  let imageEl = null;
  const mediaDiv = section.querySelector('.c-page-intro-right .c-page-intro-media');
  if (mediaDiv) {
    imageEl = mediaDiv.querySelector('img');
  }

  // Find the title and subtitle
  const bodyDiv = section.querySelector('.c-page-intro-left .c-page-intro-body');
  let headingEl = null;
  let subtitleEl = null;
  if (bodyDiv) {
    headingEl = bodyDiv.querySelector('h1, h2, h3, h4, h5, h6');
    subtitleEl = bodyDiv.querySelector('p');
    // Defensive: Remove empty subtitle
    if (subtitleEl && !subtitleEl.textContent.trim()) {
      subtitleEl = null;
    }
  }

  // Build rows for the table
  const headerRow = ['Hero (hero3)'];
  const imageRow = [imageEl ? imageEl : ''];
  // Compose content row: heading, subtitle (if present)
  const contentRow = [
    [
      ...(headingEl ? [headingEl] : []),
      ...(subtitleEl ? [subtitleEl] : [])
    ]
  ];

  // Compose table cells
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

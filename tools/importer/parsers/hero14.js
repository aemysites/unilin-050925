/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main hero block root
  const pageIntro = element.querySelector('.uc-page-intro, .c-page-intro');
  if (!pageIntro) return;

  // Find the background image (visual)
  let imageEl = null;
  const right = pageIntro.querySelector('.c-page-intro-right');
  if (right) {
    const media = right.querySelector('.c-page-intro-media, image-core');
    if (media) {
      imageEl = media.querySelector('img');
    }
  }

  // Find the title and subtitle
  const body = pageIntro.querySelector('.c-page-intro-body');
  let titleEl = null;
  let subtitleEl = null;
  if (body) {
    titleEl = body.querySelector('h1, .c-page-intro-title');
    subtitleEl = body.querySelector('p, .c-page-intro-subtitle');
  }

  // Compose content cell (title + subtitle)
  const contentCell = [];
  if (titleEl) contentCell.push(titleEl);
  if (subtitleEl) contentCell.push(subtitleEl);

  // Table rows
  const headerRow = ['Hero (hero14)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}

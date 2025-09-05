/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main section containing the hero content
  const section = element.querySelector('section.c-page-intro');
  if (!section) return;

  // Find the image (background image)
  let imageEl = null;
  const right = section.querySelector('.c-page-intro-right');
  if (right) {
    imageEl = right.querySelector('img');
  }

  // Find the heading and subtitle
  const left = section.querySelector('.c-page-intro-left');
  let heading = null;
  let subtitle = null;
  if (left) {
    heading = left.querySelector('h1, h2, h3, h4, h5, h6');
    subtitle = left.querySelector('p');
  }

  // Build the table rows
  const headerRow = ['Hero (hero19)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentArr = [];
  if (heading) contentArr.push(heading);
  if (subtitle) contentArr.push(subtitle);
  const contentRow = [contentArr];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Table header row as required
  const headerRow = ['Tabs (tabs24)'];
  const rows = [headerRow];

  // Find the tab buttons wrapper
  const wrapper = element.querySelector('.c-filter-bar__wrapper');
  if (!wrapper) return;

  // Get all tab buttons
  const tabButtons = Array.from(wrapper.querySelectorAll('.c-filter-bar__item'));

  // For each tab, extract label and content (content is mandatory, so use placeholder if missing)
  tabButtons.forEach((btn) => {
    const labelDiv = btn.querySelector('.c-filter-bar__label');
    let label = labelDiv ? labelDiv.textContent.trim() : '';
    const labelElem = document.createElement('span');
    labelElem.textContent = label;
    // For this source HTML, there is no tab content, so use a visible placeholder
    const contentElem = document.createElement('span');
    contentElem.textContent = 'No content available.';
    rows.push([labelElem, contentElem]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}

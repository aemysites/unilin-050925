/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the card content from a card-number-element
  function extractCardContent(cardEl) {
    // Defensive: find the number and description inside the card
    const number = cardEl.querySelector('.c-number-card-body-text-number');
    const desc = cardEl.querySelector('.c-number-card-body-text-description');
    // Compose a fragment for the card cell
    const frag = document.createElement('div');
    if (number) {
      // Use strong for the number for emphasis
      const strong = document.createElement('strong');
      strong.innerHTML = number.innerHTML.trim();
      frag.appendChild(strong);
    }
    if (desc) {
      frag.appendChild(document.createElement('br'));
      frag.appendChild(document.createTextNode(desc.textContent.trim()));
    }
    return frag;
  }

  // Find all direct children of the main grid wrapper
  const wrapper = element.querySelector('.o-wrapper');
  if (!wrapper) return;
  const grid = wrapper.querySelector('.uc-content-block-grid');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Prepare the table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cardsNoImages26)']);

  // For each card-number-element, extract its content
  children.forEach((child) => {
    if (child.tagName && child.tagName.toLowerCase() === 'card-number-element') {
      const cardContent = extractCardContent(child);
      rows.push([cardContent]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}

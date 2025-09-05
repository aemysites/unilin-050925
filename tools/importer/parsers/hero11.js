/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main hero banner container
  const heroBanner = element.querySelector('.c-hero-banner');
  if (!heroBanner) return;

  // 1. Header row
  const headerRow = ['Hero (hero11)'];

  // 2. Image row (background image)
  // Find the main image (desktop preferred)
  const mediaDiv = heroBanner.querySelector('.c-hero-banner-media');
  let imgEl = null;
  if (mediaDiv) {
    // Prefer the largest image (desktop)
    const imgs = Array.from(mediaDiv.querySelectorAll('img'));
    imgEl = imgs.sort((a, b) => (b.width * b.height) - (a.width * a.height))[0] || imgs[0];
  }
  const imageRow = [imgEl ? imgEl : ''];

  // 3. Text row (headline, subheading, CTA)
  const textDiv = heroBanner.querySelector('.c-hero-banner-text');
  let textContent = [];
  if (textDiv) {
    // Find the wrapper for text
    const wrapper = textDiv.querySelector('.o-wrapper');
    if (wrapper) {
      // Find the main heading (h1)
      const h1 = wrapper.querySelector('h1');
      if (h1) textContent.push(h1);
    }
  }
  const textRow = [textContent.length ? textContent : ''];

  // Compose table rows
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

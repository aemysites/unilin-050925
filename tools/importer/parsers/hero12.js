/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main hero banner container
  // The structure is: uc-hero-banner > hero-banner-component > div.c-hero-banner
  let heroBanner = element;
  // Find the main content div if present
  const heroComponent = heroBanner.querySelector('hero-banner-component');
  const mainDiv = heroComponent ? heroComponent.querySelector('.c-hero-banner') : heroBanner.querySelector('.c-hero-banner');

  // 1. Header row
  const headerRow = ['Hero (hero12)'];

  // 2. Image row: find the first <img> inside .c-hero-banner-media
  let imageRowContent = '';
  if (mainDiv) {
    const mediaDiv = mainDiv.querySelector('.c-hero-banner-media');
    if (mediaDiv) {
      // Prefer desktop image if present, fallback to first image
      const imgs = Array.from(mediaDiv.querySelectorAll('img'));
      let img = imgs[0];
      if (imgs.length > 1) {
        // Try to pick the widest image (desktop)
        img = imgs.reduce((best, curr) => {
          const bestW = parseInt(best.getAttribute('width') || '0', 10);
          const currW = parseInt(curr.getAttribute('width') || '0', 10);
          return currW > bestW ? curr : best;
        }, imgs[0]);
      }
      if (img) {
        imageRowContent = img;
      }
    }
  }

  // 3. Text row: find the .c-hero-banner-text content
  let textRowContent = '';
  if (mainDiv) {
    const textDiv = mainDiv.querySelector('.c-hero-banner-text');
    if (textDiv) {
      textRowContent = textDiv;
    }
  }

  // Compose the table rows
  const rows = [
    headerRow,
    [imageRowContent],
    [textRowContent],
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

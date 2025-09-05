/* global WebImporter */
export default function parse(element, { document }) {
  // Find the logo image
  const logoImg = element.querySelector('.c-footer__logo img');

  // Find the social icons list
  const socialUl = element.querySelector('.c-footer__social');

  // Compose the first cell: logo + social icons
  const logoSocialCell = document.createElement('div');
  if (logoImg) logoSocialCell.appendChild(logoImg.cloneNode(true));
  if (socialUl) logoSocialCell.appendChild(socialUl.cloneNode(true));

  // Find the columns (details blocks)
  const columnsDiv = element.querySelector('.c-footer__other');
  const detailsList = columnsDiv ? Array.from(columnsDiv.querySelectorAll(':scope > details')) : [];

  // For each details, extract heading and list
  const columnCells = detailsList.map((details) => {
    const cellDiv = document.createElement('div');
    const heading = details.querySelector('.c-footer-column__title');
    const list = details.querySelector('ul');
    if (heading) cellDiv.appendChild(heading.cloneNode(true));
    if (list) cellDiv.appendChild(list.cloneNode(true));
    return cellDiv;
  });

  // Compose the table rows
  const headerRow = ['Columns (columns1)'];
  const contentRow = [logoSocialCell, ...columnCells];

  // Create the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}

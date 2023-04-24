//헤더, 카테고리, 푸터 렌더링
import { renderHeader } from './render-header.js';
import { renderNavbar } from './render-navbar.js';
import { renderFooter } from './render-footer.js';

async function main() {
  renderHeader(null);
  renderNavbar();
  renderFooter();
}

export { main };

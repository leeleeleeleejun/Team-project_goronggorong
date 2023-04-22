//헤더, 카테고리, 푸터 렌더링
import { renderHeader } from '/src/views/public/js/render-Header.js';
import { renderNavbar } from '/src/views/public/js/render-navbar.js';
import { renderFooter } from '/src/views/public/js/render-footer.js';

async function main() {
  renderHeader(null);
  renderNavbar();
  renderFooter();
}

export { main };

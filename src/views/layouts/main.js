//헤더, 카테고리, 푸터 렌더링
import { renderHeader } from './render-header.js';
import { renderFooter } from './render-footer.js';

async function main() {
  renderHeader();
  renderFooter();
}

export { main };

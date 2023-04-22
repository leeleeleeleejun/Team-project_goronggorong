import { main } from '../footerheader/main.js';
await main();

//상품 불러오기
const createItem = (item) => {
  return `
  <li class="prod__item">
            <a class="prod__link" href="/products/${item.id}">
              <img
                class="prod__link-thumb"
                src="https://storage.googleapis.com/hochony/gorongImg/gorongfood.jpeg"
              />
              <div class="prod__info">
                <p class="prod__title">${item.name}</p>
                <div class="prod__order">
                  <span><strong class="prod__order-price">${item.price}</strong>원</span>
                  <!-- <button class="prod__add-cart"><img src="/src/views/img/main/cart.png" /></button> -->
                </div>
              </div>
            </a>
          </li>`;
};

//전체 상품 목록 불러오기
axios
  .get('http://localhost:3000/api/')
  .then((res) => {
    const items = res.data.products;
    const list = document.querySelector('.prod__list');
    items.forEach((item) => {
      list.innerHTML += createItem(item);
    });
  })
  .catch((err) => {
    alert(err);
  });

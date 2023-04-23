import { main } from '/layouts/main.js';
await main();

const view20 = document.querySelector('.dropdown-20');
const view40 = document.querySelector('.dropdown-40');
const viewAll = document.querySelector('.dropdown-all');
const amountAll = document.querySelector('.prod__item--amount');
//전체 상품 목록 불러오기

axios
  .get(`/api/?skip=0&limit=200`)
  .then((res) => {
    const items = res.data.products;
    amountAll.innerText = items.length;
    const list = document.querySelector('.prod__list');
    items.forEach((item) => {
      list.innerHTML += createItem(item);
    });
  })
  .catch((err) => {
    alert(err);
  });

// view20.addEventListener('click', function () {
//   axios
//     .get(`/api/?skip=0&limit=20`)
//     .then((res) => {
//       const items = res.data.products;
//       const list = document.querySelector('.prod__list');
//       items.forEach((item) => {
//         list.innerHTML += createItem(item);
//       });
//     })
//     .catch((err) => {
//       alert(err);
//     });
// });
// view40.addEventListener('click', function () {
//   axios
//     .get(`/api/?skip=0&limit=40`)
//     .then((res) => {
//       const items = res.data.products;
//       const list = document.querySelector('.prod__list');
//       items.forEach((item) => {
//         list.innerHTML += createItem(item);
//       });
//     })
//     .catch((err) => {
//       alert(err);
//     });
// });
// viewAll.addEventListener('click', function () {
//   axios
//     .get(`/api/?skip=0&limit=100`)
//     .then((res) => {
//       const items = res.data.products;
//       const list = document.querySelector('.prod__list');
//       items.forEach((item) => {
//         list.innerHTML += createItem(item);
//       });
//     })
//     .catch((err) => {
//       alert(err);
//     });
// });

//상품 불러오기
const createItem = (item) => {
  return `
  <li class="prod__item">
            <a class="prod__link" href="/products/${item.id}">
              <img
                class="prod__link-thumb"
                src="${item.imgUrl}"
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

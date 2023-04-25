import { main } from '/layouts/main.js';
await main();

//전체 상품 목록 불러오기
const amountAll = document.querySelector('.prod__item--amount');

axios
  .get(`/api`) //전체리스트 불러오기
  .then((res) => {
    const items = res.data.info;
    amountAll.innerText = items.length;
    const list = document.querySelector('.prod__list');
    items.forEach((item) => {
      list.innerHTML += createItem(item);
    });
  })
  .then((res) => {
    const category = document.querySelectorAll('.nav__cate li');
    category.forEach((cate) => {
      cate.addEventListener('click', function (e) {
        const link = e.target.querySelector('a');
        const href = link.getAttribute('href');
        link.setAttribute('href', href.replace(/\/+$/, ''));
        //기존 on카테고리에서 on클래스 삭제하고
        document.querySelector('.nav__cate--on').classList.remove('nav__cate--on');
        //클릭한 카테고리에 on 클래스 추가
        e.target.classList.add('nav__cate--on');
      });
    });
  })
  .catch((err) => {
    alert(err);
  });

//상품 불러오기
const createItem = (item) => {
  return `
  <li class="prod__item">
            <a class="prod__link" href="/products?id=${item.id}">
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

//전체 상품 목록 불러오기

axios
  //api/?skip=0&limit=20
  .get(`/api/?skip=${skip}&limit=${limit}`)
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

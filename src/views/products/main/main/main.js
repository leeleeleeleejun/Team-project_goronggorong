//상품 불러오기
const createItem = (item) => {
  return `
  <li class="prod__item">
            <a class="prod__link" href="/products/:${item.category}/${item.id}">
              <img
                class="prod__link-thumb"
                src="https://storage.googleapis.com/hochony/gorongImg/gorongfood.jpeg"
              />
              <div class="prod__info">
                <p class="prod__title">${item.name}</p>
                <div class="prod__order">
                  <span><strong class="prod__order-price">${item.price}</strong>원</span>
                  <!-- <button class="prod__add-cart"><img src="../../../img/products/cart.png" /></button> -->
                </div>
              </div>
            </a>
          </li>`;
};

//전체 상품 목록 불러오기
axios
  .get('http://localhost:3001/items/')
  .then((res) => {
    const items = res.data;
    const list = document.querySelector('.prod__list');
    items.forEach((item) => {
      list.innerHTML += createItem(item);
    });
  })
  .catch((err) => {
    alert(err);
  });

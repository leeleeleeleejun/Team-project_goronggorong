import { main } from '/layouts/main.js';
await main();

//url주소에서 ?뒤의 문자열 가져와서 '='으로 id값만 분리하기
const url = window.location.search;
const itemId = url.split('=')[1];

axios
  .get(`http://localhost:3000/api/products?id=${itemId}`)
  .then((res) => {
    const item = res.data.product;

    const itemImg = document.querySelectorAll('.item__img');
    const name = document.querySelectorAll('item__name');
    const price = document.querySelectorAll('.item__price');
    const category = document.querySelector('.overview__category');
    const navAmount = document.querySelector('.bottom-nav__amount--count');
    const navCartBtn = document.querySelector('.bottom-nav__btn--cart');

    itemImg.forEach(data=>data.setAttribute('src', item.imgUrl))

    name.forEach(data=>data.innerText = item.name)

    price.forEach(data=>data.innerText = item.price)

    category.innerText = item.category;
    navCartBtn.addEventListener('click', addCart);

    let cartItem = [];

    function addCart() {
      const newItem = {
        img: item.imgUrl,
        name: item.name,
        price: item.price,
        amount: navAmount.value,
      };
      //만약 기존 추가된 아이템이 있다면
      if (localStorage.getItem('cart')) {
        cartItem = JSON.parse(localStorage.getItem('cart'));
      }

      cartItem.push(newItem);
      localStorage.setItem('cart', JSON.stringify(cartItem));
      //배열 초기화
      cartItem = [];
    }
  })
  .catch((err) => {
    alert(err);
  });

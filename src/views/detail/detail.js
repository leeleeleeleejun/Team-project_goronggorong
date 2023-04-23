import { main } from '/layouts/main.js';
await main();


// .get(`http://localhost:3000/api/products/${id}`)
const url = window.location.pathname;
const itemId = url.split('/')[2];

axios
  .get(`http://localhost:3000/api/products/${itemId}`)
  .then((res) => {
    const item = res.data.product;

    const itemImg = document.querySelectorAll('.item__img');
    const name = document.querySelectorAll('item__name');
    const price = document.querySelectorAll('.item__price');
    const category = document.querySelector('.overview__category');
    const navAmount = document.querySelector('.bottom-nav__amount--count');
    const navCartBtn = document.querySelector('.bottom-nav__btn--cart');

    itemImg.forEach(data=>data.setAttribute('src', item.imgUrl))
    // for (let i = 0; i < itemImg.length; i++) {
    //   itemImg[i].setAttribute('src', item.imgUrl);
    // }

    name.forEach(data=>data.innerText = item.name)
    // for (let i = 0; i < name.length; i++) {
    //   name[i].innerText = item.name;
    // }

    price.forEach(data=>data.innerText = item.price)
    // for (let i = 0; i < price.length; i++) {
    //   price[i].innerText = item.price;
    // }

    category.innerText = item.category;
    navCartBtn.addEventListener('click', addCart);

    let cartItem = [];

    function addCart() {
      const newItem = {
        id: new Date(),
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

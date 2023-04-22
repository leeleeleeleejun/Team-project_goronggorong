import { main } from '/footerheader/main.js';
await main();


// .get(`http://localhost:3000/api/products/${id}`)
axios
  .get(`http://localhost:3000/api/products/1`)
  .then((res) => {
    const item = res.data.product;
    console.log(item);

    const itemImg = document.querySelector('.item__img');
    const name = document.getElementsByClassName('item__name');
    const price = document.querySelector('.item__price');
    const category = document.querySelector('.overview__category');
    const navAmount = document.querySelector('.bottom-nav__amount--count');
    const navCartBtn = document.querySelector('.bottom-nav__btn--cart');

    itemImg.setAttribute('src', item.imgUrl);
    console.log(name);
    for (let i = 0; i < 2; i++) {
      name[i].innerText = item.name;
    }

    price.innerText = item.price;
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

axios
  .get('http://localhost:3000/items/:id')
  .then((res) => {
    const item = res.data;

    const itemImg = document.querySelector('.item__img');
    const name = document.querySelector('.item__name');
    const price = document.querySelector('.item__price');
    const contentImg = document.querySelector('.content__img');
    const navAmount = document.querySelector('.bottom-nav__amount--count');
    const navCartBtn = document.querySelector('.bottom-nav__btn--cart');

    itemImg.setAttribute('src', item.imgUrl);
    name.innerHTML = item.name;
    price.innerHTML = item.price;
    //상품상세이미지로 바꿔둘 것
    contentImg.setAttribute('src', item.imgUrl);

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

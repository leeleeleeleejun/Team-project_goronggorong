import { main } from '/layouts/main.js';
await main();
const sampleToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQwZjk5MDY1OTg5ZTk3NjhiYmFlMzEiLCJlbWFpbCI6InRpbUB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEyJHlZZzguZmdaSXZ3aXd2VHd4bXc3YWVtaXFHdVRsRnB4Ly9Zd0hhcFloV20xNkhQTlNTNk9tIiwiaWF0IjoxNjgyMzQ4OTk3LCJpc3MiOiJnb3Jvbmdnb3JvbmcifQ.zBvrNjv46fthbNThf-lG508x3w42VouwwCeVnQokf8w';
localStorage.setItem('userToken', sampleToken);
axios({
  method: 'get',
  headers: {
    Authorization: `Bearer ${sampleToken}`,
  },
  url: `/api`,
})
  .then((res) => res.data.info)
  .then((res) => {
    const cartadd = [];
    for (let i = 0; i < 3; i++) {
      const { imgUrl, name, price, amount } = res[i];
      const id = res[i]._id;
      cartadd.push({ id, imgUrl, name, price, amount });
    }
  });

  const itemImgWrap = document.createElement('a');
  //itemImgWrap.setAttribute('href'); // 상페이지 url 연결
  const itemImg = document.createElement('img');
  itemImg.setAttribute('class', 'item-img-wrap__item-img');
  itemImg.setAttribute('src', content.imgUrl);
  const itemInfo = document.createElement('div');
  itemInfo.setAttribute('class', 'item-info');
  const itemName = document.createElement('span');
  itemName.setAttribute('class', 'item-info__item-name');
  itemName.innerText = content.name;
  const itemPrice = document.createElement('span');
  itemPrice.setAttribute('class', 'item-info__price');
  itemPrice.innerText = `${content.price}원`;

  const amountWrap = document.createElement('div');
  amountWrap.setAttribute('class', 'cart-list__amount-wrap');
  const amount = document.createElement('div');
  amount.setAttribute('class', 'amount-wrap__amount');
  const amountNumber = document.createElement('span');
  amountNumber.innerText = content.amount;
  const increaseButton = document.createElement('button');
  increaseButton.innerText = '+';
  increaseButton.addEventListener('click', () => {
    amountNumber.innerText = ++content.amount;
    const items = JSON.parse(localStorage.getItem('cart'));
    items[id].amount = content.amount;
    localStorage.setItem('cart', JSON.stringify(items));
    if (itemCheckbox.checked) {
      totalPrice.innerHTML = Number(totalPrice.innerHTML) + content.price;
    }
  });
  const decreaseButton = document.createElement('button');
  decreaseButton.innerText = '-';
  decreaseButton.addEventListener('click', () => {
    if (Number(amountNumber.innerText) <= 1) {
      alert('수량을 확인해 주세요');
    } else {
      amountNumber.innerText = --content.amount;
      const items = JSON.parse(localStorage.getItem('cart'));
      items[id].amount = content.amount;
      localStorage.setItem('cart', JSON.stringify(items));
      if (itemCheckbox.checked) {
        totalPrice.innerHTML = Number(totalPrice.innerHTML) - content.price;
      }
    }
  });
  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('class', 'amount-wrap__delete-button');
  deleteButton.innerHTML = `<img src="/img/X-mark.png" />`;

  deleteButton.addEventListener('click', () => {
    localStorageEventHandle(id);
  });

  li.appendChild(cartItem);
  cartItem.appendChild(itemInfoWrap);
  itemInfoWrap.appendChild(itemCheckbox);
  itemInfoWrap.appendChild(itemImgWrap);
  itemImgWrap.appendChild(itemImg);
  itemInfoWrap.appendChild(itemInfo);
  itemInfo.appendChild(itemName);
  itemInfo.appendChild(itemPrice);

  cartItem.appendChild(amountWrap);
  amountWrap.appendChild(amount);
  amount.appendChild(decreaseButton);
  amount.appendChild(amountNumber);
  amount.appendChild(increaseButton);
  amountWrap.appendChild(deleteButton);
  return li;
};

const writeCartList = () => {
  const localStorageCart = JSON.parse(localStorage.getItem('cart'));
  cartList.innerHTML = '';
  if (localStorageCart.length <= 0) {
    cartList.innerHTML = `<li class='empty-cart'>장바구니에 담긴 상품이 없습니다.</li>
      <li class='empty-cart-img'><img src="/img/empty_cart.png"></li>`;
  }
  for (let i = 0; i < localStorageCart.length; i++) {
    cartList.appendChild(makeListItem(i, localStorageCart[i]));
  }
};

const localStorageEventHandle = (id, order = false) => {
  const localStorageCart = JSON.parse(localStorage.getItem('cart'));
  const targetItem = localStorageCart.splice(id, 1)[0];
  localStorage.setItem('cart', JSON.stringify(localStorageCart));
  console.log(JSON.parse(localStorage.getItem('cart')));
  if (order) {
    const localStorageOrders = JSON.parse(localStorage.getItem('orders'));
    if (localStorageOrders) {
      localStorage.setItem('orders', JSON.stringify([...localStorageOrders, targetItem]));
    } else {
      localStorage.setItem('orders', JSON.stringify([targetItem]));
    }
  } else {
    totalPrice.innerHTML = 0;
  }
  writeCartList();
};

choiceDeleteBtn.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const deleteTarget = [...checkboxes].filter((item) => item.checked);

  if (deleteTarget.length > 0) {
    for (let i = deleteTarget.length - 1; i >= 0; i--) {
      console.log(deleteTarget[i]);
      localStorageEventHandle(deleteTarget[i].id);
    }
  } else {
    alert('선택된 제품이 없습니다.');
  }
});

allDeleteBtn.addEventListener('click', () => {
  localStorage.setItem('cart', JSON.stringify([]));
  totalPrice.innerHTML = 0;
  writeCartList();
});

choiceOrder.addEventListener('click', (e) => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const orderTarget = [...checkboxes].filter((item) => item.checked);
  if (orderTarget.length > 0) {
    if (localStorage.getItem('userToken')) {
      for (let i = orderTarget.length - 1; i >= 0; i--) {
        localStorageEventHandle(orderTarget[i].id, 'order');
      }
      localStorage.setItem(
        'orders',
        JSON.stringify([JSON.parse(localStorage.getItem('orders')), totalPrice.innerHTML]),
      );
    } else {
      e.preventDefault();
      alert('로그인이 필요합니다.');
      window.location.href = '/signin';
    }
  } else {
    alert('선택된 제품이 없습니다.');
    e.preventDefault();
    return;
  }
});

    choiceDeleteBtn.addEventListener('click', () => {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      const deleteTarget = [...checkboxes].filter((item) => item.checked);
      if (deleteTarget.length > 0) {
        for (let i = deleteTarget.length - 1; i >= 0; i--) {
          localStorageEventHandle(deleteTarget[i].id);
        }
      } else {
        alert('선택된 제품이 없습니다.');
      }
    });

    allDeleteBtn.addEventListener('click', () => {
      localStorage.setItem('cart', JSON.stringify([]));
      totalPrice.innerHTML = 0;
      writeCartList();
    });

    choiceOrder.addEventListener('click', (e) => {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      const orderTarget = [...checkboxes].filter((item) => item.checked);
      if (orderTarget.length > 0) {
        for (let i = orderTarget.length - 1; i >= 0; i--) {
          localStorageEventHandle(orderTarget[i].id, 'order');
        }
        localStorage.setItem(
          'orders',
          JSON.stringify([JSON.parse(localStorage.getItem('orders')), totalPrice.innerHTML]),
        );
      } else {
        alert('선택된 제품이 없습니다.');
        e.preventDefault();
        return;
      }
    });

    allOrderBtn.addEventListener('click', (e) => {
      let total = 0;
      const localStorageCart = JSON.parse(localStorage.getItem('cart'));
      [...localStorageCart].forEach((item) => (total += item.price * item.amount));
      localStorage.setItem('orders', JSON.stringify([localStorageCart, total]));
      localStorage.setItem('cart', JSON.stringify([]));
    } else {
      e.preventDefault();
      alert('로그인이 필요합니다.');
      window.location.href = '/signin';
    }
  } else {
    alert('선택된 제품이 없습니다.');
    e.preventDefault();
    return;
  }
});

writeCartList();

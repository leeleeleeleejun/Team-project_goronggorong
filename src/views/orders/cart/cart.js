//import axios from 'axios';

localStorage.setItem(
  'cart',
  JSON.stringify([
    {
      img: './test.jpg',
      name: '방석',
      price: 2000,
      amount: 3,
    },
    {
      img: './test.jpg',
      name: '웅',
      price: 4000,
      amount: 2,
    },
    {
      img: './test.jpg',
      name: 'sdf',
      price: 6000,
      amount: 2,
    },
  ]),
);

const cartList = document.querySelector('#cart-list');
const totalPrice = document.querySelector('#total-price');
const choiceOrder = document.querySelector('#choice-order');
const choiceDeleteBtn = document.querySelector('#choice-delete');
const allDeleteBtn = document.querySelector('#all-delete');
const allOrderBtn = document.querySelector('#all-order');
const lastOrderBtn = document.querySelector('#last-order-button');

const makeItem = (id, content) => {
  //itemInfo = JSON.parse(itemInfo);
  const li = document.createElement('li');
  li.setAttribute('class', 'cart-list__cart-item-wrap');
  const cartItem = document.createElement('div');
  cartItem.setAttribute('class', 'cart-item-wrap__cart-item');
  const itemInfoWrap = document.createElement('div');
  itemInfoWrap.setAttribute('class', 'cart-item__item-info-wrap');
  const itmeCheckbox = document.createElement('input');
  itmeCheckbox.setAttribute('type', 'checkbox');
  itmeCheckbox.setAttribute('class', 'item-info-wrap__itme-checkbox');
  itmeCheckbox.setAttribute('id', id);

  const itemImgWrap = document.createElement('a');
  //itemImgWrap.setAttribute('href'); // 상페이지 url 연결
  const itemImg = document.createElement('img');
  itemImg.setAttribute('class', 'item-img-wrap__item-img');
  itemImg.setAttribute('src', content.img);
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
    totalPrice.innerHTML = Number(totalPrice.innerHTML) + content.price;
    localStorage.setItem(id, JSON.stringify(content));
  });
  const decreaseButton = document.createElement('button');
  decreaseButton.innerText = '-';
  decreaseButton.addEventListener('click', () => {
    if (Number(amountNumber.innerText) <= 1) {
      alert('수량을 확인해 주세요');
    } else {
      amountNumber.innerText = ++content.amount;
      totalPrice.innerHTML = Number(totalPrice.innerHTML) - content.price;
      localStorage.setItem(id, JSON.stringify(content));
    }
  });
  const delelteButton = document.createElement('button');
  delelteButton.setAttribute('class', 'amount-wrap__delete-button');
  delelteButton.innerText = 'X';

  delelteButton.addEventListener('click', () => {
    deleteHandle(id);
  });

  li.appendChild(cartItem);
  cartItem.appendChild(itemInfoWrap);
  itemInfoWrap.appendChild(itmeCheckbox);
  itemInfoWrap.appendChild(itemImgWrap);
  itemImgWrap.appendChild(itemImg);
  itemInfoWrap.appendChild(itemInfo);
  itemInfo.appendChild(itemName);
  itemInfo.appendChild(itemPrice);

  cartItem.appendChild(amountWrap);
  amountWrap.appendChild(amount);
  amount.appendChild(increaseButton);
  amount.appendChild(amountNumber);
  amount.appendChild(decreaseButton);
  amount.appendChild(delelteButton);
  return li;
};
const writeCartList = () => {
  cartList.innerHTML = '';
  totalPrice.innerHTML = 0;
  const items = JSON.parse(localStorage.getItem('cart'));
  for (let i = 0; i < items.length; i++) {
    cartList.appendChild(makeItem(i, items[i]));
    totalPrice.innerHTML = Number(totalPrice.innerHTML) + items[i].price * items[i].amount;
  }
};

const deleteHandle = (id) => {
  let items = JSON.parse(localStorage.getItem('cart'));
  items.splice(id, 1);
  localStorage.setItem('cart', JSON.stringify(items));
  writeCartList();
};

choiceDeleteBtn.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const deleteTarget = [...checkboxes].filter((item) => item.checked);
  for (let i = deleteTarget.length - 1; i >= 0; i--) {
    deleteHandle(deleteTarget[i].id);
  }
});

allDeleteBtn.addEventListener('click', () => {
  localStorage.setItem('cart', JSON.stringify([]));
  writeCartList();
});

choiceOrder.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const orderTarget = [...checkboxes].filter((item) => item.checked);
  console.log('a');
  for (let i = orderTarget.length - 1; i >= 0; i--) {
    deleteHandle(orderTarget[i].id);
  }
});

allOrderBtn.addEventListener('click', () => {
  localStorage.setItem('cart', JSON.stringify([]));
  writeCartList();
});

window.onload = writeCartList();

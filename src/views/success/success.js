import { main } from '/layouts/main.js';
import callApi from 'layouts/callApi';

async function load() {
  try {
    await main();
    callApi('GET', '/orders/payment/success');
    const { name, phone, address, requestMessage, paymentType, totalPrice } = JSON.parse(
      localStorage.getItem('deliveryInfo'),
    );
    const receiverName = document.querySelector('.receiver-name');
    const receiverAddress = document.querySelector('.receiver-address');
    const receiverPhone = document.querySelector('.receiver-phone');
    const receiverRequest = document.querySelector('.receiver-request');
    const totalPriceNumber = document.querySelector('.total-price');
    const paymentTypeEl = document.querySelector('.payment-type');
    receiverName.textContent = name;
    receiverAddress.textContent = address;
    receiverPhone.textContent = phone;
    receiverRequest.textContent = requestMessage;
    totalPriceNumber.textContent = totalPrice;
    paymentTypeEl.textContent = paymentType === 'account' ? '무통장입금' : '카드';
  } catch (err) {
    alert(err);
  }

  const deleteLocalStorage = () => {
    localStorage.removeItem('deliveryInfo');
  };

  document.querySelector('.go-my-page').addEventListener('click', deleteLocalStorage);
  document.querySelector('.go-main-page').addEventListener('click', deleteLocalStorage);
}

load();

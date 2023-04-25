import { main } from '/layouts/main.js';
await main();

const sampleToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQwZjk5MDY1OTg5ZTk3NjhiYmFlMzEiLCJlbWFpbCI6InRpbUB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEyJHlZZzguZmdaSXZ3aXd2VHd4bXc3YWVtaXFHdVRsRnB4Ly9Zd0hhcFloV20xNkhQTlNTNk9tIiwiaWF0IjoxNjgyMzQ4OTk3LCJpc3MiOiJnb3Jvbmdnb3JvbmcifQ.zBvrNjv46fthbNThf-lG508x3w42VouwwCeVnQokf8w';

async function load() {
  const checkToken = await axios({
    method: 'GET',
    url: '/orders/payment/success',
    headers: {
      Authorization: `Bearer ${sampleToken}`,
    },
  })
    .then(() => {
      const { name, phone, address, requestMessage, paymentType, totalPrice } = JSON.parse(
        localStorage.getItem('deliveryInfo'),
      );
      const receiverName = document.querySelector('.receiver-name');
      const receiverAddress = document.querySelector('.receiver-address');
      const receiverPhone = document.querySelector('.receiver-phone');
      const receiverRequest = document.querySelector('.receiver-request');
      const totalPriceNumber = document.querySelector('.total-price');
      const paymentTypeEl = document.querySelector('.payment-type');
      receiverName.innerHTML = name;
      receiverAddress.innerHTML = address;
      receiverPhone.innerHTML = phone;
      receiverRequest.innerHTML = requestMessage;
      totalPriceNumber.innerHTML = totalPrice;
      paymentTypeEl.innerHTML = paymentType === 'account' ? '무통장입금' : '카드';
    })
    .catch((err) => alert(err));
  const deleteLocalStorage = () => {
    localStorage.removeItem('deliveryInfo');
  };

  const goMyPage = document.querySelector('.go-my-page');
  const goMainPage = document.querySelector('.go-main-page');
  goMyPage.addEventListener('click', deleteLocalStorage);
  goMainPage.addEventListener('click', deleteLocalStorage);
}

load();

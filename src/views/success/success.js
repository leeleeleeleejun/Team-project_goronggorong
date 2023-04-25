import { main } from '/layouts/main.js';
await main();

async function load() {
  const checkToken = await axios({
    method: 'GET',
    url: '/api',
    // headers: {
    //   Authorization: `Bearer ${token.data.access_token}`,
    // },
  }).catch();
  const orderInfo = await axios({
    method: 'GET',
    url: '/api',
  })
    .then((res) => {
      // const { receiver, paymentMethod, totalPrice } = res.data.info;
      // const userName = document.querySelector('.user-name');
      // const receiverName = document.querySelector('.receiver-name');
      // const receiverAddress = document.querySelector('.receiver-address');
      // const receiverPhone = document.querySelector('.receiver-phone');
      // const receiverRequest = document.querySelector('.receiver-request');
      // const totalPriceNumber = document.querySelector('.total-price');
      // const paymentType = document.querySelector('.payment-type');
      // userName.innerHTML = res.data.info.name;
      // receiverName.innerHTML = receiver.name;
      // receiverAddress.innerHTML = receiver.address;
      // receiverPhone.innerHTML = receiver.Phone;
      // receiverRequest.innerHTML = receiver.requestMessage;
      // totalPriceNumber.innerHTML = totalPrice;
      // paymentType.innerHTML = paymentMethod.paymentType;
    })
    .catch();
}

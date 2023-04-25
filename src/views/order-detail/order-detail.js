import axios from 'axios';
import { main } from '/layouts/main.js';
await main();

async function load() {
  const _id = '6446bd564ea5cb3885295803';
  const sampleToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQwZjk5MDY1OTg5ZTk3NjhiYmFlMzEiLCJlbWFpbCI6InRpbUB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEyJHlZZzguZmdaSXZ3aXd2VHd4bXc3YWVtaXFHdVRsRnB4Ly9Zd0hhcFloV20xNkhQTlNTNk9tIiwiaWF0IjoxNjgyMzQ4OTk3LCJpc3MiOiJnb3Jvbmdnb3JvbmcifQ.zBvrNjv46fthbNThf-lG508x3w42VouwwCeVnQokf8w';
  const orderInfo = await axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${sampleToken}`,
    },
    url: `/api/orders/${_id}`,
  }).then((res) => res.data.info);

  console.log(orderInfo);
  const { orderId, orderDate, deliveryStatus, paymentMethod, products, receiver, totalPrice } = orderInfo;
  const itemInfoWrap = document.querySelector('.item-info-wrap');

  await products.forEach((item) => {
    itemInfoWrap.innerHTML += `<li class="item-info">
    <img src="${item.id.img}" />
    <div>
      <span>제품명: ${item.id.name}</span>
      <span>수량: ${item.amount}</span>
      <span> 금액:${item.id.price * item.id.amount}</span>
    </div>
  </li>`;
  });
  const orderIdEl = document.querySelector('.order-id');
  orderIdEl.innerHTML = orderId;
  const orderDateEl = document.querySelector('.order-date');
  const orderStatusEl = document.querySelector('.order-status');
  orderDateEl.innerHTML = orderDate;
  orderStatusEl.innerHTML = deliveryStatus;
  const totalPriceNumber = document.querySelector('.total-price');
  totalPriceNumber.innerHTML = totalPrice;
  const paymentType = document.querySelector('.payment-type');
  paymentType.innerHTML = paymentMethod.paymentType;
  const receiverName = document.querySelector('.receiver-name');
  const receiverAddress = document.querySelector('.receiver-address');
  const receiverPhone = document.querySelector('.receiver-phone');
  const receiverRequest = document.querySelector('.receiver-request');
  receiverName.innerHTML = receiver.name;
  receiverAddress.innerHTML = receiver.address;
  receiverPhone.innerHTML = receiver.phone;
  receiverRequest.innerHTML = receiver.requestMessage;

  const cancelOrder = document.querySelector('.cancel-order');
  cancelOrder.addEventListener('click', () => {
    axios({
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${sampleToken}`,
      },
      url: `/api/orders/${_id}`,
      data: { ...orderInfo, deliveryStatus: '취소완료' },
    })
      .then(alert('취소가 완료 되었습니다.'))
      .catch((err) => alert(err));
  });
}
load();

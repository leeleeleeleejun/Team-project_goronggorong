//헤더푸터 불러오기
import { main } from '/layouts/main.js';
await main();

<<<<<<< HEAD
const username = document.querySelector('.user__name');
// user__signout
// state
// state__1
// state__2
// state__3
// state__4
// state__5
// preview__top--date
// preview__top--orderid
// preview__state
// preview__info--img
// preview__info--title
// preview__info--others
// preview__info--count
// preview__info--price
// preview__btn--detail

=======
//로그아웃 로직
const signout = document.querySelector('.user__signout');
signout.addEventListener('click', function () {
  localStorage.removeItem('userToken');
  alert('로그아웃 되었습니다.');
});

//배송 status 로직
const state1 = document.querySelector('.state__1');
const state2 = document.querySelector('.state__2');
const state3 = document.querySelector('.state__3');
const state4 = document.querySelector('.state__4');
const state5 = document.querySelector('.state__5');
const state6 = document.querySelector('.state__6');
const state = [state1, state2, state3, state4, state5, state6];
let status = [0, 0, 0, 0, 0, 0];

const userToken = localStorage.getItem('userToken');
>>>>>>> e7f5ec8 (Fix: 마이페이지 수정)
const sampleToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQwZjk5MDY1OTg5ZTk3NjhiYmFlMzEiLCJlbWFpbCI6InRpbUB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEyJHlZZzguZmdaSXZ3aXd2VHd4bXc3YWVtaXFHdVRsRnB4Ly9Zd0hhcFloV20xNkhQTlNTNk9tIiwiaWF0IjoxNjgyMzQ4OTk3LCJpc3MiOiJnb3Jvbmdnb3JvbmcifQ.zBvrNjv46fthbNThf-lG508x3w42VouwwCeVnQokf8w';

axios({
  method: 'get',
  url: '/api/orders/selected-user',
  //유저 토큰 확인
  headers: {
    Authorization: `Bearer ${sampleToken}`,
  },
})
  .then((res) => {
    const orders = res.data.info;
    orders.forEach((order) => {
      console.log(order.deliveryStatus);
      const username = document.querySelector('.user__name');
      username.innerText = order.user.name;
      //배송 상태
      if (order.deliveryStatus === '입금대기') {
        status[0] += 1;
      }
      if (order.deliveryStatus === '결제완료') {
        status[1] += 1;
      }
      if (order.deliveryStatus === '배송준비중') {
        status[2] += 1;
      }
      if (order.deliveryStatus === '배송중') {
        status[3] += 1;
      }
      if (order.deliveryStatus === '배송완료') {
        status[4] += 1;
      }
      if (order.deliveryStatus === '주문취소') {
        status[5] += 1;
      }
      for (let i = 0; i < 6; i++) {
        state[i].innerText = status[i];
      }

      //order preview 생성
      const orderList = document.querySelector('.order');
      orderList.innerHTML += createOrderPreview(order);
    });
  })
  .catch((err) => {
    alert(err.message);
  });

const createOrderPreview = (order) => {
  return `
    <div class="order__preview">
          <div class="preview__top">
            <p class="preview__top--date">${order.orderDate}</p>
            <p class="preview__top--orderid">${order.orderId}</p>
          </div>
          <div class="preview__bottom">
            <h2 class="preview__state">${order.deliveryStatus}</h2>
            <div class="preview__info-container">
              <img width="100px" class="preview__info--img" src="${order.products[0].id.imgUrl}"/>
              <div class="preview__info">
                <p class="preview__info--title">${order.products[0].id.name}</p>
                <p>외 <strong class="preview__info--others">${order.totalCase - 1}</strong>건</p>
                <!-- <p><strong class="preview__info--count">${order.products[0].id.amount}</strong>개</p> -->
                </div>
                <h2>총 <strong class="preview__info--price">${order.totalPrice}</strong>원</h2>
              </div>
              <a class="preview__btn--detail" href="/orders/${order._id}">주문 상세</a>
            </div>
          </div>
          `;
};

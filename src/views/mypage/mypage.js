//헤더푸터 불러오기
import { main } from '/layouts/main.js';
await main();

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
axios({
  method: 'get',
  url: '/api/auth/get-user-info',
  //유저 토큰 확인
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
}).then((res) => {
  const username = document.querySelector('.user__name');
  username.innerText = res.data.info.name;
});

axios({
  method: 'get',
  url: '/api/orders/user/order-list',
  //유저 토큰 확인
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
})
  .then((res) => {
    if (res.status === 200) {
      const orders = res.data.info;
      orders.forEach((order) => {
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
    }
    //주문내역이 없는 경우
    if (res.status === 404) {
      for (let i = 0; i < 6; i++) {
        state[i].innerText = status[i];
      }
    }
  })
  .catch((err) => {
    alert(err.response.data.message);
  });

const createOrderPreview = (order) => {
  const orderDate = order.orderDate;
  const getDate = dayjs(orderDate).format('YYYY년 MM월 DD일 HH:mm:ss');

  return `
    <div class="order__preview">
          <div class="preview__top">
            <p class="preview__top--date">${getDate}</p>
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

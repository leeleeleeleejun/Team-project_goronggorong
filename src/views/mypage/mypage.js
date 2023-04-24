import { main } from '/layouts/main.js';
await main();

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

const sampleToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQwZjk5MDY1OTg5ZTk3NjhiYmFlMzEiLCJlbWFpbCI6InRpbUB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEyJHlZZzguZmdaSXZ3aXd2VHd4bXc3YWVtaXFHdVRsRnB4Ly9Zd0hhcFloV20xNkhQTlNTNk9tIiwiaWF0IjoxNjgyMzQ4OTk3LCJpc3MiOiJnb3Jvbmdnb3JvbmcifQ.zBvrNjv46fthbNThf-lG508x3w42VouwwCeVnQokf8w';

axios({
  method: 'get',
  url: '/api/orders/user/6440f99065989e9768bbae31',
  //유저 토큰 확인
  headers: {
    Authorization: `Bearer ${sampleToken}`,
    // Authorization: `Bearer ${token.data.access_token}`,
  },
})
  .then((res) => {
    const orders = res.data.info;
    username.innerText = orders[0].user.name;
    console.log(res.data.info);
  })
  .catch((err) => {
    alert(err.message);
  });

// <div class="order__preview">
//           <div class="preview__top">
//             <p class="preview__top--date">2023.04.19</p>
//             <p class="preview__top--orderid">1234</p>
//           </div>
//           <div class="preview__bottom">
//             <h2 class="preview__state">배송준비중</h2>
//             <div class="preview__info-container">
//               <img width="100px" class="preview__info--img" src="https://cdudsyowwnmx6388661.cdn.ntruss.com/aboutPet/images/goods/GI251031450/b27ed4e6-5e38-442e-bde8-9e8be1c36138.jpg?type=f&w=259&h=259&quality=90&align=4"/>
//               <div class="preview__info">
//                 <p class="preview__info--title">캐티맨 카샤카샤 붕붕</p>
//                 <p>외 <strong class="preview__info--others">5</strong>건</p>
//                 <p><strong class="preview__info--count">1</strong>개</p>
//                 <h2><strong class="preview__info--price">4,800</strong>원</h2>
//               </div>
//               <button class="preview__btn--detail">주문 상세</button>
//             </div>
//           </div>

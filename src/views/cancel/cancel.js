import { main } from '/layouts/main.js';
await main();
await main();

// const userToken = localStorage.getItem('userToken');
// axios.get(`/${userToken}`).then((res) => {
//   // 유저 정보 받기
// });

const goCancel = document.querySelector('go-cancel');
const stopCancel = document.querySelector('stop-cancel');

goCancel.addEventListener('click', () => {
  //나의 정보 페이지 이동
});
stopCancel.addEventListener('click', () => {
  //주문 취소완료 페이지 이동
});

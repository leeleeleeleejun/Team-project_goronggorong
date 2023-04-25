const pw = document.querySelector('.form__pw');
const submit = document.querySelector('.form__submit');

submit.addEventListener('click', function (e) {
  e.preventDefault();
  axios
    .get('/api/mypage/check-valid-user')
    .then((res) => {
      if (res.status === 201) {
        //회원정보수정 페이지로 이동
        window.location.href = '/mypage/edit-user-info';
      }
    })
    .catch((err) => {
      alert(err.message);
    });
});

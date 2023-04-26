const pw = document.querySelector('.form__pw');
const submit = document.querySelector('.form__submit');

submit.addEventListener('click', function (e) {
  e.preventDefault();
  const userToken = localStorage.getItem('userToken');
  axios({
    method: 'post',
    url: '/api/mypage/check-valid-user',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    data: {
      password: pw.value,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        //회원정보수정 페이지로 이동
        window.location.href = '/mypage/edit-user-info';
      }
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
});

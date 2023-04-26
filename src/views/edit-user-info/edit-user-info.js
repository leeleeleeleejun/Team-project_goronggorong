const userName = document.querySelector('.form__name');
const id = document.querySelector('.form__id');
const pw = document.querySelector('.form__pw');
const phone = document.querySelector('.form__phone');
const address = document.querySelector('.form__address');
const submitBtn = document.querySelector('.form__submit');
const deleteBtn = document.querySelector('.delete-btn');

//회원정보 업데이트
const userToken = localStorage.getItem('userToken');

submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  axios({
    method: 'put',
    url: '/api/mypage/edit-user-info',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    data: {
      name: userName.value,
      email: id.value,
      password: pw.value,
      phone: phone.value,
      address: address.value,
    },
  })
    .then((res) => {
      if (res.status === 201) {
        alert(`
        회원정보가 수정되었습니다.`);
        //로그인페이지로 이동
        window.location.href = '/mypage';
      }
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
});

//회원탈퇴 로직
deleteBtn.addEventListener('click', function () {
  if (confirm('탈퇴하시겠습니까?')) {
    axios({
      method: 'delete',
      url: '/api/mypage/delete-user-info',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          window.alert(`탈퇴되었습니다`);
          localStorage.removeItem('userToken');
          window.location.href = '/';
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }
});

const userName = document.querySelector('.form__name');
const id = document.querySelector('.form__id');
const pw = document.querySelector('.form__pw');
const phone = document.querySelector('.form__phone');
const address = document.querySelector('.form__address');
const submitBtn = document.querySelector('.form__submit');

submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  axios
    .post('/api/signup', {
      name: userName.value,
      email: id.value,
      password: pw.value,
      phone: phone.value,
      address: address.value,
    })
    .then((res) => {
      if (res.status === 201) {
        alert(`
        성공적으로 회원가입되었어요🎉
        로그인 페이지로 이동합니다.`);
        //로그인페이지로 이동
        window.location.href = '/signin';
      }
    });
});

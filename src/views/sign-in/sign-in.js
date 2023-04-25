const id = document.querySelector('.form__id');
const pw = document.querySelector('.form__pw');
const submitBtn = document.querySelector('.form__submit');

submitBtn.addEventListener('click', function (e) {
  e.preventDefault();

  axios
    .post('/api/signin', {
      email: id.value.trim(),
      password: pw.value.trim(),
    })
    .then((res) => {
      if (res.status === 200) {
        localStorage.setItem('userToken', res.data.token);
      }
      window.location.href = '/';
    })
    .catch((err) => {
      alert(err.message);
    });
});

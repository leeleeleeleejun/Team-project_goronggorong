const form = document.querySelector('.sign__form');
const id = document.querySelector('.form__id');
const pw = document.querySelector('.form__pw');

// pw.addEventListener('paste',function(e){
//   e.preventDefault()
//   const clipboardData = e.clipboardData || window.clipboardData;
//   var pastedData = clipboardData.getData('text');
//   pw.value = pastedData;
// })

form.addEventListener('submit', function (e) {
  e.preventDefault();

  axios
    .post('/signin', {
      email: id.value.trim(),
      password: pw.value.trim(),
    })
    .then((res) => {
      if (res.info === 200) {
        localStorage.setItem('userToken', res.data);
      }
    });
});

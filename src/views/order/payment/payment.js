//import axios from 'axios';
//import axios from 'axios';
import { main } from '/src/views/public/js/main.js';
await main();

const deliveryInfo = {
  deliveryImfoWrap: document.querySelector('.delivery-info'),
  deliveryAdressName: document.querySelector('.delivery-adress-name'),
  deliveryAdress: document.querySelector('.delivery-adress'),
  deliveryTargetName: document.querySelector('.delivery-target-name'),
  deliveryTargetPhone: document.querySelector('.delivery-target-phone'),
};

//유저 정보 불러오기
axios({
  method: 'get',
  url: 'https://c30c061a-143f-42e2-a024-aea45621a3ca.mock.pstmn.io/list',
  responseType: 'json',
}).then(function (response) {
  const userName = document.querySelector('.user-name');
  const userPhone = document.querySelector('.user-phone');
});

const useVirtualAccount = document.querySelector('.use-virtual-account');
const useCard = document.querySelector('.use-card');
const cardInfo = document.querySelector('.card-info');
const virtualAccountInfo = document.querySelector('.virtual-account-info');

const reqBody = (() => {
  const value = {
    userId: '',
    address: '',
    deliveryMessage: '',
    //products: [{ product_id, amount }],
    totalPrice: '',
    paymentMethod: '',
    paymentType: '',
    card: '',
    creditInfo: '',
    company: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  };
  const getValue = () => {
    return value;
  };
  const setValue = (taget, change) => {
    return (value[taget] = change);
  };
  return { getValue, setValue };
})();

const inputNumberTypeCheck = (event, middleFnc) => {
  // 입력된 값에서 공백을 제거
  let targetNumber = event.target.value.replace(/\s/g, '');
  // 입력된 값이 숫자로만 이루어져 있는지 확인
  if (!/^\d*$/.test(targetNumber)) {
    targetNumber = targetNumber.replace(/[^\d]/g, '');
  }
  targetNumber = middleFnc(targetNumber);
  // 입력된 값을 다시 input 태그에 설정
  event.target.value = targetNumber.trim();
};

useVirtualAccount.addEventListener('change', () => {
  virtualAccountInfo.classList.add('open');
  cardInfo.classList.remove('open');
  reqBody.setValue('paymentType', 'useVirtualAccount');
});

useCard.addEventListener('change', () => {
  cardInfo.classList.add('open');
  virtualAccountInfo.classList.remove('open');

  const cardNumber = document.querySelector('.card-number');
  cardNumber.addEventListener('input', (e) => {
    inputNumberTypeCheck(e, (targetNumber) => {
      // 숫자 4자리마다 공백을 삽입
      targetNumber = targetNumber.replace(/(.{4})/g, '$1 ');
      return targetNumber;
    });
  });

  const expirDate = document.querySelector('.expir-date');
  expirDate.addEventListener('input', (e) => {
    inputNumberTypeCheck(e, (targetNumber) => {
      // 숫자 4자리마다 공백을 삽입
      targetNumber = targetNumber.replace(/(.{2})/g, '$1 ');
      return targetNumber;
    });
  });

  const cvcNumber = document.querySelector('.cvc-number');
  cvcNumber.addEventListener('input', (e) => {
    inputNumberTypeCheck(e, (targetNumber) => {
      return targetNumber;
    });
  });

  const nameOnCard = document.querySelector('.name-on-card');
  nameOnCard.addEventListener('input', (e) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z]/gi, '');
  });

  reqBody.setValue('card', 'useCard');
  reqBody.setValue('creditInfo', 'useCard');
  reqBody.setValue('company', 'useCard');
  reqBody.setValue('cardNumber', 'useCard');
  reqBody.setValue('expiryDate', 'useCard');
  reqBody.setValue('cvc', 'useCard');
});

const deliveryRequestOption = document.querySelector('.delivery-request-option');
deliveryRequestOption.addEventListener('change', (e) => {
  reqBody.setValue('deliveryMessage', e.target.value);
});

const changeDeliveryInfoBtn = document.querySelector('#change-delivery-info-btn');
changeDeliveryInfoBtn.addEventListener('click', (e) => {
  e.currentTarget.classList.toggle('change');

  const changeDeliveryInfo = document.querySelector('.change-delivery-info');
  const changeDeliveryAdressName = document.querySelector('.change-delivery-adress-name');
  const changeDeliveryTargetName = document.querySelector('.change-delivery-target-name');
  const changeDeliveryTargetPhone = document.querySelector('.change-delivery-target-phone');
  const changeDeliveryAdressWrap = document.querySelector('.change-delivery-adress');
  const changeDeliveryAdress = [...changeDeliveryAdressWrap.children]
    .filter((item) => item.tagName === 'INPUT')
    .map((item) => item.value)
    .join(' ');
  console.log(changeDeliveryAdress);
  changeDeliveryTargetPhone.addEventListener('input', (e) => {
    inputNumberTypeCheck(e, (targetNumber) => {
      return targetNumber;
    });
  });
  if (e.currentTarget.className === 'change') {
    deliveryInfo.deliveryImfoWrap.classList.add('close');
    changeDeliveryInfo.classList.remove('close');
    e.currentTarget.innerHTML = '완료';
  } else {
    deliveryInfo.deliveryImfoWrap.classList.remove('close');
    changeDeliveryInfo.classList.add('close');
    e.currentTarget.innerHTML = '배송지 변경';
    // 입력값이 비울 경우 기존의 데이터 삽입
    deliveryInfo.deliveryAdressName.innerHTML = changeDeliveryAdressName.value.length
      ? changeDeliveryAdressName.value
      : deliveryInfo.deliveryAdressName.innerHTML;
    deliveryInfo.deliveryAdress.innerHTML = changeDeliveryAdress.length
      ? changeDeliveryAdress
      : deliveryInfo.deliveryAdress.innerHTML;
    deliveryInfo.deliveryTargetName.innerHTML = changeDeliveryTargetName.value.length
      ? changeDeliveryTargetName.value
      : deliveryInfo.deliveryTargetName.innerHTML;
    deliveryInfo.deliveryTargetPhone.innerHTML = changeDeliveryTargetPhone.value.length
      ? changeDeliveryTargetPhone.value
      : deliveryInfo.deliveryTargetPhone.innerHTML;
  }
});

const paymentBtn = document.querySelector('.payment-btn');
paymentBtn.addEventListener('click', () => {
  const result = reqBody.getValue();

  axios({
    method: 'get',
    url: 'https://c30c061a-143f-42e2-a024-aea45621a3ca.mock.pstmn.io/list',
    responseType: 'json',
  }).then(function (response) {
    console.log(response);
  });
});

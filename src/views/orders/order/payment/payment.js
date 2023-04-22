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
  const deliveryImfoWrap = document.querySelector('.delivery-info');
  const deliveryAdressName = document.querySelector('.delivery-adress-name');
  const deliveryAdress = document.querySelector('.delivery-adress');
  const deliveryTargetName = document.querySelector('.delivery-target-name');
  const deliveryTargetPhone = document.querySelector('.delivery-target-phone');

  const changeDeliveryInfo = document.querySelector('.change-delivery-info');
  const changeDeliveryAdressName = document.querySelector('.change-delivery-adress-name');
  const changeDeliveryAdress = document.querySelector('.change-delivery-adress');
  const changeDeliveryTargetName = document.querySelector('.change-delivery-target-name');
  const changeDeliveryTargetPhone = document.querySelector('.change-delivery-target-phone');
  changeDeliveryTargetPhone.addEventListener('input', (e) => {
    inputNumberTypeCheck(e, (targetNumber) => {
      return targetNumber;
    });
  });
  if (e.currentTarget.className === 'change') {
    deliveryImfoWrap.classList.add('close');
    changeDeliveryInfo.classList.remove('close');
    e.currentTarget.innerHTML = '완료';
  } else {
    deliveryImfoWrap.classList.remove('close');
    changeDeliveryInfo.classList.add('close');
    e.currentTarget.innerHTML = '배송지 변경';
    // 입력값이 비울 경우 기존의 데이터 삽입
    deliveryAdressName.innerHTML = changeDeliveryAdressName.value.length
      ? changeDeliveryAdressName.value
      : deliveryAdressName.innerHTML;
    deliveryAdress.innerHTML = changeDeliveryAdress.value.length
      ? changeDeliveryAdressName.value
      : deliveryAdress.innerHTML;
    deliveryTargetName.innerHTML = changeDeliveryTargetName.value.length
      ? changeDeliveryTargetName.value
      : deliveryTargetName.innerHTML;
    deliveryTargetPhone.innerHTML = changeDeliveryTargetPhone.value.length
      ? changeDeliveryTargetPhone.value
      : deliveryTargetPhone.innerHTML;
  }
});

const paymentBtn = document.querySelector('.payment-btn');
paymentBtn.addEventListener('click', () => {
  const result = reqBody.getValue();
  console.log(result);
});

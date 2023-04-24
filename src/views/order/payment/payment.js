import { main } from '/src/views/public/js/main.js';
await main();

axios
  .get('https://c30c061a-143f-42e2-a024-aea45621a3ca.mock.pstmn.io/list', {
    // headers: {
    //   Authorization: 'Bearer ' + localStorage.getItem('userToken'),
    // },
  })
  .then((res) => {
    console.log(res);
    const { name, email, phone, address } = res.data;
    const userName = document.querySelector('.user-name');
    const userPhone = document.querySelector('.user-phone');
    // 회원정보를 기본 배송지로 설정
    userName.innerHTML = name;
    userPhone.innerHTML = phone;
    deliveryInfo.deliveryAddress.innerHTML = address;
    deliveryInfo.deliveryTargetName.innerHTML = name;
    deliveryInfo.deliveryTargetPhone.innerHTML = phone;

    reqBody.setValue('userId', email);
    reqBody.setValue('receiver', { ...reqBody.getValue().receiver, name: name });
    reqBody.setValue('receiver', { ...reqBody.getValue().receiver, phone: phone });
    reqBody.setValue('receiver', { ...reqBody.getValue().receiver, address: address });
    reqBody.setValue('receiver', { ...reqBody.getValue().receiver, requestMessage: deliveryRequestOption.value });
  })
  .catch((error) => console.error(error));

const navCate = document.querySelector('.nav__cate');
[...navCate.children].forEach((navItem) => {
  navItem.addEventListener('click', (e) => {
    const result = confirm(`이동 시 주문내역이 사라집니다.
이동하시겠습니까?`);
    if (!result) {
      e.preventDefault();
    }
  });
});

// 결제완료 시 서버에 보낼 데이터
const reqBody = (() => {
  const OrderSchema = {
    orderId: {},
    userId: {},
    receiver: {
      name: {},
      phone: {},
      address: {},
      requestMessage: {},
    },

    products: [
      {
        id: {},
        amount: {},
      },
    ],
    totalPrice: {},
    paymentMethod: {
      paymentType: {
        // credit, account
      },
      creditInfo: {
        company: {},
        cardNumber: {},
        expiryDate: {},
        cvc: {},
        cardOwner: {},
      },
    },
  };
  const getValue = () => {
    return OrderSchema;
  };
  const setValue = (target, change) => {
    return (OrderSchema[target] = change);
  };
  return { getValue, setValue };
})();

const deliveryInfo = {
  deliveryInfoWrap: document.querySelector('.delivery-info'),
  deliveryAddress: document.querySelector('.delivery-address'),
  deliveryTargetName: document.querySelector('.delivery-target-name'),
  deliveryTargetPhone: document.querySelector('.delivery-target-phone'),
};

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

const useVirtualAccount = document.querySelector('.use-virtual-account');
const useCard = document.querySelector('.use-card');
const cardInfo = document.querySelector('.card-info');
const virtualAccountInfo = document.querySelector('.virtual-account-info');

useVirtualAccount.addEventListener('change', () => {
  virtualAccountInfo.classList.add('open');
  cardInfo.classList.remove('open');
  reqBody.setValue('paymentMethod', { ...reqBody.getValue().paymentMethod, paymentType: 'account' });
  reqBody.setValue('paymentMethod', {
    ...reqBody.getValue().paymentMethod,
    creditInfo: {},
  });
  console.log(reqBody.getValue);
});

useCard.addEventListener('change', () => {
  cardInfo.classList.add('open');
  virtualAccountInfo.classList.remove('open');
  reqBody.setValue('paymentMethod', { ...reqBody.getValue().paymentMethod, paymentType: 'credit' });
  const setCreditInfo = (target, change) => {
    const creditInfo = reqBody.getValue().paymentMethod.creditInfo;
    reqBody.setValue('paymentMethod', {
      ...reqBody.getValue().paymentMethod,
      creditInfo: { ...creditInfo, [target]: change },
    });
  };

  const cardNumber = document.querySelector('.card-number');
  cardNumber.addEventListener('input', (e) => {
    inputNumberTypeCheck(e, (targetNumber) => {
      // 숫자 4자리마다 공백을 삽입
      targetNumber = targetNumber.replace(/(.{4})/g, '$1 ');
      return targetNumber;
    });
    if (e.target.value.length === 19) {
      const target = e.target.value.replace(/ /g, '');
      setCreditInfo('cardNumber', target);
    }
  });

  const expirDate = document.querySelector('.expir-date');
  expirDate.addEventListener('input', (e) => {
    inputNumberTypeCheck(e, (targetNumber) => {
      // 숫자 2자리마다 공백을 삽입
      targetNumber = targetNumber.replace(/(.{2})/g, '$1 ');
      return targetNumber;
    });
    if (e.target.value.length === 5) {
      const target = e.target.value.replace(/ /g, '');
      setCreditInfo('expiryDate', target);
    }
  });

  const cvcNumber = document.querySelector('.cvc-number');
  cvcNumber.addEventListener('input', (e) => {
    inputNumberTypeCheck(e, (targetNumber) => {
      return targetNumber;
    });
    if (e.target.value.length === 3) {
      const target = e.target.value;
      setCreditInfo('cvc', target);
    }
  });

  const bank = document.querySelector('.bank');
  setCreditInfo('company', bank.value);
  bank.addEventListener('change', (e) => {
    const target = e.target.value;
    setCreditInfo('company', target);
  });

  const nameOnCard = document.querySelector('.name-on-card');
  nameOnCard.addEventListener('input', (e) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z]/gi, '');

    const target = e.target.value;
    setCreditInfo('cardOwner', target);
    console.log(reqBody.getValue());
  });
});

const deliveryRequestOption = document.querySelector('.delivery-request-option');
deliveryRequestOption.addEventListener('change', (e) => {
  reqBody.setValue('receiver', { ...reqBody.getValue().receiver, requestMessage: e.target.value });
  console.log(reqBody.getValue());
});

const changeDeliveryInfoBtn = document.querySelector('#change-delivery-info-btn');
changeDeliveryInfoBtn.addEventListener('click', (e) => {
  e.currentTarget.classList.toggle('change');

  const changeDeliveryInfo = document.querySelector('.change-delivery-info');
  const changeDeliveryTargetName = document.querySelector('.change-delivery-target-name');
  const changeDeliveryTargetPhone = document.querySelector('.change-delivery-target-phone');
  const changeDeliveryAddressWrap = document.querySelector('.change-delivery-address');
  const changeDeliveryAddress = [...changeDeliveryAddressWrap.children]
    .filter((item) => item.tagName === 'INPUT')
    .map((item) => item.value)
    .join(' ');
  changeDeliveryTargetPhone.addEventListener('input', (e) => {
    inputNumberTypeCheck(e, (targetNumber) => {
      return targetNumber;
    });
  });
  if (e.currentTarget.className === 'change') {
    deliveryInfo.deliveryInfoWrap.classList.add('close');
    changeDeliveryInfo.classList.remove('close');
    e.currentTarget.innerHTML = '완료';
  } else {
    deliveryInfo.deliveryInfoWrap.classList.remove('close');
    changeDeliveryInfo.classList.add('close');
    e.currentTarget.innerHTML = '배송지 변경';
    // 입력값이 비울 경우 기존의 데이터 삽입
    deliveryInfo.deliveryAddress.innerHTML = changeDeliveryAddress.length
      ? changeDeliveryAddress
      : deliveryInfo.deliveryAddress.innerHTML;
    deliveryInfo.deliveryTargetName.innerHTML = changeDeliveryTargetName.value.length
      ? changeDeliveryTargetName.value
      : deliveryInfo.deliveryTargetName.innerHTML;
    deliveryInfo.deliveryTargetPhone.innerHTML = changeDeliveryTargetPhone.value.length
      ? changeDeliveryTargetPhone.value
      : deliveryInfo.deliveryTargetPhone.innerHTML;
  }
});

const paymentBtn = document.querySelector('.payment-btn');

// paymentBtn.addEventListener('click', (e) => {
//   const result = reqBody.getValue();
//   e.preventDefault();
//   console.log(result);
//   axios({
//     method: 'get',
//     url: 'https://c30c061a-143f-42e2-a024-aea45621a3ca.mock.pstmn.io/list',
//     responseType: 'json',
//   }).then(function (response) {
//     console.log(response);
//   });
// });

import { main } from '/layouts/main.js';
await main();
const sampleToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQwZjk5MDY1OTg5ZTk3NjhiYmFlMzEiLCJlbWFpbCI6InRpbUB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEyJHlZZzguZmdaSXZ3aXd2VHd4bXc3YWVtaXFHdVRsRnB4Ly9Zd0hhcFloV20xNkhQTlNTNk9tIiwiaWF0IjoxNjgyMzQ4OTk3LCJpc3MiOiJnb3Jvbmdnb3JvbmcifQ.zBvrNjv46fthbNThf-lG508x3w42VouwwCeVnQokf8w';

// 결제완료 시 서버에 보낼 데이터
const reqBody = (() => {
  const OrderSchema = {
    receiver: {
      name: {},
      phone: {},
      address: {},
      requestMessage: {},
    },
    products: [],
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

const localStorageOrders = JSON.parse(localStorage.getItem('orders'));
const totalPrice = document.querySelectorAll('.total-price');
totalPrice[0].innerHTML = localStorageOrders[1];
totalPrice[1].innerHTML = localStorageOrders[1];
[...localStorageOrders[0]].forEach((item) => {
  reqBody.setValue('products', [...reqBody.getValue().products, { _id: item.id, amount: item.amount }]);
});
reqBody.setValue('totalPrice', localStorageOrders[1]);

const deliveryInfoWrap = {
  deliveryInfo: document.querySelector('.delivery-info'),
  deliveryAddress: document.querySelector('.delivery-address'),
  deliveryTargetName: document.querySelector('.delivery-target-name'),
  deliveryTargetPhone: document.querySelector('.delivery-target-phone'),
  deliveryRequestOption: document.querySelector('.delivery-request-option'),
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
const cardInfoWrap = document.querySelector('.card-info');
const virtualAccountInfo = document.querySelector('.virtual-account-info');

useVirtualAccount.addEventListener('change', () => {
  virtualAccountInfo.classList.add('open');
  cardInfoWrap.classList.remove('open');
  reqBody.setValue('paymentMethod', { ...reqBody.getValue().paymentMethod, paymentType: 'account' });
  reqBody.setValue('paymentMethod', {
    ...reqBody.getValue().paymentMethod,
    creditInfo: {},
  });
});

const cardInfoWarp = {
  cardNumber: document.querySelector('.card-number'),
  expirDate: document.querySelector('.expir-date'),
  cvcNumber: document.querySelector('.cvc-number'),
  company: document.querySelector('.bank'),
  nameOnCard: document.querySelector('.name-on-card'),
};

useCard.addEventListener('change', () => {
  cardInfoWrap.classList.add('open');
  virtualAccountInfo.classList.remove('open');
  reqBody.setValue('paymentMethod', { ...reqBody.getValue().paymentMethod, paymentType: 'card' });

  cardInfoWarp.cardNumber.addEventListener('input', (e) => {
    inputNumberTypeCheck(e, (targetNumber) => {
      // 숫자 4자리마다 공백을 삽입
      targetNumber = targetNumber.replace(/(.{4})/g, '$1 ');
      return targetNumber;
    });
  });

  cardInfoWarp.expirDate.addEventListener('input', (e) => {
    inputNumberTypeCheck(e, (targetNumber) => {
      // 숫자 2자리마다 공백을 삽입
      targetNumber = targetNumber.replace(/(.{2})/g, '$1 ');
      return targetNumber;
    });
  });

  cardInfoWarp.cvcNumber.addEventListener('input', (e) => {
    inputNumberTypeCheck(e, (targetNumber) => {
      return targetNumber;
    });
  });

  cardInfoWarp.nameOnCard.addEventListener('input', (e) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z]/gi, '');
  });
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
    deliveryInfoWrap.deliveryInfo.classList.remove('close');
    changeDeliveryInfo.classList.add('close');
    e.currentTarget.innerHTML = '배송지 변경';
    // 입력값이 비울 경우 기존의 데이터 삽입

    if (deliveryInfoWrap.deliveryAddress.innerHTML.length <= 0) {
      alert('주소를 확인해주세요');
      return;
    } else {
      deliveryInfoWrap.deliveryAddress.innerHTML = changeDeliveryAddress;
    }
    if (deliveryInfoWrap.deliveryTargetName.innerHTML.length <= 0) {
      alert('이름을 확인해주세요');
      return;
    } else {
      deliveryInfoWrap.deliveryTargetName.innerHTML = changeDeliveryTargetName.value;
    }
    if (changeDeliveryTargetPhone.value.length <= 0 || !changeDeliveryTargetPhone.value.length > 11) {
      alert('번호를 확인해주세요');
    } else {
      deliveryInfoWrap.deliveryTargetPhone.innerHTML = changeDeliveryTargetPhone.value;
    }
  } else {
    deliveryInfoWrap.deliveryInfo.classList.add('close');
    changeDeliveryInfo.classList.remove('close');
    e.currentTarget.innerHTML = '완료';
  }
});

const paymentBtn = document.querySelector('.payment-btn');
paymentBtn.addEventListener('click', (e) => {
  reqBody.setValue('receiver', { ...reqBody.getValue().receiver, name: deliveryInfoWrap.deliveryTargetName.innerHTML });
  reqBody.setValue('receiver', {
    ...reqBody.getValue().receiver,
    phone: deliveryInfoWrap.deliveryTargetPhone.innerHTML,
  });
  reqBody.setValue('receiver', { ...reqBody.getValue().receiver, address: deliveryInfoWrap.deliveryAddress.innerHTML });
  reqBody.setValue('receiver', {
    ...reqBody.getValue().receiver,
    requestMessage: deliveryInfoWrap.deliveryRequestOption.value,
  });
  //카드 선택 시
  if (reqBody.getValue().paymentMethod.paymentType === 'card') {
    const setCardInfo = (target, change) => {
      const cardInfo = reqBody.getValue().paymentMethod.cardInfo;
      reqBody.setValue('paymentMethod', {
        ...reqBody.getValue().paymentMethod,
        cardInfo: { ...cardInfo, [target]: change },
      });
    };
    if (cardInfoWarp.cardNumber.value.length === 19) {
      setCardInfo('cardNumber', cardInfoWarp.cardNumber.value.replace(/ /g, ''));
    } else {
      alert('카드번호를 확인해주세요');
      e.preventDefault();
      return;
    }
    if (cardInfoWarp.expirDate.value.length === 5) {
      setCardInfo('expiryDate', cardInfoWarp.expirDate.value.replace(/ /g, ''));
    } else {
      alert('카드 만료일을 확인해주세요');
      e.preventDefault();
      return;
    }
    if (cardInfoWarp.cvcNumber.value.length === 3) {
      setCardInfo('cvc', cardInfoWarp.cvcNumber.value);
    } else {
      alert('CVC를 확인해주세요');
      e.preventDefault();
      return;
    }
    if (cardInfoWarp.nameOnCard.value.length === 0) {
      setCardInfo('cardOwner', cardInfoWarp.nameOnCard.value);
    } else {
      alert('카드에 적힌 이름을 확인해주세요');
      e.preventDefault();
      return;
    }
    setCardInfo('company', cardInfoWarp.company.value);
  } else if (reqBody.getValue().paymentMethod.paymentType !== 'account') {
    alert('결제 수단을 선택해주세요.');
    e.preventDefault();
    return;
  }
  localStorage.removeItem('orders');
  localStorage.setItem('');
  axios({
    method: 'Post',
    headers: {
      Authorization: `Bearer ${sampleToken}`,
    },
    url: '/orders/payment',
    body: JSON.stringify(reqBody),
  });
});

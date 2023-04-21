axios.get('http://localhost:3000/items/:id')
  .then((res)=>{
    const item = res.data;   
    const img = document.querySelector('.item__img')
    const name = document.querySelector('.item__name')
    const price = document.querySelector('.item__price')
    const contentImg = document.querySelector('.content__img')
    const navAmount= document.querySelector('.bottom-nav__amount--count')
    const navCartBtn = document.querySelector('.bottom-nav__btn--cart')

    img.src = item.imgUrl;
    name.innerHTML = item.name;
    price.innerHTML = item.price;
    //상품상세이미지로 바꿔둘 것
    contentImg.src = item.imgUrl;

    let cartItem = []

    navCartBtn.addEventListener('click',addCart)

    function addCart(e){
      const newCart = {
        id: new Date(),
        img : item.imgUrl,
        name : item.name,
        price : item.price,
        amount : navAmount.value,
      }
      cartItem.push(newCart)
      localStorage.setItem("cart",JSON.stringify(cartItem))
      }
    })
    .catch((err)=>{
      alert(err)
    })




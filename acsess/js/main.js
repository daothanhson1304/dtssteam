// Add products
let products=[];
function addCarts(){
  let allGame = document.querySelectorAll('.discount');
  allGame.forEach(game => {
    let priceGame = game.querySelector('.final_price').innerText;
    priceGame = parseInt(priceGame);
    const nameGame = game.querySelector('.name').innerText;
    products.push({
      name: nameGame,
      price: priceGame,
      inCart: 0,
      tag: nameGame,
    })
  })
}
addCarts();
// Fix final price
function getDisplayNumber(number){
  const floatNumber =parseFloat(number);
  if(isNaN(floatNumber)) return ''
  return floatNumber.toLocaleString('dot');
}
function fixPrice(){
  let finalPrices = document.querySelectorAll('.final_price');
  let priceLate = document.querySelectorAll('.price_late');
  let total = document.querySelectorAll('.total');
  total.forEach(total => {
    total.innerText = getDisplayNumber(total.innerText);
  })
  priceLate.forEach(price => {
    price.innerText = getDisplayNumber(price.innerText);
  })
  finalPrices.forEach(finalPrice => {
    finalPrice.innerText = getDisplayNumber(finalPrice.innerText);
  })
}
// Cart
let carts = document.querySelectorAll('#adding');
carts.forEach((cart,index)=>{
  cart.addEventListener('click',() => {
    cartNumbers(products[index]);
  })
})

function cartNumbers(product){
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
  if(productNumbers){
    localStorage.setItem('cartNumbers',productNumbers+1);
    document.getElementById('add-card-link').innerText = `Cart(${productNumbers+1})`;
  }
  else{
    localStorage.setItem('cartNumbers',1);
    document.getElementById('add-card-link').innerText = `Cart(${1})`;
  }

  setItems(product);
}
function setItems(product){
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  if(cartItems != null){
    if(cartItems[product.tag] == undefined ){
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      }
    }
    cartItems[product.tag].inCart+=1;
  }
  else{
    product.inCart=1;
    cartItems= {
      [product.tag]: product,
    }
  }
  localStorage.setItem('productsInCart',JSON.stringify(cartItems));
}

function onLoadCartNumber(){
  let productNumbers = localStorage.getItem('cartNumbers');
  console.log('aaa');
  if(productNumbers){
    document.getElementById('add-card-link').innerText = `Cart(${productNumbers})`;
  }
}

// Cart
function displayCart(){
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  let productAll = document.querySelector('.product_all');
  // if(cartItems && productAll){
  if(productAll){
    const html=Object.values(cartItems).map(item=>`
    <div class="product_content">
      <div class="products_img">
        <div class="delete">
          <span class="delete_item">${item.tag}</span>
          <i class="far fa-trash-alt"></i>
        </div>
        <img class="img-fluid" src="./acsess/img/${item.tag}.jpg">
      </div>
      <div class="products_price">
        <span class="price_late">${item.price}</span>₫
      </div>
      <div class="products_quantity">
        <i class="fas fa-minus quantity dec"><span class="delete_item">${item.tag}</span></i>
        <span>${item.inCart}</span>
        <i class="fas fa-plus quantity inc"><span class="delete_item">${item.tag}</span></i>
      </div>
      <div class="products_total">
        <span class="total">${item.inCart*item.price}</span>₫
      </div>
    </div>
    `).join('');
    productAll.innerHTML=html;
    fixPrice();
    totalCost();
  }


  // Remove
  let deletes = document.querySelectorAll('.delete');
  deletes.forEach((item,index)=>{
    item.addEventListener('click',()=>{
      remove(item);
    })
  })
  // Quantity
  let decQuantity = document.querySelectorAll('.dec');
  let incQuantity = document.querySelectorAll('.inc');
  decQuantity.forEach((item,index)=>{
    item.addEventListener('click',()=>{
      decQ(item);
    })
  })
  incQuantity.forEach((item,index)=>{
    item.addEventListener('click',()=>{
      incQ(item);
    })
  })

}
// +-QUANTITY

function decQ(item){
  let cart = localStorage.getItem('productsInCart');
  cart = JSON.parse(cart);
  let hs= item.querySelector('span').innerText;
  if(cart[hs].inCart<2){
    return
  }
  cart[hs].inCart--;
  let number = localStorage.getItem('cartNumbers');
  number=parseInt(number);
  document.querySelector('.cart_link').innerText=`Cart(${number-1})`
  localStorage.setItem('cartNumbers',number-1);
  localStorage.setItem('productsInCart',JSON.stringify(cart));
  displayCart();

}
function incQ(item){
  let cart = localStorage.getItem('productsInCart');
  cart = JSON.parse(cart);
  let hs= item.querySelector('span').innerText;
  cart[hs].inCart++;
  let number = localStorage.getItem('cartNumbers');
  number=parseInt(number);
  document.querySelector('.cart_link').innerText=`Cart(${number+1})`
  localStorage.setItem('cartNumbers',number+1);
  localStorage.setItem('productsInCart',JSON.stringify(cart));
  displayCart();
}
// REMOVE
function remove(item){
  let cart = localStorage.getItem('productsInCart');
  cart = JSON.parse(cart);
  let hs= item.querySelector('span').innerText;


  const number = localStorage.getItem('cartNumbers');
  document.querySelector('.cart_link').innerText=`Cart(${number-cart[hs].inCart})`
  localStorage.setItem('cartNumbers',number-cart[hs].inCart);
  delete cart[hs];
  localStorage.setItem('productsInCart',JSON.stringify(cart));
  displayCart();

}
// SUB TOTAL
function totalCost(){
  let productInCart=JSON.parse(localStorage.getItem('productsInCart'));
  let totalCoin = 0;
  Object.values(productInCart).forEach(product=>{
    totalCoin+=product.price*product.inCart;
  })
  let finalTotal=document.querySelector('.sub_total--subprice');
  finalTotal.innerHTML=`
  <span class="sub-total">${getDisplayNumber(totalCoin)}</span>₫
  `

}

displayCart();
onLoadCartNumber();







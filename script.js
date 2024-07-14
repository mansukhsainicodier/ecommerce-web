let responsiveUl = document.getElementById('responsive-ul');
let showBtn = document.getElementById('show-btn');
let closeBtn = document.getElementById('close-btn');
let cartIcon = document.getElementById('cart-icon');
let cartSection = document.getElementById('cart-section')
let closeCart = document.getElementById('close-cart')
let products = [];
let cartArray = []
let productWrapper = document.getElementById('producatWrapper');
let cartItems = document.getElementById('cart-items')
let totalAmount = document.getElementById('finalPrice')
let couponBox = document.getElementById('coupon-box')
let applyBtn = document.getElementById('applyCoupon')
let showAdd = document.getElementById('showAdd')
let closeAdd = document.getElementById('add-close')
let totalPrice;

// start add section
let setTime = setTimeout(openAdd,5000)

function openAdd() {
    showAdd.style.display = 'flex'
}

closeAdd.addEventListener('click', function () {
    showAdd.style.display = 'none'
})

let coupons = [{
    code: 'SAVE25',
    discount: 25,
},
{
    code: 'WINTERSALE',
    discount: 10,
},
{
    code: 'CHRISTMASDEAL',
    discount: 20,
},
{
    code: 'NEWYEAR15',
    discount: 15,
},]


//Coupon Code Function

function checkCoupon() {
    let couponValue = couponBox.value;

    coupons.forEach((e) => {
        if (couponValue == e.code) {
            totalPrice = totalPrice - (totalPrice * e.discount) / 100;
            totalAmount.innerHTML = totalPrice
            couponBox.value = '';

        } else {
        }
    })
}

applyBtn.addEventListener('click', checkCoupon)








// Functions for cart & menu bar

function openUl() {
    responsiveUl.style.left = '0px'

}
showBtn.addEventListener("click", openUl)

function blockUl() {
    responsiveUl.style.left = '-550px'


}
closeBtn.addEventListener("click", blockUl)


cartIcon.addEventListener('click', function () {
    cartSection.style.right = '0px'
})


closeCart.addEventListener('click', function () {
    cartSection.style.right = '-500px'
})



// Product Fetch & Display in Web & Cart Code

fetch('https://fakestoreapi.com/products/')
    .then(res => res.json())
    .then((json) => {

        products = json;

        products.map((e) => {
            let cardBox = document.createElement('div');
            cardBox.classList.add('cardBox');
            cardBox.innerHTML = `                <button class='add'>+ Add Item</button>
        <div class="imageBox">
                    <img src="${e.image}" alt="">
                </div>
                <div class="dataBox">
                    <h4>${e.category}</h4>
                    <h2>${e.title}</h2>
                    <h2>₹ ${e.price}</h2>
                </div> `
            cardBox.setAttribute('id', `${e.id}`)

            productWrapper.appendChild(cardBox)

        })

        addToCart();



    }

    )

// funcion that adds the clicked product to the cart array


function addToCart() {
    productWrapper.addEventListener('click', function (event) {
        if (event.target.classList.contains('add')) {
            let proId = event.target.parentElement.getAttribute('id');
            if (cartArray.findIndex(e => e.id == proId) != -1) {
                cartArray[cartArray.findIndex((e) => e.id == proId)].quanitiy++
                let cartItemsAdded = document.getElementsByClassName('cart-item')
                cartItemsAdded[cartArray.findIndex(e => e.id == proId)].getElementsByTagName('input')[0].value++



            }

            else {
                cartArray.push(products[products.findIndex(e => e.id == proId)])
                cartArray[cartArray.findIndex((e) => e.id == proId)].quanitiy = 1;
                let newAddedItem = cartArray[cartArray.findIndex((e) => e.id == proId)];
                console.log(cartArray);
                showInCart(newAddedItem);
            }

            totalPrice = cartArray.reduce((accumlator, product) => accumlator + (product.price * product.quanitiy), 0)
            totalAmount.innerHTML = totalPrice
        }
    })
}


// funcion that shows the clicked product to the cart array

function showInCart(element) {

    let newCartItem = document.createElement('div');
    newCartItem.classList.add('cart-item');
    newCartItem.innerHTML = `<div class="cart-image">
   <img src="${element.image}" alt="">
</div>
<div class="cart-content">
   <p>polo shirt for Men</p>
   <span>color-Red</span>
   <h3>$ ${element.price}</h3>
</div>
<div class="quantity-box">
   <input type="number" class='qua' value="${element.quanitiy}">
</div>`


    cartItems.appendChild(newCartItem)



}























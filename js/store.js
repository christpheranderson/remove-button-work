if(document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
}else {
	ready()
}

function ready() {
  let removeCartItemButtons = document.getElementsByClassName('btn-danger');
//console.log(removeCartItemButtons);
  for(let i = 0; i < removeCartItemButtons.length; i++) {
	let button = removeCartItemButtons[i];
	button.addEventListener('click', removeCartItem) 
		//console.log('clicked')
   }

   var quantityInput = document.getElementsByClassName('cart-quantity-input');
   for(var i = 0; i < quantityInput.length; i++) {
   	  var input = quantityInput[i]
   	  input.addEventListener('change', quantityChanged)
   }

   var addToCartButtons = document.getElementsByClassName('shop-item-button')
   for(var i = 0; i < addToCartButtons.length; i++) {
   	var button = addToCartButtons[i]
   	button.addEventListener('click', addToCartClicked)
   }
}

function removeCartItem() {
    let buttonClicked = event.target;
		buttonClicked.parentElement.parentElement.remove()
		updateCartTotal()
}

function quantityChanged (event) {
   let input = event.target
   if (isNaN(input.value) || input.value <= 0) {
   	input.value = 1
   }
   updateCartTotal();
}

function addToCartClicked (event) {
  let button = event.target
  let shopItem = button.parentElement.parentElement
  let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
  let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
  let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  console.log(title, price, imageSrc)
  addItemToCart(title, price, imageSrc)
  updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
	let cartRow = document.createElement('div');
	cartRow.classList.add('cart-row');
	let cartItems = document.getElementsByClassName('cart-items')[0];
	let cartIemNames = cartItems.getElementsByClassName('cart-item-title')[0]
	for (var i = 0; i < cartItemNames.length; i++) {
		if (cartItemNames[i].innerText == title) {
			alert('This item is already add to cart')
			return
		}
	}
	let cartRowContents = `
	      <div class="cart-item cart-column">
			 <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
		     <span class="cart-item-title">${title}</span>
		   </div>
		    <span class="cart-price cart-column">${price}</span>
		    <div class="cart-quantity cart-column">
             <input class="cart-quantity-input" type="number" value="2">
            <button class="btn btn-danger" type="button">REMOVE</button>
           </div>`
    cartRow.innerHTML = cartRowContents
	cartItems.append(cartRow)
	cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
} 


function updateCartTotal() { 
	let cartItemContainer = document.getElementsByClassName('cart-items')[0]
	let cartRows = cartItemContainer.getElementsByClassName('cart-row')
	let total = 0
	for(let i = 0; i < cartRows.length; i++) {
		let cartRow = cartRows[i]
		let priceElement = cartRow.getElementsByClassName('cart-price')[0]
		let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
		//console.log(priceElement, quantityElement)
		let price = parseFloat(priceElement.innerText.replace('$', ''))
		let quantity = quantityElement.value
		total = total + (price * quantity)
	}
	total = Math.round(total * 100) / 100
	document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}




















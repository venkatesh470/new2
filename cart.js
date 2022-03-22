/**
 * Here i defined utility functions that you can use repeated
 * without having to duplicate same code all over your codebase
 */

// -------- Utility Functions ------------------->

// set the product to local storage
function setProductToStorage(products) {
  localStorage.setItem('productsData', JSON.stringify(products));
}

// get the products stored in local storage
function getProductsFromStorage() {
  return JSON.parse(localStorage.getItem('productsData'));
}

// remove product from storage
function removeProductFromStorage(cartItem) {
  const products = getProductsFromStorage();

  const itemIndex = products.findIndex((product) => product.id === cartItem.id);

  products.splice(itemIndex, 1);

  setProductToStorage(products);
}

// set the number of cart items to local storage
function setCartNumbersToStorage(number) {
  localStorage.setItem('cartNumbers', number);
}

// get the number of cart items from local storage
function getCartNumbersFromStorage() {
  const number = localStorage.getItem('cartNumbers');

  return parseInt(number);
}

// set the total cost of items to local storage
function setTotalCostToStorage(number) {
  localStorage.setItem('totalCost', number);
}

// get the total cost of items from local storage
function getTotalCostFromStorage() {
  const number = localStorage.getItem('totalCost');

  return parseInt(number);
}

function checkStorageForProducts() {
  // Get the products in storage
  let products = getProductsFromStorage();

  // Check if there are any products in storage
  // if there arent, then initialize an empty array and set it in storage
  if (products === null) {
    let initialListOfProducts = [];
    setProductToStorage(initialListOfProducts);
  }
}

// -------- Utility Functions ------------------->

// ---------- Global Variables -------------------->

const cartDiv = document.querySelector('#cart-items-area');
let htmlToReturn;

// ---------- Global Variables -------------------->

function renderEachCartItem(item) {
  const newLi = document.createElement('li');
  newLi.innerHTML =
    // `
    // <img src="images/product${item.id}.png" alt="">
    //       <p>

    //           ${item.name}: $${item.price}
    //           <button class='delete-btn'>Remove Item</button>
    //       </p>
    //   `;
    `<div class="container-fluid">
          <div class="row ">
            <div class="col-xl-11 col-lg-10 col-md-11 lops" >
                
                <div class="container-fluid number-of">
                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-3">
                        <img src="images/product${item.id}.png" alt="" width=45px>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-5">
                            <p><strong>${item.name}</strong></p>
                            
                            <p>color: multi color</p>
                            <div class="d-flex">
                                <div class="grey">
                                    <label for="size-selector">size :</label>
                                    <select name="small" id="size-selector" class="grey">
                                        <option value="medium">Onesize</option>
                                        <option value="medium">S</option>
                                        <option value="large">M</option>
                                        <option value="mercedes">L</option>
                                        <option value="xlarge">XL</option>
                                    </select>
                                </div>
                                <div class="qty-container">
                                    <label for="qty">qty :</label>
                                    <select name="small" id="qty">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-5 col-sm-4">
                            <p>Rs:${item.price}</p>
                            <strike>Rs : 2748</strike>(60% Off)
                            <p>Delivery in 4-6 days</p>
                        </div>
                        <hr>
                        <div class="d-flex extra">
                        <button class='delete-btn'>Remove Item</button>
                             | 
                             <button class="rm">Move To Wishlist</button>
                        </div>
                        
                    </div>
                   
                </div>
                

            </div>
            
        </div>
    </div>`
    



    cartDiv.append(newLi);

  const removeButton = newLi.querySelector('.delete-btn');
  removeButton.addEventListener('click', () => {
    newLi.remove();
    removeProductFromStorage(item);
  });
}

function renderAllCartItems(items) {
  items.forEach((item) => renderEachCartItem(item));
}

function loadCartItems() {
  const cartItems = getProductsFromStorage();

  renderAllCartItems(cartItems);
}
// var itemm = document.getElementById("itemm");
// itemm = localStorage.getItem('totalCost');

loadCartItems();
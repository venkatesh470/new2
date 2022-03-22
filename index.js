/**
 * Here i defined utility functions that you can use repeated
 * without having to duplicate same code all over your codebase
 */

// -------- Utility Functions ------------------->

// set the product to local storage
function setProductToStorage(products) {
  localStorage.setItem('productsData', JSON.stringify(products));
}

// set the number of cart items to local storage
function setCartNumbersToStorage(number) {
  localStorage.setItem('cartNumbers', number);
}

// set the total cost of items to local storage
function setTotalCostToStorage(number) {
  localStorage.setItem('totalCost', number);
}

// get the number of cart items from local storage
function getCartNumbersFromStorage() {
  const number = localStorage.getItem('cartNumbers');

  return parseInt(number);
}

// get the products stored in local storage
function getProductsFromStorage() {
  return JSON.parse(localStorage.getItem('productsData'));
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

const productsDiv = document.querySelector('#productsArea');
let htmlToReturn;

// ---------- Global Variables -------------------->

function numberOfProductsInCart() {
  // get the number of products from storage
  const currentNumber = getCartNumbersFromStorage();

  if (currentNumber) {
    let updatedNumber = currentNumber + 1;

    setCartNumbersToStorage(updatedNumber);
    // document.querySelector('.cartt span').textContent = updatedNumber;
  } else {
    setCartNumbersToStorage(1);
    // document.querySelector('.cartt span').textContent = 1;
  }
}

function totalCostOfProductsInCart(product) {
  const currentCost = getTotalCostFromStorage();

  if (currentCost) {
    let updatedCost = currentCost + parseInt(product.price);

    setTotalCostToStorage(updatedCost);
  } else {
    setTotalCostToStorage(product.price);
  }
}

function addProductToCart(product) {
  // First check if there are products in storage
  // so that if there isn't any, then it would set an empty array
  checkStorageForProducts();

  numberOfProductsInCart();

  totalCostOfProductsInCart(product);

  let cartItems = getProductsFromStorage();

  const findItem = cartItems.find((item) => item.id === product.id);

  if (findItem) {
    return;
  } else {
    // push a new product into the empty array or array of products
    cartItems.push(product);

    // Set products back to storage
    setProductToStorage(cartItems);
  }
}

function renderEachProduct(product) {
  const newElement = document.createElement('div');
  newElement.className = 'row items productsArea';

  htmlToReturn =
   
   
    // '<div class="col-lg- col-md-4 col-sm-6 mbn">' +
    '<div class="card col-lg-3 " style="width: 18rem;" id="product' +
    product.id +
    '.png">' +
    '   <img src="images/product' +
    product.id +
    '.png" class="card-img-top" alt="...">' +
    '  <div class="card-body  "  ' +
    '<p>' +
    product.name +
    '</p>' +
    ' ' +
    product.priceAfterDiscount +
    ' <span> <strike>' +
    product.price +
    '</strike> </span> <span>(60% Off)</span>' +
    '  <div class="product-rating ">' +
    '         <i class="far fa-star"></i>' +
  
    '         <i class="far fa-star"></i>' +
    '         <i class="far fa-star"></i>' +
    '         <i class="far fa-star low-star"></i>' +
    '         <i class="far fa-star low-star"></i>' +
    '     </div>' +
    '     <div class="product-hover" id="mnk">' +
    '         <div class="container" >' +
    '             <div class="row hover-container">' +
    '                 <div class="col-lg-2 col-md-2 col-sm-2 ">' +
    '<p class="add-btn"><i class="far fa-shopping-cart fa-lg hover-icon"></i></p>' +
    '                 </div>' +
    '                 <div class="col-lg-2 col-md-2 col-sm-2 ">' +
    '                     <a href=""><i class="fas fa-eye fa-lg hover-icon"></i></a>' +
    '                 </div>' +
    '                 <div class="col-lg-2 col-md-2 col-sm-2 ">' +
    '                     <a href=""><i class="fas fa-heart fa-lg hover-icon"></i></a>' +
    '                 </div>' +
    '             </div>' +
    '         </div>' +
    '     </div>' +
    // ' </div>' +
    ' </div>' +
  
  
    
    '</div>';
  newElement.innerHTML += htmlToReturn;
  productsDiv.append(newElement);

  const addButton = newElement.querySelector('.add-btn');
  addButton.addEventListener('click', () => {
    addProductToCart(product);
  });
}

function renderAllProducts(products) {
  products.forEach((product) => renderEachProduct(product));
}

async function loadProducts(url) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => renderAllProducts(json.Products));
}

// Called Fn to load products
loadProducts('https://my-json-server.typicode.com/venkatesh470/mokkjson/db');

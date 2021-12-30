let currentItem = {
    colors: ' ',
    _id: '',
    name: " ",
    price: 0,
    imageUrl: " ",
    description: " ",
    altTxt: " ",
    quantity: 1
};

let cartString = localStorage.getItem('cart') || '[]';
let cartArray = JSON.parse(cartString);

const params = new URLSearchParams(window.location.search);
console.log(params.get('id'));
const id = params.get('id');


const baseURL = 'http://localhost:3000/api/products';
const pullDown = document.getElementById('colors');

fetch(`${baseURL}/${id}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        currentItem = data;
        createCard(data);
        // currentItemInCart(data);
        // pageTitle.textContent = `${currentItem.name};
    })
.catch(error => console.log("Fetch Error.", error));
//***createCard function inputs current selected item values from API and outputs product page information ***/
function createCard(currentItem) {
    //Create title and description//
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    title.innerHTML = currentItem.name;
    description.innerHTML = currentItem.description;

    //Create Image//
    const imageContainer = document.getElementById('img');
    imageURL = document.createElement('img');
    imageContainer.appendChild(imageURL);
    imageURL.setAttribute('src', currentItem.imageUrl);
    imageURL.setAttribute('alt', currentItem.altTxt);

    //Create Price//
    const priceContainer = document.getElementById('price');
    priceContainer.innerHTML = currentItem.price;
         
    getQuantity(currentItem.value);

    addPulldown(currentItem.colors);

    pullDown.addEventListener('change', handlePullDown);

    const cartButton = document.getElementById('addToCart');

    cartButton.addEventListener ('click', addToCart);

    
};
//** addPulldown function adds color options to pull down menu from current item color selections***/

function addPulldown(optionsArray) {
    const colors = currentItem.colors;

    for (let i=0; i < colors.length; i++) {
        let options = document.createElement ('option');
        options.setAttribute ('value', currentItem.colors[i]);
        options.innerHTML = currentItem.colors[i];
        pullDown.appendChild(options);
    };
};
//*** handlePulldown fuction//***/
//***inputs an event from an event listener and pulls the target value to create the color value for current item***/
function handlePullDown(ev) {
    currentItem.colors = ev.target.value;
    console.log(currentItem);
};
//*** getQuantity creates an event listener to watch for user input in the quantity field */
function getQuantity(value) {
    const quantity = document.getElementById('quantity');
    quantity.addEventListener ('input', handleInput);
    function handleInput(userInput) {
        currentItem.quantity = userInput.target.value;
    };
    
    console.log(currentItem);
};


   
//*** addToCart function inputs data from cart array to check if current item is already in cart
//*If current Item is already in cart pushed cart returns false and updates to new quantity
//fuction will push all other option/items to cart */
function addToCart(event) {
    //The conditional goes here//
    let pushedCart = true;

    if (cartArray.length === 0) {
        //if length is 0 push
    } else {
        //usecase #2 - same name and option - replace
        for (let i = 0; i < cartArray.length; i++) {
            if (currentItem._id === cartArray[i]._id && currentItem.colors === cartArray[i].colors) {
                cartArray[i].quantity = currentItem.quantity;
                pushedCart = false;
            };
       };
    };

    console.log(cartArray);

    if (pushedCart) {
        cartArray.push(currentItem);
    };

    
    cartString = JSON.stringify(cartArray);
    localStorage.setItem('cart', cartString);
    
};


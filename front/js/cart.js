let cartString = localStorage.getItem('cart') || '[]';
let cartArray = JSON.parse(cartString);

console.log(cartArray);

let itemSection = document.getElementById("cart__items");

// function createCart(cartArray) {
//     for (let i = 0; i < cartArray.length; i++) {
//         createItem(cartArray);
//     };
// };


// Creation of items and elements in cart outputs individual cart items with quantity listener, delete listener
// also calls quantity function and calculateTotal function***// 

function createItem() {
    

    for (let i = 0; i < cartArray.length; i++) {
        let itemName = cartArray[i].name;
        let itemImage = cartArray[i].imageUrl;
        let itemColor = cartArray[i].colors;
        let itemId = cartArray[i]._id;
        let itemPrice = cartArray[i].price;
        let itemQuantity = cartArray[i].quantity;
        let itemAlt = cartArray[i].altTxt;
        

        let itemArticle = document.createElement("article");
        itemSection.appendChild(itemArticle);
        itemArticle.className = "cart__item";
        itemArticle.setAttribute('data-id', itemId);

        let itemImgDiv = document.createElement("div");
        itemArticle.appendChild(itemImgDiv);
        itemImgDiv.className = "cart__item__img";

        let itemImg = document.createElement("img");
        itemImgDiv.appendChild(itemImg);
        itemImg.src = itemImage;
        itemImg.alt = itemAlt;

        let itemContent = document.createElement("div");
        itemArticle.appendChild(itemContent);
        itemContent.className = "cart__item__content";

        let itemContentDescription = document.createElement("div");
        itemArticle.appendChild(itemContentDescription);
        itemContentDescription.className = "cart__item__content__description";

        let itemContentName = document.createElement("h2");
        itemContentDescription.appendChild(itemContentName);
        itemContentName.innerHTML = itemName;

        let itemContentColor = document.createElement("p");
        itemContentDescription.appendChild(itemContentColor);
        itemContentColor.innerHTML = itemColor;

        let itemContentPrice = document.createElement("p");
        itemContentDescription.appendChild(itemContentPrice);
        itemContentPrice.innerHTML = "€"+ itemPrice;

        let itemContentSettings = document.createElement("div");
        itemContent.appendChild(itemContentSettings);
        itemContentSettings.className = "cart__item__content__settings";

        let itemSettingsQuantity = document.createElement("div");
        itemContentSettings.appendChild(itemSettingsQuantity);
        itemSettingsQuantity.className = "cart__item__content__settings__quantity";

        let quantity = document.createElement("p");
        itemSettingsQuantity.appendChild(quantity);
        quantity.innerHTML = "Qté: " + itemQuantity;

        let quantityInput = document.createElement("input");
        itemSettingsQuantity.appendChild(quantityInput);
        quantityInput.setAttribute("type", "number");
        quantityInput.setAttribute("class", "itemQuantity");
        quantityInput.setAttribute("min", "1");
        quantityInput.setAttribute("max", "100");
        quantityInput.setAttribute("value", itemQuantity);

        quantityInput.addEventListener("change", (ev) => {
            newItemQuantity = ev.target.value;
            quantity.innerHTML = "Qté: " + newItemQuantity;
            cartArray[i].quantity = newItemQuantity;
            console.log(cartArray);
            cartString = JSON.stringify(cartArray);
            localStorage.setItem("cart", cartString);
            console.log(cartString);
            getQuantity();
            calculateTotal();
        });

        let itemSettingsDelete = document.createElement("div");
        itemContentSettings.appendChild(itemSettingsDelete);
        itemSettingsDelete.className = "cart__item__content__settings__delete";

        let deleteItem = document.createElement("p");
        itemSettingsDelete.appendChild(deleteItem);
        deleteItem.className = "deleteItem";
        deleteItem.innerHTML = "Delete";

        deleteItem.addEventListener("click", (ev) => {
            newItemQuantity = 0;
            if (newItemQuantity === 0) {
                cartArray.splice(i,1);
                console.log(cartArray);  
                itemSection.removeChild(itemArticle);
                cartString = JSON.stringify(cartArray);
                localStorage.setItem("cart", cartString);
                console.log(cartString);
                
            };
            getQuantity();
            calculateTotal();
        });

        
    };
    
    
    //gets quantity of total articles available in cart//
    
    function getQuantity(){
        const totalQuantity = document.getElementById("totalQuantity");
        
        
        if (cartArray.length === 0) {
          totalQuantity.innerHTML = 0;
        } else {
          let total = cartArray.reduce(
            (preVal, currVal) => {

                return {quantity: parseInt(preVal.quantity, 10) + parseInt(currVal.quantity, 10)};
                
                
            }
        );
          totalQuantity.innerHTML = total.quantity;
        };
        // console.log("total",total);
        
    };
    
    getQuantity();
    // console.log(totalQuantityAmount);


    // Calculates total price of items in cart using quantity and price values// 

    function calculateTotal() {
        const totalPrice = document.getElementById("totalPrice");

        let priceTotal = 0;

        for (let i = 0; i < cartArray.length; i++) {
            priceTotal += cartArray[i].price * cartArray[i].quantity
        }
        console.log("total Price", priceTotal);
        totalPrice.innerHTML = priceTotal;
    };

    calculateTotal();


    
    
};

//Form//

const form = document.getElementsByClassName("cart__order__form")[0];
console.log(form);

//Name event listeners//

form.firstName.addEventListener("change", function () {
    validName(this);
});
form.lastName.addEventListener("change", function () {
    validName(this);
});

 // *** Checks for valid name input **// 

const validName = function (inputName) {
    let nameRegExp = new RegExp("^[^- ][a-zA-Z '-àâäéèêëïîôöùûü]*[^- ]$", "g");
    let testName = nameRegExp.test(inputName.value);
    if (testName) {
      inputName.nextElementSibling.innerHTML = "Valid";
      inputName.nextElementSibling.style.color = "green";
      return true;
    } else {
      inputName.nextElementSibling.innerHTML = "Invalid";
      inputName.nextElementSibling.style.color = "red";
      return false;
    }
};

//Address listener//

form.address.addEventListener("change", function () {
    validAddress(this);
});
 
// *** Checks for valid address input **//

const validAddress = function (inputAdress) {
    let addressRegExp = new RegExp("^[0-9]{1,4} [^- ][a-zA-Z '-àâäéèêëïîôöùûü]*[^- ]$", "g");
    let testAdress = addressRegExp.test(inputAdress.value);
    if (testAdress) {
      inputAdress.nextElementSibling.innerHTML = "Valid";
      inputAdress.nextElementSibling.style.color = "green";
      return true;
    } else {
      inputAdress.nextElementSibling.innerHTML = "Invalid";
      inputAdress.nextElementSibling.style.color = "red";
      return false;
    }
};

//City event listener//

form.city.addEventListener("change", function () {
    validCity(this);
});

// *** Checks for valid city input **//
  
const validCity = function (inputCity) {
    let cityRegExp = new RegExp("^[^- ][a-zA-Z '-àâäéèêëïîôöùûü]*[^- ]$", "g");
    let testCity = cityRegExp.test(inputCity.value);
    if (testCity) {
      inputCity.nextElementSibling.innerHTML = "Valid";
      inputCity.nextElementSibling.style.color = "green";
      return true;
    } else {
      inputCity.nextElementSibling.innerHTML = "Invalid";
      inputCity.nextElementSibling.style.color = "red";
      return false;
    }
};

// Email listener//

form.email.addEventListener("change", function () {
    validEmail(this);
});

// *** Checks for valid email input **//
  
const validEmail = function (inputEmail) {
    let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$","g");
    let testEmail = emailRegExp.test(inputEmail.value);
    if (testEmail) {
      inputEmail.nextElementSibling.innerHTML = "Valid";
      inputEmail.nextElementSibling.style.color = "green";
      return true;
    } else {
      inputEmail.nextElementSibling.innerHTML ="Invalid";
      inputEmail.nextElementSibling.style.color = "red";
      return false;
    }
};

//**event listener that calls create order function if all form inputs are valid */

form.addEventListener("submit", function (e) {
    console.log("submit ok");
    e.preventDefault();
    if (
      validName(form.firstName) &&
      validName(form.lastName) &&
      validAddress(form.address) &&
      validCity(form.city) &&
      validEmail(form.email)
    ) {
      //form.submit()
      createOrder();
      console.log("Form is ok");
    } else {
      e.preventDefault();
      alert("something went wrong!");
    }
});

//Order send to back end//

const sendOrder = (order) => {
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("back end " + data);
        //const orderId = data.orderId;
        // localStorage.setItem("orderId", data.orderId);
  
        
        window.location.href = "confirmation.html" + "?" + "id" + "=" + data.orderId;
        
    });
};

// create order gathers products in cart array and contacts and posts order to back end //

function createOrder() {
  const products = [];
  for (product of cartArray) {
    let productId = product._id;
    products.push(productId);
  };

  const contact = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    address: form.address.value,
    city: form.city.value,
    email: form.email.value,
  };
  
  let order = {
    contact,
    products,
  };

  sendOrder(order); 

};

createItem(cartArray);

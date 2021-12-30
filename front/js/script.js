const singleLink = './product.html';

fetch('http://localhost:3000/api/products/')
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    createCards(data);
  })
  .catch(error => console.log("Failed to connect to server.", error));

//***createCards function inputs data from API and returns individual product cards with unique properties***//

  function createCards(data) {
    const container = document.getElementById ('items');

    for (let i=0; i < data.length; i++){
      console.log(data[i].name);

      let dataArray = data[i];
      console.log(dataArray);

      let imageUrl = document.createElement ('img');
      let name = document.createElement ('h3');
      let description = document.createElement ('p');
      let productLink = document.createElement ('a');

      

      let productId = data[i]._id;
      name.innerText = data[i].name;
      description.innerText = data[i].description;
      imageUrl.setAttribute('alt', data[i].altTxt);
      imageUrl.setAttribute('src', data[i].imageUrl);
      let product = document.createElement('article');
      imageUrl.classList.add ('sofa-image');

      productLink.setAttribute('href', './product.html?id=' + data[i]._id);


      
      // product.appendChild(productLink);
      product.appendChild(imageUrl);
      product.appendChild(name);
      product.appendChild(description);
      productLink.appendChild(product);
      

      container.appendChild(productLink);

    };
  };






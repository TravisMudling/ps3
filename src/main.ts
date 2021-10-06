/**
 * Product container element
 * 
 * NOTE: we are casting it as Element to remove the need for doing
 * a null check everytime we use it.
 */
let productsDiv = document.querySelector('.products') as Element;

/**
 * Interface for product objects
 */
interface Product {
  // TODO implement
  name: string;
  photo: string;
  price: string;
  reviews: any[];
}

/**
 * Loads all products and displays them
 */
async function showProducts() {
  // TODO implement
  try {
    let response = await fetch('https://pw-uiewg-walletapp.firebaseio.com/products.json');
    let products: Product[] = await response.json();

    for (let product of products){
      let productDiv = document.createElement('div');
      productDiv.className = "product";
      productsDiv.appendChild(productDiv);

      let productImage = document.createElement('img');
      productImage.className = "photo";
      productImage.src = product.photo;      
      productDiv.appendChild(productImage);
      
      let infoDiv = document.createElement('div');
      infoDiv.className = "info";
      productDiv.appendChild(infoDiv);

      let nameH = document.createElement('h3');
      nameH.className = "name";
      nameH.innerText = product.name;
      infoDiv.appendChild(nameH);

      let priceP = document.createElement('p');
      priceP.className = "price";
      product.price = product.price.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2});
      priceP.innerText = `₱${product.price}`;
      infoDiv.appendChild(priceP);

      let reviewP = document.createElement('p');
      reviewP.className = "reviews";
      reviewP.innerText = `${product.reviews.length} reviews`;
      infoDiv.appendChild(reviewP);
    }
  } catch (e) {
    productsDiv.innerHTML = "<b>Failed to load products</b>";
  }
}

// Run showProducts() on load
showProducts();
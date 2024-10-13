class Laptop {
  constructor(productImg, price, quantity, productName, productDescription) {
    this.productImg = productImg;
    this.price = price;
    this.quantity = quantity;
    this.productName = productName;
    this.productDescription = productDescription;
  }

  // Method to increment the quantity
  incrementQuantity() {
    this.quantity++;
  }

  // Method to decrement the quantity
  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Method to calculate the total price for this product
  totalPrice() {
    return this.price * this.quantity;
  }
}

// Cart class to manage the list of laptops and handle DOM manipulation
// step 3
class Cart {
  constructor(laptops) {
    this.laptops = laptops;
    this.cartContainer = document.getElementById("cart-list");
    this.totalElem = document.getElementById("total");
  }

  // Method to render the products to the DOM
  // step 5 (start)
  renderProducts() {
    this.cartContainer.innerHTML = ''; // Clear existing products

    for (let product of this.laptops) {
      let productCard = document.createElement("div");
      productCard.setAttribute("class", "product-card");

      let productImg = document.createElement("img");
      productImg.src = product.productImg;

      let productName = document.createElement("h3");
      productName.textContent = product.productName;

      let productPrice = document.createElement("p");
      productPrice.textContent = product.price;

      let productDescription = document.createElement("p");
      productDescription.textContent = product.productDescription;

      let actionBox = document.createElement("div");
      actionBox.setAttribute("class", "action-box");

      let leftBox = document.createElement("div");
      leftBox.setAttribute("class", "left-box");

      let incrementBtn = document.createElement("button");
      incrementBtn.textContent = "+";
      incrementBtn.setAttribute("id", product.productName);
      incrementBtn.addEventListener("click", () => {
        this.incrementQuantity(product);
      });

      let decrementBtn = document.createElement("button");
      decrementBtn.textContent = "-";
      decrementBtn.setAttribute("id", product.productName);
      decrementBtn.addEventListener("click", () => {
        this.decrementQuantity(product);
      });

      let quantity = document.createElement("p");
      quantity.textContent = product.quantity;
      quantity.setAttribute("id", `quantity-${product.productName}`); // unique id based on product name

      let deleteEle = document.createElement("button");
      deleteEle.textContent = "Remove";
      deleteEle.setAttribute("id", product.productName);
      deleteEle.addEventListener("click", () => {
        this.removeProduct(product);
      });

      leftBox.appendChild(decrementBtn);
      leftBox.appendChild(quantity);
      leftBox.appendChild(incrementBtn);

      actionBox.appendChild(leftBox);
      actionBox.appendChild(deleteEle);

      productCard.appendChild(productImg);
      productCard.appendChild(productName);
      productCard.appendChild(productPrice);
      productCard.appendChild(productDescription);
      productCard.appendChild(actionBox);

      this.cartContainer.appendChild(productCard);
    }

    this.updateTotal();
  } 
  // step 5 (end)

  // Method to increment product quantity
  // step 4 (start)
  incrementQuantity(product) {
    product.incrementQuantity();
    document.getElementById(`quantity-${product.productName}`).textContent = product.quantity;
    this.updateTotal();
  }

  // Method to decrement product quantity
  decrementQuantity(product) {
    product.decrementQuantity();
    document.getElementById(`quantity-${product.productName}`).textContent = product.quantity;
    this.updateTotal();
  }

  // Method to remove a product
  removeProduct(product) {
    const index = this.laptops.indexOf(product);
    this.laptops.splice(index, 1);
    this.renderProducts(); // Re-render after removal
  }

  // Method to calculate and update total price
  updateTotal() {
    let total = 0;
    for (let product of this.laptops) {
      total += product.totalPrice();
    }
    this.totalElem.textContent = total;
  }
  // step 4 (end)
}

// Instantiate Laptop objects
// step 2
const laptops = [
  new Laptop(
    "https://th.bing.com/th/id/OIP._1AGZ6l2ePLbNRhac81SiwHaHa?pid=ImgDet&w=177&h=177&c=7&dpr=1.5",
    999.99,
    1,
    "UltraBook Pro 15",
    "A powerful laptop with a sleek design, perfect for professionals."
  ),
  new Laptop(
    "https://th.bing.com/th/id/OIP.r1Ttk28V3JjJhAeYeKH8gwHaHa?pid=ImgDet&w=177&h=177&c=7&dpr=1.5",
    799.99,
    1,
    "Gaming Beast XG",
    "Designed for gamers with high performance and stunning graphics."
  ),
  new Laptop(
    "https://th.bing.com/th/id/OIP.nD6BLNHkQq2eu_xM4x1pagHaHa?pid=ImgDet&w=177&h=177&c=7&dpr=1.5",
    649.99,
    1,
    "Budget Book 14",
    "An affordable laptop for everyday tasks and web browsing."
  ),
  new Laptop(
    "https://th.bing.com/th/id/OIP.O_JSaDCiosYQ5n-D4CN1jwHaHa?pid=ImgDet&w=177&h=177&c=7&dpr=1.5",
    1299.99,
    1,
    "Creator Studio 17",
    "Ideal for creators with a powerful GPU and high-resolution display."
  ),
  new Laptop(
    "https://th.bing.com/th/id/OIP.CqhO3h2QuALWc5xE9PBrPQHaHa?pid=ImgDet&w=177&h=177&c=7&dpr=1.5",
    1099.99,
    1,
    "Business Pro 13",
    "Reliable and portable, perfect for business professionals on the go."
  )
];

// Instantiate the Cart and render products
const cart = new Cart(laptops);
cart.renderProducts();
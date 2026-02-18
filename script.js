let products = [
  { id: 1, name: "Laptop", price: 45000, image: "https://via.placeholder.com/200" },
  { id: 2, name: "Dress", price: 1500, image: "https://via.placeholder.com/200" },
  { id: 3, name: "Book", price: 500, image: "https://via.placeholder.com/200" },
  { id: 4, name: "Shoes", price: 3000, image: "https://via.placeholder.com/200" },
  { id: 5, name: "Phone", price: 20000, image: "https://via.placeholder.com/200" },
  { id: 6, name: "Bag", price: 1200, image: "https://via.placeholder.com/200" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const productsDiv = document.getElementById("products");
const cartItems = document.getElementById("cartItems");
const totalSpan = document.getElementById("total");

function displayProducts(list = products) {
  productsDiv.innerHTML = "";
  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
      <button onclick="toggleWishlist(${p.id})">❤️</button>
    `;
    productsDiv.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    cartItems.appendChild(li);
  });
  totalSpan.textContent = total;
}

function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  updateCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
  } else {
    alert("Order placed successfully!");
    clearCart();
  }
}

/* SEARCH */
function searchProducts() {
  const text = document.getElementById("search").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(text));
  displayProducts(filtered);
}

/* WISHLIST */
function toggleWishlist(id) {
  const product = products.find(p => p.id === id);
  wishlist.push(product);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  alert("Added to wishlist ❤️");
}

function showWishlist() {
  displayProducts(wishlist);
}

/* LOGIN SYSTEM */
function login() {
  document.getElementById("loginModal").classList.remove("show");
}

function logout() {
  document.getElementById("loginModal").classList.add("show");
}

function signup() {
  alert("Account created!");
  showLogin();
}

function showSignup() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
}

function showLogin() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("signupForm").style.display = "none";
}

updateCart();
displayProducts();

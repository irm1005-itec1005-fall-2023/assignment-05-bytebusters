document.addEventListener('DOMContentLoaded', function () {
  const productList = document.getElementById('Products');
  const cartItems = document.getElementById('shoppingCart');
  const cartTotal = document.getElementById('cart-total');

  productList.addEventListener('click', function (e) {
      if (e.target.classList.contains('addProduct')) {
          const product = e.target.parentElement;
          addToCart(product);
      }
  });

  cartItems.addEventListener('click', function (e) {
      if (e.target.classList.contains('removeProduct')) {
          const cartItem = e.target.closest('li');
          removeFromCart(cartItem);
      }
  });

  function addToCart(product) {
      const productId = product.querySelector('.addProduct').dataset.id;
      const productName = product.querySelector('p').textContent;
      const productPrice = parseFloat(product.querySelector('.addProduct').dataset.price);

      const existingCartItem = document.querySelector(`#shoppingCart [data-id="${productId}"]`);

      if (existingCartItem) {
          // If item already exists in the cart, update quantity and total
          const quantityElement = existingCartItem.querySelector('.quantity');
          const quantity = parseInt(quantityElement.textContent) + 1;
          quantityElement.textContent = quantity;
      } else {
          // If item doesn't exist in the cart, add a new item
          const cartItem = document.createElement('li');
          cartItem.dataset.id = productId;
          cartItem.innerHTML = `
              <span>${productName}</span>
              <span class="quantity">1</span>
              <span class="price">$${productPrice.toFixed(2)}</span>
              <button class="removeProduct">Remove</button>
          `;
          cartItems.appendChild(cartItem);
      }

      updateCartTotal();
  }

  function removeFromCart(cartItem) {
      const quantityElement = cartItem.querySelector('.quantity');
      const quantity = parseInt(quantityElement.textContent);

      if (quantity > 1) {
          // If there are multiple items, decrease quantity
          quantityElement.textContent = quantity - 1;
      } else {
          // If there's only one item, remove the entire cart item
          cartItem.remove();
      }

      updateCartTotal();
  }

  function updateCartTotal() {
      const cartItemElements = document.querySelectorAll('.shoppingCart li');
      let total = 0;

      cartItemElements.forEach(function (cartItem) {
          const quantity = parseInt(cartItem.querySelector('.quantity').textContent);
          const price = parseFloat(cartItem.querySelector('.price').textContent.slice(1));
          total += quantity * price;
      });

      cartTotal.textContent = total.toFixed(2);
  }
});

// Array of objects (items for sale)
let items = [
    {
        name: 'Batman Briefs Underwear',
        price: 8,
        image: 'https://i.imgur.com/Qh0DtSN.jpg',
    },
    {
        name: 'Lego Coffee Mug',
        price: 12,
        image: 'https://i.imgur.com/7lZhxj6.jpg',
    },
    {
        name: 'Green Rubber Duck',
        price: 6,
        image: 'https://i.imgur.com/b2MFIj2.jpg',
    },
    {
        name: 'Pokemon Pikachu Bikini',
        price: 14,
        image: 'https://i.imgur.com/xQz20kX.jpg',
    },
    {
        name: 'Cookie Monster Cap',
        price: 19,
        image: 'https://i.imgur.com/3c66oMo.jpg',
    },
    {
        name: 'Mazinger Z Figurine',
        price: 32,
        image: 'https://i.imgur.com/z19zU8m.jpg',
    },
];

// Array of objects (items in cart)
let cart = [];

// ReadyState EventListener, 'DOMContentLoaded', ready
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    renderShop();
    renderCart();
}

// Render shop items on HTML page
function renderShop() {
    // Parent node
    let shopItems = document.getElementById('items');

    // Loop through items[]
    for (let i = 0; i < items.length; i++) {
        // Target each object
        let item = items[i];

        // Adds line items to the unordered list parent #items
        shopItems.innerHTML += `
            <li>
                <div>${item.name}</div>
                <div>$${item.price}</div>
                <image src="${item.image}"/>
                <input id="quantity" type="number" placeholder="Quantity"/>
                <button
                    id="button-add"
                    onClick='addToCart(${i}, "${item.name}")'>
                    Add
                </button>
            </li>`;
    }
}

// Same logic as renderShop method
function renderCart() {
    // Total for items in cart
    let total = 0;

    // Parent node
    let cartItems = document.getElementById('cart');

    // Clear old child nodes
    cartItems.innerHTML = '';

    // Loop through cart[]
    for (let i = 0; i < cart.length; i++) {
        // Target each item
        let cartItem = cart[i];

        // Update Total
        total += cartItem.price * cartItem.quantity;

        cartItems.innerHTML += `
            <li><div class="left-block">
                <image src="${cartItem.image}"/>
                <button id="button-remove" onClick='removeFromCart(${i})'>Remove</button></div>
                <div class="right-block">
                <div>Item: ${cartItem.name}</div>
                <div>Price: $${cartItem.price}</div>
                <div>Quantity: ${cartItem.quantity}</div>
                <div>Sub Total: $${
                    cartItem.price * cartItem.quantity
                }</div></div>
            </li>`;
    }

    // Update HTML for Total
    document.getElementById('amount').innerHTML = '$' + total;

    // Add event listener to checkout button
    document
        .getElementById('button-checkout')
        .addEventListener('click', checkout);
}

// Checkout onclick method
function checkout() {
    // Set total quantity 0
    let totalQuantity = 0;

    // Loop through cart
    for (let i = 0; i < cart.length; i++) {
        totalQuantity += cart[i].quantity;
    }

    // Reference "amount"
    let amount = document.getElementById('amount').innerHTML;

    // Create alert message (might change for modal or index-z layer)
    let alertMessage = `Thank you for your purchase of ${totalQuantity} items and your ${amount} payment!`;
    // Clears cart
    location.reload();
    // Triggers popup message
    alert(alertMessage);
}

// Add button action
function addToCart(i, name) {
    // Instantiate variable 'selection' for algorithm
    let selection = name;

    // Use given index to target clicked line item
    let listItem = document.getElementsByTagName('li')[i];

    // Save value of input as a numeric quantity
    let input = listItem.querySelector('input');
    let quantity = parseInt(input.value) || 1; // or as 1, if NaN

    // Prevent negative numbers
    if (quantity < 0) {
        quantity = 1;
    }

    // Lets check our cart first
    // If empty
    if (cart.length == 0) {
        // Loop through items[]
        for (let i = 0; i < items.length; i++) {
            // Target each item
            let item = items[i];

            // Find item name matching selection
            if (item.name == selection) {
                // Create cart item
                let cartItem = items[i];
                // Add quantity property
                cartItem.quantity = quantity;
                // Push to cart
                cart.push(cartItem);
                renderCart();
            }
        }
    } else {
        // If cart is not empty
        // Create flag for match
        let matchFlag = false;

        // Check cart for existing selection
        for (let i = 0; i < cart.length; i++) {
            // Find cart item matching selection
            let inCartItem = cart[i];

            if (inCartItem.name == selection && quantity) {
                inCartItem.quantity += quantity;
                matchFlag = true; // Change flag
                renderCart();
            } else if (inCartItem.name == selection) {
                inCartItem.quantity++;
                matchFlag = true;
                renderCart();
            }
        }
        // No match - create cart item and push to cart
        if (matchFlag === false) {
            // if false, no quantities were increased
            // Find matching item in items Array
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                if (item.name == selection) {
                    let cartItem = item;
                    cartItem.quantity = quantity;
                    cart.push(cartItem);
                    renderCart();
                }
            }
        }
    }
    renderCart();
}

// Remove from cart method
function removeFromCart(i) {
    // Splice out the element at the given index
    if (cart[i].quantity == 1) {
        cart.splice(i, 1);
    } else {
        cart[i].quantity--;
    }

    renderCart();
}

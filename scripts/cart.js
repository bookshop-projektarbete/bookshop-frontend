//Get elements
const mainContentHolder = document.getElementById("main-content-holder")
const cartItemHolder = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

//Get books from localStorage
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
};

//Function to create elements for cart item images
const createItemImageHolder = ({ url, alt, isbn }) => {
    const itemImageHolder = document.createElement("div");
    itemImageHolder.className = "item-image-holder";
    itemImageHolder.setAttribute("data-isbn", isbn);
    const itemImage = document.createElement("img")
    itemImage.className = "item-image";
    itemImage.src = url;
    itemImage.alt = alt;

    itemImageHolder.appendChild(itemImage);

    return itemImageHolder;
}

//Function to create
const createItemQuantity = (isbn) => {
    const itemQuantityHolder = document.createElement("div");
    itemQuantityHolder.classList.add("grid-content", "item-quantity");
    itemQuantityHolder.setAttribute("data-isbn", isbn);
    const itemQuantity = document.createElement("div");
    itemQuantity.innerHTML = `<p>${handleItemQuantity(isbn)}</p>`
    const increaseButton = document.createElement("img");
    increaseButton.className = "quantity-button";
    increaseButton.src = "./icons/plus-button.svg";
    increaseButton.alt = "Button to increase the number of items";


    const decreaseButton = document.createElement("img");
    decreaseButton.className = "quantity-button";
    decreaseButton.src = "./icons/minus-button.svg";
    decreaseButton.alt = "Button to decrease the number of items";

    itemQuantityHolder.append(decreaseButton, itemQuantity, increaseButton);

    increaseButton.onclick = () => handleIncreaseButton(isbn);
    decreaseButton.onclick = () => handleDecreaseButton(isbn);

    return itemQuantityHolder;
}
//Function to determine how many of the same item is in the cart
const handleItemQuantity = (isbn) => {
    const filteredByIsbn = cartItems.filter((book) => book.isbn === isbn);
    return filteredByIsbn.length;
}

//Function to create and display information about each item
const createItemInfo = (title, isbn, author) => {
    const itemInfo = document.createElement("div");
    itemInfo.setAttribute("data-isbn", isbn);
    itemInfo.classList.add("grid-content", "item-info");
    itemInfo.innerHTML = `<ul><li>${title}</li><li class="text-small">${author}</li></ul>`;

    return itemInfo;
}

//Function to create and display price for each item
const createItemPrice = (price, isbn) => {
    const itemPrice = document.createElement("div");
    itemPrice.setAttribute("data-isbn", isbn);
    itemPrice.classList.add("grid-content", "item-price");
    itemPrice.innerHTML = `<p>${price} kr</p>`;

    return itemPrice;
}

const createDivider = (isbn) => {
    const divider = document.createElement("div");
    divider.setAttribute("data-isbn", isbn);
    divider.classList.add("divider");

    return divider;
}

//Function to create checkout button
const createCheckoutButton = () => {
    const checkoutButton = document.createElement("button");
    checkoutButton.classList.add("checkout-button");
    checkoutButton.innerText = "Till betalning";

    return checkoutButton;
}

//Function to calculate and render total price for all items in cart
const renderTotalPrice = () => {
    const totalCost = cartItems.reduce((total, { price }) => {
        return total + price;
    }, 0);

    cartTotal.innerHTML = `<h2 class="cart-title">Totalpris:</h2><h2 class="cart-title">${totalCost} kr</h2>`;

    return totalCost;
}

const handleIncreaseButton = (isbn) => {
    const bookToAdd = cartItems.find((book) => book.isbn === isbn);

    const newBook = { ...bookToAdd };
    cartItems.push(newBook);

    saveCartToLocalStorage();
    renderCartItems();
}

const handleDecreaseButton = (isbn) => {
    //Find index of the second match (if any)
    const secondIndex = cartItems.findIndex((book, index) =>
        book.isbn === isbn && index > cartItems.findIndex((book) => book.isbn === isbn)
    );

    // If a second match exists, remove it
    if (secondIndex !== -1) {
        cartItems.splice(secondIndex, 1);
    } else {
        // Otherwise, remove the first occurrence
        const firstIndex = cartItems.findIndex((book) => book.isbn === isbn);
        if (firstIndex !== -1) {
            cartItems.splice(firstIndex, 1);
        }
    }

    saveCartToLocalStorage();
    renderCartItems();
}

//Function for rendering cart items and their respective data
const renderCartItems = () => {
    //Clear the cartItemHolder container
    cartItemHolder.innerHTML = "";

    //Remove checkoutButton if visible
    const existingCheckoutButton = document.querySelector(".checkout-button");
    if (existingCheckoutButton) {
        existingCheckoutButton.remove();
    }

    // If no items are in the cart, display message
    if (cartItems.length === 0) {
        const emptyCartMsg = document.createElement("p");
        emptyCartMsg.classList.add("empty-message");
        emptyCartMsg.innerText = "Din varukorg är tom."

        cartItemHolder.appendChild(emptyCartMsg);
        // If there are items in the cart, render the items, the total price and checkout button

        //Hide cartTotal when cart is empty
        cartTotal.style.display = "none";

    } else {

        //Show cartTotal when cart has items
        cartTotal.style.display = "block";

        //Array of all unique isbns in the cart, used to avoid displaying duplicates
        const uniqueCartItems = [
            ...cartItems.filter((book, index, cartItems) =>
                index === cartItems.findIndex((currentCartItem) => currentCartItem.isbn === book.isbn)
            )
        ];

        uniqueCartItems.map(({ title, author, isbn, price, cover_image }) => {
            const itemImageHolder = createItemImageHolder(cover_image, isbn);
            const itemQuantityHolder = createItemQuantity(isbn);
            const itemInfo = createItemInfo(title, isbn, author);
            const itemPrice = createItemPrice(price, isbn);
            const divider = createDivider(isbn);

            cartItemHolder.append(itemImageHolder, itemQuantityHolder, itemInfo, itemPrice, divider);
        })

        //Render the total price
        renderTotalPrice();
        // Create and append the checkoutButton
        const checkoutButton = createCheckoutButton();
        mainContentHolder.appendChild(checkoutButton);

    }
}

renderCartItems();
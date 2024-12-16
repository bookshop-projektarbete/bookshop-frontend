//Get elements
const mainContentHolder = document.getElementById("main-content-holder")
const cartItemHolder = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");


const cartItems = [
    {
        "_id": "6756f2bf23581d968ded9e4c",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "isbn": "9780743273565",
        "price": 100.99,
        "category": "Classic Literature",
        "stock": 50,
        "description": "A novel about the American dream set in the 1920s.",
        "cover_image": {
            "url": "https://m.media-amazon.com/images/I/81QuEGw8VPL._AC_UF1000,1000_QL80_.jpg",
            "alt": "Cover image of The Great Gatsby by F. Scott Fitzgerald",
            "_id": "675c33c61b6f04d3e84aad9a"
        },
        "published_year": 1925
    },
    {
        "_id": "6756f2bf23581d968ded9e4d",
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "isbn": "9780061120084",
        "price": 70.99,
        "category": "Classic Literature",
        "stock": 35,
        "description": "A novel set in the Depression-era Deep South, revolving around racial injustice.",
        "cover_image": {
            "url": "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg",
            "alt": "Cover image of To Kill a Mockingbird by Harper Lee",
            "_id": "675c33c61b6f04d3e84aad9b"
        },
        "published_year": 1960
    },
    {
        "_id": "6756f2bf23581d968ded9e4e",
        "title": "1984",
        "author": "George Orwell",
        "isbn": "9780451524935",
        "price": 90.99,
        "category": "Dystopian",
        "stock": 20,
        "description": "A novel about a dystopian future where society is controlled by a totalitarian regime.",
        "cover_image": {
            "url": "https://thebannedbook.shop/cdn/shop/files/61NAx5pd6XL.jpg?v=1715295618",
            "alt": "Cover image of 1984 by George Orwell",
            "_id": "675c33c61b6f04d3e84aad9c"
        },
        "published_year": 1949
    },
    {
        "title": "The Fault in Our Stars",
        "author": "John Green",
        "isbn": "9780525478812",
        "price": 150.99,
        "category": "Young Adult",
        "stock": 100,
        "description": "A story about young love and terminal illness.",
        "cover_image": {
            "url": "https://image.bokus.com/images/9780141345659_383x_the-fault-in-our-stars_haftad",
            "alt": "Cover image of The Fault in Our Stars",
            "_id": "675c33c61b6f04d3e84aad9d"
        },
        "published_year": 2012
    }
];

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
const createItemInfo = (title, isbn) => {
    const itemInfo = document.createElement("div");
    itemInfo.setAttribute("data-isbn", isbn);
    itemInfo.classList.add("grid-content", "item-info");
    itemInfo.innerHTML = `<ul><li>${title}</li><li class="text-small">${isbn}</li></ul>`;

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

//Function to create checkout button
const createCheckoutButton = () => {
    const checkoutButton = document.createElement("button");
    checkoutButton.classList.add("checkout-button");
    checkoutButton.innerText = "Betala";

    return checkoutButton;
}

//Function to calculate and render total price for all items in cart
const renderTotalPrice = () => {
    const totalCost = cartItems.reduce((total, { price }) => {
        return total + price;
    }, 0);

    cartTotal.innerText = `Totalpris: ${totalCost} kr`;

    return totalCost;
}

const handleIncreaseButton = (isbn) => {
    const bookToAdd = cartItems.find((book) => book.isbn === isbn);

    const newBook = { ...bookToAdd };
    cartItems.push(newBook);

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

    renderCartItems();
}

//Function for rendering cart items and their respective data
const renderCartItems = () => {
    //Clear the cartItemHolder container
    cartItemHolder.innerHTML = "";

    // If no items are in the cart, display message
    if (cartItems.length === 0) {
        const emptyCartMsg = document.createElement("p");
        emptyCartMsg.classList.add("empty-message");
        emptyCartMsg.innerText = "Din varukorg är tom."

        cartItemHolder.appendChild(emptyCartMsg);
        // If there are items in the cart, render the items, the total price and checkout button
    } else {

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

            cartItemHolder.append(itemImageHolder, itemQuantityHolder, itemInfo, itemPrice);
        })

        //Render the total price
        renderTotalPrice();
        // Create and append the checkout
        const checkoutButton = createCheckoutButton();
        mainContentHolder.appendChild(checkoutButton);

    }
}

renderCartItems();
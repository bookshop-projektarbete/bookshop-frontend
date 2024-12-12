const cartItemHolder = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total")
console.log('cartTotal:', cartTotal)
console.log('cartItemHolder:', cartItemHolder)

const cartItems = [{
    "_id": "6756f2bf23581d968ded9e4d",
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "isbn": "9780061120084",
    "price": 7.99,
    "category": "Classic Literature",
    "stock": 35,
    "description": "A novel set in the Depression-era Deep South, revolving around racial injustice.",
    "cover_image": {
        "url": "https://image.bokus.com/images/9789100161330_383x_dodssynden_storpocket",
        "alt": "Cover image of To Kill a Mockingbird by Harper Lee",
        "_id": "67594a4e700a7f8585c637dd"
    }
},
{
    "_id": "6756f2bf23581d968ded9e4e",
    "title": "1984",
    "author": "George Orwell",
    "isbn": "9780451524935",
    "price": 9.99,
    "category": "Dystopian",
    "stock": 20,
    "description": "A novel about a dystopian future where society is controlled by a totalitarian regime.",
    "cover_image": {
        "url": "https://image.bokus.com/images/9789173539678_383x_nitton-attiofyra-1984_pocket",
        "alt": "Cover image of 1984 by George Orwell",
        "_id": "67594a4e700a7f8585c637de"
    }
},
{
    "_id": "6756f2bf23581d968ded9e4e",
    "title": "1984",
    "author": "George Orwell",
    "isbn": "9780451524935",
    "price": 9.99,
    "category": "Dystopian",
    "stock": 20,
    "description": "A novel about a dystopian future where society is controlled by a totalitarian regime.",
    "cover_image": {
        "url": "https://image.bokus.com/images/9789173539678_383x_nitton-attiofyra-1984_pocket",
        "alt": "Cover image of 1984 by George Orwell",
        "_id": "67594a4e700a7f8585c637de"
    }
},
{
    "_id": "6756f2bf23581d968ded9e4e",
    "title": "1984",
    "author": "George Orwell",
    "isbn": "9780451524935",
    "price": 9.99,
    "category": "Dystopian",
    "stock": 20,
    "description": "A novel about a dystopian future where society is controlled by a totalitarian regime.",
    "cover_image": {
        "url": "https://image.bokus.com/images/9789173539678_383x_nitton-attiofyra-1984_pocket",
        "alt": "Cover image of 1984 by George Orwell",
        "_id": "67594a4e700a7f8585c637de"
    }
}
];

console.log(cartItems);

const uniqueCartItems = [
    ...cartItems.filter((book, index, cartItems) =>
        index === cartItems.findIndex((currentCartItem) => (
            currentCartItem.isbn === book.isbn
        ))
    )
];

const createItemImageHolder = ({ url, alt }) => {
    const itemImageHolder = document.createElement("div");
    itemImageHolder.className = "item-image-holder";
    const itemImage = document.createElement("img")
    itemImage.className = "item-image";
    itemImage.src = url;
    itemImage.alt = alt;

    itemImageHolder.appendChild(itemImage);

    return itemImageHolder;
}

const createItemQuantity = (isbn) => {
    const itemQuantityHolder = document.createElement("div");
    itemQuantityHolder.classList.add("grid-content", "item-quantity");
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

    return itemQuantityHolder;
}

const handleItemQuantity = (isbn) => {
    const filteredByIsbn = cartItems.filter((book) => book.isbn === isbn);
    return filteredByIsbn.length;
}

const createItemInfo = (title, isbn) => {
    const itemInfo = document.createElement("div");
    itemInfo.classList.add("grid-content", "item-info");
    itemInfo.innerHTML = `<ul><li>${title}</li><li class="text-small">${isbn}</li></ul>`;

    return itemInfo;
}

const createItemPrice = (price) => {
    const itemPrice = document.createElement("div");
    itemPrice.classList.add("grid-content", "item-price");
    itemPrice.innerHTML = `<p>${price} kr</p>`;

    return itemPrice;
}

const renderTotalPrice = () => {
    const totalCost = cartItems.reduce((total, { price }) => {
        return total + price;
    }, 0);

    cartTotal.innerText += ` ${totalCost} kr`;

    return totalCost;
}


const renderCartItems = () => {
    uniqueCartItems.map(({ title, author, isbn, price, cover_image }) => {
        const itemImageHolder = createItemImageHolder(cover_image);
        const itemQuantityHolder = createItemQuantity(isbn);
        const itemInfo = createItemInfo(title, isbn, author);
        const itemPrice = createItemPrice(price);

        cartItemHolder.append(itemImageHolder, itemQuantityHolder, itemInfo, itemPrice);
    })

    renderTotalPrice();
}

renderCartItems();

const cartItemHolder = document.getElementById("cart-items");
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
}
];

console.log(cartItems);




const renderCartItems = () => {
    cartItems.map(({ title, author, isbn, price, cover_image }) => {
        console.log(author, price)
        const itemImageHolder = document.createElement("div");
        itemImageHolder.className = "item-image-holder";
        const itemImage = document.createElement("img")
        itemImage.className = "item-image";
        itemImage.src = cover_image.url;
        itemImage.alt = cover_image.alt

        const itemQuantity = document.createElement("div");
        itemQuantity.className = "item-quantity";
        itemQuantity.innerHTML = `<p>1</p>`

        const itemInfo = document.createElement("div");
        itemInfo.className = "item-info";
        itemInfo.innerHTML = `<ul><li>${title}</li><li>${author}</li><li>${isbn}</li></ul>`;
        const itemPrice = document.createElement("div");
        itemPrice.className = "item-price";
        itemPrice.innerHTML = `<p>${price} kr</p>`



        cartItemHolder.append(itemImageHolder, itemQuantity, itemInfo, itemPrice)
        itemImageHolder.appendChild(itemImage)
    })
}

renderCartItems();

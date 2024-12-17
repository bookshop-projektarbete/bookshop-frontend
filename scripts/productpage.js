
// Fetch API - specific book 

// Fetch all data
async function fetchBookData() {
    try {
        const response = await fetch(`https://bookshop-backend-phi.vercel.app/products/`); 
        const books = await response.json();
        if (books) {
            return books;
        } else {
            console.error('No books recieved from API');
        }
    } catch (error) {
        console.error('Error fetching book:', error);
    }
}

// Find and display book info from id
async function displayBookData(id) {
    const data = await fetchBookData();
    const book = data.find(books => books._id === id);
    
    if (book) {
        console.log(`Title: ${book.title}`);
        document.getElementById('pp-book-img').src = book.cover_image.url;
        document.getElementById('pp-book-img').alt = book.title;

        document.getElementById('pp-title').textContent = book.title;
        document.getElementById('pp-author').textContent = book.author;
        document.getElementById('pp-isbn').textContent = `ISBN: ${book.isbn}`;
        document.getElementById('pp-category').textContent = `Kategori: ${book.category}`;

        document.getElementById('pp-summary').textContent = `Sammanfattning: ${book.description}`;

        document.getElementById('pp-price').innerHTML = `${book.price} SEK`;
    } else {
        console.log(`Book not found`);
        }
};

// Display book info on page (with example id for now)
displayBookData("6756f2bf23581d968ded9e4c");

const addToCartBtn = document.getElementById('pp-add-button');

// Display added to cart-message, 5s with fade out
addToCartBtn.addEventListener ('click', function(event){
    event.preventDefault();
    const addedMessage = document.getElementById('added-message');
    addedMessage.style.opacity = "1";
    addedMessage.style.display = "inline-block"

    setTimeout(() => {
        addedMessage.style.transition = "opacity 0.5s ease-out";
        addedMessage.style.opacity = "0";

        setTimeout(() => {
            addedMessage.style.display = "none";
        }, "500");
        }, "3000");    
});
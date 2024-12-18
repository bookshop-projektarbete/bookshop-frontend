
// Fetch API - specific book 

// Fetch book id from Product View link
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('id');

document.getElementById('pp-loading-message').style.display = 'block';

async function fetchBookData() {
    try {
        const response = await fetch('https://bookshop-backend-phi.vercel.app/products/');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const books = await response.json();
        // Find specific book from bookId
        const book = books.find(item => item._id === bookId)

        if (!book) {
            document.getElementById('pp-main').innerHTML = "No book found";
            return;
        }

        document.getElementById('pp-loading-message').style.display = "none";

        displayBookData(book);
        } catch (error) {
            console.log('Error fetching album data:', error);
            document.getElementById('pp-main').innerHTML = "Error fetching book data";
        }
}

// Display book data from id
function displayBookData(book) {
    document.getElementById('pp-book-img').src = book.cover_image.url;
    document.getElementById('pp-book-img').alt = book.title;

    document.getElementById('pp-title').textContent = book.title;
    document.getElementById('pp-author').textContent = book.author;
    document.getElementById('pp-isbn').textContent = `ISBN: ${book.isbn}`;
    document.getElementById('pp-category').textContent = `Kategori: ${book.category}`;

    document.getElementById('pp-summary').innerHTML = `Sammanfattning:<br> ${book.description}`;

    document.getElementById('pp-price').innerHTML = `${book.price} SEK`;

    document.getElementById('pp-in-stock').innerHTML = `${book.stock}st i lager`;

    const addToCartBtn = document.getElementById('pp-add-button');
    addToCartBtn.addEventListener('click', () => {
        addToCart(book);
    });
}

// Only display data if bookId is valid
if (bookId) {
    fetchBookData();
} else {
    console.log('Error: No book ID in URL');
    document.getElementById('pp-main').innerHTML = "No book found with this ID";
}

const addToCart = (book) => {
    // Fetch books from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Check if book exists in localStorage
    const bookExists = cart.some(item => item._id === book._id);
    if (bookExists) {
      alert("Boken finns redan i varukorgen!");
      return;
    }
  
    // Add book to localStorage
    cart.push(book);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${book.title} har lagts till i varukorgen!`);
  }
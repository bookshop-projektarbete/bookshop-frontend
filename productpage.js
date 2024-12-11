
// Fetch API - specific book

const apiUrl = `https://bookshop-backend-phi.vercel.app/products/`;

async function fetchBookData() {
    try {
        const response = await fetch(`${apiUrl}${id}`); // behövde vi få hjälp att justera API:et för detta?
        const book = await response.json();

        if (book) {
            document.getElementById('pp-book-img').src = book.cover_image.url;
            document.getElementById('pp-book-img').alt = book.title;

            document.getElementById('pp-title').textContent = book.title;
            document.getElementById('pp-author').textContent = book.author;
            document.getElementById('pp-isbn').textContent = `ISBN: ${book.isbn}`;
            document.getElementById('pp-category').textContent = `Kategori: ${book.category}`;

            document.getElementById('pp-summary').textContent = `Sammanfattning: ${book.description}`;

            document.getElementById('pp-price').innerHTML = `${book.price} SEK`;
        } else {
            console.error('No books recieved from API');
        }
    } catch (error) {
        console.error('Error fetching book:', error);
    }
    console.log();
}

fetchBookData();
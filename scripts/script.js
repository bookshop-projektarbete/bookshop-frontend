
/* Product view for home page */
const loader = document.querySelector('.loader');
const bookCardContainer = document.getElementById('card-container');


const showLoader = () => {
  loader.classList.remove('hidden');
  bookCardContainer.classList.add('hidden');
}

const hideLoader = () => {
  loader.classList.add('hidden');
  bookCardContainer.classList.remove('hidden');
};

const searchInput = document.getElementById("main-searchbar");
const searchButton = document.getElementById("main-searchbutton");


const createBookCard = (book) => {
  // Main container
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');

  // Image
  const imgWrapper = document.createElement('div');
  imgWrapper.classList.add('img-wrapper');
  const img = document.createElement('img');
  img.src = book.cover_image.url; /* <--- Connect to db */
  img.alt = book.cover_image.alt; /* <--- Connect to db */
  imgWrapper.appendChild(img);

  // Book info
  const bookInfoWrapper = document.createElement('div');
  bookInfoWrapper.classList.add('book-info-wrapper');
  const bookTitle = document.createElement('h2');
  bookTitle.classList.add('book-title');
  bookTitle.textContent = book.title; /* <--- Connect to db */
  const bookAuthor = document.createElement('h3');
  bookAuthor.classList.add('book-author');
  bookAuthor.textContent = book.author; /* <--- Connect to db */
  bookInfoWrapper.appendChild(bookTitle);
  bookInfoWrapper.appendChild(bookAuthor);

  // Purchase section
  const bookPurchaseWrapper = document.createElement('div');
  bookPurchaseWrapper.classList.add('book-purchase-wrapper');
  const bookPrice = document.createElement('span');
  bookPrice.classList.add('book-price');
  bookPrice.textContent = `${book.price} kr`; /* <--- Connect to db */
  const purchaseButton = document.createElement('button');
  purchaseButton.type = 'button';
  purchaseButton.id = `purchase-button-${book._id}`;
  purchaseButton.classList.add('purchase-button');
  purchaseButton.setAttribute('aria-label', 'Lägg till i varukorgen');
  purchaseButton.setAttribute('title', 'Lägg till i varukorgen');
  const purchaseButtonIcon = document.createElement('i');
  purchaseButtonIcon.classList.add('fa-solid', 'fa-plus', 'icon');
  purchaseButton.appendChild(purchaseButtonIcon);
  bookPurchaseWrapper.appendChild(bookPrice);
  bookPurchaseWrapper.appendChild(purchaseButton);

  // Append children to bookCard
  bookCard.appendChild(imgWrapper);
  bookCard.appendChild(bookInfoWrapper);
  bookCard.appendChild(bookPurchaseWrapper);

  // Append bookCard to container
  bookCardContainer.appendChild(bookCard);
}

// Fetch data from API and add data to book cards
const fetchBooks = async () => {
  try {
    showLoader();
    const response = await fetch('https://bookshop-backend-phi.vercel.app/products');
    const books = await response.json();
    books.forEach(book => {
      createBookCard(book);
    });
  } catch (error) {
    console.error('Failed to fetch books. Please check your API or network connection.', error);
    bookCardContainer.innerHTML = '<p>Det gick inte att ladda böckerna. Försök igen senare.</p>';
  } finally {
    hideLoader();
  }
}

// Fetch data from API and filter search results
const filterBySearch = async (query) => {
    try {
        const response = await fetch('https://bookshop-backend-phi.vercel.app/products');
        const books = await response.json();

        // Filter books
        const filteredBooks = books.filter((book) =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        );

        // Clear previously shown cards
        bookCardContainer.innerHTML = "";

        // Render filtered books
        if (filteredBooks.length > 0) {
            filteredBooks.forEach((book) => createBookCard(book));
        } else {
            bookCardContainer.innerHTML = "<p>Inga böcker matchade din sökning.</p>";
        }
    } catch (error) {
        console.error('Failed to fetch books. Please check your API or network connection.', error);
        bookCardContainer.innerHTML = '<p>Det gick inte att ladda böckerna. Försök igen senare.</p>';
    }
};

// Event listener to search button
searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        filterBySearch(query);
    }
});

// Event listener to search by pressing enter
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
            filterBySearch(query);
        }
    }
});

// On Load
fetchBooks();
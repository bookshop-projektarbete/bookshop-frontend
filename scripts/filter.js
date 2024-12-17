// Cache for books
let booksData = [];

// get data/books from api
async function getData() {
    try {
        const response = await fetch(`https://bookshop-backend-phi.vercel.app/products`);
        if (!response.ok) {
            throw new Error("HTTP error code: " + response.status);
        };
        booksData = await response.json(); // Store books info globally
    } catch (error) {
        console.error('Error fetching data:', error);
    };
};

// clear unnecessary filters before applying
function clearFilters(filters) {
    return filters.filter(value => value && !value.startsWith('all'));
}

// save filtered books to localStorage
function applyFilters() {
    const selectedGenres = clearFilters(searchResults('genreChoice'));
    const selectedAuthors = clearFilters(searchResults('authorChoice'));
    const selectedYears = clearFilters(searchResults('publicationDateChoice'));
    const selectedPrices = clearFilters(searchResults('priceChoice').map(price => parseInt(price)));

    const filteredBooks = booksData.filter(book => {
        const bookGenre = book.category?.trim().toLowerCase();
        const bookAuthor = book.author?.trim().toLowerCase();
        const bookYear = book.published_year?.toString();
        const bookPrice = book.price;

        const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(bookGenre);
        const matchesAuthor = selectedAuthors.length === 0 || selectedAuthors.includes(bookAuthor);
        const matchesYear = selectedYears.length === 0 || selectedYears.includes(bookYear);
        const matchesPrice = selectedPrices.length === 0 || selectedPrices.some(price => bookPrice <= price);

        return matchesGenre && matchesAuthor && matchesYear && matchesPrice;
    });

    localStorage.setItem('bookshop_filteredBooks', JSON.stringify(filteredBooks));
    console.log('Filtered books saved to localStorage:', filteredBooks);

    window.location.href = 'index.html';
}

// show or hide the filters
function dropdownFunction(a) {
    document.getElementById(a).classList.toggle('show');
};

// close filters when pressing search button
document.getElementById('searchBtn').addEventListener('click', function () {
    let dropdowns = document.getElementsByClassName('dropdown-content');
    let i;
    for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        };
    };
    applyFilters();
});


///// genre buttons /////

// select all
document.getElementById('checkAllBtn').addEventListener('click', function () {
    const allGenres = document.getElementsByClassName('specificGenre');
    for (let i = 0; i < allGenres.length; i++) {
        allGenres[i].checked = true;
    };
});

// deselect all
document.getElementById('resetBtn').addEventListener('click', function () {
    const allGenres = document.getElementsByClassName('specificGenre');
    for (let i = 0; i < allGenres.length; i++) {
        allGenres[i].checked = false;
    };
});

// check choosen filters
function searchFunction() {
    console.log(searchResults('genreChoice'));
    console.log(searchResults('authorChoice'));
    console.log(searchResults('publicationDateChoice'));
    console.log(searchResults('priceChoice'));
};

function searchResults(name) {
    const nameArray = document.getElementsByName(name);
    return Array.from(nameArray)
        .filter(input => input.checked)
        .map(input => input.value.trim().toLowerCase());
};


///// get information and sort /////

// genre
function genreList() {
    const data = booksData;
    let list = [];
    for (let i = 0; i < data.length; i++) {
        list.push(data[i].category);
    };
    const uniqueList = new Set(list.sort());
    return uniqueList;
};

// author
function authorList() {
    const data = booksData;
    let list = [];
    for (let i = 0; i < data.length; i++) {
        list.push(data[i].author);
    };
    const uniqueList = new Set(list.sort());
    return uniqueList;
};

// publication year
function publicationDateList() {
    const data = booksData;
    let list = [];
    for (let i = 0; i < data.length; i++) {
        list.push(data[i].published_year);
    };
    const uniqueList = new Set(list.sort(function (a, b) { return b - a }));
    return uniqueList;
};

// price
function priceList() {
    const data = booksData;
    let list = [];
    for (let i = 0; i < data.length; i++) {
        list.push(data[i].price);
    };
    list.sort(function (a, b) { return a - b });
    return list;
};


///// create filter options /////

function createFilters() {
    createGenreFilter();
    createAuthorFilter();
    createPublicationDateFilter();
    createPriceFilter();
};

// genre
function createGenreFilter() {
    const uniqueList = genreList();
    uniqueList.forEach(function (value) {
        const filterInput = document.createElement('input');
        filterInput.setAttribute('type', 'checkbox');
        filterInput.setAttribute('id', value);
        filterInput.setAttribute('class', 'specificGenre');
        filterInput.classList.add('filterInput');
        filterInput.setAttribute('name', 'genreChoice');
        filterInput.setAttribute('value', value);
        filterInput.checked = true;

        const filterLabel = document.createElement('label');
        filterLabel.setAttribute('for', value);
        filterLabel.setAttribute('class', 'filterLabel');
        filterLabel.innerText = value;

        const br = document.createElement('br');

        document.getElementById('genreDropdown').append(filterInput, filterLabel, br);
    });
};

// author
function createAuthorFilter() {
    const uniqueList = authorList();
    uniqueList.forEach(function (value) {
        const filterInput = document.createElement('input');
        filterInput.setAttribute('type', 'checkbox');
        filterInput.setAttribute('id', value);
        filterInput.setAttribute('class', 'filterInput');
        filterInput.setAttribute('name', 'authorChoice');
        filterInput.setAttribute('value', value);

        const filterLabel = document.createElement('label');
        filterLabel.setAttribute('for', value);
        filterLabel.setAttribute('class', 'filterLabel');
        filterLabel.innerText = value;

        const br = document.createElement('br');
        document.getElementById('authorDropdown').append(filterInput, filterLabel, br);
    });
};

// publication year
function createPublicationDateFilter() {
    const uniqueList = publicationDateList();
    uniqueList.forEach(function (value) {
        const filterInput = document.createElement('input');
        filterInput.setAttribute('type', 'checkbox');
        filterInput.setAttribute('id', value);
        filterInput.setAttribute('class', 'filterInput');
        filterInput.setAttribute('name', 'publicationDateChoice');
        filterInput.setAttribute('value', value);

        const filterLabel = document.createElement('label');
        filterLabel.setAttribute('for', value);
        filterLabel.setAttribute('class', 'filterLabel');

        filterLabel.innerText = value;

        const br = document.createElement('br');

        document.getElementById('publicationDateDropdown').append(filterInput, filterLabel, br);
    });
};

// price (by 100)
function createPriceFilter() {
    const list = priceList();
    for (let i = 100; i < list.at(-1) + 100; i += 100) {
        const filterInput = document.createElement('input');
        filterInput.setAttribute('type', 'checkbox');
        filterInput.setAttribute('id', i);
        filterInput.setAttribute('class', 'filterInput');
        filterInput.setAttribute('name', 'priceChoice');
        filterInput.setAttribute('value', i);

        const filterLabel = document.createElement('label');
        filterLabel.setAttribute('for', i);
        filterLabel.setAttribute('class', 'filterLabel');

        filterLabel.innerHTML = (i - 100) + '-' + i;

        const br = document.createElement('br');

        document.getElementById('priceDropdown').append(filterInput, filterLabel, br);
    };
};

async function initializeFilters() {
    await getData();
    createFilters();
}

// on page load
initializeFilters();
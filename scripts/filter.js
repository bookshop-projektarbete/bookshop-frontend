
// get data/books from api
async function getData() {
    try {
        const response = await fetch(`https://bookshop-backend-phi.vercel.app/products`);
        if (!response.ok) {
            throw new Error("HTTP error code: " + response.status);
        };
        const data =  await response.json();
        return data;
    } catch (error) {
        console.log('Some error');
    };
};



// show or hide the filters
function dropdownFunction(a) {
    document.getElementById(a).classList.toggle('show');
};


// close filters when pressing search button
document.getElementById('searchBtn').addEventListener('click', function() {
    let dropdowns = document.getElementsByClassName('dropdown-content');
    let i;
    for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
        };
    };
});



///// genre buttons /////

// select all
document.getElementById('checkAllBtn').addEventListener('click', function() {
    const allGenres = document.getElementsByClassName('specificGenre');
    for (let i = 0; i < allGenres.length; i++) {
        allGenres[i].checked = true;
    };
});

// deselect all
document.getElementById('resetBtn').addEventListener('click', function() {
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
    let list = '';
    for (let i = 0; i < nameArray.length; i++) {
        if (nameArray[i].checked == true) {
            list += nameArray[i].value + ', ';
        };
    };
    return list;
};




///// get information and sort /////

// genre
async function genreList() {
    const data = await getData();
    let list = [];
    for (let i = 0; i < data.length; i++) {
        list.push(data[i].category);
    };
    const uniqueList = new Set(list.sort());
    return uniqueList;
};

// author (by last name)
async function authorList() {
    const data = await getData();
    let list = [];
    for (let i = 0; i < data.length; i++) {
        const fullName = data[i].author;
        const sepName = fullName.split(' ');
        sepName.unshift(sepName.at(-1)+',');
        sepName.pop();
        const newName = sepName.join(' ');
        list.push(newName);
    };
    const uniqueList = new Set(list.sort());
    return uniqueList;
};

// publication year
async function publicationDateList() {
    const data = await getData();
    let list = [];
    for (let i = 0; i < data.length; i++) {
        list.push(data[i].published_year);
    };
    const uniqueList = new Set(list.sort(function(a, b){return b - a}));
    return uniqueList;
};

// price
async function priceList() {
    const data = await getData();
    let list = [];
    for (let i = 0; i < data.length; i++) {
        list.push(data[i].price);
    };
    list.sort(function(a, b){return a - b});
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
async function createGenreFilter() {
    const uniqueList = await genreList();
    uniqueList.forEach (function(value) {
        const filterInput = document.createElement('input');
        filterInput.setAttribute('type', 'checkbox');
        filterInput.setAttribute('id', value);
        filterInput.setAttribute('class', 'specificGenre');
        filterInput.setAttribute('name', 'genreChoice');
        filterInput.setAttribute('value', value);
        filterInput.checked = true;

        const filterLabel = document.createElement('label');
        filterLabel.setAttribute('for', value);
        filterLabel.innerText = value;

        const br = document.createElement('br');
    
        document.getElementById('genreDropdown').append(filterInput, filterLabel, br);
    });
};

// author
async function createAuthorFilter() {
    const uniqueList = await authorList();
    uniqueList.forEach (function(value) {
        const filterInput = document.createElement('input');
        filterInput.setAttribute('type', 'checkbox');
        filterInput.setAttribute('id', value);
        filterInput.setAttribute('name', 'authorChoice');
        filterInput.setAttribute('value', value);

        const filterLabel = document.createElement('label');
        filterLabel.setAttribute('for', value);
        filterLabel.innerText = value;

        const br = document.createElement('br');
    
        document.getElementById('authorDropdown').append(filterInput, filterLabel, br);
    });
};

// publication year
async function createPublicationDateFilter() {
    const uniqueList = await publicationDateList();
    uniqueList.forEach (function(value) {
        const filterInput = document.createElement('input');
        filterInput.setAttribute('type', 'checkbox');
        filterInput.setAttribute('id', value);
        filterInput.setAttribute('name', 'publicationDateChoice');
        filterInput.setAttribute('value', value);

        const filterLabel = document.createElement('label');
        filterLabel.setAttribute('for', value);
        filterLabel.innerText = value;

        const br = document.createElement('br');
    
        document.getElementById('publicationDateDropdown').append(filterInput, filterLabel, br);
    });
};

// price (by 100)
async function createPriceFilter() {
    const list = await priceList();
    for (let i = 100; i < list.at(-1)+100; i+=100) {
        const filterInput = document.createElement('input');
        filterInput.setAttribute('type', 'checkbox');
        filterInput.setAttribute('id', i);
        filterInput.setAttribute('name', 'priceChoice');
        filterInput.setAttribute('value', i);

        const filterLabel = document.createElement('label');
        filterLabel.setAttribute('for', i);
        filterLabel.innerHTML = (i -100)+'-'+i;

        const br = document.createElement('br');
    
        document.getElementById('priceDropdown').append(filterInput, filterLabel, br);
    };
};



// run it
createFilters();
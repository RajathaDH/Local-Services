import { fetchData } from '../js/utils.js';

const bookmarksElement = document.querySelector('#bookmarks');
const newBookmarkForm = document.querySelector('#newBookmarkForm');
const searchElement = document.querySelector('#search');
const newBookmarkModal = document.querySelector('.modal-popup');

const BASE_URL = 'http://localhost:5454';

let bookmarks = [];

newBookmarkForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(newBookmarkForm);

    const url = formData.get('url');
    const name = formData.get('name');

    const newBookmark = {
        url,
        name
    };

    const response = await fetch(`${BASE_URL}/api/bookmarks/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBookmark)
    });
    const data = await response.json();
    
    if (data.status === 'success') {
        window.location.reload();
    } else if (data.status === 'error') {
        console.log(data.message);
    }
});

searchElement.addEventListener('keyup', e => {
    const searchValue = e.target.value.toLowerCase();

    if (searchValue === '') {
        outputBookmarksToDOM(bookmarks);
    } else {
        const filteredBookmarks = bookmarks.filter(bookmark => {
            return bookmark.name.toLowerCase().includes(searchValue) || bookmark.url.toLowerCase().includes(searchValue);
        });

        outputBookmarksToDOM(filteredBookmarks);
    }
});

function outputBookmarksToDOM(bookmarks) {
    bookmarksElement.innerHTML = '';

    bookmarks.forEach(bookmark => {
        const bookmarkDiv = `
            <div class="card">
                <h5 class="card-title">${bookmark.name}</h5>
                <p class="card-link">${bookmark.url}</p>
                <a href="${bookmark.url}" class="btn btn-link" target="_blank">Visit Page</a>
            </div>
        `;

        bookmarksElement.innerHTML += bookmarkDiv;
    });
}

function openNewBookmarkModal() {
    newBookmarkModal.style.display = 'flex';
}

function closeNewBookmarkModal() {
    newBookmarkModal.style.display = 'none';
}

// expose functions to global scope, only available inside module by default
window.openNewBookmarkModal = openNewBookmarkModal;
window.closeNewBookmarkModal = closeNewBookmarkModal;

async function init() {
    const data = await fetchData(`${BASE_URL}/api/bookmarks`);
    bookmarks = data.bookmarks;

    outputBookmarksToDOM(bookmarks);
}

init();
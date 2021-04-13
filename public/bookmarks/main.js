import { fetchData } from '../utils.js';

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
    const searchValue = e.target.value;

    if (searchValue === '') {
        outputBookmarksToDOM(bookmarks);
    } else {
        const filteredBookmarks = bookmarks.filter(bookmark => {
            return bookmark.name.includes(searchValue) || bookmark.url.includes(searchValue);
        });

        outputBookmarksToDOM(filteredBookmarks);
    }
});

function outputBookmarksToDOM(bookmarks) {
    bookmarksElement.innerHTML = '';

    bookmarks.forEach(bookmark => {
        const bookmarkDiv = `
            <div class="bookmark">
                <h5 class="bookmark-title">${bookmark.name}</h5>
                <p class="bookmark-link">${bookmark.url}</p>
                <a href="${bookmark.url}" class="bookmark-visit-btn" target="_blank">Visit Page</a>
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

window.openNewBookmarkModal = openNewBookmarkModal;
window.closeNewBookmarkModal = closeNewBookmarkModal;

async function init() {
    const data = await fetchData(`${BASE_URL}/api/bookmarks`);
    bookmarks = data.bookmarks;

    outputBookmarksToDOM(bookmarks);
}

init();
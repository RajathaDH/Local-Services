const bookmarksElement = document.querySelector('#bookmarks');
const newBookmarkForm = document.querySelector('#newBookmarkForm');
const searchElement = document.querySelector('#search');

const BASE_URL = 'http://localhost:5454';

let bookmarks = [];

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

async function getBookmarks() {
    const result = await fetch(`${BASE_URL}/api/bookmarks`);
    const data = await result.json();

    return data.bookmarks;
}

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

async function init() {
    bookmarks = await getBookmarks();

    outputBookmarksToDOM(bookmarks);
}

init();
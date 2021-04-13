const bookmarksDiv = document.getElementById('bookmarks');
const bookmarkForm = document.getElementById('bookmarkForm');
const bookmarkModal = document.getElementById('addBookmark');
const search = document.getElementById('search');

let bookmarks = [];

search.addEventListener('keyup', e => {
    outputBookmarksToDOM(e.target.value);
});

getBookmarks();

async function getBookmarks() {
    const result = await fetch('./bookmarks.json');

    const data = await result.json();

    bookmarks = data.bookmarks;

    outputBookmarksToDOM();
}

function outputBookmarksToDOM(search = '') {
    bookmarksDiv.innerHTML = '';

    const filteredBookmarks = bookmarks.filter(bookmark => {
        return bookmark.name.includes(search) || bookmark.url.includes(search);
    });

    filteredBookmarks.forEach(bookmark => {
        const bookmarkDiv = `
            <div class="col-sm-6 mb-2">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${bookmark.name}</h5>
                        <p class="card-text">${bookmark.url}</p>
                        <a class="btn btn-primary" href="${bookmark.url}" target="_blank">Go</a>
                    </div>
                </div>
            </div>
        `;

        bookmarksDiv.innerHTML += bookmarkDiv;
    });
}
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
        const outerDiv = document.createElement('div');
        outerDiv.classList.add('col-sm-6');
        outerDiv.classList.add('mb-2');

        const card = document.createElement('div');
        card.className = 'card';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const heading = document.createElement('h5');
        heading.className = 'card-title';
        heading.textContent = bookmark.name;

        const para = document.createElement('p');
        para.className = 'card-text';
        para.textContent = bookmark.url;

        const link = document.createElement('a');
        link.classList.add('btn');
        link.classList.add('btn-primary');
        link.href = bookmark.url;
        link.textContent = 'Go';
        link.setAttribute('target', '_blank');

        cardBody.appendChild(heading);
        cardBody.appendChild(para);
        cardBody.appendChild(link);

        card.appendChild(cardBody);

        outerDiv.appendChild(card);

        bookmarksDiv.appendChild(outerDiv);
    });
}

/*bookmarkForm.addEventListener('submit', e => {
    e.preventDefault();

    const url = bookmarkForm.elements.url.value;
    const name = bookmarkForm.elements.name.value;

    addBookmark(url, name);
});*/

/*async function addBookmark(url, name) {
    const newBookmark = {
        url,
        name
    };
    fetch('http://localhost:5454/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBookmark)
    });
}*/
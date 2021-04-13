import { fetchData } from '../js/utils.js';

const deploysElement = document.querySelector('#deploys');
const newDeployForm = document.querySelector('#newDeployForm');
const searchElement = document.querySelector('#search');
const newDeployModal = document.querySelector('.modal-popup');

const BASE_URL = 'http://localhost:5454';

let deploys = [];

newDeployForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(newDeployForm);

    const url = formData.get('url');
    const name = formData.get('name');

    const newBookmark = {
        url,
        name
    };

    const response = await fetch(`${BASE_URL}/api/deploys/new`, {
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
        outputDeploysToDOM(deploys);
    } else {
        const filteredDeploys = deploys.filter(deploy => {
            return deploy.name.toLowerCase().includes(searchValue) || deploy.url.toLowerCase().includes(searchValue);
        });

        outputDeploysToDOM(filteredDeploys);
    }
});

function outputDeploysToDOM(deploys) {
    deploysElement.innerHTML = '';

    deploys.forEach(bookmark => {
        const deployDiv = `
            <div class="card">
                <h5 class="card-title">${bookmark.name}</h5>
                <p class="card-link">${bookmark.url}</p>
                <a href="${bookmark.url}" class="btn btn-link" target="_blank">Visit Page</a>
            </div>
        `;

        deploysElement.innerHTML += deployDiv;
    });
}

function openNewDeployModal() {
    newDeployModal.style.display = 'flex';
}

function closeNewDeployModal() {
    newDeployModal.style.display = 'none';
}

// expose functions to global scope, only available inside module by default
window.openNewDeployModal = openNewDeployModal;
window.closeNewDeployModal = closeNewDeployModal;

async function init() {
    const data = await fetchData(`${BASE_URL}/api/deploys`);
    deploys = data.deploys;

    outputDeploysToDOM(deploys);
}

init();
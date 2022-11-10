

function testApp(value) {
    testRouter(value)
}

/**
 * Defines the templates used.
 */
template('home', home)
template('rytter', rytter)
template('etaper', etaper)
template('login', login)
template('logout', logout)
template('admin', admin)
template('snippets', snippets)

/**
 * Defines the #/... url routes and the templeas they match..
 */
route('/', 'home');
route('/rytter', 'rytter');
route('/etaper', 'etaper');
route('/login', 'login');
route('/logout', 'logout');
route('/admin', 'admin');
route('/snippets', 'snippets');

function cloneHtmlTemplate(id) {
    let div = document.createElement('div');
    const template = document.querySelector(`#${id}`);
    const clone = template.content.cloneNode(true);
    div.appendChild(clone)
    return div
}
/**
 * Home route action.
 */
function home() {
    $('#view').html(cloneHtmlTemplate('template-home'));
}

function etaper() {
    let x = 10
    $('#view').html(`<b>Dette er en liste af ${x} etaper</b>`);
}


/**
 * About route action.
 */
function rytter() {
    $('#view').html(cloneHtmlTemplate('template-rytter'));
};

/**
 * Login route action.
 */
function login() {
    let username = $('#username').val()
    let password = $('#password').val()
    let roles = ['Admin', 'Developer', 'User']

    createUserSession(username, btoa(password), roles)
    toggleLoginUI(false)

    home()
};

/**
 * Logs out route action.
 */
function logout() {
    resetUserSession()
    toggleLoginUI(true)
    home()
}

/**
 * Restricted route action.
 */
function admin() {

    if (isLoggedIn()) {
        let div = document.createElement('div');
        let data = [{
            brand: "Audi",
            model: "Quatro",
            price: 1000000
        }, {
            brand: "BMW",
            model: "i7",
            price: 1200000
        }, {
            brand: "Ford",
            model: "Mustang",
            price: 890000,
        }, {
            brand: "Honda",
            model: "Civic",
            price: 24000,
        }, {
            brand: "Jaguar",
            model: "X10",
            price: 780000,
        }, {
            brand: "Nissan",
            model: "Primera",
            price: 65000
        }];

        div.innerHTML = '<h1>Admin</h1>';

        const tableTemplate = document.querySelector('#template-producttable');
        const tableClone = tableTemplate.content.cloneNode(true);

        const tbody = tableClone.querySelector("tbody");
        const tdTemplate = document.querySelector('#template-productrow');

        for (let key in data) {
            const entry = data[key]
            const tdClone = tdTemplate.content.cloneNode(true);
            let td = tdClone.querySelectorAll("td");
            td[0].textContent = entry.brand;
            td[1].textContent = entry.model;
            td[2].textContent = entry.price;

            tbody.appendChild(tdClone);
        }
        div.appendChild(tableClone)
        $('#view').html(div);

    } else {
        $('#view').html(`<h1>You're not logged in, which is required for this page.</h1>`);
    }
};

/**
 * Snippets.
 */
 function snippets() {
    location.href = '../index.html'
}

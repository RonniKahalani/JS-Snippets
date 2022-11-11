'use strict'

/**
 * Route template constants.
 */
const ROUTE_TEMPLATE_KEY_HOME = 'home'
const ROUTE_TEMPLATE_KEY_ABOUT = 'about'
const ROUTE_TEMPLATE_KEY_LOGIN = 'login'
const ROUTE_TEMPLATE_KEY_LOGOUT = 'logout'
const ROUTE_TEMPLATE_KEY_ADMIN = 'admin'
const ROUTE_TEMPLATE_KEY_SNIPPETS = 'snippets'

/**
 * Route constants.
 */
const ROUTE_HOME = '/'
const ROUTE_ABOUT = '/about'
const ROUTE_LOGIN = '/login'
const ROUTE_LOGOUT = '/logout'
const ROUTE_ADMIN = '/admin'
const ROUTE_SNIPPETS = '/snippets'

/**
 * Defines the routing templates used.
 */
template(ROUTE_TEMPLATE_KEY_HOME, home)
template(ROUTE_TEMPLATE_KEY_ABOUT, about)
template(ROUTE_TEMPLATE_KEY_LOGIN, login)
template(ROUTE_TEMPLATE_KEY_LOGOUT, logout)
template(ROUTE_TEMPLATE_KEY_ADMIN, admin)
template(ROUTE_TEMPLATE_KEY_SNIPPETS, snippets)

/**
 * Defines the #/... url routes and the templates they match..
 */
route(ROUTE_HOME, ROUTE_TEMPLATE_KEY_HOME);
route(ROUTE_ABOUT, ROUTE_TEMPLATE_KEY_ABOUT);
route(ROUTE_LOGIN, ROUTE_TEMPLATE_KEY_LOGIN);
route(ROUTE_LOGOUT, ROUTE_TEMPLATE_KEY_LOGOUT);
route(ROUTE_ADMIN, ROUTE_TEMPLATE_KEY_ADMIN);
route(ROUTE_SNIPPETS, ROUTE_TEMPLATE_KEY_SNIPPETS);

/**
 * Clones an embedded HTML template, from the HTML file, via an id.
 */
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

/**
 * About route action.
 */
function about() {
    $('#view').html(cloneHtmlTemplate('template-about'));
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

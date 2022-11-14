'use strict'

/**
 * Route template constants.
 */
const ROUTE_TEMPLATE_KEY_HOME = 'home'
const ROUTE_TEMPLATE_KEY_ABOUT = 'about'
const ROUTE_TEMPLATE_KEY_LOGIN = 'login'
const ROUTE_TEMPLATE_KEY_LOGOUT = 'logout'
const ROUTE_TEMPLATE_KEY_ADMIN = 'admin'

/**
 * Route constants.
 */
const ROUTE_HOME = '/'
const ROUTE_ABOUT = '/about'
const ROUTE_LOGIN = '/login'
const ROUTE_LOGOUT = '/logout'
const ROUTE_ADMIN = '/admin'

const VIEW_ELEMENT_ID = "#view"

/**
 * Defines the routing templates used and their respective render functions/actions.
 */
template(ROUTE_TEMPLATE_KEY_HOME, home)
template(ROUTE_TEMPLATE_KEY_ABOUT, about)
template(ROUTE_TEMPLATE_KEY_LOGIN, login)
template(ROUTE_TEMPLATE_KEY_LOGOUT, logout)
template(ROUTE_TEMPLATE_KEY_ADMIN, admin)

/**
 * Defines the #/... url routes and the templates they match..
 */
route(ROUTE_HOME, ROUTE_TEMPLATE_KEY_HOME);
route(ROUTE_ABOUT, ROUTE_TEMPLATE_KEY_ABOUT);
route(ROUTE_LOGIN, ROUTE_TEMPLATE_KEY_LOGIN);
route(ROUTE_LOGOUT, ROUTE_TEMPLATE_KEY_LOGOUT);
route(ROUTE_ADMIN, ROUTE_TEMPLATE_KEY_ADMIN);

/**
 * Clones an embedded HTML template, from the index.html file, via an id.
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
    $(VIEW_ELEMENT_ID).html( cloneHtmlTemplate('template-home'));
    imageUploader.updateGallery()
}

/**
 * About route action.
 */
function about() {
    $(VIEW_ELEMENT_ID).html( cloneHtmlTemplate('template-about'));
};

/**
 * Login route action.
 */
function login() {
/*
    // jQuery example
    let username = $('#username').val()
    let password = $('#password').val()
*/
    let username = document.getElementById('username').value 
    let password = document.getElementById('password').value
    
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
        $(VIEW_ELEMENT_ID).html( cloneHtmlTemplate('template-upload'));

    } else {
        $(VIEW_ELEMENT_ID).html(`<h1>You're not logged in, which is required for this page.</h1>`);
    }
}
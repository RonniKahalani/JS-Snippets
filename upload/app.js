'use strict'

/**
 * Used to hold cached versions of used HTML templates.
 */
var htmlTemplateCache = new Map()

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

/**
 * Defines the routing templates used.
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
    imageUploader.updateGallery()
}

/**
 * About route action.
 */
function about() {
    $('#view').html( cloneHtmlTemplate('template-about'));
};

/**
 * Login route action.
 */
function login() {
/*
    // jQuery sample
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
        $('#view').html(cloneHtmlTemplate('template-upload'));

    } else {
        $('#view').html(`<h1>You're not logged in, which is required for this page.</h1>`);
    }
}
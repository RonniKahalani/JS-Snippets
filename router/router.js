const ROUTER_LOGIN_UI = '#card-login'
const ROUTER_LOGOUT_UI = '#card-logout'
const ROUTER_RESTRICTED_ANCHOR = '#restricted-anchor'
const ROUTER_USERNAME_UI = '#login-username'

const ROUTER_SESSION_LOGIN = 'router-session-loggedin'
const ROUTER_SESSION_USERNAME = 'router-session-username'
const ROUTER_SESSION_PASSWORD = 'router-session-password'
const ROUTER_SESSION_ROLES = 'router-session-roles'

const ROUTER_SESSION_LAST_LOGIN = 'router-session-lastLogin'
const ROUTER_SESSION_LAST_LOGOUT = 'router-session-lastLogout'

let routes = {};
let templates = {};

/**
 * Removes user data from the session storeage.
 */
function resetUserSession() {
  sessionStorage.removeItem(ROUTER_SESSION_LOGIN);
  sessionStorage.removeItem(ROUTER_SESSION_USERNAME);
  sessionStorage.removeItem(ROUTER_SESSION_PASSWORD);
  sessionStorage.removeItem(ROUTER_SESSION_ROLES);
  sessionStorage.setItem(ROUTER_SESSION_LAST_LOGOUT, new Date());
}

/**
 * Creates user data from a login in the session storage.
 */
 function createUserSession(username, password, roles) {
  sessionStorage.setItem(ROUTER_SESSION_LOGIN, true)
  sessionStorage.setItem(ROUTER_SESSION_USERNAME, username)
  sessionStorage.setItem(ROUTER_SESSION_PASSWORD, password)
  sessionStorage.setItem(ROUTER_SESSION_ROLES, roles)
  sessionStorage.setItem(ROUTER_SESSION_LAST_LOGIN, new Date())
}

/**
 * Update user login related the UI.
 */
function toggleLoginUI(show) {

  let user = getUser()
  if (show) {
    $(ROUTER_LOGIN_UI).show();
    $(ROUTER_LOGOUT_UI).hide();
    $(ROUTER_RESTRICTED_ANCHOR).addClass('disabled');
    $(ROUTER_RESTRICTED_ANCHOR).addClass('btn-danger');
    $(ROUTER_RESTRICTED_ANCHOR).removeClass('btn-success');

  } else {
    $(ROUTER_LOGIN_UI).hide();
    $(ROUTER_USERNAME_UI).html(`${user? user.username : '???'}`).show();
    $(ROUTER_LOGOUT_UI).show();
    $(ROUTER_RESTRICTED_ANCHOR).removeClass('disabled');
    $(ROUTER_RESTRICTED_ANCHOR).addClass('btn-success');
    $(ROUTER_RESTRICTED_ANCHOR).removeClass('btn-danger');
  }
}
/**
 * Defined a route, which can be a function- or template reference. 
 */
function route(path, template) {
  // Is the template a function- or template reference?
  if (typeof template === 'function') {
    return routes[path] = template;
  }
  else if (typeof template === 'string') {
    return routes[path] = templates[template];
  } else {
    // The template was not known, ignoring it.
    return;
  };
};

/**
 * Defines a template.
 */
function template(name, templateFunction) {
  return templates[name] = templateFunction;
};

/**
 * Resolves a route.
 */
function resolveRoute(route) {
  try {
    return routes[route];
  } catch (e) {
    throw new Error(`Route ${route} not found`);
  };
};

/**
 * Returns the current logged in username.
 */
function getUser() {

  if (isLoggedIn()) {
    return {
      username: sessionStorage.getItem(ROUTER_SESSION_USERNAME),
      password: sessionStorage.getItem(ROUTER_SESSION_PASSWORD),
      roles: sessionStorage.getItem(ROUTER_SESSION_ROLES),
      lastLogin: sessionStorage.getItem(ROUTER_SESSION_LAST_LOGIN),
      lastLogout: sessionStorage.getItem(ROUTER_SESSION_LAST_LOGOUT)
    }
  }
}

/**
 * Returns true if the user is logged in.
 */
function isLoggedIn() {
  let loggedIn = sessionStorage.getItem(ROUTER_SESSION_LOGIN)
  let username = sessionStorage.getItem(ROUTER_SESSION_USERNAME)
  let valid = loggedIn === 'true' && username != ''
  return valid
}


/**
 * Routes the urls in the browser location bar. 
 */
function router(evt) {
  let url = window.location.hash.slice(1) || '/';
  let route = resolveRoute(url);

  // Update user login related the UI.
  toggleLoginUI(!isLoggedIn())

  route();
};

/**
 * Window event hooks.
 */
window.addEventListener('load', router);
window.addEventListener('hashchange', router);

/**
 * Form submit action
 */
document.forms['form-login'].onsubmit = (event) => {
  // Avoid any default submit behavior, we want full control.
  event.preventDefault();
  // Go to login route.
  window.location.href = '#/login'
}

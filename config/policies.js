/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/isLoggedIn.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "isLoggedIn")
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.com/docs/concepts/policies
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
  UserController: {

    'me': ['isLoggedInREST'],
    'find': ['isLoggedInREST', 'isAdminREST'],
    'findOne': ['isLoggedInREST', 'isAdminREST'],
    'create': ['isLoggedInREST', 'isAdminREST'],
    'update': ['isLoggedInREST', 'isAdminREST'],
    'destroy': ['isLoggedInREST', 'isAdminREST'],
    'populate': ['isLoggedInREST', 'isAdminREST'],
    'add': ['isLoggedInREST', 'isAdminREST'],
    'remove': ['isLoggedInREST', 'isAdminREST'],

    // Require requests to come from a logged-in user for most actions
    // '*': 'isLoggedIn',

    // But we'll let anyone access the 'login' action
    // 'login'  : true,

    // 'signup'  : true

    // And we'll only let admins delete users
    // 'destroy': 'isAdmin'

  },

  MeController: {
    '*': ['isLoggedInREST'],
  },

  LocationController: {
    'create': ['isLoggedInREST', 'isAdminREST'],
    'update': ['isLoggedInREST', 'isAdminREST'],
    'destroy': ['isLoggedInREST', 'isAdminREST'],
    'populate': ['isLoggedInREST', 'isAdminREST'],
    'add': ['isLoggedInREST', 'isAdminREST'],
    'remove': ['isLoggedInREST', 'isAdminREST'],
  },
  
};

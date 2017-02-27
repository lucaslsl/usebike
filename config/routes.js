/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  
  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  'get /api/me': 'MeController.details',
  'get /api/me/account': 'MeController.retrieveAccount',
  'patch /api/me/account': 'MeController.updateAccount',
  'get /api/me/account/transactions': 'MeController.retrieveAccountTransactions',
  'get /api/me/pickups': 'MeController.retrievePickups',
  'get /api/me/pickups/:pickupId': 'MeController.retrievePickup',
  'post /api/me/pickups': 'MeController.createPickup',
  'post /api/me/dropoffs': 'MeController.createDropoff',
  'put /api/me/logout': 'MeController.logout',

  'get /api/user/available': 'UserController.available',
  'post /api/user/signup': 'UserController.signup',
  'post /api/user/createAdmin': 'UserController.createAdmin',
  'put /api/user/login': 'UserController.login',
  

  'get /admin': 'AdminController.home'


  

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};

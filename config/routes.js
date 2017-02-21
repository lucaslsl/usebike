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

  'get /me': 'MeController.details',
  'get /me/account': 'MeController.retrieveAccount',
  'patch /me/account': 'MeController.updateAccount',
  'get /me/pickups': 'MeController.retrievePickups',

  'get /user/available': 'UserController.available',
  'post /user/signup': 'UserController.signup',
  'post /user/createAdmin': 'UserController.createAdmin',
  'put /user/login': 'UserController.login',
  'put /user/logout': 'UserController.logout',
  'get /user/me': 'UserController.me',

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

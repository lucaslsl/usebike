var rootPath = require('app-root-path');

var env = process.env.NODE_ENV || 'development';

module.exports = {

  home: function(req, res) {
    
    if(env==='development'){
      return res.sendFile(rootPath + '/.tmp/public/admin/index.html', {cacheControl: false});
    }else{
      return res.sendFile(rootPath + '/www/admin/index.html', {cacheControl: false});
    }
  }
  
}
const globalLib1 = require('@monodir/global-lib1');
const _ = require('lodash');
module.exports = { 
  sayHello: () => `${globalLib1.sayHello()} and project1-lib. Lodash version: ${_.VERSION}` 
};

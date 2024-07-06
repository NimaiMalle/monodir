const globalLib1 = require('@monodir/global-lib2');
const moment = require('moment');
module.exports = { 
  sayHello: () => `${globalLib1.sayHello()} and project1-lib. Moment version: ${moment.version}` 
};

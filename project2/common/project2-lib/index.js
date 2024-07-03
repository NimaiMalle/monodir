const globalLib2 = require('@monodir/global-lib2');
const moment = require('moment');
module.exports = { 
  sayHello: () => `${globalLib2.sayHello()} and project2-lib. Moment version: ${moment.version}` 
};

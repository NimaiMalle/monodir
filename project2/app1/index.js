const project2Lib = require('@project2/project2-lib');
const _ = require('lodash');
const moment = require('moment');
console.log(project2Lib.sayHello());
console.log(`App2 Lodash version: ${_.VERSION}`);
console.log(`App2 Moment version: ${moment.version}`);

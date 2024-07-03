const project1Lib = require('@project1/project1-lib');
const _ = require('lodash');
const moment = require('moment');
console.log(project1Lib.sayHello());
console.log(`App1 Lodash version: ${_.VERSION}`);
console.log(`App1 Moment version: ${moment.version}`);

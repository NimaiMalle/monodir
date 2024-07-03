const globalLib2 = require("@monodir/global-lib2");
const project2Lib = require("@project2/project2-lib");
const _ = require("lodash");
const moment = require("moment");
console.log(project2Lib.sayHello());
console.log(globalLib2.sayHello());
console.log(`App1 Lodash version: ${_.VERSION}`);
console.log(`App1 Moment version: ${moment.version}`);

const _ = require("lodash");
const moment = require("moment");
//console.log(`TEST: moment = ${moment}`);
module.exports = {
  sayHello: () =>
    `Hi from global-lib2.\n\tLodash version: ${_?.VERSION}\n\tMoment version: ${moment?.version}`,
};

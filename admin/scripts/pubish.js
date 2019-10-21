const publish = require('../helpers/publish.js');

publish().then(() => {
    require('../helpers/mysql.js').end();
    console.log("Published!");
});



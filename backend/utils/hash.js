const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('BrewMaster@2025', 10);
console.log(hash);

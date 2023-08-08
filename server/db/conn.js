const mongoose = require('mongoose');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const db = process.env.DB;

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@bioreino.l8j1rrn.mongodb.net/${db}`,
    );
    console.log('Conectou ao mongoose!');
  } catch (error) {
    console.log('Um erro ocorreu ao tentar se conectar ao mongoose:', error);
  }
}
main();

module.exports = mongoose;

const Connection = require('tedious').Connection;
// const Request = require('tedious').Request;

const config = {
  userName: 'buckeyedseminole',
  password: 'Opspark17',
  server: 'whoscomingtodinner.database.windows.net',
  options: {
    database: 'dinner',
    encrypt: true,
  },
};
const connection = new Connection(config);


connection.on('connect', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('hello world');
  }
});

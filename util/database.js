const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const dbUrl = 'mongodb+srv://admin:admin@cluster0.qfsc0hv.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0';
const mongoConnect = (callback) => {

  MongoClient.connect(dbUrl
  ) .then(client => {
    console.log('Connected!');
    _db = client.db();
    callback();
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

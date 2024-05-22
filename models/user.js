const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
class User {
  constructor(id, name, email, cart) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.cart = cart;
  }

   save() {
    const db = getDb();
    return db
      .collection('users')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection('users')
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }
}
module.exports = User;

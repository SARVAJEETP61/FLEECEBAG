const client = require('../dbConnection');
const dbName = 'yourDatabaseName';
const usersCollection = 'users';

class User {
    static async create(data) {
        const db = client.db(dbName);
        const collection = db.collection(usersCollection);
        return await collection.insertOne(data);
    }

    static async findByEmail(email) {
        const db = client.db(dbName);
        const collection = db.collection(usersCollection);
        return await collection.findOne({ email });
    }
}

module.exports = User;

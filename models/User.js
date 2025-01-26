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
    
    // Fetch all users
    static async findAll() {
        try {
            const db = client.db(dbName);
            console.log('Connected to DB:', dbName);
            const collection = db.collection(usersCollection);
            console.log('Collection accessed:', usersCollection);
            const users = await collection.find({}).toArray();
            console.log('Users fetched:', users);
            return users;
        } catch (error) {
            console.error('Error in findAll:', error);
            throw error;
        }
    }    
}

module.exports = User;
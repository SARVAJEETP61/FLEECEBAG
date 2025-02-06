const client = require('../dbConnection');
const bcrypt = require('bcrypt');
const dbName = 'fleecebagDB';
const usersCollection = 'users';

class User {
    static async create(data) {
        try {
            const db = client.db(dbName);
            const collection = db.collection(usersCollection);
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;
            return await collection.insertOne(data);
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Error creating user');
        }
    }

    static async findByEmail(email) {
        try {
            const db = client.db(dbName);
            const collection = db.collection(usersCollection);
            const user = await collection.findOne({ email });
            if (user) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw new Error('Error finding user');
        }
    }

    static async findAll() {
        try {
            const db = client.db(dbName);
            const collection = db.collection(usersCollection);
            const users = await collection.find({}).toArray();
            return users;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Error fetching users');
        }
    }

    static async comparePassword(plainPassword, hashedPassword) {
        try {
            const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
            return isMatch;
        } catch (error) {
            console.error('Error comparing password:', error);
            throw new Error('Error comparing password');
        }
    }
}

module.exports = User;

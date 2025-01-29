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
    
    // Update a user's reset token and expiry time
    static async updateResetToken(email, resetToken, expiry) {
        try {
            const db = client.db(dbName);
            const collection = db.collection(usersCollection);
            const result = await collection.updateOne(
                { email },
                { $set: { resetToken, resetTokenExpiry: expiry } }
            );
            return result;
        } catch (error) {
            console.error('Error in updateResetToken:', error);
            throw error;
        }
    }

    // Validate a reset token (check if it exists and hasn't expired)
    static async validateResetToken(resetToken) {
        try {
            const db = client.db(dbName);
            const collection = db.collection(usersCollection);
            const user = await collection.findOne({
                resetToken,
                resetTokenExpiry: { $gt: new Date() },  // Ensure token hasn't expired
            });
            return user;
        } catch (error) {
            console.error('Error in validateResetToken:', error);
            throw error;
        }
    }

    // Reset the user's password and clear the reset token
    static async resetPassword(email, hashedPassword) {
        try {
            // console.log('resetToken', resetToken)
            const db = client.db(dbName);
            const collection = db.collection(usersCollection);
            const result = await collection.updateOne(
                { email },
                {
                    $set: { password: hashedPassword },
                    // $unset: { resetToken: '', resetTokenExpiry: '' },  // Remove token after use
                }
            );
            console.log('result resetpswddddd', result)
            return result;
        } catch (error) {
            console.error('Error in resetPassword:', error);
            throw error;
        }
    }
    
}

module.exports = User;
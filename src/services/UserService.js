const userRepository = require("../repositories/UserRepository");

class UserService {
    async getAllUsers () {
        return await userRepository.getAllUsers();   
    }
    async getUserByID(id) {
        return await userRepository.getUserByID(id);
    }
    async createUser(userData) {
        const existUser = await userRepository.getUserByEmail(userData.email);
        if (existUser) {
            throw new Error("Email Existente");
        }
        return await userRepository.createUser(userData);
    }
}
module.exports = new UserService();
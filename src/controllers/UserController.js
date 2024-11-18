const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


class UserController {
    async index(rç, response){
        try {
            const users =  userService.getAllUsers();
            response.status(200).json(users);
        }
        catch (error) {
            response.status(500).json({ message: error, message});
        }

    }

    async show(request, response) {
        const { id } = request.params;

        try {
            const user = await User.findeById(id);
            if (!user) {
                return response.status(404).json({ message: "Usuário näo encontrado"});
            }
            response.status(200).json(user);
        }
        catch (error) {
            response.status(500).json({ messsage: error, message})
        }

    }

    async store(request, response) {
        const { name, email, password } = request.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return reponse.status(400).json({ message: "E-mail já cadastrado, faça login." })
            }
        
        
            const hashedPassword =  await bcrypt.hash(password, 10);
            user = new User ({ name, email, password: hashedPassword });
            await user.save();

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h"
            });

            response.status(201).json({ token });
        }

        catch (error) {
            response.status(500).json({ message: "Erro ao cadastrar usuário" });
        }

    }


    async delete(request, response) {
        const { id } = request.params; 

        try {
            const user = await User.findByIdAndDelete(id); 
            if (!user) {
                return response.status(404).json({ message: "Usuário não encontrado" });
            }
            response.status(200).json({ message: "Usuário deletado" });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

    async login(request, response) {
        const { email, password } = request.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return response.status(400).json({ message: "Credenciais inválidas" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return response.status(400).json({ message: "Credenciais inválidas" });
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            response.json({ token });
        } catch (error) {
            response.status(500).json({ message: "Erro ao fazer login" });
        }
    }
}


module.exports = new UserController();

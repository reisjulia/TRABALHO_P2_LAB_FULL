
const express = require('express'); 
const mongoose = require('mongoose'); 
const dotenv = require('dotenv'); 
const userRoutes = require('./src/routes/UserRoutes'); 
const roomRoutes = require('./src/routes/RoomRoutes');


dotenv.config();

const app = express();
app.use(express.json());


    const PORT = process.env.PORT || 3333;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });



app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);

app.get('/', (req, res) => {
    res.send('Servidor em funcionando');
  });


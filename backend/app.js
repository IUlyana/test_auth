require('dotenv').config();
const express = require('express');

const expressConfig = require('./config/express');
const authRouter = require('./routes/auth.route');


const app = express();
const PORT = 4000;

expressConfig(app);

app.use('/api/auth', authRouter);

app.listen(PORT, () => console.log('server started at 4000'));

require('./db/mongo');

const {PORT} = require('./utils/config');

const express = require('express');

const app = express();

const cors = require("cors");

const { handlerError, logger} = require('./utils/middlewares');

const cocinerosRouter = require('./routes/cocinerosRouter');
const usersRouter = require('./routes/usersRouter');
const loginRouter = require('./routes/loginRouter');

app.use(cors());

app.use(express.json());

app.use(logger);


app.get("/", (req, res) => {

    res.send("<h1> Braian Cardozo - Segundo Parcial</h1>");

});


app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/cocineros', cocinerosRouter);

app.use(handlerError);

app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
});

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');
const cors = require('cors');

let RedisStore = require('connect-redis')(session);

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');

let RedisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () => {
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false
    })
    .then(() => console.log("successfully connected to MongoDB"))
        .catch((error) => {
            console.log(error)
            setTimeout(connectWithRetry, 5000)
    })
}

connectWithRetry();

app.enable("trust proxy");
app.use(cors({

}))

app.use(session({
    store: new RedisStore({ client: RedisClient }),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 3000000
    }
}))

app.use(express.json())

app.get('/api/v1', (req, res) => {
    res.json({ message: 'welcome' })
    console.log("yeah it ran")
})

app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
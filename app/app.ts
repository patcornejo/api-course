import cors from "cors";

import express from "express";
import * as bodyParser from "body-parser"
import {Server} from "http";
import routes from "./routes"

const app = express();
const server = new Server(app);
const options:cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: '*',
    preflightContinue: false
};

app.use(cors(options));
app.use(bodyParser.json({limit: "300mb"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("", routes);

app.set('port', 3010);

server.listen(3010, () => {
    console.log(`Listening in port ${3010}`)
    console.info(`Current NODE_ENV is "${process.env.NODE_ENV}"`)
});


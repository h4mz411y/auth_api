'use strict';
require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const notFoundHandler = require("./handlers/404");
const errorHandler = require("./handlers/500");

const signInRouter=require("./routes/signin.route");
const signUpRouter=require("./routes/signup.route");
const secretRouter=require("./routes/secret.route");
const getUsersRouters=require("./routes/users.route");
const aclRouter =require("./routes/acl.route");
const router =require("./routes/router");
app.get("/" , handleHome)


app.use(express.json());
app.use(signInRouter);
app.use(signUpRouter);
app.use(secretRouter);
app.use(getUsersRouters);
app.use(aclRouter);
app.use(router);

function handleHome(req ,res){
res.send("Home page")


}


app.use("*", notFoundHandler);
app.use(errorHandler); 

function start() {
    app.listen(PORT, () => {
        console.log(`Listen and Running on port ${PORT}`);
    });
}

module.exports = {
    app: app,
    start: start,
};
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const connect = require("./config/dbConnection");
const authToken = require("./lib/auth");
let UsersSchema = require("./models/users");
let httpStatus = require("./constants/httpStatus");


// app.use(cors());
// app.options("*", cors());
app.use(cors({
    origin: 'http://localhost:3001', //(Whatever your frontend url is) 
    credentials: true, // <= Accept credentials (cookies) sent by the client
}));

app.use(cookieParser())
app.use(bodyParser.json());

//Import Routes
const Projects = require("./routes/projects");
const SignupRoute = require("./routes/signup");
const LoginRoute = require("./routes/login");
const LogoutRoute = require("./routes/logout");
const inserttask = require("./routes/managerRoutes");
const fetchTaskDetails = require("./routes/managerRoutes");
const fetchUsers = require("./routes/managerRoutes");
const assignEmp = require("./routes/managerRoutes");
const fetchsheet_data = require("./routes/managerRoutes");
const updateEmpTasks = require("./routes/managerRoutes");
const Status = require("./routes/status");
const Roles = require("./routes/roles");
const Users = require("./routes/users");


app.use(async function (req, res, next) {
    // if (req.method == 'OPTIONS' || req.url == '/auth' || req.url == '/' || req.url == '/api/samlKey' || req.url == '/api/pendoKey' || req.url == '/api/fullStoryKey' || req.url == '/api/trialAccess/start') {
    if (req.url == '/' || req.url == '/login') {
        next();
    } else {
        if (req.headers.authtoken) {
            let result = authToken.verifyToken(req.headers.authtoken);
            if (result && result.status) {
                let userId = result.payload.userId;
                try {
                    const userData = await UsersSchema.findById({ _id: userId }).exec();
                    if (userData._id == userId) {
                        app.locals.userId = userId;
                        next();
                    } else {
                        res.status(404).json({ status: httpStatus.failure, message: 'User doesnot exist.' });
                    }
                } catch (error) {
                    console.log('error while getting user Info', error);
                    res.status(500).json({ status: httpStatus.success, message: 'Unable to find user information due to technical error', error: error.message })
                }
            } else {
                res.status(401).json({ status: httpStatus.failure, message: result.message ? result.message : "Invalid Token" });
            }
        } else {
            res.status(401).json({ status: httpStatus.failure, message: 'Missing auth token in headers' });
        }
    }
});

//MiddleWare
app.use("/signup", SignupRoute);
app.use("/login", LoginRoute);
app.use("/logout", LogoutRoute);
app.use("/addtask", inserttask);
app.use("/fetchtasks", fetchTaskDetails);
app.use("/fetchusers", fetchUsers);
app.use("/assign", assignEmp);
app.use("/fetchsheet", fetchsheet_data);
app.use("/updateTicketDetails", updateEmpTasks);
app.use("/api/roles", Roles);
app.use("/api/status", Status);
app.use("/api/user", Users)
app.use("/api/projects", Projects)



//create connection
connect();

//listen
app.listen(3000);

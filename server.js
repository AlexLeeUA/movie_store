const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const path = require('path');

const users = require("./routes/users");

const app = express();

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));
}

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
    .connect(process.env.MONGOLAB_NAVY_URI, { useNewUrlParser: true })
    .then(()=>console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/users", users);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, function() {
    console.log("Server is running on Port: " + port);
});

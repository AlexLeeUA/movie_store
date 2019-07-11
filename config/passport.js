const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secretOrKey
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, (jws_payload, done) => {
            User.findById(jws_payload.id)
                .then(user=> {
                    if(user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};
const FabricantUser = require("../../model/fabricant.user.model");
const Jwtstrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const secretOrKey = require("../keys").jwt_key;
const options = {secretOrKey};
options.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();

const jwtFabricant = new Jwtstrategy(options, verify );

function verify(payload, done) {
    const id = payload.id ;
    FabricantUser.findById(id)
        .exec()
        .then(user=> {
            done(null, user)
        })
        .catch(err=>done(err, false))
}

module.exports = jwtFabricant;
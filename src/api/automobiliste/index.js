const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const utils = require("../utils");

const providers = ["google", "facebook"];

const AutoMobilisteSchema = new Schema({
    email: {
        type: String,
        index: true,
        unique: true,
        validate: validator.isEmail,
        trim: true
    },
    password: {
        type: String,
        minlength: 4
    },
    providers: [{
        name: {
            type: String,
            enum: providers
        },
        id: {
            type: String,
            validate: () => {}
        }
    }],
    createdOn: {
        type: Date,
        default: Date.now
    }
});

AutoMobilisteSchema.pre("save", utils.preSaveUser);

AutoMobilisteSchema.methods.isValidPasswd = utils.isValidPasswd;

AutoMobilisteSchema.methods.sign = utils.sign;

AutoMobilisteSchema.virtual("type").get(() => utils.USER_TYPE.AUTOMOBILISTE);


AutoMobilisteSchema.methods.toJSON = function () {
    return {
        email: this.email,
        id: this.id,
        token: this.token
    }
};

const Automobiliste = mongoose.model("Automobiliste", AutoMobilisteSchema);

AutoMobilisteSchema.statics.getQueryObject = utils.getAdminQueryObject;
AutoMobilisteSchema.statics.type = () => utils.USER_TYPE.AUTOMOBILISTE;

module.exports = Automobiliste;
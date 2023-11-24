var userSchema = require("../DBSchemas/userSchema");
var bcrypt = require("bcrypt");
var auth = require("../middlewares/auth").createToken;

exports.register = (reqData, cb) => {
    if (!reqData || reqData.query.username == null || reqData.query.password == null) {
        return cb("No data provided", null);
    }
    try {
        let existingUser = userSchema.findOne({
            username: reqData.query.username
        });
        if (existingUser) {
            return cb("User with the same username already exists", null);
        } else {
            let user = new userSchema(reqData.query);
            try {
                bcrypt.hash(reqData.query.password, 10, (err, hashedPassword) => {
                    if (err) {
                        return cb(err, null);
                    } else {
                        user.password = hashedPassword;
                        user.save();
                        return cb(null, {
                            status: 200,
                            data: "User registered successfully"
                        });
                    }
                });
            } catch (err) {
                console.log(err);
                return cb("Unexpected error occurred", null);
            }
        }
    } catch (err) {
        console.log(err);
        return cb("Unexpected error occurred", null);
    }
}

exports.login = async (reqData, cb) => {
    if (!reqData || reqData.query.username == null || reqData.query.password == null) {
        return cb("No data provided", null);
    } else {
        try {
            let existingUser = await userSchema.findOne({
                username: reqData.query.username
            });
            try {
                if (existingUser == null) {
                    return cb("User not found", null);
                } else {
                    bcrypt.compare(reqData.query.password, existingUser.password, (err, isMatch) => {
                        if (err) {
                            return cb(err, null);
                        } else {
                            if (isMatch) {
                                return auth({
                                    _id: existingUser._id
                                }).then((token) => {
                                    return cb(null, {
                                        token: token
                                    });
                                }).catch((err) => {
                                    return cb(err, null);
                                });
                            } else {
                                return cb("Incorrect password", null);
                            }
                        }
                    });
                }
            } catch (err) {
                console.log(err);
                return cb("Unexpected error occurred", null);
            };
        } catch (err) {
            console.log(err);
            return cb("Unexpected error occurred", null);
        }
    }
}
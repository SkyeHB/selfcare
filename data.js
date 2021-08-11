const mongoose = require("mongoose");
const { resolve } = require("path");
const { promises } = require("fs");
const bcrypt = require("bcryptjs");

let Schema = mongoose.Schema;

let users;
let mood;

let moodSchema = new Schema({
    day: String,
    moodPercent: Number,
    moodEmotion: String,
    moodNotes: String
});

let userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    userMood: [moodSchema]
});

module.exports.initialize = function () {
    return new Promise((resolve, reject) => {
        let db = mongoose.createConnection("mongodb+srv://admin:GZTYBSJeQQJN3JYc@cluster0.izzha.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
        db.on('error', (err) => {
            console.log("database error");
        });

        db.once('open', () => {
            console.log('db conn success');
            users = db.model("users", userSchema);
            mood = db.model('mood', moodSchema)
            resolve();
        });
    });
}

module.exports.addUser = function (data) {
    return new Promise((resolve, reject) => {
        for (var i in data) {
            if (data[i] == "") {
                data[i] = null;
            }
        }
        var newUser = new users(data);

        bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(newUser.password, salt))
            .then(hash => {
                newUser.password = hash;
                newUser.save((err) => {
                    if (err) {
                        console.log("Error Saving New User");
                        reject(err);
                    }
                    else {
                        console.log("user saved to DB");
                        resolve();
                    }
                });
            })
            .catch(err => {
                console.log(err);
                reject("hashing error");
            });
    });
}

module.exports.addMood = function (data) {
    return new Promise((resolve, reject) => {
        mood = data.userMood
        console.log(mood);
        if (data) {
            this.getUserByEmail(data.email).then((retUser => {
                console.log(retUser);
                if (retUser.UserMood) {
                    console.log("bgfdhjksbgjkfdsbjgksdfbgfklsdbgjksdf")
                    if (retUser.userMood[retUser.userMood.length - 1] == data.userMood.day) {
                        reject(err)
                    }
                    else {
                        users.updateOne({ email: data.email }, { $push: { userMood: mood } }).exec()
                            .then((data) => {
                                resolve(data);
                            })
                            .catch((err) => {
                                console.log("error" + err);
                                reject(err)
                            })
                    }
                }
                else {
                    users.updateOne({ email: data.email }, { $push: { userMood: mood } }).exec()
                        .then((data) => {
                            resolve(data);
                        })
                        .catch((err) => {
                            console.log("error" + err);
                            reject(err)
                        })
                }
            }
            ))
        }
    })
}

module.exports.getUserByEmail = function (inEmail) {
    return new Promise((resolve, reject) => {
        users.find({ email: inEmail }).exec()
            .then((returnedUsers) => {
                if (returnedUsers.length != 0) {
                    resolve(returnedUsers.map(item => item.toObject()));
                }
                else {
                    reject("No Users found");
                }
            }).catch((err) => {
                console.log("error" + err);
                reject(err);
            });
    });
}

module.exports.validateUser = (data) => {
    return new Promise((resolve, reject) => {
        if (data) {
            this.getUserByEmail(data.email).then((retUser) => {
                bcrypt.compare(data.password, retUser[0].password)
                    .then((result) => {
                        if (result) {
                            console.log(retUser);
                            resolve(retUser);
                        }
                        else {
                            reject(data.password);
                            return;
                        }
                    });
            }).catch((err) => {
                reject(err);
                return;
            });
        }
    });
}

module.exports.addMood

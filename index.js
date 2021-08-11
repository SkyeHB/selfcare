const express = require('express')
var exphbs = require('express-handlebars')
const clientSessions = require("client-sessions");
const bp = require("body-parser");
var path = require('path');
const db = require("./data.js");
const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({
    extended: true
}));

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

app.use(clientSessions({
    cookieName: "session", // this is the object name that will be added to 'req'
    secret: "ThisIsOurappForPRJ666AndThisIsALongUngeussableString", // this should be a long un-guessable string.
    duration: 20 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
    activeDuration: 1000 * 360 // the session will be extended by this many ms each request (1 minute)
}));

app.get("/", (req, res) => {
    res.render("home", {
        title: "home"
    })
})

app.get("/login", (req, res) => {
    res.render("login", {
        title: "login"
    })
})

app.get("/howto", (req, res) => {
    res.render("howto", {
        title: "howto"
    })
})

app.post("/login", (req, res) => {
    db.validateUser(req.body).then((data) => {
        req.session.user = data[0];
        var date = new Date();
        date = date.toDateString();
        if (req.session.user.userMood.length != 0) {
            if (req.session.user.userMood[req.session.user.userMood.length - 1].day == date) {
                res.redirect('/userhome')
            }
            else {
                res.redirect('/moodPercent')
            }
        }
        else {
            res.redirect('/moodPercent')
        }
    }).catch((msg) => {
        console.log(msg);
        res.render("login", {
            warning: "incorrect password and/or email, please try again."
        });
    })
});


app.get("/createAccount", (req, res) => {
    res.render("createAccount", {
        title: "Create Account"
    })
})



app.post("/createAccount", (req, res) => {
    db.addUser(req.body).then(() => {
        res.redirect("/login");
    }).catch((err) => {
        console.log("Error adding user" + err);
        res.redirect("/createAccount");
    });
});

var emotion;
var percent;
var notes;

app.get("/moodPercent", (req, res) => {
    if(req.session.user){
    res.render("moodPercent", {
        title: "Mood Percent"
    })
}
else{
    res.redirect("/")
}
})

app.post("/moodPercent", (req, res) => {
    if(req.session.user){
      percent = req.body.percent;
      console.log(percent)
      res.redirect('/')
    }
    else{
        res.redirect("/")
    }
});

app.get("/moodEmotion", (req, res) => {
    if(req.session.user){
    res.render("moodEmotion", {
        title: "Mood Emotion"
    })
}
else{
    res.redirect("/")
}
});

app.get("/profile", (req, res) => {
    if(req.session.user){
    res.render("profile", {
        title: "Profile",
        name: req.session.user.name,
        email: req.session.user.email
    })
}
else{
    res.redirect("/")
}
});

app.get("/userhome", (req, res) => {
    if(req.session.user){
    month = new Date();
    month = month.getMonth();
    res.render("userhome", {
        title: "User Home",
        userMood: req.session.user.userMood
    })
}
else{
    res.redirect("/")
}
});

app.post("/moodNotes", (req, res) => {
    if(req.session.user){
    notes = req.body.notes
    var date = new Date();
    date = date.toDateString();
    var data = {
        email: req.session.user.email,
        userMood: {
            day: date,
            moodPercent: percent,
            moodEmotion: emotion,
            moodNotes: notes
        }
    }
    
    db.addMood(data).then(() => {
        db.getUserByEmail(req.session.user.email).then((data) => {
            req.session.user = data[0];
            res.redirect('/userHome')
        })
    }).catch((msg) => {
        console.log(msg);
        res.redirect('/login');
    })
}
else{
    res.redirect("/")
}
})

app.get("/moodNotes/:mood", (req, res) => {
    if(req.session.user){
    if (req.params.mood != "angry" && req.params.mood != "sad" && req.params.mood != "anxious" && req.params.mood != "neutral" && req.params.mood != "depressed" && req.params.mood != "happy") {
        res.redirect("/moodEmotion");
    }
    else {
        emotion = req.params.mood
        res.render("moodNotes", {
            title: "Mood Notes",
            data: req.params.mood
        })
    }
}
else{
    res.redirect("/")
}
});

app.get("/insights", (req, res) => {
    if(req.session.user){
    res.render("insights", {
        title: "Insights",
        userMood: encodeURIComponent(JSON.stringify(req.session.user.userMood))
    })
}
else{
    res.redirect("/")
}
})

app.get("/graph", (req, res) => {
    if(req.session.user){
    res.render("graph", {
        title: "graph",
        userMood: encodeURIComponent(JSON.stringify(req.session.user.userMood))
    })
}
else{
    res.redirect("/")
}
})

app.get("/breathingExcersizes", (req, res) => {
    if(req.session.user){
    res.render("breathingExcersizes", {
        title: "breathingExcersizes"
    })
}
else{
    res.redirect("/")
}
})

app.get("/meditations", (req, res) => {
    if(req.session.user){
    res.render("meditations", {
        title: "Meditations",
        userMood: encodeURIComponent(JSON.stringify(req.session.user.userMood))
    })
}
else{
    res.redirect("/")
}
})

app.get("/logout", (req, res) => {
    req.session.reset();
        res.redirect('/');
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Web Server is up and running");
});

db.initialize();
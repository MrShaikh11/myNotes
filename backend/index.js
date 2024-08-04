const dbConn = require("./dbConn");
const cors = require("cors");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const UserModel = require("./models/users.models");
const auth = require("./middlewares/auth.middleware");
const NoteModel = require("./models/notes.models");

require("dotenv").config();
dbConn();

app.use(
  cors(
    cors({
      origin: "https://my-notes-backend-beta.vercel.app/", // Replace with your frontend's origin
      methods: ["GET", "POST", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  )
);
app.use(express.json());

app.get("/notes", auth, (req, res) => {
  try {
    NoteModel.find({ userId: req.user._id }).then((note) => {
      if (note) {
        console.log("hello from /notes");
        // console.log(note);
        res.send(note);
      } else {
        res.send("NO NOTE FOUND!");
      }
    });
  } catch (err) {
    console.log(err.message);
  }
});
app.get("/user", auth, (req, res) => {
  UserModel.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.json({ user });
      } else {
        res.status(404).send("No User Found!");
      }
    })
    .catch((error) => {
      res.status(500).send("Server Error!");
    });
});
app.delete("/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    console.log(noteId);
    const deletedNote = await NoteModel.findByIdAndDelete(noteId);
    if (deletedNote) {
      res.json({ message: "Note deleted successfully", deletedNote });
    } else {
      res.status(404).send("Note not found");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/addNote", auth, (req, res) => {
  const { title, note, createdOn, modifiedOn } = req.body;
  NoteModel.create({
    title: title,
    note: note,
    createdOn: createdOn,
    modifiedOn: modifiedOn,
    userId: req.user._id,
  })
    .then((note) => {
      res.send(note);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});
app.get("/users", auth, (req, res) => {
  UserModel.find({}).then((users) => {
    if (users) {
      res.json({ users });
    } else res.send("No User Found!");
  });
});

app.get("/login", (req, res) => {
  try {
    const { email, password } = req.query;
    UserModel.findOne({ email: email }).then((user) => {
      if (!user) res.send("No such User exists.");
      else {
        if (password == user.password) {
          const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
          );
          res
            .header("Authorization", `Bearer ${token}`)
            .json({ message: "Logged in successfully", token });
        } else res.send("Invalid credentials");
      }
    });
    // res.json({ email, pass });
  } catch (error) {
    res.send("Fetching Users Error: ", error.message);
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  UserModel.findOne({ email: email }).then((user) => {
    if (user) res.send('User with email: "' + user.email + '" already exists!');
    else {
      // console.log("eeeeeee: ", email);
      UserModel.create({
        name: name,
        email: email,
        password: password,
      })
        .then(() => {
          res.send("User succesfully created(Please Login)");
        })
        .catch((error) => {
          res.send(error.message);
        });
    }
  });
});

app.listen(8081, () => {
  console.log("Server is running on PORT 8081 ");
});

import { Hono } from "hono";
import { cors } from "hono/cors";
import { jwt } from "hono/jwt";
import { config } from "dotenv";
import dbConn from "./dbConn";
import UserModel from "./models/users.models";
import NoteModel from "./models/notes.models";
import auth from "./middlewares/auth.middleware";

config();
dbConn();

const app = new Hono();

app.use("*", cors());
app.use("*", async (c, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err.message);
    c.json({ error: err.message }, 500);
  }
});

app.get("/notes", auth, async (c) => {
  try {
    const userId = c.req.user._id;
    const notes = await NoteModel.find({ userId });
    if (notes) {
      console.log("hello from /notes");
      return c.json(notes);
    } else {
      return c.text("NO NOTE FOUND!");
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/user", auth, async (c) => {
  try {
    const user = await UserModel.findById(c.req.user._id);
    if (user) {
      return c.json({ user });
    } else {
      return c.text("No User Found!", 404);
    }
  } catch (err) {
    return c.text("Server Error!", 500);
  }
});

app.delete("/notes/:id", async (c) => {
  try {
    const noteId = c.req.param("id");
    console.log(noteId);
    const deletedNote = await NoteModel.findByIdAndDelete(noteId);
    if (deletedNote) {
      return c.json({ message: "Note deleted successfully", deletedNote });
    } else {
      return c.text("Note not found", 404);
    }
  } catch (err) {
    console.log(err.message);
    return c.text("Internal Server Error", 500);
  }
});

app.post("/addNote", auth, async (c) => {
  try {
    const { title, note, createdOn, modifiedOn } = await c.req.json();
    const newNote = await NoteModel.create({
      title,
      note,
      createdOn,
      modifiedOn,
      userId: c.req.user._id,
    });
    return c.json(newNote);
  } catch (err) {
    return c.text(err.message, 500);
  }
});

app.get("/users", auth, async (c) => {
  try {
    const users = await UserModel.find({});
    if (users) {
      return c.json({ users });
    } else {
      return c.text("No User Found!");
    }
  } catch (err) {
    return c.text("Server Error!", 500);
  }
});

app.get("/login", async (c) => {
  try {
    const { email, password } = c.req.query();
    const user = await UserModel.findOne({ email });
    if (!user) {
      return c.text("No such User exists.");
    } else {
      if (password === user.password) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "1h",
        });
        return c.json({ message: "Logged in successfully", token });
      } else {
        return c.text("Invalid credentials");
      }
    }
  } catch (err) {
    return c.text("Fetching Users Error: " + err.message);
  }
});

app.post("/register", async (c) => {
  try {
    const { name, email, password } = await c.req.json();
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return c.text(`User with email: "${existingUser.email}" already exists!`);
    } else {
      await UserModel.create({ name, email, password });
      return c.text("User successfully created(Please Login)");
    }
  } catch (err) {
    return c.text(err.message, 500);
  }
});

app.listen(8081, () => {
  console.log("Server is running on PORT 8081");
});

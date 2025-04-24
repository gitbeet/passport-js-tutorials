import express from "express";

const app = express();
app.use(express.json());
app.set("view-engine", "ejs");

app.get("/", (req, res) => res.render("index.ejs", { user: "gitbeet" }));
app.get("/sign-in", (req, res) => res.render("sign-in.ejs"));
app.get("/sign-up", (req, res) => res.render("sign-up.ejs"));

app.post("sign-up", () => {});

app.listen(5000, () => console.log("Server running on 5000"));

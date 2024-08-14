// Carregando Módulos
require("dotenv").config();
const express = require("express");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const app = express();
const admin = require("./routes/admin");
const usuarios = require("./routes/usuario");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
require("./models/Postagem");
const Postagem = mongoose.model("postagens");
require("./models/Categoria");
const Categoria = mongoose.model("categorias");
require("./config/auth")(passport);
const db = require("./config/db");
var MongoDBStore = require("connect-mongodb-session")(session);
// Configurações
// Sessão

const store = new MongoDBStore({
  uri: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.advpt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  collection: "mySessions",
});
app.use(
  session({
    secret: "cursodenode",
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.errors = req.flash("error");
  res.locals.user = req.user || null;
  next();
});
// "Express"-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
// Handlebars
app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
// Mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.advpt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Conectado com sucesso!");
  })
  .catch((err) => {
    console.log(`Deu Erro ${err}`);
  });
// Public
app.use(express.static(path.join(__dirname, "public")));
// Rotas
app.get("/", (req, res) => {
  Postagem.find()
    .lean()
    .populate("categoria")
    .sort({ data: "desc" })
    .then((postagens) => {
      res.render("index", { postagens: postagens });
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro interno");
      res.redirect("/404");
    });
});

app.get("/postagem/:slug", (req, res) => {
  Postagem.findOne({ slug: req.params.slug })
    .lean()
    .then((postagem) => {
      if (postagem) {
        res.render("postagem/index", { postagem: postagem });
      } else {
        req.flash("error_msg", "Esta postagem não existe");
        res.redirect("/");
      }
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro interno");
      res.redirect("/");
    });
});

app.get("/404", (req, res) => {
  res.send("Erro 404!");
});

app.get("/categorias", (req, res) => {
  Categoria.find()
    .lean()
    .then((categorias) => {
      res.render("categorias/index", { categorias: categorias });
    })
    .catch((err) => {
      req.flash("error_msg");
      res.redirect("/");
    });
});

app.get("/categorias/:slug", (req, res) => {
  Categoria.findOne({ slug: req.params.slug })
    .lean()
    .then((categoria) => {
      if (categoria) {
        Postagem.find({ categoria: categoria._id })
          .lean()
          .then((postagens) => {
            res.render("categorias/postagens", {
              postagens: postagens,
              categoria: categoria,
            });
          })
          .catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar os posts");
            res.redirect("/");
          });
      } else {
        req.flash("error_msg", "Esta categoria não existe");
        res.redirect("/");
      }
    })
    .catch((err) => {
      req.flash(
        "error_msg",
        "Houve um erro interno ao carregar a página desta categoria"
      );
      res.redirect("/");
    });
});

app.get("/posts", (req, res) => {
  res.send("Lista de Posts");
});
app.use("/admin", admin);
app.use("/usuarios", usuarios);
// Outros
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando em: http://127.0.0.1:3000");
});

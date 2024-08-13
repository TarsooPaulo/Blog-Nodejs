const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Model de Usuario
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: "email", passwordField: "senha" },
      (email, senha, done) => {
        Usuario.findOne({ email: email })
          .lean()
          .then((usuario) => {
            if (!usuario) {
              return done(null, false, { message: "Essa conta não existe" });
            }

            bcrypt.compare(senha, usuario.senha, (erro, batem) => {
              if (erro) {
                console.log(erro);
                return done(erro);
              }

              if (batem) {
                return done(null, usuario);
              } else {
                return done(null, false, { message: "Senha incorreta" });
              }
            });
          })
          .catch((err) => {
            console.log(err);
            return done(err);
          });
      }
    )
  );

  passport.serializeUser((usuario, done) => {
    done(null, usuario._id);
  });

  passport.deserializeUser((id, done) => {
    Usuario.findById(id)
      .lean()
      .then((usuario) => {
        if (usuario) {
          done(null, usuario);
        } else {
          done(null, false, { message: "Usuário não encontrado" });
        }
      })
      .catch((err) => {
        console.log(err);
        done(err, false, { message: "Algo deu errado" });
      });
  });
};

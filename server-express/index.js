/*https://levelup.gitconnected.com/how-to-render-react-app-using-express-server-in-node-js-a428ec4dfe2b*/

const path = require("path");
const express = require("express");
const app = express(); // create express app


// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// ROUTES
app.get('/test', function(req, res) {
  res.json({
    project: "Proyecto ISTEA: Integracion de Sistemas",
    test: "change app name"
  });
});

// FRONT
app.use(express.static(path.join(__dirname, "..", "client-react/build")));
//app.use(express.static("public"));
app.use((req, res) => {
  console.log("paso")
  res.sendFile(path.join(__dirname, "..", "client-react/build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server started on port 5000");
});

module.exports = app
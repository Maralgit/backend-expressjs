const express = require('express')
const app = express()
const path = require("path");
const port = 8000

app.use(express.urlencoded({ extended: false}));

app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', "ejs");
app.set("views", path.join(__dirname, "views"));


const checkTrueFalse = (req, res, next) => {
  req.hasPermision = false;
  next();
 
}
app.use(checkTrueFalse)

const checkUser =(req, res, next) => {
  if(req.body.username === "Maralmaa")
    next();
  else
    res.send("Back")
}

app.get('/', (req, res) => {
  res.render("home", {isPermision: req.hasPermision,
    weather: [
      {city: "Ulaanbaatar", temp: 10, wind: 5},
      {city: "Darkhan", temp: 5, wind: 3},
      {city: "Erdenet", temp: 7, wind: 4},
      {city: "Choibalsan", temp: 8, wind: 2},
      {city: "Hovd", temp: 6, wind: 1},
      {city: "Sukhbaatar", temp: 9, wind: 6}
    ]
  })
});

app.get('/about', (req, res) => {
  res.send('About page!')
})

app.get('/contact', (req, res) => {
  res.send('Contact page!')
})

app.post('/result', checkUser, (req, res) => {
  res.send('Result page!'+req.body.username)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3004;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Cocoon EJS server running at http://localhost:${PORT}`);
});

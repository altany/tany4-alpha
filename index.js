var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.set('views', './views');
app.set('view engine', 'jade')

app.get('/', function (req, res) {
  res.render('index')
})

app.listen(app.get('port'), function () {
  console.log('Example app listening on port ' + app.get('port'));
})
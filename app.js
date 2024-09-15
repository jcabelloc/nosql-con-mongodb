const path = require('path');

const express = require('express');

const raizDir = require('./utils/path');

const bodyParser = require('body-parser')

const errorController = require('./controllers/error');
const mongoConnect = require('./utils/database').mongoConnect;

const adminRoutes = require('./routes/admin');
const tiendaRoutes = require('./routes/tienda');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(raizDir, 'public')));

app.use((req, res, next) => {
  /*
  Usuario.findByPk(1)
    .then(usuario => {
      req.usuario = usuario;
      next();
    })
    .catch(err => console.log(err));*/
  next();
});

app.use('/admin', adminRoutes);
app.use(tiendaRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});

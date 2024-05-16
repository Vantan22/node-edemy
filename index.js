const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const app = express();
const rootDir = require('./util/path');

app.engine('hbs', expressHbs.engine({extname: 'hbs', defaultLayout: 'main-layout', layoutsDir: path.join(rootDir, 'views', 'layouts')}));
app.set('view engine', 'hbs');
app.set('views', 'views');

const adminData = require('./routes/admin');

const shopRouter = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));
app.use('/admin', adminData.routes);
app.use(shopRouter);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});
app.listen(3000);
const express = require('express');
const morgan = require('morgan'); //middlewares (porque siempre va a estar en medio de las peticiones)
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

//settings
app.set('port',process.env.PORT || 3000); //aca defino el puerto de mi servidor, con process.env.PORT digo que si existe que lo tome sino que sea el 3000
app.set('views', path.join(__dirname,'views'));//defino la ruta de la carpeta views, con __dirname defino la ruta hasta src
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    extname:'.hbs'
}));//seria el motor de plantillas y defino una funcion, dentro de esa funcion por defecto digo que se utilize en main
app.set('view engine','.hbs');//para poder utilizar el motor


//middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))//urlencoded para aceptar los datos de los formularios html
//con extended false estoy diciendo que solo voy a recibir datos en formato json


//routes
app.use(require('./routes/index'));

//static files

app.use(express.static(path.join(__dirname,'public')));


module.exports = app;
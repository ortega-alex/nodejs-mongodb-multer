const express = require('express');
const morgan = require('morgan');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid/v4');
const { format } = require('timeago.js')

//initializations
const app = express();
require('./config/database');

//setting
app.set('port' , process.env.PORT || 3000);
app.set('views' , path.join(__dirname , 'views'));
app.set('view engine' , 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
const storage = multer.diskStorage({
    destination: path.join(__dirname , 'public/img/upload'),
    filename: (req , file , cd , filename) => {
        cd(null , uuid() + path.extname(file.originalname));
    }
});
app.use(multer({
    storage : storage
}).single('image'));

//global variables
app.use((req , res , next) => {
    app.locals.format = format;
    next();
});

//routes
app.use(require('./routes/index'));

//static file
app.use(express.static(path.join(__dirname , 'public')));

//start the server 
app.listen(app.get('port') , () => {
    console.log(`server on port ${app.get('port')}`);
});
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/finterest' , {
    useNewUrlParser: true
}).then(() => {
    console.log('db is connected');
}).catch(err => console.log(err.toString()));


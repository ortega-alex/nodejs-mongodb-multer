const { Router } = require('express');
const router = Router();
const Image = require('../models/image');
const { unlink } = require('fs-extra');
const path = require('path');

router.get('/', async (req, res) => {
    const images = await Image.find();
    res.render('index', { images });
});

router.get('/upload', (req, res) => {
    res.render('upload');
});

router.post('/upload', async (req, res) => {
    const { title, description } = req.body;
    const { filename, originalname, mimetype, size } = req.file;
    const image = new Image({
        title,
        description,
        filename,
        path: '/img/upload/' + filename,
        originalname,
        mimetype,
        size
    });

    await image.save();

    res.redirect('/');
});

router.get('/image/:id', async (req, res) => {
    const image = await Image.findById(req.params.id);
    res.render('profile', { image });
});

router.get('/image/:id/delete', async (req, res) => {
    const image = await Image.findByIdAndDelete(req.params.id);
    await unlink(path.resolve('./src/public' + image.path));
    res.redirect('/');
});

module.exports = router;
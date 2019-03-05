const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');


// allow cross-origin
app.use(cors());
// no idea about what this thing below is doing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// api routes
app.get('/', function (req, res) {
    res.send('Hajimemachete señor Machete!')
})
app.use('/tags', require('./tags/tag.controller'));
app.use('/posts', require('./posts/post.controller'));
app.use('/podcasts', require('./podcasts/podcast.controller'));


app.listen(3000, function () {
    console.log('App listening on port 3000! Amerika Fuk Yay')
})


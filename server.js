const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

var port = process.env.PORT || 3000;

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


app.listen(port, function () {
    console.log('App listening on port ' + port + '! Amerika Fuk Yay')
})


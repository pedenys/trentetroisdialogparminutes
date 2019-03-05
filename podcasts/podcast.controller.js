const express = require('express');
const router = express.Router();
const podcastService = require('./podcast.service')


// routes
router.get('/', getAllPodcasts);
router.post('/', getPodcastsByTagName)

module.exports = router;

function getAllPodcasts(req, res, next) {
    podcastService.getAllPodcasts()
        .then(allPods => allPods ? res.send(allPods) : res.send("No podzzz magueule"))
        .catch(err => console.log(err))
}

function getPodcastsByTagName(req, res, next) {
    const tagName = req.body.tagName
    podcastService.getPodcastsByTagName(tagName)
        .then(data => data ? res.send(data) : res.send('No podzzz by tag name magueule'))
        .catch(err => console.log(err))
}



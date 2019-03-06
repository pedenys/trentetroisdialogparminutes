const express = require('express');
const router = express.Router();
const podcastService = require('./podcast.service')


// routes
router.get('/', getAllPodcasts);
router.post('/', getPodcastsByTagName)

module.exports = {
    router,
    getAllPodcasts,
    getPodcastsByTagName
}

function getAllPodcasts(req, res, next) {
    return allPods = podcastService.getAllPodcasts()
        .catch(err => console.log(err))
}

function getPodcastsByTagName(req, res, next) {

    let dataToReturn = podcastService.getPodcastsByTagName(req)
        .then(data => {
            data ? dataToReturn = data : dataToReturn = false;
            return dataToReturn
        })
        .catch(err => console.log(err))
    console.log("dataToReturn vaut " + JSON.stringify(dataToReturn))
    return dataToReturn
}



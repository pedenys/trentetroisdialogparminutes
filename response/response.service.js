const podcastController = require('../podcasts/podcast.controller');

async function handlePodcastAbout(req, res) {
    const data = await podcastController.getPodcastsByTagName(req, res);
    return data
}

async function handlePodcastNumber(req, res) {
    const data = await podcastController.getAllPodcasts(req, res);
    return data
}

module.exports = {
    handlePodcastAbout,
    handlePodcastNumber
}
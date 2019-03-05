const podcastController = require('../podcasts/podcast.controller');

async function handleSquestionPodcastabout(req, res) {
    const data = await podcastController.getPodcastsByTagName(req, res);
    return data
}

module.exports = {
    handleSquestionPodcastabout
}
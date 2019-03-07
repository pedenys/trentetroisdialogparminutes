const podcastController = require('../podcasts/podcast.controller');
const tagController = require('../tags/tag.controller');

async function handlePodcastAbout(req, res) {
    const data = await podcastController.getPodcastsByTagName(req, res);
    return data
}

function handlePodcastTags(ids) {
    const arrayOfTagsName = tagController.getTagNameById(ids);
    return arrayOfTagsName
}

async function handlePodcastNumber(req, res) {
    const data = await podcastController.getAllPodcasts(req, res);
    return data
}

module.exports = {
    handlePodcastAbout,
    handlePodcastNumber,
    handlePodcastTags
}
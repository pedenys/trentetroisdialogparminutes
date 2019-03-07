const express = require('express');
const router = express.Router();
const tagService = require('./tag.service')

// routes
router.get('/', getAllTags);
router.post('/', getTagsByName)
router.get('/id', getIdTag)

module.exports = {
    router,
    getAllTags,
    getTagsByName,
    getIdTag,
    getTagNameById
};

function getAllTags(req, res, next) {
    tagService.getAllTags().then(allTags => allTags ? res.send(allTags) : res.send("No tags")).catch(err => console.log(err))
}

function getTagsByName(req, res, next) {
    const tagName = req.body.tagName
    tagService.getTagsByName(tagName).then(requestedTags => requestedTags ? res.send(requestedTags) : res.sendStatus(404))
}

function getIdTag(tagName) {
    const tagName = req.body.tagName
}

function getTagNameById(ids) {
    const arrayOfTagsName = tagService.getTagNameById(ids)
    return arrayOfTagsName

}

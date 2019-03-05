const express = require('express');
const router = express.Router();
const postService = require('./post.service')


// routes
router.get('/', getAllPosts);       // all authenticated users
router.post('/', getPostsByTagName)

module.exports = router;

function getAllPosts(req, res, next) {
    postService.getAllPosts().then(allPosts => allPosts ? res.send(allPosts) : res.send("No posts magueule")).catch(err => console.log(err))
}

function getPostsByTagName(req, res, next) {
    const tagName = req.body.tagName
    postService.getPostsByTagName(tagName).then(data => data ? res.send(data) : res.send('No posts by tag name magueule')).catch(err => console.log(err))
}



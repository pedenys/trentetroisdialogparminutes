const api = require('../wp-api')
const tagService = require('../tags/tag.service')
const call = require('../helpers/helpers')

module.exports = {
    getAllPosts,
    getPostsByTagName
}

async function getAllPosts() {
    let allTags;
    try {
        await call.axiosGet(api.apiPosts).then(res => allTags = res).catch(err => console.log(err))
        if (allTags) {
            return allTags
        }
        else {
            console.log("aucun tag")
            return false
        }
    }
    catch{
        err => console.log(err);
    }
}

async function getPostsByTagName(tagName) {
    try {
        // 1. On filtre les posts en fonction du tag avec un simple get sur l'api de WP
        const desiredPosts = await call.axiosGet(api.apiPosts, { search: tagName })
        // 2. On renvoie l'array des posts
        if (desiredPosts) {
            return desiredPosts
        }
        else return false
    }
    catch (err) { console.log(err) }
}
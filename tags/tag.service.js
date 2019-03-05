const api = require('../wp-api')
const call = require('../helpers/helpers')

module.exports = {
    getAllTags,
    getTagsByName
}

async function getAllTags() {
    let allTags;
    try {
        await call.axiosGet(api.apiTags).then(res => { allTags = res }).catch(err => console.log(err))
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

async function getTagsByName(tagName) {
    try {
        const desiredTags = await call.axiosGet(api.apiTags, { search: tagName })
        return desiredTags
    }
    catch (err) { console.log(err) }
}
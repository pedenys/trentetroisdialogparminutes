const api = require('../wp-api')
const tagService = require('../tags/tag.service')
const call = require('../helpers/helpers')

module.exports = {
    getAllPodcasts,
    getPodcastsByTagName
}

async function getAllPodcasts() {
    let allPodcasts;
    try {
        const data = await call.axiosGet(api.apiPodcasts)
        const allPodcasts = data.filter(p => p.status == "publish")

        if (allPodcasts) {
            return allPodcasts
        }
        else {
            console.log("aucun post de type podcast à remonter")
            return false
        }
    }
    catch{
        err => console.log(err);
    }
}


async function getPodcastsByTagName(tagName) {
    try {
        // 1. On récupère la totalité des podcasts
        const arrayOfPodcasts = await getAllPodcasts()


        // 2. On récupère l'ID du tagName 
        const tagInfo = await tagService.getTagsByName(tagName)
        const id = tagInfo[0].id

        // 3. Si on a et un id à chercher et des podcasts (normalement oui hein)
        if (arrayOfPodcasts && id) {
            console.log(`arrayOfPodcasts a ${arrayOfPodcasts.length} éléments desquels j'extraie l'id ${id}`)

            let desiredPodcasts = arrayOfPodcasts.filter(p => p.tags.includes(id));

            return desiredPodcasts
        }
        else return
    }
    catch (err) { console.log(err) }
}
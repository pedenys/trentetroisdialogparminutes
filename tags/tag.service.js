const api = require('../wp-api')
const call = require('../helpers/helpers')

module.exports = {
    getAllTags,
    getTagsByName,
    getTagNameById
}

async function getAllTags() {
    let allTags;
    try {
        await call.axiosGet(api.apiTags).then(res => { allTags = res }).catch(err => console.log(err))
        if (allTags) {
            return allTags
        }
        else {
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

/**
 * Je boucle sur les ids des tags du podcast pour les comparer à l'ensemble
 * des tags existants. En cas de concordance, j'ajoute le nom du tag à la
 * liste des noms de tag à retourner.
 * @param {*} tagsIds tableau des ids des tags du podcast cherché par
 * l'utilisateur et dont il faut trouver le nom
 */
async function getTagNameById(tagsIds) {
    try {
        let tagsName = [];

        const allTags = await getAllTags()

        for (let i = 0; i < tagsIds.length; i++) {
            allTags.filter(tag => {
                const isEqual = tag.id == tagsIds[i]
                isEqual ? tagsName.push(tag.name) : null
            })
        }
        return tagsName

    }
    catch (err) { console.log(err) }
}


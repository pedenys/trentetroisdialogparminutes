const express = require('express');
const router = express.Router();
const responseService = require('./response.service')
const helper = require('../helpers/helpers')
const extractNumberFromString = helper.extractNumberFromString
// Import from Dialogflow inlinde editor
// const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');
// routes
router.post('/', dispatchRequest);


/**
 * Import from Dialogflow inline editor
 */

function dispatchRequest(request, response, next) {
    process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

    const agent = new WebhookClient({ request, response });
    // console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    // console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function welcome(agent) {
        agent.add(`Bienvenue dans l'assitant vocal et virtuel pour 33 bits par minute !`);
    }

    function fallback(agent) {
        agent.add(`J'ai pas tout compris. Désolé. Je suis presque plus bête que mon concepteur.`);
        agent.add(`Est-ce que vous pouvez essayer de reformuler ? Je ne suis pas aussi perspicace qu'un humain, hélas…`);
    }
    // Intent : 33bits.squestion.lastpodcast
    async function handlePodcastNumber(agent) {
        // 0. On récupère tous les podcasts
        const data = await responseService.handlePodcastNumber(request, response)

        // 1. On récupère le numéro du podcast demandé par l'utilisateur
        const numberPodcast = request.body.queryResult.parameters['numeroepisode'] // type : any

        // 2. Si l'utilisateur a dit "dernier" ou "premier"
        //  - on définit l'index en fonction de cette réponse.
        // Sinon, on applique des regex pour isoler les chiffres de la requête de l'utilisateur (exemple : "3e" => "3")
        numberPodcast == "dernier" ? index = data.length - 1 : "premier" || numberPodcasts.includes("1") ? index = 0 : index = Number(numberPodcast.trim().replace(/\D+/g, '')) - 1;

        console.log(`L'index vaut ${index} et numberPodcast vaut ${numberPodcast}`)


        // Si on a bien récupéré les podcasts
        if (data) {
            let newIndex = index;
            console.log(`l'index depuis if vaut ${JSON.stringify(index)}`)
            // On cherche le titre
            titre = data[newIndex].title.rendered
            const numero = extractNumberFromString(titre)

            console.log("Les tags du podcast sont au nombre de " + data[newIndex].tags.length)
            let tags = await responseService.handlePodcastTags(data[newIndex].tags)

            const tagsASuppr = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre", "podcast"]

            tags = tags.filter(tag => !tagsASuppr.some(truc => tag.includes(truc)))

            agent.add(`L'épisode ${numero} traite les sujets suivants : ${tags}`)
        }
        // Sinon, message d'erreur
        else {
            agent.add("Désolé, je n'ai pas trouvé ce que vous cherchiez")
        }
    }

    async function handlePodcastAbout(agent) {
        const theme = request.body.queryResult.parameters['theme']

        const data = await responseService.handlePodcastAbout(request, response)

        agent.add("Je mouline un petit peu le temps de vérifier s'il y a un podcast sur " + theme)
        console.log("data")
        console.log(data)
        if (data) {
            titre = data[0].title.rendered
            agent.add("En effet, il s'agit de l'épisode intitulé " + titre)
        }
        else {
            agent.add("Désolé, je n'ai pas trouvé de podcast sur " + theme)
            agent.add("Mais l'erreur est humaine comme disait mon géniteur")
        }
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('33bits.hquestion.podcastabout', handlePodcastAbout);
    intentMap.set('33bits.hquestion.lastpodcast', handlePodcastNumber);
    agent.handleRequest(intentMap);
}

module.exports = router;

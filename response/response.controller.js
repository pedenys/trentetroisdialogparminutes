const express = require('express');
const router = express.Router();
const responseService = require('./response.service')

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

    async function handleSquestionPodcastabout(agent) {
        const theme = request.body.queryResult.parameters['theme']

        const data = await responseService.handleSquestionPodcastabout(request, response)

        agent.add("Je mouline un petit peu le temps de vérifier s'il y a un podcast sur " + theme)
        console.log("data")
        console.log(data)
        if (data) {
            titre = data[0].title.rendered
            agent.add("En effet, il s'agit de l'épisode intitulé " + titre)
        }
        else {
            agent.add("Désolé, je n'ai pas trouvé de podcast sur " + theme)
            agent.add("Mais l'erreur est humaine comme disait mon père")
        }
    }

    // // Uncomment and edit to make your own intent handler
    // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
    // // below to get this function to be run when a Dialogflow intent is matched
    // function yourFunctionHandler(agent) {
    //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
    //   agent.add(new Card({
    //       title: `Title: this is a card title`,
    //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
    //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
    //       buttonText: 'This is a button',
    //       buttonUrl: 'https://assistant.google.com/'
    //     })
    //   );
    //   agent.add(new Suggestion(`Quick Reply`));
    //   agent.add(new Suggestion(`Suggestion`));
    //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
    // }

    // // Uncomment and edit to make your own Google Assistant intent handler
    // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
    // // below to get this function to be run when a Dialogflow intent is matched
    // function googleAssistantHandler(agent) {
    //   let conv = agent.conv(); // Get Actions on Google library conv instance
    //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
    //   agent.add(conv); // Add Actions on Google library responses to your agent's response
    // }
    // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
    // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('33bits.squestion.podcastabout', handleSquestionPodcastabout);
    // intentMap.set('your intent name here', googleAssistantHandler);
    agent.handleRequest(intentMap);
}

module.exports = router;

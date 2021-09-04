const SlackBot = require('slackbots');
const fs = require('fs');
const {
    stretchBodyPartMap,
    renderExercise,
    renderHelp
} = require('./src/helpers');

/*
 * [
 *   {
 *     name: string - name of stretch,
 *     description: name - description of stretch,
 *     posted: number - number of times posted,
 *     purpose: string - purpose of stretch,
 *     body_part: string - body part stretch pertains to
 *   }
 * ]
 */
const stretchesJSON = JSON.parse(fs.readFileSync('./src/stretches.json'));

// dev and debug setup
const IS_DEV = false;
const botChannel = IS_DEV ? 'debug-bots' : 'bots';

// setup bot
const bot = new SlackBot({
    token: 'xoxb-791064995216-813268087569-QZ0Olfw3hPZo7dODlkh7hNtA',
    name: 'Ergo-Bot'
});

// Start handler
bot.on('start', () => {
    bot.postMessageToChannel(
        botChannel,
        ':large_blue_circle: Ergo-Bot is now online. *@Ergo-Bot* will now periodically post ergonomic stretches!'
    );

    // trigger posting interval
    // post a random stretch every time interval
    const interval = IS_DEV ? 30000 : 18e5; // 30 seconds : 30 minutes

    setInterval(() => {
        const stretch =
            stretchesJSON[
                Math.floor(Math.random() * Math.floor(stretchesJSON.length))
            ];

        bot.postMessageToChannel(botChannel, '', renderExercise(stretch));
    }, interval);
});

// Error handler
bot.on('error', err => console.log(err));

// Message handler
bot.on('message', data => {
    if (data.type !== 'message' || data.subtype == 'bot_message') {
        return;
    }

    // only respond when mentioned
    if (!data.text.includes('@UPX7W2KGR')) {
        return;
    }

    // Removes the bot id from the front of the message if it exists
    let message;
    if (data.text.charAt(0) === '<') {
        message = data.text.substr(data.text.indexOf(' ') + 1);
    } else {
        message = data.text;
    }

    // if user asks for help from the bot
    if (message === 'help') {
        bot.postMessageToChannel(botChannel, '', renderHelp());
    } else if (Object.keys(stretchBodyPartMap).includes(message.toLowerCase())) {
        // get the stretch pertaining to the requested body part
        let stretch;
        for (;;) {
            stretch =
                stretchesJSON[
                    Math.floor(Math.random() * Math.floor(stretchesJSON.length))
                ];
            if (stretch.body_part === message.toLowerCase()) {
                break;
            }
        }

        // post selected stretch
        bot.postMessageToChannel(botChannel, '', renderExercise(stretch));
    } else {
        bot.postMessageToChannel(
            botChannel,
            'Unsupported Command. Type `@Ergo-Bot help` for more info!'
        );
    }
});
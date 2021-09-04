// used for list of stretches as well as emoji map
const stretchBodyPartMap = {
    wrist: ':handshake:',
    fingers: ':raised_hand_with_fingers_splayed:',
    shoulders: ':woman-gesturing-ok:',
    back: ':back:',
    legs: ':woman-running:',
    neck: ':man-getting-massage:'
};

// used for rendering slack stretch markdown
const renderExercise = stretch => {
    return {
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `*${stretch.name}* ${stretchBodyPartMap[stretch.body_part]}`
                }
            },
            {
                type: 'divider'
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    // eslint-disable-next-line no-useless-escape
                    text: `*Purpose* :thought_balloon:\n\n>${stretch.purpose}\n\n*Description* :person_doing_cartwheel:\n\n\>${stretch.description}`
                }
            },
            {
                type: 'image',
                title: {
                    type: 'plain_text',
                    text: 'Stretch Demonstration'
                },
                block_id: 'image4',
                image_url: stretch.image_url,
                alt_text: stretch.name
            },
            {
                type: 'divider'
            }
        ]
    };
};

const renderHelp = () => ({
    blocks: [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text:
          '*Body Part Specific Stretches @Ergo-Bot Supports* :notebook_with_decorative_cover:'
            }
        },
        {
            type: 'divider'
        },
        {
            type: 'context',
            elements: [
                {
                    type: 'mrkdwn',
                    text: `${Object.keys(stretchBodyPartMap).join('\n')}`
                }
            ]
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text:
          'Ask for a specific stretch with: `@Ergo-Bot <body part>`\n\n Ex. `@Ergo-Bot shoulders`'
            }
        }
    ]
});

module.exports = {
    stretchBodyPartMap,
    renderExercise,
    renderHelp
};

const fs = require('fs');
const { stretchBodyPartMap, renderExercise } = require('./helpers');
const stretchesJSON = JSON.parse(fs.readFileSync('./src/stretches.json'));

test('stretch map schema snapshot', () => {
    // eslint-disable-next-line no-useless-escape
    const stretchMapSchema = '{\"wrist\":\":handshake:\",\"fingers\":\":raised_hand_with_fingers_splayed:\",\"shoulders\":\":woman-gesturing-ok:\",\"back\":\":back:\",\"legs\":\":woman-running:\",\"neck\":\":man-getting-massage:\"}';
    expect(JSON.stringify(stretchBodyPartMap)).toEqual(stretchMapSchema);
});

test('stretch map retrieval of stretches', () => {
    expect(stretchBodyPartMap['wrist']).toEqual(':handshake:');
    expect(stretchBodyPartMap['fingers']).toEqual(
        ':raised_hand_with_fingers_splayed:'
    );
    expect(stretchBodyPartMap['shoulders']).toEqual(':woman-gesturing-ok:');
    expect(stretchBodyPartMap['back']).toEqual(':back:');
    expect(stretchBodyPartMap['legs']).toEqual(':woman-running:');
    expect(stretchBodyPartMap['neck']).toEqual(':man-getting-massage:');
});

test('slack markdown for multiple exercises', () => {
    const legLiftMock = {
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '*Leg Lift* :woman-running:'
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
                    text: '*Purpose* :thought_balloon:\n\n>Stretch leg muscles.\n\n*Description* :person_doing_cartwheel:\n\n\>Sit forward on the chair so that your back is not touching the chair\'s back. Place feet flat on the floor. With a straight leg, lift one foot a few inches off the floor. Hold momentarily, and return your foot to the floor. Repeat with the other leg.'
                }
            },
            {
                type: 'image',
                title: {
                    type: 'plain_text',
                    text: 'Stretch Demonstration'
                },
                block_id: 'image4',
                image_url: 'https://imgur.com/Uah5gVx.png',
                alt_text: 'Leg Lift'
            },
            {
                type: 'divider'
            }
        ]
    };

    const wristTiltMock = {
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '*Wrist Tilt* :handshake:'
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
                    text: '*Purpose* :thought_balloon:\n\n>To stretch wrist and forearm.\n\n*Description* :person_doing_cartwheel:\n\n\>With hand open and facing down, gently bend wrist from side to side, as far as possible. Hold for 3 to 5 seconds. Repeat 3 times.'
                }
            },
            {
                type: 'image',
                title: {
                    type: 'plain_text',
                    text: 'Stretch Demonstration'
                },
                block_id: 'image4',
                image_url: 'https://imgur.com/yVeX0Ht.png',
                alt_text: 'Wrist Tilt'
            },
            {
                type: 'divider'
            }
        ]
    };

    const shoulderShrugMock = {
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '*Shoulder Shrug* :woman-gesturing-ok:'
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
                    text: '*Purpose* :thought_balloon:\n\n>To relieve early symptoms of tightness or tension in the shoulder and neck area.\n\n*Description* :person_doing_cartwheel:\n\n\>Stand up. Raise the top of your shoulders towards your ears until you feel slight tension in your neck and shoulders. Hold this feeling of tension for 3 to 5 seconds. Then relax your shoulders downward into their normal position. Do this 2 or 3 times.'
                }
            },
            {
                type: 'image',
                title: {
                    type: 'plain_text',
                    text: 'Stretch Demonstration'
                },
                block_id: 'image4',
                image_url: 'https://imgur.com/CXCaOUF.png',
                alt_text: 'Shoulder Shrug'
            },
            {
                type: 'divider'
            }
        ]
    };

    expect(legLiftMock).toEqual(renderExercise(stretchesJSON[12]));
    expect(wristTiltMock).toEqual(renderExercise(stretchesJSON[0]));
    expect(shoulderShrugMock).toEqual(renderExercise(stretchesJSON[4]));
});

test('stretch JSON tests', () => {
    // json length test
    expect(stretchesJSON.length).toEqual(13);

    // json snapshot test
    const JSONsnapshot =
    '[{"name":"Wrist Tilt","purpose":"To stretch wrist and forearm.","description":"With hand open and facing down, gently bend wrist from side to side, as far as possible. Hold for 3 to 5 seconds. Repeat 3 times.","posted":0,"image_url":"https://imgur.com/yVeX0Ht.png","body_part":"wrist"},{"name":"Wrist Rotation","purpose":"To stretch wrist and forearm.","description":"Start by stretching your arm and hand out and slowly rotate the wrist down until you feel a stretch. Hold for 3 to 5 seconds.","posted":0,"image_url":"https://imgur.com/Fyx4w45.png","body_part":"wrist"},{"name":"Wrist Flexion/Rotation","purpose":"To stretch wrist and forearm.","description":"Grasp hand and hold fingers with the other hand. Slowly bend wrist down until you feel a stretch. Hold for 3 to 5 seconds. Relax. Repeat 3 times. Repeat with slow upward bend of the wrist to point of gentle stretch. Hold & relax.","posted":0,"image_url":"https://imgur.com/PMvilWE.png","body_part":"wrist"},{"name":"Finger Stretch","purpose":"To stretch wrist and forearm.","description":"Start with your hand open. Make a fist. Touch your fingertips to the base of your palm, keeping the thumb straight. Gently make a hook. Slide your finger tips up your palm so the tips of your fingers are near the base of your fingers and you should feel a stretch. Don’t force your fingers with your other hand if something is painful.","posted":0,"image_url":"https://imgur.com/uqKmAPf.png","body_part":"fingers"},{"name":"Shoulder Shrug","purpose":"To relieve early symptoms of tightness or tension in the shoulder and neck area.","description":"Stand up. Raise the top of your shoulders towards your ears until you feel slight tension in your neck and shoulders. Hold this feeling of tension for 3 to 5 seconds. Then relax your shoulders downward into their normal position. Do this 2 or 3 times.","posted":0,"image_url":"https://imgur.com/CXCaOUF.png","body_part":"shoulders"},{"name":"Head Glide","purpose":"To stretch neck, chest, and shoulder muscles.","description":"Stand upright. Without lifting your chin, glide your head straight back. You know you are doing this exercise right if it gives you the feeling of a double chin. Hold for 20 counts and repeat 5 to 10 times.","posted":0,"image_url":"https://imgur.com/sNcarYw.png","body_part":"neck"},{"name":"Neck relaxer","purpose":"To relax neck muscles.","description":"Stand up. Drop your head slowly to the left, trying to touch your left ear to your left shoulder. Repeat on the right side. Slowly drop your chin to your chest, turn your head all the way to the left, then turn all the way to the right.","posted":0,"image_url":"https://imgur.com/eULCERd.png","body_part":"neck"},{"name":"Shoulder Roll","purpose":"To relax shoulder muscles.","description":"Slowly roll your shoulders backward 5 times in a circular motion. Then roll shoulders forward 5 times.","posted":0,"image_url":"https://imgur.com/Ogm3zCq.png","body_part":"shoulders"},{"name":"Low Back Stretch","purpose":"To relax the muscles of the low back, and to neutralize the spine.","description":"Stand up. Lightly reach towards the ceiling. Hold for 5-10 seconds. Now reach a little harder while taking a deep breath. Hold for 5 seconds. Relax.","posted":0,"image_url":"https://imgur.com/ivvyeZv.png","body_part":"back"},{"name":"Back/Side Stretch","purpose":"To relax the back and side muscles.","description":"Interlace your fingers and lift your arms over your head, keeping the elbows straight. Press arms as far back as you can. To stretch your sides, slowly lean to the left and then to the right.","posted":0,"image_url":"https://imgur.com/9BIrknr.png","body_part":"back"},{"name":"Middle/Upper Back Stretch","purpose":"To stretch upper and middle back muscles.","description":"Hold your right arm with your left hand just above the elbow. Gently push your elbow toward your left shoulder. Hold stretch for 5 seconds. Repeat with your left arm.","posted":0,"image_url":"https://imgur.com/3nxmCUu.png","body_part":"back"},{"name":"Calf Stretch","purpose":"To stretch ankle muscles.","description":"Stand up. Place 1 foot 1-2 feet behind the other. Then slowly move forward, while keeping your heel on the ground, until you feel a light stretch in your calf. Hold for 5-15 seconds. Repeat with the other leg.","posted":0,"image_url":"https://imgur.com/oQprdyE.png","body_part":"legs"},{"name":"Leg Lift","purpose":"Stretch leg muscles.","description":"Sit forward on the chair so that your back is not touching the chair\'s back. Place feet flat on the floor. With a straight leg, lift one foot a few inches off the floor. Hold momentarily, and return your foot to the floor. Repeat with the other leg.","posted":0,"image_url":"https://imgur.com/Uah5gVx.png","body_part":"legs"}]';
    expect(JSON.stringify(stretchesJSON)).toEqual(JSONsnapshot);

    // imgur link test
    for (let i = 0; i < stretchesJSON.length; i++) {
        expect(stretchesJSON[i].image_url.includes('imgur')).toEqual(true);
    }
});


/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// [START speech_quickstart]
// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const fs = require('fs');


export default class GoogleSTTController {

    public client: any;
    public fileName: string;
    public file: any;
    public audioBytes: any;

    constructor() {

        let clientConfig: any = {
            credentials: {
                private_key: ``,
                client_email: ``
            },
            projectId: ''
        }

        // constructor(opts) {
        //     this._descriptors = {};
        //
        //     // Ensure that options include the service address and port.
        //     opts = Object.assign(
        //       {
        //         clientConfig: {},
        //         port: this.constructor.port,
        //         servicePath: this.constructor.servicePath,
        //       },
        //       opts
        //     );

        // /**
        //  * Construct an instance of SpeechClient.
        //  *
        //  * @param {object} [options] - The configuration object. See the subsequent
        //  *   parameters for more details.
        //  * @param {object} [options.credentials] - Credentials object.
        //  * @param {string} [options.credentials.client_email]
        //  * @param {string} [options.credentials.private_key]
        //  * @param {string} [options.email] - Account email address. Required when
        //  *     using a .pem or .p12 keyFilename.
        //  * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
        //  *     .p12 key downloaded from the Google Developers Console. If you provide
        //  *     a path to a JSON file, the projectId option below is not necessary.
        //  *     NOTE: .pem and .p12 require you to specify options.email as well.
        //  * @param {number} [options.port] - The port on which to connect to
        //  *     the remote host.
        //  * @param {string} [options.projectId] - The project ID from the Google
        //  *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
        //  *     the environment variable GCLOUD_PROJECT for your project ID. If your
        //  *     app is running in an environment which supports
        //  *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
        //  *     your project ID will be detected automatically.
        //  * @param {function} [options.promise] - Custom promise module to use instead
        //  *     of native Promises.
        //  * @param {string} [options.servicePath] - The domain name of the
        //  *     API remote host.
        //  */

        let options: any = {
            clientConfig: clientConfig,
            credentials: clientConfig.credentials,
            projectId: clientConfig.projectId
        }

        this.client = new speech.SpeechClient(options);

        // The name of the audio file to transcribe
        this.fileName =  './assets/audio.raw'; // './assets/onceuponatime.wav';

        // Reads a local audio file and converts it to base64
        this.file = fs.readFileSync(this.fileName);
        this.audioBytes = this.file.toString('base64');

        // The audio file's encoding, sample rate in hertz, and BCP-47 language code
        const audio = {
          content: this.audioBytes,
        };
        const config = {
          encoding: 'LINEAR16',
          sampleRateHertz: 16000,
          languageCode: 'en-US',
          enableWordTimeOffsets: true
        };
        const request = {
          audio: audio,
          config: config,
        };

        // Detects speech in the audio file
        this.client
          .recognize(request)
          // .longRunningRecognize(request)
          .then(data => {
              console.log(data);
            const response = data[0];
            const words = response.results[0].alternatives[0].words;
            console.log(JSON.stringify(words, null, 2));
            const transcription = response.results
              .map(result => result.alternatives[0].transcript)
              .join('\n');
            console.log(`Transcription: ${transcription}`);
          })
          .catch(err => {
            console.error('ERROR:', err);
          });
    }
}

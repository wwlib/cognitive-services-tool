// https://github.com/dialogflow/dialogflow-nodejs-client-v2
// https://medium.com/@tzahi/how-to-setup-dialogflow-v2-authentication-programmatically-with-node-js-b37fa4815d89
// https://dialogflow.com/docs/reference/v1-v2-mapping
// https://github.com/dialogflow/dialogflow-nodejs-client-v2/issues/64

// https://github.com/dialogflow/dialogflow-nodejs-client-v2
// https://medium.com/@tzahi/how-to-setup-dialogflow-v2-authentication-programmatically-with-node-js-b37fa4815d89
// https://dialogflow.com/docs/reference/v1-v2-mapping
// https://github.com/dialogflow/dialogflow-nodejs-client-v2/issues/64

import NLUController, {
    NLUIntentAndEntities
} from '../model/NLUController';

const dialogflow = require('dialogflow');

const testConfig: any = {
    "dialogflow": {
        projectId: "knowledge-graph-414b0",
        clientToken: "22dfca0dc1364f76a7a336ed683f0f64",
        privateKey :"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC47vt+4hoiS3pq\nFulUS8dzmAvWqyC9c+7Rm1WoryZdUhHFdi/Pvz5VY/fiSpwJTIq3iWSrQnY3D5Z+\noMIlr8LakwNChSoZrCk0IgDNQPoAv7DlLnFcmRin876lnyrteAMZEJ8QcCLZKrty\nTZ0e0I10iqT4XCr0HI6GfxG1vq5W1fPV7CqYHx/Ufpk+svPru9OUauS6IYdVw33h\ncV/my+OCLvmYovFsK2PMPJsqP5vVHfpFtAE/TjPVLzr9JBE0rKIcwYGgTmW7WMvI\n8h9k/sFCdVwXEz/fkKE6wsuLJBaG6gy9HB+TVePfoo4PbLiC+woC+Zsn2z1HrQ1V\n5u8aZ5ojAgMBAAECggEADOCbQ5kT78poskV5JuUF9O8j9+U/qOGPQio6Wz4jAkGK\nOkFCEAnFmeWVp7zBQ8aALEqVZ3V/zNK5jIS+MCiefWDaS8IBDfuWfOpXOvOo1O+E\nLlk/DI8ej+dhoZ/FOfbu5EprgRYF3zBiEBIGfFRSXUigNykX1pq8c/IaNhkag7JQ\nvJQJYRsuuK+U8H01Sg9kiDTawGcFp4IEwiam3Z87R5ZZpEkWFcc6ry/0TUAuQ+Ee\nJoKan8iLbUhOKw7m0CnrPN89p08jC/RZPWQFj6uUwrX71QyfEbcW3yeerwLI/zEV\npJglY5tlkSr7BLDDm/MhsiN4F8e8WziX5EMDATlN/QKBgQD1T9eIKJF8rt5HsFRn\nT3iGahPIEcYwFGfjzagIB8lmg+0A71OrlB7Pa9VOmCp3fUBVcGVEHoGT8CV5+05B\nmYImCmtBmmb3D8EXGmdIAs0KBme7A/3jj9yeliHUEoWYVSjC+JKuE5nNwRZTS7LA\n1/F0wDVrCdDMriN26uQbHaH3XQKBgQDA/bFYPTPVz2puGw2V0sd9UcFHRvTgPkNE\nzMW5WlWLupjaatUg08vRPy+mtR3HsfbxLKoyqIRqYzdHl5xuPt91xby9CHfc5XZ8\nPAh5U2BkgLPfAQz+1Zk4D+Mke16gMMv75QdwVbOpe7kDRlVIt3o/DVo8OGqG33AA\nOcNWywY/fwKBgAlYtmyQpyJqAzwWAtFA3OW6KvDHhJaWYHL0hf9wVIMcaa5McBKs\nfRQIFsN81rlgw0++DY2v394EG1lvcsbbE3NhmD6SpHOrXP8FWYQL30YPgmpEt6qw\n84XzUGylHAP20qvDDsulIYoOXkxkKPZiA+gf3qkqYZM6200PnAtQcLhdAoGAc7ww\nDGC3ozM9+kXTAdRjue27YQlWdNwh7zJ2KM/ZmXAPlnyWz5b0Fco0w16+OzGoi71j\nW/nfXwWc8xwivaKK08//fcWETD53rc06r7emiN79/3Bb4L8roYk1iH1Lo/lfevJA\nYcejdLIzo5kcL/2IHCPfx1l12OhJ/HingndCifUCgYEA2Lp6SQdytpk+BPUMc59N\nROL0rpvAFdsgRXAC0J5Qr5tM5DyjWCiRNfZR2LQuFlOPTo8+96Gi89XyM8QVRX7L\nw8Awcz0AgC9zF8clOn08jpBiN6TuhrQ7OhFo6sbwibKn2wBGveoKqtpSLrVWPFEU\nrc/WpJQ5VvjMWF4RNnjdkhs=\n-----END PRIVATE KEY-----\n",
        clientEmail: "dialogflow-rmvwbo@knowledge-graph-414b0.iam.gserviceaccount.com"
    }
}

export type DialogflowQueryInput = {
    text: {
        text: string;
        languageCode: string;
    }
}

export type DialogflowRequest = {
    session: any;
    queryInput: DialogflowQueryInput;
    queryParams?: any;
}

export type DialogflowOutputContext = {
    name: string;
    lifespanCount: number;
    parameters: {
        fields: any
    }
}

export type DialogflowResponse = {
    fulfillmentMessages: any;
    outputContexts: any;
    queryText: string;
    speechRecognitionConfidence: number;
    action: string;
    parameters: any;
    allRequiredParamsPresent: boolean;
    fulfillmentText: string;
    webhookSource: string;
    webhookPayload: any;
    intent: any;
    intentDetectionConfidence: number;
    diagnosticInfo: any;
    languageCode: string;
}

export default class DialogflowControllerV2 extends NLUController {

  public projectId = testConfig.dialogflow.projectId; //https://dialogflow.com/docs/agents#settings
  public sessionId = 'quickstart-session-id';

  // Instantiate a Dialogflow client.
  public sessionClient: any;

  // Define session path
  public sessionPath: any;

  private _config: any = {};

  constructor() {
    super();
    let clientConfig: any = {
        credentials: {
            private_key: testConfig.dialogflow.privateKey,
            client_email: testConfig.dialogflow.clientEmail
        }
    }
    // console.log(`DialogflowControllerV2: constructor: testConfig:`, testConfig);
    this.sessionClient = new dialogflow.SessionsClient(clientConfig);
    // console.log(this.sessionClient);
  }

  set config(config: any) {
      // if (config && config.nluDialogflow_privateKey && config.nluDialogflow_clientEmail) {
      //     this._config = config;
      //     let clientConfig: any = {
      //         credentials: {
      //             private_key: this._config.nluDialogflow_privateKey,
      //             client_email: this._config.nluDialogflow_clientEmail
      //         }
      //     }
      //     // console.log(`DialogflowControllerV2: constructor: config:`, config);
      //     this.sessionClient = new dialogflow.SessionsClient(clientConfig);
      //     // console.log(this.sessionClient);
      // } else {
      //     console.log(`DialogflowControllerV2: set config: error: incomplete config:`, config);
      // }
  }

  call(query: string, languageCode: string, context: string, sessionId?: string): Promise<any> {
      // console.log(`DialogflowControllerV2: call: `, query, languageCode, sessionId);
      sessionId = sessionId || this.sessionId;
      this.sessionPath = this.sessionClient.sessionPath(this.projectId, sessionId);
      // Send request and log result
      let request: DialogflowRequest = {
          session: this.sessionPath,
          queryInput: {
              text: {
                  text: query,
                  languageCode: languageCode,
              },
          }
      };

      let contextObject: any;
      if (context) {
          contextObject = {
              name: `${this.sessionPath}/contexts/${context}`,
              lifespanCount: 5
          };
          request.queryParams = {
              contexts: [
                  contextObject
              ]
          }
      }
      // console.log(`DialogflowControllerV2: call: request: `, contextObject, request);
      return new Promise((resolve, reject) => {
          this.sessionClient
            .detectIntent(request)
            .then((responses: any[]) => {
              // console.log('Detected intent');
              const result = responses[0].queryResult;
              // console.log(`  Query: ${result.queryText}`);
              // console.log(`  Response: ${result.fulfillmentText}`);
              // if (result.intent) {
              //   console.log(`  Intent: ${result.intent.displayName}`);
              // } else {
              //   console.log(`  No intent matched.`);
              // }
              resolve(result);
            })
            .catch((err: any) => {
              // console.error('ERROR:', err);
              reject(err);
            });
        });
  }

  getFieldStringValue(field: any, defaultValue: string): string {
      let result: string = defaultValue;
      if (field && field.kind && (field.kind === 'stringValue') && field.stringValue) {
          result = field.stringValue;
      }
      return result;
  }

  getEntitiesWithResponse(response: DialogflowResponse): any {
      let entitiesObject: any = {
          user: 'Someone',
          userOriginal: 'Someone',
          thing: 'that',
          thingOriginal: 'that'
      };

      let fields;
      if (response && response.outputContexts && response.outputContexts[0] && response.outputContexts[0].parameters && response.outputContexts[0].parameters.fields) {
          fields = response.outputContexts[0].parameters.fields;
          if (fields) {
              entitiesObject.user = this.getFieldStringValue(fields['user'], entitiesObject.user);
              entitiesObject.userOriginal = this.getFieldStringValue(fields['user.original'], entitiesObject.userOriginal);
              entitiesObject.thing = this.getFieldStringValue(fields['thing'], entitiesObject.thing);
              entitiesObject.thingOriginal = this.getFieldStringValue(fields['thing.original'], entitiesObject.thingOriginal);
          }
      } else if (response && response.parameters && response.parameters.fields) {
          fields = response.parameters.fields
          entitiesObject.thing = this.getFieldStringValue(fields['thing'], entitiesObject.thing);
          entitiesObject.thingOriginal = this.getFieldStringValue(fields['thing'], entitiesObject.thingOriginal);
      }

      return entitiesObject;
  }

  getIntentAndEntities(query: string, languageCode: string, context: string, sessionId?: string): Promise<NLUIntentAndEntities> {
      return new Promise((resolve, reject) => {
          this.call(query, languageCode, context, sessionId)
              .then((response: DialogflowResponse) => {
                  let intentAndEntities: NLUIntentAndEntities = {
                      intent: response.intent.displayName,
                      entities: this.getEntitiesWithResponse(response),
                      result: response
                  }
                  resolve(intentAndEntities);
              })
              .catch((err: any) => {
                  reject(err);
              })
      })
  }


}


/*
import NLUController, {
    NLUIntentAndEntities
} from '../model/NLUController';

const dialogflow = require('dialogflow');

// const config: any = require('../data/config.json');

export type DialogflowQueryInput = {
    text: {
        text: string;
        languageCode: string;
    }
}

export type DialogflowRequest = {
    session: any;
    queryInput: DialogflowQueryInput;
    queryParams?: any;
}

export type DialogflowOutputContext = {
    name: string;
    lifespanCount: number;
    parameters: {
        fields: any
    }
}

export type DialogflowResponse = {
    fulfillmentMessages: any;
    outputContexts: any;
    queryText: string;
    speechRecognitionConfidence: number;
    action: string;
    parameters: any;
    allRequiredParamsPresent: boolean;
    fulfillmentText: string;
    webhookSource: string;
    webhookPayload: any;
    intent: any;
    intentDetectionConfidence: number;
    diagnosticInfo: any;
    languageCode: string;
}

export default class DialogflowControllerV2 extends NLUController {

  public projectId = ''; //https://dialogflow.com/docs/agents#settings
  public sessionId = 'temp-session-id';

  // Instantiate a Dialogflow client.
  public sessionClient: any;

  // Define session path
  public sessionPath: any;

  private _config: any = {};

  constructor() {
    super();
  }

  set config(config: any) {
      if (config && config.nluDialogflow_privateKey && config.nluDialogflow_clientEmail) {
          this._config = config;
          let clientConfig: any = {
              credentials: {
                  private_key: this._config.nluDialogflow_privateKey,
                  client_email: this._config.nluDialogflow_clientEmail
              }
          }
          // console.log(`DialogflowControllerV2: constructor: config:`, config);
          this.sessionClient = new dialogflow.SessionsClient(clientConfig);
          // console.log(this.sessionClient);
      } else {
          console.log(`DialogflowControllerV2: set config: error: incomplete config:`, config);
      }
  }

  call(query: string, languageCode: string, context: string, sessionId?: string): Promise<any> {
      // console.log(`DialogflowControllerV2: call: `, query, languageCode, sessionId);
      sessionId = sessionId || this.sessionId;
      this.sessionPath = this.sessionClient.sessionPath(this.projectId, sessionId);
      // Send request and log result
      let request: DialogflowRequest = {
          session: this.sessionPath,
          queryInput: {
              text: {
                  text: query,
                  languageCode: languageCode,
              },
          }
      };

      let contextObject: any;
      if (context) {
          contextObject = {
              name: `${this.sessionPath}/contexts/${context}`,
              lifespanCount: 5
          };
          request.queryParams = {
              contexts: [
                  contextObject
              ]
          }
      }
      // console.log(`DialogflowControllerV2: call: request: `, contextObject, request);
      return new Promise((resolve, reject) => {
          this.sessionClient
            .detectIntent(request)
            .then((responses: any[]) => {
              // console.log('Detected intent');
              const result = responses[0].queryResult;
              // console.log(`  Query: ${result.queryText}`);
              // console.log(`  Response: ${result.fulfillmentText}`);
              // if (result.intent) {
              //   console.log(`  Intent: ${result.intent.displayName}`);
              // } else {
              //   console.log(`  No intent matched.`);
              // }
              resolve(result);
            })
            .catch((err: any) => {
              // console.error('ERROR:', err);
              reject(err);
            });
        });
  }

  getFieldStringValue(field: any, defaultValue: string): string {
      let result: string = defaultValue;
      if (field && field.kind && (field.kind === 'stringValue') && field.stringValue) {
          result = field.stringValue;
      }
      return result;
  }

  getEntitiesWithResponse(response: DialogflowResponse): any {
      let entitiesObject: any = {
          user: 'Someone',
          userOriginal: 'Someone',
          thing: 'that',
          thingOriginal: 'that'
      };

      let fields;
      if (response && response.outputContexts && response.outputContexts[0] && response.outputContexts[0].parameters && response.outputContexts[0].parameters.fields) {
          fields = response.outputContexts[0].parameters.fields;
          if (fields) {
              entitiesObject.user = this.getFieldStringValue(fields['user'], entitiesObject.user);
              entitiesObject.userOriginal = this.getFieldStringValue(fields['user.original'], entitiesObject.userOriginal);
              entitiesObject.thing = this.getFieldStringValue(fields['thing'], entitiesObject.thing);
              entitiesObject.thingOriginal = this.getFieldStringValue(fields['thing.original'], entitiesObject.thingOriginal);
          }
      } else if (response && response.parameters && response.parameters.fields) {
          fields = response.parameters.fields
          entitiesObject.thing = this.getFieldStringValue(fields['thing'], entitiesObject.thing);
          entitiesObject.thingOriginal = this.getFieldStringValue(fields['thing'], entitiesObject.thingOriginal);
      }

      return entitiesObject;
  }

  getIntentAndEntities(query: string, languageCode: string, context: string, sessionId?: string): Promise<NLUIntentAndEntities> {
      return new Promise((resolve, reject) => {
          this.call(query, languageCode, context, sessionId)
              .then((response: DialogflowResponse) => {
                  let intentAndEntities: NLUIntentAndEntities = {
                      intent: response.intent.displayName,
                      entities: this.getEntitiesWithResponse(response),
                      result: response
                  }
                  resolve(intentAndEntities);
              })
              .catch((err: any) => {
                  reject(err);
              })
      })
  }


}
*/

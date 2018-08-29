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

export type DialogflowV2QueryInput = {
    text: {
        text: string;
        languageCode: string;
    }
}

export type DialogflowV2Request = {
    session: any;
    queryInput: DialogflowV2QueryInput;
    queryParams?: any;
}

export type DialogflowV2OutputContext = {
    name: string;
    lifespanCount: number;
    parameters: {
        fields: any
    }
}

export type DialogflowV2Response = {
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

  public projectId = 'project-id'; //https://dialogflow.com/docs/agents#settings
  public sessionId = 'quickstart-session-id';

  // Instantiate a Dialogflow client.
  public sessionClient: any;

  // Define session path
  public sessionPath: any;

  private _config: any = {};

  constructor() {
    super();
  }

  set config(config: any) {
      if (config && config.nluDialogflow_privateKey && config.nluDialogflow_clientEmail && config.nluDialogflow_projectId) {
          this._config = config;
          this.projectId = this._config.nluDialogflow_projectId;
          let clientConfig: any = {
              credentials: {
                  private_key: this._config.nluDialogflow_privateKey,
                  client_email: this._config.nluDialogflow_clientEmail
              }
          }
          console.log(`DialogflowControllerV2: constructor: clientConfig:`, clientConfig);

          this.sessionClient = new dialogflow.SessionsClient(clientConfig);
      } else {
          console.log(`DialogflowControllerV2: set config: error: incomplete config:`, config);
      }
  }

  call(query: string, languageCode: string, context: string, sessionId?: string): Promise<any> {
      sessionId = sessionId || this.sessionId;
      this.sessionPath = this.sessionClient.sessionPath(this.projectId, sessionId);
      // Send request and log result
      let request: DialogflowV2Request = {
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
      return new Promise((resolve, reject) => {
          this.sessionClient
            .detectIntent(request)
            .then((responses: any[]) => {
              const result = responses[0].queryResult;
              resolve(result);
            })
            .catch((err: any) => {
              console.error('DialogflowControllerV2: call() error:', err);
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

  getEntitiesWithResponse(response: DialogflowV2Response): any {
      let entitiesObject: any = {};
      if (response && response.parameters && response.parameters.fields) {
          let fields: any = response.parameters.fields;
          let fieldsArray: string[] = Object.keys(fields);
          fieldsArray.forEach((key: string) => {
              let fieldObject: any = fields[key];
              let kind: string = fieldObject.kind;
              let value: any = fieldObject[kind];
              if (value) {
                  entitiesObject[key] = value;
              }
          });
      }

      return entitiesObject;
  }

  getIntentAndEntities(query: string, languageCode: string, context: string, sessionId?: string): Promise<NLUIntentAndEntities> {
      return new Promise((resolve, reject) => {
          this.call(query, languageCode, context, sessionId)
              .then((response: DialogflowV2Response) => {
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

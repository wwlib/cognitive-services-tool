import NLUController, {
    NLUIntentAndEntities
} from '../model/NLUController';

const request = require('request');

// const config: any = require('../data/config.json');

export type DialogflowResponseResultMetadata = {
  intentId: string;
  webhookUsed: boolean;
  webhookForSlotFillingUsed: boolean;
  intentName: string;
}

export type DialogflowResponseResultFulfillment = {
    speech: string;
    messages: any;
};

export type DialogflowResponseStatus = {
  code: number;
  errorType: string;
  webhookTimedOut: boolean;
};

export type DialogflowResponseResult = {
  source: string;
  resolvedQuery: string;
  action: string;
  actionIncomplete: boolean;
  parameters: any;
  contexts: any[];
  metadata: DialogflowResponseResultMetadata;
  fulfillment: DialogflowResponseResultFulfillment;
  score: number;
}

export type DialogflowResponse = {
  id: string;
  timestamp: string;
  lang: string;
  result: DialogflowResponseResult;
  status: DialogflowResponseStatus;
  sessionId: number;
};

export default class DialogflowControllerV1 extends NLUController {

    public apiAuthorization: string = ''; //`Bearer ${config.dialogflow.clientToken}`;

    private _config: any = {};

    /**
     * @constructor
     */
    constructor() {
        super();
    }

    set config(config: any) {
        if (config && config.nluDialogflow_clientToken) {
            this._config = config;
            this.apiAuthorization= `Bearer ${this._config.nluDialogflow_clientToken}`;
        }  else {
            console.log(`DialogflowControllerV1: set config: error: incomplete config:`, config);
        }
    }

    // let latitude: string = '42.361145';
    // let longitude: string = '-71.057083';
    // let timezone: string = 'America/New_York';

    call(query: string, languageCode: string, context: string, sessionId?: string): Promise<any> {
    // call(query:string, latitude:string, longitude:string, sessionId:string, iana_timezone:string, contexts: string[]): Promise<any> {
        let data: any = {
                    "query": query,  //Full Natural Language Query
                    "lang": "en",
                    "sessionId": sessionId,
                    "location":{
                        "latitude":Number('42.361145'),
                        "longitude":Number('-71.057083'),
                    },
                    "timezone": 'America/New_York'
                }
        if (context) {
            data.contexts = [context];
        }

        // let raw_url = "";

        return new Promise((resolve, reject) => {
            request.post({
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": `${this.apiAuthorization}`
                },
                url: 'https://api.api.ai/v1/query?v=20150910',
                body: JSON.stringify(data)
            },
             (error:string, response:any, body:any) => {
                if (error) {
                    //console.log(error);
                    reject(error);
                } else {
                    let body_obj: any = JSON.parse(body);
                    resolve(body_obj);
                }
            });
        });
    }

    getEntitiesWithResponse(response: any): any | undefined {
        console.log(`DialogflowControllerV1: getEntitiesWithResponse: `, response);
        let entitiesObject: any = {};
        let result: DialogflowResponseResult = response.result;
        let parameters;
        if (result && result.contexts && result.contexts[0]) {
            parameters = result.contexts[0];
            let keys: string[] = Object.keys(parameters);
            keys.forEach((entityKey: any) => {
                let entityValue: string = parameters[entityKey];
                if (entityValue) {
                    entitiesObject[entityKey] = entityValue;
                }
            });
        } else if (result && result.parameters) {
            parameters = result.parameters;
            let keys: string[] = Object.keys(parameters);
            keys.forEach((entityKey: any) => {
                let entityValue: string = parameters[entityKey];
                if (entityValue) {
                    entitiesObject[entityKey] = entityValue;
                }
            });
        }
        return entitiesObject;
    }

    getIntentAndEntities(query: string, languageCode: string, context: string, sessionId?: string): Promise<NLUIntentAndEntities> {
        return new Promise((resolve, reject) => {
            this.call(query, languageCode, context, sessionId)
                .then((response: DialogflowResponse) => {
                    let result: DialogflowResponseResult = response.result;
                    let metadata: DialogflowResponseResultMetadata = result.metadata;
                    let intent: string = metadata.intentName;
                    let intentAndEntities: NLUIntentAndEntities = {
                        intent: intent,
                        entities: this.getEntitiesWithResponse(response),
                        result: result
                    }
                    resolve(intentAndEntities);
                })
                .catch((err: any) => {
                    reject(err);
                })
        })
    }


}

const path = require('path');
import { EventEmitter } from "events";
const ensureDir = require('ensureDir');
const osenv = require('osenv');
const jsonfile = require('jsonfile');

let configPath = path.resolve(osenv.home(), ".storybookauthor");
let configFile = path.resolve(configPath, "storybookauthor.json");

export type DefaultNLUSetting = {
    value: string;
    label: string
}

export interface AppSettingsOptions {
    nluDefault: DefaultNLUSetting;
    nluLUIS_endpoint: string;
    nluLUIS_appId: string;
    nluLUIS_subscriptionKey: string;
    nluDialogflow_clientToken: string;
    nluDialogflow_projectId: string;
    nluDialogflow_privateKey: string;
    nluDialogflow_clientEmail: string;
    neo4j_url: string;
    neo4j_user: string;
    neo4j_password: string;
    timestamp: number;
}

export default class AppSettings extends EventEmitter {

    static DEFAULT_USER_DATA_PATH: string = path.resolve(configPath, "user");
    static NLU_OPTIONS: any[] = [
        {value: 'none', label: 'none'},
        {value: 'luis', label: 'LUIS'},
        {value: 'dialogflowv1', label: 'DialogflowV1'},
        {value: 'dialogflowv2', label: 'DialogflowV2'},
    ]

    public nluDefault: DefaultNLUSetting = {value: 'none', label: 'none'};
    public nluLUIS_endpoint: string = '';
    public nluLUIS_appId: string = '';
    public nluLUIS_subscriptionKey: string = '';
    public nluDialogflow_clientToken: string = '';
    public nluDialogflow_projectId: string = '';
    public nluDialogflow_privateKey: string = '';
    public nluDialogflow_clientEmail: string = '';

    public neo4j_url: string = '';
    public neo4j_user: string = '';
    public neo4j_password: string = '';

    private _timestamp: number = 0;

    constructor(options?: AppSettingsOptions) {
        super();
        options = options || {
            nluDefault: {value: 'none', label: 'none'},
            nluLUIS_endpoint: 'nluLUIS_endpoint',
            nluLUIS_appId: 'nluLUIS_appId',
            nluLUIS_subscriptionKey: '',
            nluDialogflow_clientToken: '',
            nluDialogflow_projectId: '',
            nluDialogflow_privateKey: '',
            nluDialogflow_clientEmail: '',
            neo4j_url: '',
            neo4j_user: '',
            neo4j_password: '',
            timestamp: 0
        }
        this.initWithData(options);
    }

    initWithData(data: AppSettingsOptions): void {
        this.nluDefault = data.nluDefault;
        this.nluLUIS_endpoint = data.nluLUIS_endpoint;
        this.nluLUIS_appId = data.nluLUIS_appId;
        this.nluLUIS_subscriptionKey = data.nluLUIS_subscriptionKey;
        this.nluDialogflow_clientToken = data.nluDialogflow_clientToken;
        this.nluDialogflow_projectId = data.nluDialogflow_projectId;
        this.nluDialogflow_privateKey = data.nluDialogflow_privateKey;
        this.nluDialogflow_clientEmail = data.nluDialogflow_clientEmail;
        this.neo4j_url = data.neo4j_url;
        this.neo4j_user = data.neo4j_user;
        this.neo4j_password = data.neo4j_password;

        this._timestamp = data.timestamp;
    }

    get json(): any {
        let json: any = {
            nluDefault: this.nluDefault,
            nluLUIS_endpoint: this.nluLUIS_endpoint,
            nluLUIS_appId: this.nluLUIS_appId,
            nluLUIS_subscriptionKey: this.nluLUIS_subscriptionKey,
            nluDialogflow_clientToken: this.nluDialogflow_clientToken,
            nluDialogflow_projectId: this.nluDialogflow_projectId,
            nluDialogflow_privateKey: this.nluDialogflow_privateKey,
            nluDialogflow_clientEmail: this.nluDialogflow_clientEmail,
            neo4j_url: this.neo4j_url,
            neo4j_user: this.neo4j_user,
            neo4j_password: this.neo4j_password,
            timestamp: this._timestamp
        };
        return json;
    }

    get timestamp(): number {
        return this._timestamp;
    }

    get userDataPath(): string {
        return AppSettings.DEFAULT_USER_DATA_PATH;
    }

    load(cb: any){
        ensureDir(path.resolve(configPath), 0o755, (err: any) => {
            if (err) {
                console.log(`error: ${configPath} cannot be found`)
            } else {
                jsonfile.readFile(configFile, (err: any, obj: any) => {
                    if (err) {
                        cb(err);
                    } else {
                        this.initWithData(obj);
                        this._timestamp = obj.timestamp;
                        cb(err, obj);
                    }
                });
            }
        });
    }

    save(cb: any){
        this._timestamp = new Date().getTime();
        ensureDir(path.resolve(configPath), 0o755, (err: any) => {
            if (err) {
                console.log(`error: ${configPath} cannot be found`)
            } else {
                jsonfile.writeFile(configFile, this.json, {spaces: 2}, (err: any) => {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null);
                    }
                });
            }
        });
    }
}

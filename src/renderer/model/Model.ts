import { EventEmitter } from "events";
import AppSettings from "./AppSettings";
import { appVersion } from './AppVersion';
import AudioManager from '../audio/AudioManager';

const uuidv4 = require('uuid/v4');
const now = require("performance-now");

export default class Model extends EventEmitter {

    public appSettings: AppSettings;
    public statusMessages: string;
    public panelZIndexMap: Map<string, number>;

    constructor() {
        super();
        this.appSettings = new AppSettings();
        this.panelZIndexMap = new Map<string, number>();
        AudioManager.Instance({ userDataPath: AppSettings.DEFAULT_USER_DATA_PATH });
        this.statusMessages = '';
        this.appSettings.load((err: any, obj: any) => {
            if (err) {
                console.log(`Model: AppSettings not found. Using defaults.`);
            }
            this.emit('ready', this);
        });
    }

    get appVerison(): string {
        return appVersion;
    }

    get userDataPath(): string {
        return AppSettings.DEFAULT_USER_DATA_PATH;
    }

    saveAppSettings(): void {
        this.appSettings.save((err: any) => {
            if (err) {
                console.log(`Model: Error saving appSettings: `, err);
            }
        });
    }

    reloadAppSettings(): void {
        this.appSettings.load((err: any, obj: any) => {
            if (err) {
                console.log(`Model: Error reloading AppSettings.`);
            }
            this.emit('updateModel', this);
        });
    }

    updateAppStatusMessages(message: string, subsystem?: string, clearMessages: boolean = false): string {
        subsystem = subsystem || '';
        if (clearMessages) {
            this.statusMessages = '';
        }
        this.statusMessages = `${subsystem}: ${this.statusMessages}\n${message}`;
        this.onUpdate();
        return this.statusMessages;
    }

    onUpdate(): void {
        this.emit('updateModel');
    }

    // Audio audioController

    startRecord(): void {
        AudioManager.Instance().startRecord();
    }

    endRecord() {
        AudioManager.Instance().endRecord();
    }

    static getUUID(): string {
        return uuidv4();
    }

    dispose(): void {
        delete(this.appSettings);// = null;
    }
}

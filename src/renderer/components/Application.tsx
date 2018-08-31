import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import Model from '../model/Model';
import AppSettings from '../model/AppSettings';
import TopNav from './TopNav';
import AppSettingsPanel from './AppSettingsPanel';
import WindowComponent from '../model/WindowComponent';
import ASRPanel from './ASRPanel';
import NLUPanel from './NLUPanel';
import TTSPanel from './TTSPanel';
import GraphPanel from './GraphPanel';
import LogPanel from './LogPanel';

import NLUController, {
    NLUIntentAndEntities, NLUData
} from '../model/NLUController';
import LUISController from '../luis/LUISController';
import DialogflowControllerV1 from '../dialogflow/DialogflowControllerV1';
import DialogflowControllerV2 from '../dialogflow/DialogflowControllerV2';

import GoogleSTTController from '../googlecloud/GoogleSTTController';

const prettyjson = require('prettyjson');
const {dialog, shell} = require('electron').remote;

export interface ApplicationProps { model: Model }
export interface ApplicationState {
    showAppSettingsPanel: boolean,
    appSettings: AppSettings,
    NLUResult: string,
    log: string
}

export default class Application extends React.Component < ApplicationProps, ApplicationState > {

    public dialogflowControllerV1: DialogflowControllerV1;
    public dialogflowControllerV2: DialogflowControllerV2;
    public luisController: LUISController;
    public sessionId: string = `app_${Math.floor(Math.random() * 10000)}`;

    componentWillMount() {
        this.setState({
            showAppSettingsPanel: false,
            NLUResult: '',
            log: ''
         });
    }

    componentDidMount() {
        // console.log(`Application: componentDidMount`);
        WindowComponent.addWindowWithId('appSettingsPanel', 200, 130); //TODO magic number
        this.instantiateNLUControllers();
    }

    onTopNavClick(event: any): void {
        let nativeEvent: any = event.nativeEvent;
        switch ( nativeEvent.target.id) {
            case 'appSettings':
                WindowComponent.bringWindowToFrontWithId('appSettingsPanel');
                this.setState({showAppSettingsPanel: true});
                break;
        }
    }

    //// AppSettings

    ////TODO provide service-specific control
    instantiateNLUControllers(): void {
        this.dialogflowControllerV1 = new DialogflowControllerV1();
        this.dialogflowControllerV2 = new DialogflowControllerV2();
        this.luisController = new LUISController();

        this.dialogflowControllerV1.config = this.props.model.appSettings;
        this.dialogflowControllerV2.config = this.props.model.appSettings;
        this.luisController.config = this.props.model.appSettings;
    }

    onAppSettingsClick(event: any): void {
        let nativeEvent: any = event.nativeEvent;
        switch ( nativeEvent.target.id ) {
            case 'titlebar':
                WindowComponent.bringWindowToFrontWithId('appSettingsPanel');
                break;
            case 'titlebar-close':
                WindowComponent.closeWithId('appSettingsPanel');
                this.setState({showAppSettingsPanel: false});
                break;
            case 'saveSettings':
                this.props.model.saveAppSettings();
                this.instantiateNLUControllers();
                WindowComponent.closeWithId('appSettingsPanel');
                this.setState({showAppSettingsPanel: false});
                break;
            case 'reloadSettings':
                this.props.model.reloadAppSettings()
                    .then((obj: any) => {
                        this.instantiateNLUControllers();
                        let appSettings: AppSettings = this.props.model.appSettings;
                        this.setState({appSettings: appSettings});
                    })
                break;
            case 'showSettings':
                if (this.props.model.appSettings.userDataPath) {
                    shell.showItemInFolder(this.props.model.appSettings.userDataPath);
                }
                break;
        }
    }

    onDropdownChange(selectedOption: any): void {
        this.props.model.appSettings.nluDefault = selectedOption;
        this.setState({appSettings: this.props.model.appSettings});
    }

    onAppSettingsInputChange(event: any) {
        let nativeEvent: any = event.nativeEvent;
        let appSettings: AppSettings = this.props.model.appSettings;
        switch(nativeEvent.target.name) {
            case 'nluLUIS_endpoint':
                appSettings.nluLUIS_endpoint = nativeEvent.target.value;
                break;
            case 'nluLUIS_appId':
                appSettings.nluLUIS_appId = nativeEvent.target.value;
                break;
            case 'nluLUIS_subscriptionKey':
                appSettings.nluLUIS_subscriptionKey = nativeEvent.target.value;
                break;
            case 'nluDialogflow_clientToken':
                appSettings.nluDialogflow_clientToken = nativeEvent.target.value;
                break;
            case 'nluDialogflow_projectId':
                appSettings.nluDialogflow_projectId = nativeEvent.target.value;
                break;
            case 'nluDialogflow_privateKey':
                //NOTE parsing the key fixes newline issues
                try {
                    let keyData = JSON.parse(`{ "key": "${nativeEvent.target.value}"}`);
                    appSettings.nluDialogflow_privateKey = keyData.key;
                    break;
                } catch(err) {
                    console.log(err);
                }

            case 'nluDialogflow_clientEmail':
                appSettings.nluDialogflow_clientEmail = nativeEvent.target.value;
                break;
            case 'neo4j_url':
                appSettings.neo4j_url = nativeEvent.target.value;
                break;
            case 'neo4j_user':
                appSettings.neo4j_user = nativeEvent.target.value;
                break;
            case 'neo4j_password':
                appSettings.neo4j_password = nativeEvent.target.value;
                break;
        }
        this.setState({appSettings: appSettings});
    }

    onClosePanel(id: string): void {
        WindowComponent.closeWithId('appSettingsPanel');
        switch(id) {
            case 'appSettingsPanel':
                this.setState({showAppSettingsPanel: false});
                break;
        }
    }

    //// NLU

    getLaunchIntent(asr: string): Promise<NLUData> {
        let nluDefault: string = 'none';
        if (this.props.model.appSettings && this.props.model.appSettings.nluDefault) {
            nluDefault = this.props.model.appSettings.nluDefault.value;
        }

        return this.getIntent(asr, ['launch'], nluDefault);
    }

    getIntent(asr: string, contexts: string[], nluType: string): Promise<NLUData> {
        console.log(`Model: getIntent: asr: ${asr}, contexts: `, contexts, nluType);
        return new Promise((resolve, reject) => {
            let query: string = asr;
            let nluController: NLUController | undefined = undefined;

            //TODO generalize this
            if (nluType == 'luis') {
                nluController = this.luisController;
            } else if (nluType == 'dialogflowv1') {
                nluController = this.dialogflowControllerV1;
            } else if (nluType == 'dialogflowv2') {
                nluController = this.dialogflowControllerV2;
            }

            if (nluController) {
                let context: string = '';
                if (contexts) {
                    context = contexts[0];
                }
                nluController.getIntentAndEntities(query, 'en-US', context, this.sessionId)
                    .then((intentAndEntities: NLUIntentAndEntities) => {
                        let nluData: NLUData = {
                           nluType: nluType,
                           asr: asr,
                           intentAndEntities: intentAndEntities
                       }
                       console.log(`Model: getIntent: nluData`, nluData);
                       resolve(nluData);
                    })
                    .catch((err: any) => {
                        reject(err);
                    });
            } else {
                let nluData: NLUData = {
                    nluType: nluType,
                    asr: asr,
                    intentAndEntities: {
                        intent: '',
                        entities: {},
                        result: {}
                    }

                }
                console.log(`Model: getIntent: NO NLU DEFINED: nluData`, nluData);
                resolve(nluData)
            }
        });
    }

    ////

    onPanelClick(event: any, data: any): void {
        let nativeEvent: any = event.nativeEvent;
        console.log(`onPanelClick: `, nativeEvent.target.id);
        switch ( nativeEvent.target.id) {
            case 'utterance':
            case 'nluSubmit':
                let asr: string = data.utterance;
                this.getLaunchIntent(asr)
                    .then((nluData: NLUData) => {
                        if (nluData && nluData.intentAndEntities) {
                            let launchIntent: string = nluData.intentAndEntities.intent;
                            let entities: string = prettyjson.render(nluData.intentAndEntities.entities, { noColor: true });
                            console.log(`Model: onASR result: launchIntent`, launchIntent, entities, nluData);
                            console.log(nluData.intentAndEntities.entities, entities);
                            let resultFormatted: string = prettyjson.render(nluData.intentAndEntities.result, { noColor: true });
                            this.setState({ NLUResult: `${launchIntent}\n${entities}`, log: `${resultFormatted}\n\n****\n\n${this.state.log}` });
                        }
                    })
                    .catch((err: any) => {
                        console.log(`Model: onASR: error: `, err);
                    });

                // this.dialogflowControllerV2.call('what time is it', 'en-US', 'launch', this.sessionId)
                //     .then((result: any) => {
                //         console.log(prettyjson.render(result, {}));
                //     })
                //     .catch((err: any) => {
                //         console.log(`ERROR: dialogflowController\n`, err)
                //     });
                break;
            case 'asrPanel':
                console.log(`asrPanel`);
                let sttController:GoogleSTTController = new GoogleSTTController();
                console.log(sttController);
                break;
            case 'recordButton':
                this.props.model.startRecord();
                break;
            case 'endRecordButton':
                this.props.model.endRecord();
                break;
            case 'clearLog':
                this.setState({ log: '' })
        }
    }

    layout(): any {
        let layout;
        let appSettingsPanel: JSX.Element | null = this.state.showAppSettingsPanel ? <AppSettingsPanel clickHandler={this.onAppSettingsClick.bind(this)} changeHandler={this.onAppSettingsInputChange.bind(this)} dropdownHandler={this.onDropdownChange.bind(this)} appSettings={this.props.model.appSettings}/> : null;
        layout = <div>
            <TopNav  clickHandler={this.onTopNavClick.bind(this)} />
            {appSettingsPanel}
            <div className="panelContainer">
                <ASRPanel clickHandler={this.onPanelClick.bind(this)}/>
                <NLUPanel clickHandler={this.onPanelClick.bind(this)} dropdownHandler={this.onDropdownChange.bind(this)} appSettings={this.props.model.appSettings} NLUResult={this.state.NLUResult}/>
                <TTSPanel clickHandler={this.onPanelClick.bind(this)}/>
                <GraphPanel clickHandler={this.onPanelClick.bind(this)}/>
                <LogPanel clickHandler={this.onPanelClick.bind(this)} log={this.state.log} />
            </div>
        </div>
        return layout;
    }

    render() {

        return(
            this.layout()
        );
    }
}

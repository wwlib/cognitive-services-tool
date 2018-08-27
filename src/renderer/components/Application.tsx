import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import Model from '../model/Model';
import AppSettings from '../model/AppSettings';
import TopNav from './TopNav';
import AppSettingsPanel from './AppSettingsPanel';
import WindowComponent from '../model/WindowComponent';

const {dialog, shell} = require('electron').remote;

export interface ApplicationProps { model: Model }
export interface ApplicationState {
    showAppSettingsPanel: boolean,
    appSettings: AppSettings
}

export default class Application extends React.Component < ApplicationProps, ApplicationState > {

    componentWillMount() {
        this.setState({
            showAppSettingsPanel: false
         });
    }

    componentDidMount() {
        // console.log(`Application: componentDidMount`);
        WindowComponent.addWindowWithId('appSettingsPanel', 10, 60);
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
                break;
            case 'reloadSettings':
                this.props.model.reloadAppSettings();
                break;
            case 'showSettings':
                if (this.props.model.appSettings.userDataPath) {
                    shell.showItemInFolder(this.props.model.appSettings.userDataPath);
                }
                break;
        }
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
                appSettings.nluDialogflow_privateKey = nativeEvent.target.value;
                break;
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

    layout(): any {
        let layout;
        let appSettingsPanel: JSX.Element | null = this.state.showAppSettingsPanel ? <AppSettingsPanel clickHandler={this.onAppSettingsClick.bind(this)} changeHandler={this.onAppSettingsInputChange.bind(this)} appSettings={this.props.model.appSettings}/> : null;
        layout = <div>
            <TopNav  clickHandler={this.onTopNavClick.bind(this)} />
            {appSettingsPanel}
        </div>
        return layout;
    }

    render() {

        return(
            this.layout()
        );
    }
}

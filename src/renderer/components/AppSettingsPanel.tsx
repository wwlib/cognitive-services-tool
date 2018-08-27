import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import Draggable from "react-draggable";
import Titlebar from './titlebar/Titlebar';

const PasswordMask = require('react-password-mask');
import Select from 'react-select';
import AppSettings from '../model/AppSettings';
import Model from '../model/Model';
import WindowComponent from '../model/WindowComponent';

export interface AppSettingsPanelProps { clickHandler: any, changeHandler: any, appSettings: AppSettings }
export interface AppSettingsPanelState { }

export default class AppSettingsPanel extends React.Component<AppSettingsPanelProps, AppSettingsPanelState> {

    public networkInfo: any;

    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        this.setState({});
    }

    componentDidMount() {
        WindowComponent.restoreStyleWithId('appSettingsPanel');
    }

    handleInputChange(event: any) {
        this.props.changeHandler(event);
    }

    handleNluDefaultChange(selectedOption: any) {
        console.log(`handleEndpointChange: `, selectedOption);
    }

    handleClick(event: any): void {
        this.props.clickHandler(event);
    }

    handleClose(event: any) {
        // console.log('handleClose');
    }

    handleMinimize(event: any) {
        // console.log('minimize');
    }

    handleMaximize(event: any) {
        // console.log('maximize');
    }

    handleFullScreen(event: any) {
        // console.log('fullscreen');
    }

    render() {
        let nluOptions: any[] = [
            {value: 'none', label: 'none'},
            {value: 'luis', label: 'LUIS'},
            {value: 'dialogflow', label: 'Dialogflow'}
        ]

        return  <Draggable handle=".handle">
                    <div className="app-panel well" id="appSettingsPanel" ref="appSettingsPanel">
                    <Titlebar
                        draggable={true}
                        handleClick={this.handleClick.bind(this)}
                        handleClose={this.handleClose.bind(this)}
                        handleMinimize={this.handleMinimize.bind(this)}
                        handleMaximize={this.handleMaximize.bind(this)}
                        handleFullScreen={this.handleFullScreen.bind(this)}>
                    </Titlebar>
                    <h4 className="pull-left handle" style={{marginBottom:20}}>App Settings</h4>
                    <div className="clearfix"></div>
                    <ReactBootstrap.Table striped bordered condensed hover style = {{width: 900}}>
                        <tbody>
                            <tr><td>nluDefault:</td><td>
                            <Select name="nluDefault" value={this.props.appSettings.nluDefault} options={nluOptions} onChange={this.handleNluDefaultChange.bind(this)} style={{width: 300}} />
                            </td></tr>

                            <tr><td>nluLUIS_endpoint:</td><td>
                            <input name="nluLUIS_endpoint" value={this.props.appSettings.nluLUIS_endpoint} onChange={this.handleInputChange.bind(this)} style={{width: 675}} />
                            </td></tr>

                            <tr><td>nluLUIS_appId:</td><td>
                            <PasswordMask id="password" name="nluLUIS_appId" value={this.props.appSettings.nluLUIS_appId} onChange={this.handleInputChange.bind(this)} style={{width: 300}} />
                            </td></tr>

                            <tr><td>nluLUIS_subscriptionKey:</td><td>
                            <PasswordMask id="password" name="nluLUIS_subscriptionKey" value={this.props.appSettings.nluLUIS_subscriptionKey} onChange={this.handleInputChange.bind(this)} style={{width: 300}} />
                            </td></tr>

                            <tr><td>nluDialogflow_clientToken:</td><td>
                            <PasswordMask id="password" name="nluDialogflow_clientToken" value={this.props.appSettings.nluDialogflow_clientToken} onChange={this.handleInputChange.bind(this)} style={{width: 300}} />
                            </td></tr>

                            <tr><td>nluDialogflow_projectId:</td><td>
                            <PasswordMask id="password" name="nluDialogflow_projectId" value={this.props.appSettings.nluDialogflow_projectId} onChange={this.handleInputChange.bind(this)} style={{width: 300}} />
                            </td></tr>

                            <tr><td>nluDialogflow_privateKey:</td><td>
                            <PasswordMask id="password" name="nluDialogflow_privateKey" value={this.props.appSettings.nluDialogflow_privateKey} onChange={this.handleInputChange.bind(this)} style={{width: 300}} />
                            </td></tr>

                            <tr><td>nluDialogflow_clientEmail:</td><td>
                            <PasswordMask id="password" name="nluDialogflow_clientEmail" value={this.props.appSettings.nluDialogflow_clientEmail} onChange={this.handleInputChange.bind(this)} style={{width: 300}} />
                            </td></tr>

                            <tr><td>neo4j_url:</td><td>
                            <input name="neo4j_url" value={this.props.appSettings.neo4j_url} onChange={this.handleInputChange.bind(this)} style={{width: 300}} />
                            </td></tr>

                            <tr><td>neo4j_user:</td><td>
                            <input name="neo4j_user" value={this.props.appSettings.neo4j_user} onChange={this.handleInputChange.bind(this)} style={{width: 300}} />
                            </td></tr>

                            <tr><td>neo4j_password:</td><td>
                            <PasswordMask id="password" name="neo4j_password" value={this.props.appSettings.neo4j_password} onChange={this.handleInputChange.bind(this)} style={{width: 300}} />
                            </td></tr>
                        </tbody>
                    </ReactBootstrap.Table>
                    <div className="appSettingsButtons" onClick={this.handleClick.bind(this)}>
                        <ReactBootstrap.Button bsStyle={'success'} key={"save"} id={"saveSettings"} style = {{width: 100}}>Save</ReactBootstrap.Button>
                        <ReactBootstrap.Button bsStyle={'info'} key={"reload"} id={"reloadSettings"} style = {{width: 120}}>Reload</ReactBootstrap.Button>
                        <ReactBootstrap.Button bsStyle={'default'} key={"show"} id={"showSettings"} style = {{width: 80}}>Show</ReactBootstrap.Button>
                    </div>
                </div></Draggable>;
    }
}

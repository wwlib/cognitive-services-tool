import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import Select from 'react-select';
import AppSettings from '../model/AppSettings'

export interface NLUPanelProps { clickHandler: any, dropdownHandler: any, appSettings: AppSettings, NLUResult: string }
export interface NLUPanelState { utterance: string }

export default class NLUPanel extends React.Component<NLUPanelProps, NLUPanelState> {

    componentWillMount() {
        this.setState({utterance: ''});
    }

    componentDidMount() {
    }

    onKeyPress(event: any) {
        let nativeEvent: any = event.nativeEvent;
        if (nativeEvent.key == 'Enter')
        {
            // submit NLU
            this.props.clickHandler(event, {utterance: this.state.utterance});
        }
    }

    onButtonClicked(event: any) {
        this.props.clickHandler(event, {utterance: this.state.utterance});
    }

    handleNluDefaultChange(selectedOption: any) {
        this.props.dropdownHandler(selectedOption);
    }

    onUtteranceChange(event: any): void {
        let nativeEvent: any = event.nativeEvent;
        switch(nativeEvent.target.name) {
            case 'utterance':
                if (nativeEvent.inputType != 'insertLineBreak') {
                    this.setState({ utterance: nativeEvent.target.value })
                }
                break;
        }
    }

    render() {
        let nluOptions: any[] = AppSettings.NLU_OPTIONS;

        return (
            <div className="app-panel well" id="nluPanel">
                <ReactBootstrap.Table condensed hover style = {{width: '100%'}}>
                    <tbody>
                        <tr><td>NLU:</td></tr>
                        <tr><td>
                        <Select name="nluDefault" value={this.props.appSettings.nluDefault} options={nluOptions} onChange={this.handleNluDefaultChange.bind(this)} style={{width: '100%'}} />
                        </td></tr>
                        <tr><td>
                            <textarea name="utterance" id="utterance" value={this.state.utterance} rows={2} style={{}} onChange={this.onUtteranceChange.bind(this)} onKeyPress={this.onKeyPress.bind(this)} />
                        </td></tr>
                        <tr><td>
                            <ReactBootstrap.Button bsStyle={'success'} key={"nluSubmit"} id={"nluSubmit"} style = {{width: 100}}
                                onClick={this.onButtonClicked.bind(this)}>Submit</ReactBootstrap.Button>
                        </td></tr>
                        <tr><td>
                            <textarea value={this.props.NLUResult} readOnly name="response" ref="response" rows={4} style={{}} />
                        </td></tr>
                    </tbody>
                </ReactBootstrap.Table>
            </div>
        );
    }
}

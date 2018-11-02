import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";

export interface ASRPanelProps { clickHandler: any, ASRResult: string }
export interface ASRPanelState { }

export default class ASRPanel extends React.Component<ASRPanelProps, ASRPanelState> {

    componentWillMount() {
        this.setState({});
    }

    componentDidMount() {
    }

    onButtonClicked(event: any) {
        this.props.clickHandler(event);
    }

    render() {
        return (
            <div className="app-panel well" id="asrPanel" onClick={this.onButtonClicked.bind(this)}>
                <ReactBootstrap.Table condensed hover style = {{width: '100%'}}>
                    <tbody>
                        <tr><td>ASR:</td></tr>
                        <tr><td>
                            <button id="recordButton"></button>
                            <button id="endRecordButton"></button>
                        </td></tr>
                        <tr><td>
                            <textarea value={this.props.ASRResult} readOnly name="response" ref="response" rows={4} style={{}} />
                        </td></tr>
                    </tbody>
                </ReactBootstrap.Table>
            </div>
        );
    }
}

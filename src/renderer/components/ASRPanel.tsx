import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";

export interface ASRPanelProps { clickHandler: any }
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
                    </tbody>
                </ReactBootstrap.Table>
            </div>
        );
    }
}

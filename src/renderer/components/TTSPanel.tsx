import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";

export interface TTSPanelProps { clickHandler: any }
export interface TTSPanelState { }

export default class TTSPanel extends React.Component<TTSPanelProps, TTSPanelState> {

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
            <div className="app-panel well" id="ttsPanel" onClick={this.onButtonClicked.bind(this)} >
                <div>
                    TTS
                </div>
            </div>
        );
    }
}

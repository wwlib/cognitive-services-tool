import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";

export interface NLUPanelProps { clickHandler: any }
export interface NLUPanelState { }

export default class NLUPanel extends React.Component<NLUPanelProps, NLUPanelState> {

    componentWillMount() {
        this.setState({});
    }

    componentDidMount() {
    }

    onKeyPress(event: any) {
        let nativeEvent: any = event.nativeEvent;
        // console.log(`onkeypress: `, nativeEvent.key);
        if (nativeEvent.key == 'Enter')
        {
            // submit NLU
        }
    }

    onButtonClicked(event: any) {
        this.props.clickHandler(event);
    }

    render() {
        return (
            <div className="app-panel well" id="nluPanel" onClick={this.onButtonClicked.bind(this)} >
                <div>
                    NLU
                </div>
                <div>
                    <textarea name="utterance" ref="utterance" rows={2} style={{}} onKeyPress={this.onKeyPress.bind(this)} />
                </div>
                <div className="panel-buttons" onClick={this.onButtonClicked.bind(this)}>
                    <ReactBootstrap.Button bsStyle={'success'} key={"nluSubmit"} id={"nluSubmit"} style = {{width: 100}}>Submit</ReactBootstrap.Button>
                </div>
            </div>
        );
    }
}

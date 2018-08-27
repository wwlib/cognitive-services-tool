import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";

export interface GraphPanelProps { clickHandler: any }
export interface GraphPanelState { }

export default class GraphPanel extends React.Component<GraphPanelProps, GraphPanelState> {

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
            <div className="app-panel well" id="graphPanel" onClick={this.onButtonClicked.bind(this)} >
                <div>
                    Graph
                </div>
            </div>
        );
    }
}

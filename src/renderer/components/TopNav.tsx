import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";

export interface TopNavProps { clickHandler: any }
export interface TopNavState { }

export default class TopNav extends React.Component<TopNavProps, TopNavState> {

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
            <div className="topNav" onClick={this.onButtonClicked.bind(this)} >
                <div className="topButtons">
                    <div className="topLeftButtons">
                    </div>
                    <div className="topRightButtons">
                        <ReactBootstrap.Button bsStyle={"info"} key={"appInfo"} id={"appInfo"} style={{width: 80}}>appInfo</ReactBootstrap.Button>
                    </div>
                </div>
            </div>
        );
    }
}

/*
<div id="appButtons">
    <img className="pull-left" src={wwLogo} style={{width: 40}} onClick={this.onLogoClicked.bind(this)}/>
    <h4 className="pull-left" style={{paddingLeft: 6, paddingRight: 6}} onClick={this.onLogoClicked.bind(this)}>Cognitive Services Tool</h4>
    <h4 className="pull-right" style={{paddingLeft: 6, paddingRight: 6}} >v{this.props.model.getAppVerison()}</h4>
    <ReactBootstrap.Button bsStyle={'default'} key={"appInfo"} style = {{width: 100}}
        onClick={this.onButtonClicked.bind(this, "appInfo")}>App Info</ReactBootstrap.Button>
    <ReactBootstrap.Button bsStyle={'default'} key={"robots"} style = {{width: 100}}
        onClick={this.onButtonClicked.bind(this, "robots")}>Robots</ReactBootstrap.Button>
    <ReactBootstrap.Button bsStyle={'default'} key={"commands"} style = {{width: 100}}
        onClick={this.onButtonClicked.bind(this, "commands")}>Commands</ReactBootstrap.Button>
    <ReactBootstrap.Button bsStyle={'default'} key={"wozGraph"} style = {{width: 100}}
        onClick={this.onButtonClicked.bind(this, "wozGraph")}>WozGraph</ReactBootstrap.Button>

    <ReactBootstrap.Button bsStyle={'success'} key={"save"} style = {{width: 100}}
        onClick={this.onButtonClicked.bind(this, "save")}>Save Config</ReactBootstrap.Button>
    <ReactBootstrap.Button bsStyle={'info'} key={"reload"} style = {{width: 120}}
        onClick={this.onButtonClicked.bind(this, "reload")}>Reload Config</ReactBootstrap.Button>
</div>
*/

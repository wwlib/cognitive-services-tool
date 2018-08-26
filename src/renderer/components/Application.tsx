import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import Model from '../model/Model';
import TopNav from './TopNav';
import AppInfoPanel from './AppInfoPanel';

export interface ApplicationProps { model: Model }
export interface ApplicationState {
    showAppInfoPanel: boolean
}

export default class Application extends React.Component < ApplicationProps, ApplicationState > {

    componentWillMount() {
        this.setState({
            showAppInfoPanel: false
         });
    }

    componentDidMount() {
        // console.log(`Application: componentDidMount`);
        this.props.model.addPanelWithId('appInfoPanel', 10, 60);
    }

    onTopNavClick(event: any): void {
        let nativeEvent: any = event.nativeEvent;
        switch ( nativeEvent.target.id) {
            case 'appInfo':
                console.log(`onTopNavClick: appInfo`);
                this.setState({showAppInfoPanel: this.props.model.togglePanelOpenedWithId('appInfoPanel')});
                this.props.model.bringPanelToFront('appInfoPanel');
                break;

        }
    }

    handlePageInputChange(event: any) {
        let nativeEvent: any = event.nativeEvent;
        console.log(`handlePageInputChange: `, nativeEvent.target.id)
        switch(nativeEvent.target.id) {
        }
    }

    onClosePanel(id: string): void {
        this.props.model.closePanelWithId(id);
        switch(id) {
            case 'appInfoPanel':
                this.setState({showAppInfoPanel: false});
                break;
        }
    }

    layout(): any {
        let layout;
        let appInfoPanel: JSX.Element | null = this.state.showAppInfoPanel ? <AppInfoPanel id='appInfoPanel' appInfo={this.props.model.appInfo} model={this.props.model} onClosePanel={this.onClosePanel.bind(this)}/> : null;
        layout = <div>
            <TopNav  clickHandler={this.onTopNavClick.bind(this)} />
            {appInfoPanel}
        </div>
        return layout;
    }

    render() {

        return(
            this.layout()
        );
    }
}

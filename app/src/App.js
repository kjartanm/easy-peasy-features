import React from 'react';
//import { FlagContext } from './FeatureFlags';
import { FlagGuard } from './FeatureFlags';
import { FlagSwitch } from './FeatureFlags';
//import { FlagToggle } from './FeatureFlags';
import './style/app.css';
import { ChatButton } from './ChatButton';
import { Header } from './Header';
import { Navbar } from './Navbar';
import { Content } from './Content';
import { PseudoPage } from './PseudoPage';
import { Switch, Route } from 'react-router-dom';

function App({ version }) {

    return (
        <section className={'App App--' + version}>
            <Header></Header>
            <Navbar></Navbar>
            <Content>
                <FlagSwitch flag="profile-page-v1">
                    <FlagSwitch.On>
                        <Switch>
                            <Route path="/" exact ><PseudoPage pageTitle="Landing" /></Route>
                            <Route path="/about" ><PseudoPage pageTitle="About" /></Route>
                            <Route path="/shop" ><PseudoPage pageTitle="Shopping" /></Route>
                            <Route path="/profile" ><PseudoPage pageTitle="Profile" /></Route>
                            <Route><PseudoPage pageTitle="404!!" /></Route>
                        </Switch>
                    </FlagSwitch.On>
                    <FlagSwitch.Off>
                        <Switch>
                            <Route path="/" exact ><PseudoPage pageTitle="Landing" /></Route>
                            <Route path="/about" ><PseudoPage pageTitle="About" /></Route>
                            <Route path="/shop" ><PseudoPage pageTitle="Shopping" /></Route>
                            <Route><PseudoPage pageTitle="404!" /></Route>
                        </Switch>
                    </FlagSwitch.Off>
                </FlagSwitch>
            </Content>
            <FlagGuard flag="support-chat-v1">
                <ChatButton></ChatButton>
            </FlagGuard>
        </section>
    );
}

export default App;

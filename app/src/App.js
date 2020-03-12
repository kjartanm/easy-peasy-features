import React from 'react';
//import { FlagContext } from './FeatureFlags';
import { FlagGuard } from './FeatureFlags';
//import { FlagSwitch } from './FeatureFlags';
//import { FlagToggle } from './FeatureFlags';
import './style/App.css';
//import { ShinyButton } from './ShinyButton';
import { ChatButton } from './ChatButton';
import { Header } from './Header';
import { Navbar } from './Navbar';
import { Switch, Route } from 'react-router-dom';

function App({ version }) {

    return (
        <section className={'App App--' + version}>
            <Header></Header>
            <Navbar></Navbar>
            <main>
                <Switch>
                    <Route path="/" component={
                        () => {
                            return (
                                <>
                                    <h2>Home</h2>
                                </>
                            )
                        }
                    } exact />
                    <Route path="/about" component={
                        () => {
                            return (
                                <>
                                    <h2>About</h2>
                                </>
                            )
                        }
                    } />
                    <Route path="/shop" component={
                        () => {
                            return (
                                <>
                                    <h2>Shop</h2>
                                </>
                            )
                        }
                    } />
                    <FlagGuard flag="profile-page-v1">
                        <Route path="/profile" component={
                            () => {
                                return (
                                    <>
                                        <h2>Profile</h2>
                                    </>
                                )
                            }
                        } />
                    </FlagGuard>
                </Switch>
            </main>
            <FlagGuard flag="support-chat-v1">
                <ChatButton></ChatButton>
            </FlagGuard>
        </section>
    );
}

export default App;

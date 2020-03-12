import React from 'react';
import { NoAccess } from './NoAccess';
import { AnalyticsContext } from './AnalyticsContext';

class FeatureBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        if (this.props.setHasError) {
            this.props.setHasError.call(null, true);
        }
        console.log(`This is error reporting for '${this.props.flag}': ${error}`);
    }

    render() {
        const doAnalytics = (msg) => {
            console.log(`This is analytics for '${this.props.flag}': ${msg}`);
        }

        if (this.state.hasError) {
            return (<NoAccess flag={this.props.flag} status="error-caught-by-boundary" switchState={this.props.switchState || 'Not Applicable'} />);
        }
        return (<AnalyticsContext.Provider value={{ doAnalytics }}>{this.props.children}</AnalyticsContext.Provider>);
    }
}

export { FeatureBoundary };
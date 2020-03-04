import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import siteConfig from '@blog/client/web/config/site-info';

interface State {
    config: {
        siteTitle: string;
        icp: string;
        icpGovCn: string;
        email: string;
        github: string;
        projectGithub: string;
        domain: string;
    };
    error: {
        status: number;
    };
}

const initialState: State = {
    config: {
        siteTitle: siteConfig.siteTitle,
        icp: siteConfig.icp,
        icpGovCn: siteConfig.icpGovCn,
        email: siteConfig.email,
        github: siteConfig.github,
        projectGithub: siteConfig.projectGithub,
        domain: siteConfig.domain,
    },
    error: null,
};

interface ConfigDataLoaded {
    config: State['config'];
}

interface StatusCodeDataLoaded {
    error: {
        status: number;
    };
}

const app = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setConfig(state, action: PayloadAction<ConfigDataLoaded>) {
            const { config } = action.payload;
            state.config = config;
        },
        setError(state, action: PayloadAction<StatusCodeDataLoaded>) {
            const { error } = action.payload;
            state.error = error;
        },
    },
});

export const { setError, setConfig } = app.actions;

export default app.reducer;

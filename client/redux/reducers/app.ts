import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    config: {
        siteTitle: string;
        siteIcp: string;
        siteDomain: string;
        icpGovCn: string;
        siteLogo: string;
        email: string;
        github: string;
        projectGithub: string;
        admin: {
            tokenKey: string;
            userInfoKey: string;
        };
    };
    error: {
        status: number;
    };
    theme: any;
}

const initialState: State = {
    config: {
        siteTitle: '',
        siteIcp: '粤ICP备16021965号-3',
        siteDomain: '',
        icpGovCn: 'http://www.beian.miit.gov.cn',
        siteLogo: '',
        email: '',
        github: 'https://github.com/bs32g1038',
        projectGithub: 'https://github.com/bs32g1038/node-blog',
        admin: {
            tokenKey: 'node-blog-bs32g1038@163.com',
            userInfoKey: 'node-blog-bs32g1038@163.com-userInfo',
        },
    },
    error: null,
    theme: 'light',
};

interface ConfigDataLoaded {
    config: State['config'];
}

interface StatusCodeDataLoaded {
    error: {
        status: number;
    };
}

interface ThemeDataLoaded {
    theme: any;
}

const app = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setConfig(state, action: PayloadAction<ConfigDataLoaded>) {
            const { config } = action.payload;
            state.config = { ...state.config, ...config };
        },
        setError(state, action: PayloadAction<StatusCodeDataLoaded>) {
            const { error } = action.payload;
            state.error = { ...state.error, ...error };
        },
        setTheme(state, action: PayloadAction<ThemeDataLoaded>) {
            const theme: any = action.payload;
            if (theme == 'light') {
                state.theme = 'dark';
            } else {
                state.theme = 'light';
            }
        },
    },
});

export const { setError, setConfig, setTheme } = app.actions;

export default app.reducer;

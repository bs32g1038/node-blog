import { Router } from 'next/router';

declare module 'next/router' {
    export interface Router extends Router {
        query: any;
    }
}

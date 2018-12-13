declare module '*.svg' {
    const content: any;
    export default content;
}

declare module 'dayjs/plugin/relativeTime' {
    module 'dayjs' {
        interface Dayjs {
            fromNow(): string;
        }
    }
    const PluginFunc: any;
    export default PluginFunc;
}

declare module 'serialize-javascript' {
    const func: (_: any) => void;
    export default func;
}

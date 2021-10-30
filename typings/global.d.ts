export interface Global {
    __TOKEN__: string;
}

declare const __TOKEN__: string;
declare module 'data2xml' {
    const content: any;
    export default content;
}

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

declare module 'react-calendar-heatmap' {
    const content: any;
    export default content;
}

declare module 'react-tooltip' {
    const content: any;
    export default content;
}

declare module 'to-ico' {
    const content: any;
    export default content;
}

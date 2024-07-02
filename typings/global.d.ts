export interface Global {
    __TOKEN__: string;
}

declare module '*.module.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module 'data2xml' {
    function data2xml(name: string): string;
    export default function data2xml(): string;
}

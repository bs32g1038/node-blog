export interface Global {
    __TOKEN__: string;
}

declare module '*.module.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

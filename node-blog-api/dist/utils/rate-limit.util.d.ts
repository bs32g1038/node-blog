declare function RateLimit(options: any): (req: any, res: any, next: any) => Promise<any>;
export default RateLimit;

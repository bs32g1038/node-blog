import { UAParser } from 'ua-parser-js';

const userAgentMiddleware = () => {
    return function (req: any, res: any, next: any) {
        let source = req.headers['user-agent'] || '';
        if (req.headers['x-ucbrowser-ua']) {
            //special case of UC Browser
            source = req.headers['x-ucbrowser-ua'];
        }
        if (typeof source === 'undefined') {
            source = 'unknown';
        }
        const { browser, cpu, device, os } = UAParser(source);
        req.useragent = {
            browser,
            cpu,
            device,
            os,
        };
        next();
    };
};

export default userAgentMiddleware;

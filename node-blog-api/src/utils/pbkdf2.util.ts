import * as pbkdf2 from 'pbkdf2';

export const getDerivedKey = (str: string) => {
    return pbkdf2.pbkdf2Sync(str, 'salt', 1, 32, 'sha512').toString('hex');
};

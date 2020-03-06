import { md5 } from '@blog/client/libs/crypto-js';
import GHAT from '@blog/client/libs/generate-avatar';

const ghat = new GHAT();

export const gernateAvatarImage = (str: string) => {
    return ghat.getImage(md5(str));
};

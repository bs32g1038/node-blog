import React from 'react';
import Link from '../../link';
import { Link as UiLink } from '@chakra-ui/core';

export default ({ articleId }: { articleId: string }) => {
    const domain = window.location.protocol + '//' + window.location.host;
    return (
        <Link href={domain + '/blog/articles/' + articleId} passHref={true}>
            <UiLink isTruncated={true}>{domain + '/blog/articles/' + articleId}</UiLink>
        </Link>
    );
};

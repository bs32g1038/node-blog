import React from 'react';
import Link from '../../link';

export default function ArticleAddress({ articleId }: { articleId: string }) {
    const domain = window.location.protocol + '//' + window.location.host;
    return (
        <Link href={domain + '/blog/articles/' + articleId} passHref={true}>
            <a>{domain + '/blog/articles/' + articleId}</a>
        </Link>
    );
}

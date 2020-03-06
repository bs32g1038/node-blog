import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { isArray } from 'lodash';
import { fetchArticles, getArticlesCacheKey, setArticles } from '@blog/client/redux/reducers/articles';
import { RootState } from '@blog/client/redux/store';
import { useEffect } from 'react';
import { isEqual } from 'lodash';

export const useFetchArticles = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const page = Number(router.query.page || 1);
    const cid: string = isArray(router.query.cid) ? router.query.cid.join(',') : router.query.cid;
    const tag: string = isArray(router.query.tag) ? router.query.tag.join(',') : router.query.tag;
    const { items, totalCount, isLoading, cache, limit } = useSelector((state: RootState) => state.articles);
    useEffect(() => {
        const key = getArticlesCacheKey(page, { cid, tag });
        if (!isEqual(cache[key], items)) {
            if (cache[key]) {
                dispatch(setArticles(cache[key]));
            } else {
                dispatch(fetchArticles(Number(page), { cid, tag }));
            }
        }
    }, [router.query]);
    return {
        page,
        limit,
        cid,
        tag,
        items,
        totalCount,
        isLoading,
    };
};

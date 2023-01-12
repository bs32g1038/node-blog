import React from 'react';
import { useRouter } from 'next/router';
import style from './style.module.scss';
import { useFetchCategoriesQuery } from '@blog/client/web/api';
import { Segmented } from 'antd';

const Categories = () => {
    const router = useRouter();
    const { data = [] } = useFetchCategoriesQuery();
    const _id = router.query.cid;
    let value = data.find((item) => item._id === _id)?._id ?? '全部';
    const _data: any[] = [...data];
    if (router.query.tag) {
        value = data.find((item) => item.name === router.query.tag)?._id ?? (router.query.tag as string);
        if (value === router.query.tag) {
            _data.push({
                _id: router.query.tag,
                name: router.query.tag,
                isTag: true,
            });
        }
    }
    return (
        <div className={style.categories}>
            <div className={style.categoriesInnter}>
                <Segmented
                    value={value}
                    options={[
                        {
                            label: '全部',
                            value: '全部',
                        },
                        ..._data.map((item) => ({
                            label: (
                                <a key={item._id} href={`/blog/articles?cid=${item._id}`}>
                                    {item.name}
                                    {!item.isTag && <span>({item.articleCount})</span>}
                                </a>
                            ),
                            value: item._id,
                        })),
                    ]}
                    onChange={(val) => {
                        if (val === '全部') {
                            router.push('/blog/articles');
                            return;
                        }
                        router.push(`/blog/articles?cid=${val}`);
                    }}
                ></Segmented>
            </div>
        </div>
    );
};

export default Categories;

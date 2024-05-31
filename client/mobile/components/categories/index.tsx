import React from 'react';
import { useRouter } from 'next/router';
import style from './style.module.scss';
import { useFetchCategoriesQuery } from '@blog/client/web/api';
import { Tabs } from 'antd-mobile';

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
                <Tabs
                    activeKey={value}
                    onChange={(key) => {
                        if (key === '全部') {
                            router.push('/m/blog/articles');
                            return;
                        }
                        router.push(`/m/blog/articles?cid=${key}`);
                    }}
                >
                    <Tabs.Tab title="全部" key="全部"></Tabs.Tab>
                    {_data.map((item) => (
                        <Tabs.Tab title={item.name} key={item._id}></Tabs.Tab>
                    ))}
                </Tabs>
            </div>
        </div>
    );
};

export default Categories;

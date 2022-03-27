import React from 'react';
import Head from 'next/head';
import AppLayout from '@blog/client/web/layouts/app';
import { fetchExplore, useFetchConfigQuery, useFetchExploreQuery } from '@blog/client/web/api';
import { Space, Image, Row } from 'antd';
import { wrapper } from '@blog/client/redux/store';
import style from './style.module.scss';
import { List } from 'antd';
import { parseTime } from '@blog/client/libs/time';

const Page = () => {
    const { data: config } = useFetchConfigQuery();
    const {
        data: { items: exploreList = [] },
    } = useFetchExploreQuery();
    return (
        <AppLayout>
            <Head>
                <title>{config.siteTitle + '-发现'}</title>
            </Head>
            <List
                className={style.wrap}
                itemLayout="horizontal"
                dataSource={exploreList}
                bordered={false}
                renderItem={(item) => (
                    <List.Item key={item._id}>
                        <List.Item.Meta
                            description={
                                <Row gutter={12} justify="space-between" wrap={false}>
                                    <div style={{ width: '100%' }}>
                                        <div>{item.content}</div>
                                        <div>
                                            <Space style={{ display: 'flex' }}>
                                                <span>创建日期</span>
                                                <span className={style.commentHeaderTime}>
                                                    {parseTime(item.createdAt)}
                                                </span>
                                            </Space>
                                            {item.links.map((item) => {
                                                return (
                                                    <Space key={item.link} style={{ display: 'flex' }}>
                                                        <span>{item.title}</span>
                                                        <a target="_blank" href={item.link} rel="noreferrer">
                                                            {item.link}
                                                        </a>
                                                    </Space>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {item.pics.map((item: string) => {
                                            return <Image key={item} width={120} height={100} src={item} alt="" />;
                                        })}
                                    </div>
                                </Row>
                            }
                        />
                    </List.Item>
                )}
            />
        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    await store.dispatch(fetchExplore.initiate());
    return {
        props: {},
    };
});

export default Page;

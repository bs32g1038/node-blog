import React from 'react';
import Head from 'next/head';
import AppLayout from '@blog/client/web/layouts/app';
import { fetchExplore, useFetchConfigQuery, useFetchExploreQuery } from '@blog/client/web/api';
import { Skeleton, Space } from 'antd';
import { wrapper } from '@blog/client/redux/store';
import style from './style.module.scss';
import { TagOutlined } from '@ant-design/icons';
import { List, Avatar } from 'antd';
import exlporeAvatar from '@blog/client/assets/svgs/explore-avatar.svg';
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
                renderItem={(item: any) => (
                    <List.Item key={item._id}>
                        <Skeleton avatar title={false} loading={false} active>
                            <List.Item.Meta
                                avatar={<Avatar src={exlporeAvatar} />}
                                title={
                                    <Space className={style.title}>
                                        <TagOutlined />
                                        <span className={style.commentHeaderTime}>{parseTime(item.createdAt)}</span>
                                    </Space>
                                }
                                description={item.content}
                            />
                        </Skeleton>
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

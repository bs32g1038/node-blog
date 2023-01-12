import React, { useState } from 'react';
import { Divider, Select } from 'antd';
import style from './search-form.style.module.scss';
import { debounce } from 'lodash';
import { GithubIcon } from '../../icons';
import { searchArticles } from '@blog/client/web/api';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

export const SearchResultFooter = (props: { isLoading: boolean; totalCount: number }) => {
    const { isLoading, totalCount } = props;
    return (
        <div className={style.panelFooter}>
            {isLoading ? (
                <div>正在搜索数据...</div>
            ) : (
                <div>
                    <GithubIcon width="16px" height="16px"></GithubIcon>
                    {totalCount <= 0 ? '没有该搜索结果' : `共 ${totalCount} 条记录，可尝试其他关键字👍`}
                </div>
            )}
        </div>
    );
};

export const SearchForm = (props) => {
    const cacheEmptyKey = Symbol('cache init data');
    const cache = {};
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [totalCount, setTotalCount] = useState(-1);

    const fetchData = (key: string) => {
        const data = cache[key === '' ? cacheEmptyKey : key];
        if (data) {
            setItems(data.items);
            setTotalCount(data.totalCount);
            return Promise.resolve();
        }
        setIsLoading(true);
        return searchArticles(key).then((_) => {
            if (_.data) {
                if (key === '') {
                    cache[cacheEmptyKey] = _.data;
                } else {
                    cache[key] = _.data;
                }
                setItems(_.data.items);
                setTotalCount(_.data.totalCount);
                setTimeout(() => {
                    setIsLoading(false);
                }, 400);
            }
        });
    };
    const debounceFetchData = debounce(fetchData, 200);
    return (
        <div className={style.searchForm} style={props.style}>
            <Select
                showSearch
                style={{ width: '220px', marginRight: '10px' }}
                placeholder={'请输入关键词'}
                defaultActiveFirstOption={false}
                filterOption={false}
                onSearch={(value) => debounceFetchData(value)}
                onChange={(value) => {
                    router.push('/blog/articles/' + value);
                }}
                onFocus={() => {
                    debounceFetchData('');
                }}
                options={items.map((item: { _id: string; title: string }) => ({
                    label: item.title,
                    value: item._id,
                }))}
                suffixIcon={<SearchOutlined></SearchOutlined>}
                showArrow={true}
                dropdownRender={(menu) => (
                    <>
                        {menu}
                        <Divider style={{ margin: '8px 0' }} />
                        <SearchResultFooter isLoading={isLoading} totalCount={totalCount}></SearchResultFooter>
                    </>
                )}
            />
        </div>
    );
};

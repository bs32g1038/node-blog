import React from 'react';
import { Divider, Select } from 'antd';
import style from './search-form.style.module.scss';
import { debounce } from 'lodash';
import { GithubIcon } from '../../icons';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useLazySearchArticlesQuery } from '../../api';

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
    const router = useRouter();
    const [search, { data: { items = [], totalCount = 0 } = {}, isLoading }] = useLazySearchArticlesQuery();
    const fetchData = (key: string) => {
        return search({ key });
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

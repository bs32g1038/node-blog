import React, { useEffect, useRef, useState } from 'react';
import { Button, Input } from 'antd';
import style from './search-form.style.module.scss';
import { debounce } from 'lodash';
import * as Api from '@blog/client/web/api/article';
import Link from '../link';
import { GithubIcon } from '../../icons';
import spinner64 from './spinner-64.gif';

const SearchResultList = (props: { isLoading: boolean; items: any[] }) => {
    const { isLoading, items } = props;
    return (
        <ul className={style.searchList}>
            {!isLoading &&
                items.map((item: { _id: string; title: string }) => (
                    <li>
                        <Link href={'/blog/articles/' + item._id} passHref={true}>
                            <a>{item.title}</a>
                        </Link>
                    </li>
                ))}
            {isLoading && <span style={{ backgroundImage: `url(${spinner64.src})` }}></span>}
        </ul>
    );
};

const SearchResultFooter = (props: { isLoading: boolean; totalCount: number }) => {
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
    const $input = useRef<HTMLInputElement>(null);
    const [isActiveNavSearchDropdown, setIsActiveNavSearchDropdown] = useState(false);
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
        return Api.searchArticles(key).then((_) => {
            if (_.data) {
                if (key === '') {
                    cache[cacheEmptyKey] = _.data;
                } else {
                    cache[key] = _.data;
                }
                setItems(_.data.items);
                setTotalCount(_.data.totalCount);
                setIsLoading(false);
            }
        });
    };
    const debounceFetchData = debounce(fetchData, 50);

    const onfocus = () => {
        debounceFetchData('');
        setIsActiveNavSearchDropdown(true);
    };
    const onblur = () => {
        setIsActiveNavSearchDropdown(false);
    };
    const oninput = (e: any) => {
        if (e.target) {
            debounceFetchData(e.target.value);
        }
    };
    const foldNavList = () => {
        setIsActiveNavSearchDropdown(false);
        if ($input.current) {
            $input.current.blur();
        }
    };
    return (
        <div className={style.searchForm} style={props.style}>
            <Input.Search
                onSearch={() => {
                    setIsActiveNavSearchDropdown(() => {
                        return true;
                    });
                }}
                onFocus={onfocus}
                onInput={oninput}
                onBlur={onblur}
                placeholder="请输入关键词"
            />
            <div
                onMouseDown={(event) => event.preventDefault()}
                className={style.searchPanel}
                style={{ display: isActiveNavSearchDropdown ? 'block' : 'none' }}
            >
                <div className={style.panelHeader}>
                    博客
                    <span onClick={foldNavList}>收起</span>
                </div>
                <SearchResultList items={items} isLoading={isLoading}></SearchResultList>
                <SearchResultFooter isLoading={isLoading} totalCount={totalCount}></SearchResultFooter>
            </div>
        </div>
    );
};

import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../api/article';
import { GithubSvg } from '../svgs/github-svg';
import { SearchSvg } from '../svgs/search-svg';

const Form = styled.form`
    border: 1px solid hsla(0,0%,59.2%,.2);
    background-color: rgba(227,231,236,.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 2px;
    position: relative;
`;

const Input = styled.input`
    border: none;
    width: 150px;
    padding: 7.2px 12px;
    box-shadow: none;
    outline: none;
    font-size: 14px;
    color: #666;
    background-color: transparent;
    -webkit-appearance: textfield;
    outline-offset: -2px;
    transition: width .2s ease;
    &:focus{
        width: 200px;
    }
`;

const SearchIcon = styled(SearchSvg)`
    width: 16px;
    height: 16px;
    fill: #666;
    padding: 0 10px;
    cursor: pointer;
`;

const GithubIcon = styled(GithubSvg)`
    fill:#2B414D;
    width: 16px;
    height: 16px;
    cursor: pointer;
    vertical-align: text-bottom;
`;

const NavSearchDropdown = styled.div<{ active: boolean }>`
    position: absolute;
    display: ${(props) => (props.active ? 'block' : 'none')};
    top: 35px;
    padding: 0 12px 16px 12px;
    height: ${(props) => (props.active ? 'auto' : 0)};
    box-sizing: border-box;
    border-radius: 0 0 4px 4px;
    background-color: #fff;
    box-shadow: 0 4px 16px rgba(193,205,241,.42);
    transition: height .17s ease;
    text-align: left;
    z-index: 2000;
    width: 100%;
`;

const NavSearchPro = styled.div`
    padding-left: 8px;
    width: 100%;
    height: 36px;
    line-height: 36px;
    font-size: 12px;
    box-sizing: border-box;
    color: #6b798e;
`;

const NavSearchProList = styled.ul`
    width: 100%;
    max-height: 432px;
    overflow: auto;
    border-bottom: 1px solid #e1e6f0;
    list-style: none;
    margin: 0;
    padding: 0;
    li {
        padding-left: 8px;
        width: 100%;
        height: 36px;
        line-height: 36px;
        font-size: 12px;
        box-sizing: border-box;
        &:hover{
            background-color: #ebf0fc;
        }
    }
    li a{
        color: #0a1633;
        display: block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-decoration: none;
        cursor: pointer;
    }
    .loading-icon {
        background-size: contain;
        background-repeat: no-repeat;
        width: 24px;
        height: 24px;
        display: block;
        margin: 8px auto;
    }
`;

const NavSearchDc = styled.div`
    padding-left: 8px;
    width: 100%;
    height: 36px;
    line-height: 36px;
    box-sizing: border-box;
    font-size: 0;
    span {
        width: 100%;
        display: inline-block;
        font-size: 12px;
        vertical-align: middle;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export const SearchForm = (props: any) => {
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
    const onfocus = () => {
        fetchData('');
        setIsActiveNavSearchDropdown(true);
    };
    const onblur = () => {
        if ($input.current) {
            setIsActiveNavSearchDropdown(false);
        }
    };
    const oninput = () => {
        if ($input.current) {
            fetchData($input.current.value);
        }
    };
    return (
        <Form className="search-form">
            <Input
                type="input"
                placeholder="搜索更新啦"
                className="search-input"
                ref={$input}
                onFocus={onfocus}
                onInput={oninput}
                onBlur={onblur}
            />
            <SearchIcon />
            <NavSearchDropdown className="nav-search-dropdown" active={isActiveNavSearchDropdown} onMouseDown={(event) => event.preventDefault()}>
                <NavSearchPro>博客</NavSearchPro>
                <NavSearchProList id="nav-search-list" className="nav-search-list">
                    {
                        !isLoading && items.map((item: { _id: string, title: string }) => (
                            <li key={item._id}>
                                <Link to={'/blog/articles/' + item._id}>{item.title}</Link>
                            </li>
                        ))
                    }
                    {
                        isLoading
                        &&
                        <span className="loading-icon" style={{ backgroundImage: `url(${require('./spinner-64.gif')})` }}></span>
                    }
                </NavSearchProList>
                <div className="full-search-name"></div>
                <NavSearchDc id="nav-search-dc" className="nav-search-dc">
                    {
                        isLoading
                            ?
                            <span>正在搜索数据...</span>
                            :
                            <span><GithubIcon></GithubIcon> {totalCount <= 0 ? '没有该搜索结果' : `共 ${totalCount} 条记录，可尝试其他关键字👍`}</span>
                    }
                </NavSearchDc>
            </NavSearchDropdown>
        </Form>
    );
};
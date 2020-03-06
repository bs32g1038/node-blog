import { css } from 'emotion';
import Link from '../link';
import React, { useRef, useState } from 'react';
import * as Api from '@blog/client/web/api/article';
import { Input, Box, Link as UiLink, Text, Flex, Collapse } from '@chakra-ui/core';
import Icon from '../icon';
import { debounce } from 'lodash';
import { useTheme } from 'emotion-theming';
import { rem } from 'polished';

const SearchResultList = (props: { isLoading: boolean; items: any[] }) => {
    const { isLoading, items } = props;
    return (
        <Box
            as="ul"
            width="100%"
            maxHeight="432px"
            overflowY="auto"
            overflowX="hidden"
            borderBottomWidth="1px"
            borderStyle="solid"
            borderBottomColor="theme.header.borderColor"
            position="relative"
        >
            {!isLoading &&
                items.map((item: { _id: string; title: string }) => (
                    <Box
                        as="li"
                        key={item._id}
                        py="5px"
                        isTruncated={true}
                        fontSize={rem(14)}
                        className={css`
                            padding-left: 8px;
                            width: 100%;
                            box-sizing: border-box;
                        `}
                    >
                        <Link href={'/blog/articles/' + item._id} passHref={true}>
                            <UiLink color="theme.header.color">{item.title}</UiLink>
                        </Link>
                    </Box>
                ))}
            {isLoading && (
                <span
                    className={css`
                        background-size: contain;
                        background-repeat: no-repeat;
                        width: 24px;
                        height: 24px;
                        display: block;
                        margin: 8px auto;
                    `}
                    style={{ backgroundImage: `url(${require('./spinner-64.gif')})` }}
                ></span>
            )}
        </Box>
    );
};

const SearchResultFooter = (props: { isLoading: boolean; totalCount: number }) => {
    const { isLoading, totalCount } = props;
    return (
        <Box
            color="theme.header.color"
            pt={2}
            fontSize={rem(14)}
            className={css`
                padding-left: 8px;
                width: 100%;
                box-sizing: border-box;
            `}
        >
            {isLoading ? (
                <Text>正在搜索数据...</Text>
            ) : (
                <Text>
                    <Icon verticalAlign="text-bottom" name="github" fill="theme.header.color" size="16px" mr={1} />
                    {totalCount <= 0 ? '没有该搜索结果' : `共 ${totalCount} 条记录，可尝试其他关键字👍`}
                </Text>
            )}
        </Box>
    );
};

export const SearchForm = () => {
    const theme: any = useTheme();
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
        return Api.searchArticles(key).then(_ => {
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
        <Box position="relative">
            <Flex
                as="form"
                bg="theme.header.bg"
                border="1px solid hsla(0, 0%, 59.2%, 0.2)"
                alignItems="center"
                justifyContent="space-between"
                borderRadius="sm"
                position="relative"
            >
                <Input
                    size="sm"
                    _focus={{
                        outline: 'none',
                    }}
                    backgroundColor="theme.header.bg"
                    ref={$input}
                    border={0}
                    placeholder="搜索更新啦"
                    onFocus={onfocus}
                    onInput={oninput}
                    onBlur={onblur}
                    transition=""
                />
                <Icon name="search3" fill="#666" mx={3}></Icon>
            </Flex>
            <Box
                position="absolute"
                top="35"
                width="100%"
                zIndex={2000}
                display={isActiveNavSearchDropdown ? 'block' : 'none'}
                onMouseDown={event => event.preventDefault()}
            >
                <Collapse
                    isOpen={isActiveNavSearchDropdown}
                    bg="theme.header.bg"
                    color="theme.header.color"
                    pt="0"
                    px="12px"
                    pb="16px"
                    borderRadius="0 0 4px 4px"
                    textAlign="left"
                    width="100%"
                    className={css`
                        box-shadow: 0 4px 16px ${theme.colors.theme.header.boxShadowColor};
                    `}
                >
                    <Box color="theme.header.color" py={2} pl={2} width="100%" fontSize={rem(14)}>
                        博客
                        <Text as="span" float="right" cursor=" pointer" onClick={foldNavList}>
                            收起
                        </Text>
                    </Box>
                    <SearchResultList items={items} isLoading={isLoading}></SearchResultList>
                    <SearchResultFooter isLoading={isLoading} totalCount={totalCount}></SearchResultFooter>
                </Collapse>
            </Box>
        </Box>
    );
};

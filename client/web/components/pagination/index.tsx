import React from 'react';
import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/core';
import Link from '../link';
import Icon from '../icon';
import UiLink from '../ui-link';

const PageNumbers = styled(UiLink)`
    position: relative;
    display: inline-block;
    background-color: ${(props: any) => props.theme.colors.theme.pagination.bg};
    padding: 0.5rem 0.875rem;
    margin: 0 0.5rem 0 0;
    font-size: 14px;
    border-radius: 0.2rem;
    text-decoration: none;
    cursor: pointer;
    &.current {
        z-index: 2;
        color: #fff;
        background-color: #4eb77d;
        pointer-events: none;
    }
`;

const PaginationEllipsis = styled.span`
    color: rgba(0, 0, 0, 0.25);
    margin: 0 0.5rem 0 0;
`;

const getPage = (current: number, pageCount: number) => {
    // 获取分页页码
    const listCount = 6;
    const pageList: number[] = [];
    const currentPage = current;
    let showPrevMore = false;
    let showNextMore = false;
    if (pageCount > listCount) {
        if (currentPage > listCount - 2) {
            showPrevMore = true;
        }
        if (currentPage < pageCount - 2) {
            showNextMore = true;
        }
    }
    if (showPrevMore && !showNextMore) {
        const start = pageCount - listCount + 2;
        for (let i = start; i < pageCount; i++) {
            pageList.push(i);
        }
    } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < listCount; i++) {
            pageList.push(i);
        }
    } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(listCount / 2) - 1;
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
            pageList.push(i);
        }
    } else {
        for (let i = 2; i < pageCount; i++) {
            pageList.push(i);
        }
    }
    return {
        pageList,
        showPrevMore,
        showNextMore,
    };
};

interface Props {
    current: number;
    pageSize: number;
    total: number;
}

export default (props: Props) => {
    const { current, pageSize, total } = props;
    const pageCount = Math.ceil(total / pageSize);
    const { showPrevMore, showNextMore, pageList } = getPage(current, pageCount);
    return pageCount > 1 ? (
        <Flex>
            {current > 1 && (
                <Link href={`/blog/articles?page=${current - 1}`}>
                    <PageNumbers>
                        <Icon name="arrow"></Icon>
                    </PageNumbers>
                </Link>
            )}
            <Link href="/blog/articles?page=1">
                <PageNumbers aria-current="page" className={current === 1 ? 'current' : ''}>
                    1
                </PageNumbers>
            </Link>
            {showPrevMore && <PaginationEllipsis>•••</PaginationEllipsis>}
            {pageList.map((pageNumber: number) => (
                <Link href={`/blog/articles?page=${pageNumber}`} key={`Pagination${pageNumber}`}>
                    <PageNumbers aria-current="page" className={current === pageNumber ? 'current' : ''}>
                        {pageNumber}
                    </PageNumbers>
                </Link>
            ))}
            {showNextMore && <PaginationEllipsis>•••</PaginationEllipsis>}
            <Link href={`/blog/articles?page=${pageCount}`}>
                <PageNumbers aria-current="page" className={current === pageCount ? 'current' : ''}>
                    {pageCount}
                </PageNumbers>
            </Link>
            {current < pageCount && (
                <Link href={`/blog/articles?page=${current + 1}`}>
                    <PageNumbers>
                        <Icon name="arrow" transform="rotate(180deg)"></Icon>
                    </PageNumbers>
                </Link>
            )}
        </Flex>
    ) : (
        <div style={{ display: 'none' }}></div>
    );
};

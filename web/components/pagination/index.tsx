import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { ArrowSvg } from '../svgs/arrow-svg';

const NavLinks = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

const PageNumbers = styled.a`
    position: relative;
    display: inline-block;
    background-color: #f4f5f9;
    padding: 0.5rem 0.875rem;
    margin: 0 0.5rem 0 0;
    font-size: 12px;
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

const ArrowIcon = styled(ArrowSvg)`
    width: 12px;
    vertical-align: middle;
    fill: #444;
    &.rotate180 {
        transform: rotate(180deg);
    }
`;

const PaginationEllipsis = styled.span`
    color: rgba(0, 0, 0, 0.25);
    margin: 0 0.5rem 0 0;
`;

const getPage = (current: number, pageCount: number) => {
    // 获取分页页码
    const listCount = 6;
    const pageList = [];
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
        <NavLinks>
            {current > 1 && (
                <Link href={`/blog/articles?page=${current - 1}`}>
                    <PageNumbers>
                        <ArrowIcon></ArrowIcon>
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
                        <ArrowIcon className="rotate180"></ArrowIcon>
                    </PageNumbers>
                </Link>
            )}
        </NavLinks>
    ) : (
        <div style={{ display: 'none' }}></div>
    );
};

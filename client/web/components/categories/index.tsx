import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@blog/client/redux/reducers/categories';
import { RootState } from '@blog/client/redux/store';
import NavLink from '../nav-link';
import { useRouter } from 'next/router';
import style from './style.module.scss';

const Categories = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { items } = useSelector((state: RootState) => state.categories);
    useEffect(() => {
        const cats = items || [];
        if (cats.length <= 0) {
            dispatch(fetchCategories());
        }
    }, [1]);
    return (
        <div className={style.categories}>
            <NavLink exact={true} href="/blog">
                <a className={style.categoryItemA}>全部</a>
            </NavLink>
            {items.map((item: any) => (
                <NavLink key={item._id} href={`/blog/articles?cid=${item._id}`} exact={true}>
                    <a className={style.categoryItemA}>
                        {item.name}
                        <span>({item.articleCount})</span>
                    </a>
                </NavLink>
            ))}
            {/* {router.query.tag && (
                <Tag>
                    <TagLabel>{router.query.tag}</TagLabel>
                    <TagCloseButton
                        onClick={() => {
                            Router.push('/blog/articles');
                        }}
                    />
                </Tag>
            )} */}
        </div>
        // <Box
        //     flex="0 0 auto"
        //     fontSize={rem(14)}
        //     borderBottomWidth="1px"
        //     borderStyle="solid"
        //     borderBottomColor="theme.categories.border"
        //     pb={[0, 3]}
        //     whiteSpace={['nowrap', 'normal']}
        //     overflowX={['auto']}
        //     overflowY={['hidden', 'auto']}
        // >
        //     <Box display="inline-block" mt={2} mb={4}>
        // <NavLink exact={true} href="/blog">
        //     <ItemLink color="theme.categories.color">全部</ItemLink>
        // </NavLink>
        //     </Box>
        // {items.map((item: any) => (
        //     <Box key={item._id} display="inline-block" ml={5} mb={4} mt={2}>
        //         <NavLink exact={true} href={`/blog/articles?cid=${item._id}`}>
        //             <ItemLink color="theme.categories.color">
        //                 {item.name}
        //                 <span>({item.articleCount})</span>
        //             </ItemLink>
        //         </NavLink>
        //     </Box>
        // ))}
        // {router.query.tag && (
        //     <Box>
        //         <Tag>
        //             <TagLabel>{router.query.tag}</TagLabel>
        //             <TagCloseButton
        //                 onClick={() => {
        //                     Router.push('/blog/articles');
        //                 }}
        //             />
        //         </Tag>
        //     </Box>
        // )}
        // </Box>
    );
};

export default Categories;

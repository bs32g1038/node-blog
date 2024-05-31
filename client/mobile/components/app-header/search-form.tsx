// import React from 'react';
// import { SearchBar } from 'antd-mobile';
// import style from './search-form.style.module.scss';
// import { debounce } from 'lodash';
// import { useLazySearchArticlesQuery } from '@blog/client/web/api';

// export const SearchForm = (props) => {
//     const [search, { data: { items = [], totalCount = 0 } = {}, isLoading }] = useLazySearchArticlesQuery();
//     const fetchData = (key: string) => {
//         return search({ key });
//     };
//     const debounceFetchData = debounce(fetchData, 200);
//     return (
//         <div className={style.searchForm} style={props.style}>
//             <SearchBar
//                 placeholder="请输入内容"
//                 onChange={(value) => {
//                     debounceFetchData(value);
//                 }}
//             />
//         </div>
//     );
// };

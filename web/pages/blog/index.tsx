import React from 'react';
import { Articles } from '../../components/articles';
import AppLayout from '../../layouts/app';
import { fetchCategories } from '../../redux/reducers/categories';

const Page = (props: any) => {
    console.log(props);
    return (
        <AppLayout>
            <Articles></Articles>
        </AppLayout>
    );
};

Page.getInitialProps = async({ reduxStore, req }: any) => {
    reduxStore.dispatch(fetchCategories());
    return {};
};

export default Page;
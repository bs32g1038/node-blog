import Head from 'next/head';
import React from 'react';
import siteInfo from '../../config/site-info';
import dynamic from 'next/dynamic';
const UserLogin = dynamic(() => import('../../admin/pages/UserLogin'), { ssr: false });

export default () => {
  return (
    <UserLogin>
      <Head>
        <title>{siteInfo.name + '-后台'}</title>
      </Head>
    </UserLogin>
  )
};
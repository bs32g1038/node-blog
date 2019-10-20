import dynamic from 'next/dynamic';
export default dynamic(() => import('../../client/admin/pages/UserLogin'), { ssr: false });

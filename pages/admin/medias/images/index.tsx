import dynamic from 'next/dynamic';
export default dynamic(() => import('@blog/client/admin/pages/Medias'), { ssr: false });

import 'antd/dist/antd.css';
import dynamic from 'next/dynamic';
export default dynamic(() => import('@blog/client/admin/pages/UserLogin'), { ssr: false });

import 'antd/dist/antd.css';
import dynamic from 'next/dynamic';
const UserLogin = dynamic(() => import('@blog/client/admin/pages/UserLogin'));
export default UserLogin;

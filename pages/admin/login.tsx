import 'antd/dist/antd.css';
import { noSSRWithLoadingDynamic } from '@blog/client/admin/utils/dynamic.import.util';
export default noSSRWithLoadingDynamic(import('@blog/client/admin/pages/UserLogin'));

import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';

function mapStateToProps(state) {
    const { dashboard } = state;
    return {  dashboard };
}

export default connect(mapStateToProps)(Dashboard);
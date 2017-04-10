import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';

function mapStateToProps(state) {
    const { articles, categories } = state;
    return {
        articles,
        categories
    };
}

export default connect(mapStateToProps)(Dashboard);
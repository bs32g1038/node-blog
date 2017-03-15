import { connect } from 'react-redux';
import CategoryList from '../components/CategoryList';

function mapStateToProps(state) {
    const { categories } = state;
    return {
        categories
    };
}

export default connect(mapStateToProps)(CategoryList);
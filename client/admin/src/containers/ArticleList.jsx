import { connect } from 'react-redux';
import ArticleList from '../components/ArticleList';

function mapStateToProps(state) {
    const { articles, categories } = state;
    return {
        articles,
        categories
    };
}

export default connect(mapStateToProps)(ArticleList);
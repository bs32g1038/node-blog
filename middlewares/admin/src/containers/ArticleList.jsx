import {connect} from 'react-redux';
import ArticleList from '../components/ArticleList';

function mapStateToProps(state) {
  const { articles } = state;
  return {
    articles 
  };
}

export default connect(mapStateToProps)(ArticleList);

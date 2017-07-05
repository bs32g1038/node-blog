import { connect } from 'react-redux';
import CommentList from '../components/CommentList';

function mapStateToProps(state) {
    const { comments } = state;
    return {
        comments
    };
}

export default connect(mapStateToProps)(CommentList);
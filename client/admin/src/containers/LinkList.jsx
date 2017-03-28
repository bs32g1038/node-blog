import { connect } from 'react-redux';
import LinkList from '../components/LinkList';

function mapStateToProps(state) {
    const { links } = state;
    return {
        links
    };
}

export default connect(mapStateToProps)(LinkList);
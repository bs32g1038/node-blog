import { connect } from 'react-redux';
import GuestbookList from '../components/GuestbookList';

function mapStateToProps(state) {
    const { guestbooks } = state;
    return {
        guestbooks
    };
}

export default connect(mapStateToProps)(GuestbookList);
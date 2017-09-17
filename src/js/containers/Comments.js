import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as fetchCommentsActions from '../redux/actions/fetchComments';

class Comments extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    const{ CommentsData } = this.props;
    return (
      <div className="pg-comments">
      </div>
    );
  }
}
Comments.propTypes  = {
  CommentsData: PropTypes.object.isRequired,
  // fetchBanner: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    CommentsData: state.CommentsData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, fetchCommentsActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
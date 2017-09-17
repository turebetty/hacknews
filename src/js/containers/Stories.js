import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';

import * as fetchStoriesActions from '../redux/actions/fetchStories';
import * as fetchItemsActions from '../redux/actions/fetchItems';

import Tabs from '../components/base/Tabs';
import Story from '../components/bussiness/Story';

const tapItems = [
  {value: 0, text:'New'},
  {value: 1, text:'Top'},
  {value: 2, text:'Best'},
];

class Stories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'selectedIndex': '0',
    }
  }
  componentDidMount() {
    const {fetchStories} = this.props;
    fetchStories(0);
  }
  componentDidUpdate(){
    // const {StoriesData} = this.props;
  }
  indexChange(index){
    const {StoriesData, fetchStories} = this.props;
    if(StoriesData.list[index].start === 0){
      fetchStories(index);
    }
    this.setState({
      selectedIndex:index,
    });
  }
  setNext(obj){
    obj.nextList = obj.list.slice(obj.start, obj.start+obj.limit);
    obj.start = obj.start+obj.limit;
    return obj;
  }
  _renderWaypoint() {
    const {StoriesData, fetchItems} = this.props;
    let storyType = this.state.selectedIndex;
    if(StoriesData.canRequestItems && StoriesData.list[storyType].nextList && StoriesData.list[storyType].nextList.length >0){
      return (
        <Waypoint
          onEnter={ () => fetchItems(StoriesData.list[storyType].nextList, storyType)}
          threshold={2}/>
      );
    }
  }
  render() {
    const{ StoriesData } = this.props;
    return (
      <div className="pg-stories">
        <Tabs tapItems={tapItems} selectedIndex={this.state.selectedIndex} indexChange={(index)=>this.indexChange(index)} isFixed='true'/>
        <ul className="story-list">{
          StoriesData.list[this.state.selectedIndex].items.map((item)=>{
            let data = item.data;
            data.storyType = this.state.selectedIndex;
            return <Story data={data} key = {data.id}/>
          })}
          {this._renderWaypoint()}
        </ul>
      </div>
    );
  }
}
Stories.propTypes  = {
  StoriesData: PropTypes.object.isRequired,
  fetchStories: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    StoriesData: state.StoriesData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, fetchStoriesActions, fetchItemsActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Stories);
import * as types from '../../constants/ActionTypes';
import cloneDeep from 'lodash/cloneDeep';
const initialState = {
  list: [
  {list: [], items: [], start: 0, limit: 12, nextList: []},
  {list: [], items: [], start: 0, limit: 12, nextList: []},
  {list: [], items: [], start: 0, limit: 12, nextList: []},
  ],
  canRequestItems: true,
};
let storyCache = [
  {list: [], items: [], start: 0, limit: 12, nextList: []},
  {list: [], items: [], start: 0, limit: 12, nextList: []},
  {list: [], items: [], start: 0, limit: 12, nextList: []},
];
function setNext(obj){
  obj.nextList = obj.list.slice(obj.start, obj.start+obj.limit);
  obj.start = obj.start+obj.limit;
  return obj;
}
export default function StoriesData(state = initialState, action) {
  switch (action.type) {
  case types.RECEIVE_STORIES:{
    storyCache[action.storyType].list = action.data;
    storyCache[action.storyType] = setNext(storyCache[action.storyType]);
    return Object.assign({}, state, {
      list: cloneDeep(storyCache)
    });
  }
  case types.REQUEST_ITEMS:{
    return Object.assign({}, state, {
      canRequestItems: false
    });
  }
  case types.RECEIVE_ITEMS:{
    storyCache[action.storyType] = setNext(storyCache[action.storyType]);
    storyCache[action.storyType].items = storyCache[action.storyType].items.concat(action.data);
    return Object.assign({}, state, {
      list: cloneDeep(storyCache),
      canRequestItems: true
    });
  }
  default:
    return state;
  }
}
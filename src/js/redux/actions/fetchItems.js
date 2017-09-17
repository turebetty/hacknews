import HNFetch from '../../utils/HNFetch';
import * as types from '../../constants/ActionTypes';
import * as api from '../../constants/ApiServer';
function requestItems(data, storyType) {
  return {
    type: types.REQUEST_ITEMS,
    receivedAt: Date.now()
  };
}
function receiveItems(data, storyType) {
  return {
    type: types.RECEIVE_ITEMS,
    data: data,
    storyType: storyType,
    receivedAt: Date.now()
  };
}
function fetchItemsData(ids, storyType) {
  let items = [];
  return dispatch => {
    //批量获取item以后，action完成
    let flag = 0;
    for (let id of ids) {
      items.push({id: id});
      let index = items.length -1;
      HNFetch({
        type: 'GET',
        url: api.itemUri(id),
      }).then(json =>{
        items[index].data = json;
        flag++;
        if(flag === ids.length){
          return dispatch(receiveItems(items, storyType));
        }
      });
    }
  };
}
/**
 * 根据id的列表，获取到item的列表
 *
 * @export
 * @param {array} ids id的列表
 * @returns
 */
export function fetchItems(ids, storyType) {
  return (dispatch)=>{
    dispatch(fetchItemsData(ids, storyType));
  }
}
import actionTypes from './actionTypes';
import {fromJS} from 'immutable';

const defalutState = fromJS({
  focused:false,
  mouseIn:false,
  list:[],
  page:1,
  totalPage:1,
});

export default (state = defalutState,action)=>{

  switch(action.type){
    case actionTypes.HEAD_SEARCH_FOCUSED:
      return state.set('focused',true);

    case actionTypes.HEAD_SEARCH_CANCELFOCUS:
      return state.set('focused',false);

    case actionTypes.HEAD_LIST_DATA:
      return state.set('list',action.data).set('totalPage',action.totalPage);
      
    case actionTypes.HAED_SEARCH_MOUSE_ENTER:
      return state.set('mouseIn',true);
    case actionTypes.HEAD_SEARCH_MOUSE_LEAVE:
      return state.set('mouseIn',false);

    case actionTypes.HEAD_SEARCH_CHANGE_PAGE:
      return state.set('page',action.page);
    default:
      return state;
  }
};
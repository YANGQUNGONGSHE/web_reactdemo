import actionTypes from './actionTypes';
import {fromJS} from 'immutable';

const defalutState = fromJS({
  focused:false,
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
    default:
      return state;
  }
};
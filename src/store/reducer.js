import actionTypes from './actionTypes';

const defalutState = {
  focused:false
};

export default (state = defalutState,action)=>{

  if(action.type === actionTypes.HEAD_SEARCH_FOCUSED){
    const newState = JSON.parse(JSON.stringify(state));
    newState.focused = true;
    return newState;
  }
  if(action.type === actionTypes.HEAD_SEARCH_CANCELFOCUS){
    const newState = JSON.parse(JSON.stringify(state));
    newState.focused = false;
    return newState;
  }
  return state;
};
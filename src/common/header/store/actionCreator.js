import actionTypes from './actionTypes';
import axios from 'axios';


const getHeaderList = (data)=>({
  type:actionTypes.HEAD_LIST_DATA,
  data,
  totalPage:Math.ceil(data.length/10)
});

export const getHeadSearchFocused = ()=>({
  type:actionTypes.HEAD_SEARCH_FOCUSED
});



export const getHeadSearchCancelFocus = ()=>({
  type:actionTypes.HEAD_SEARCH_CANCELFOCUS
});

export const getInitHeaderListData = () =>{
  return (dispatch)=>{
    axios.get('/headList.json').then((respone)=>{
        dispatch(getHeaderList(respone.data));
    }).catch((error)=>{
      console.log(error);
    })
  }
}
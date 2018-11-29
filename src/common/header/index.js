import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {CSSTransition} from 'react-transition-group';
import {actionCreator} from './store';
import axios from 'axios';
import {
  HeaderWrapper,
  Logo,Nav,
  NavItem,
  NavSearch,
  Addition,
  Button,
  SearchWrapper,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoItem,
  SearchInfoList,
} from './style';


class  Header extends PureComponent{

    render(){

      let {focused,mouseIn,page,totalPage,list,handleOnFocus,handleOnBlur,handleMouseEnter,handleMouseLeave,handleChangePage} = this.props;

      let newList = list;
      let pageList = [];
      if(newList.length){
        for(let i=(page - 1) * 10; i< page * 10; i++){
          pageList.push( <SearchInfoItem key = {newList[i]}>{newList[i]}</SearchInfoItem>)
        }
      }
      const getSearchInfo = focused || mouseIn?
        <SearchInfo
          onMouseEnter = {handleMouseEnter}
          onMouseLeave = {handleMouseLeave}
        >
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch
              onClick = {()=>handleChangePage(page,totalPage)}
            >
              换一批
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {pageList}
          </SearchInfoList>
        </SearchInfo>:null;

    return(
      <HeaderWrapper>
        <Logo/>
        <Nav>
          <NavItem className = 'left active'>首页</NavItem>
          <NavItem className = 'left'>下载APP</NavItem>
          <NavItem className = 'right'>登录</NavItem>
          <NavItem className = 'right'>
          <i className="iconfont">&#xe636;</i>
          </NavItem>
          <SearchWrapper>
            <CSSTransition
              in = {focused}
              timeout = {200}
              classNames = 'slide'
            >
              <NavSearch
                className = {focused ? 'focused':''}
                onFocus = {()=>handleOnFocus(list)}
                onBlur = {handleOnBlur}
              />
            </CSSTransition>
            <i className = {focused ? 'focused iconfont':'iconfont'}>&#xe62d;</i>
            {getSearchInfo}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Button className = 'writting'>
              <i className="iconfont">&#xe615;</i>
              写文章
              </Button>
          <Button 
            className = 'reg'>注册</Button>
        </Addition>
      </HeaderWrapper>
    );
  }
}

const mapStateToProps = (state) =>{

  return {
    focused:state.getIn(['header','focused']),//  前面等价于 state.get('header').get('focused')
    list:state.getIn(['header','list']),
    mouseIn:state.getIn(['header','mouseIn']),
    page:state.getIn(['header','page']),
    totalPage:state.getIn(['header','totalPage']),
  };
};

const mapDispatchToProps = (dispatch)=>{
  
  return {
    handleOnFocus(list){
      (list.size === 0 && dispatch(actionCreator.getInitHeaderListData()));
      dispatch(actionCreator.getHeadSearchFocused());
    },
    handleOnBlur(){
      const action = actionCreator.getHeadSearchCancelFocus();
      dispatch(action);
    },
    handleMouseEnter(){
      dispatch(actionCreator.getMouseEnter());
    },
    handleMouseLeave(){
      dispatch(actionCreator.getMouseLeave());
    },
    handleChangePage(page,totalPage){
      if(page<totalPage){
        dispatch(actionCreator.getChangePage(page+1));
      }else{
        dispatch(actionCreator.getChangePage(1));
      }
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Header);


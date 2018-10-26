import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {CSSTransition} from 'react-transition-group';
import {actionCreator} from './store';
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
      const {focused,list,handleOnFocus,handleOnBlur} = this.props;
      const getSearchInfo = focused ?
        <SearchInfo>
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch>
              换一批
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {
              list.map((item,index,arr)=>
              <SearchInfoItem key = {item}>{item}</SearchInfoItem>
            )
            }
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
                onFocus = {handleOnFocus}
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
          <Button className = 'reg'>注册</Button>
        </Addition>
      </HeaderWrapper>
    );
  }
}

const mapStateToProps = (state) =>{

  return {
    focused:state.getIn(['header','focused']),//  前面等价于 state.get('header').get('focused')
    list:state.getIn(['header','list']),
  };
};

const mapDispatchToProps = (dispatch)=>{
  
  return {
    handleOnFocus(){
      dispatch(actionCreator.getInitHeaderListData());
      dispatch(actionCreator.getHeadSearchFocused());
    },
    handleOnBlur(){
      const action = actionCreator.getHeadSearchCancelFocus();
      dispatch(action);
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Header);

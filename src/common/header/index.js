import React from 'react';
import {connect} from 'react-redux';
import {CSSTransition} from 'react-transition-group';
import {getHeadSearchFocused,getHeadSearchCancelFocus} from '../../store/actionCreator';
import {HeaderWrapper,Logo,Nav,NavItem,NavSearch,Addition,Button,SearchWrapper} from './style';

const Header  = (props) =>{
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
              in = {props.focused}
              timeout = {200}
              classNames = 'slide'
            >
              <NavSearch
                className = {props.focused ? 'focused':''}
                onFocus = {props.handleOnFocus}
                onBlur = {props.handleOnBlur}
              />
            </CSSTransition>
            <i className = {props.focused ? 'focused iconfont':'iconfont'}>&#xe62d;</i>
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


const mapStateToProps = (state) =>{

  return {
    focused:state.focused,
  };
};

const mapDispatchToProps = (dispatch)=>{
  
  return {
    handleOnFocus(){
      const action = getHeadSearchFocused();
      dispatch(action);
    },
    handleOnBlur(){
      const action = getHeadSearchCancelFocus();
      dispatch(action);
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Header);

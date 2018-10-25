import React, { Component } from 'react';
import Style from './style';
import Iconfont from './statics/iconfont/iconfont';
import Header from './common/header';
class App extends Component {
	render() {
		return (
			<div>
				<Header/>
				<Style/>
				<Iconfont/>
			</div>
		);
	}
}

export default App;

import React from 'react';
import Header from './Header';
import Content from './Content';
import RandomNumber from './RandomNumber';

class App extends React.Component {
     
    constructor(props){
        super(props);

        this.state = {
            value: Math.round(Math.random()*100)
        };

        this._updateValue = this._updateValue.bind(this);
    }

    render(){
        return  (
            <div>
                <Header title={this.props.header}/>
                <Content title={this.props.contentTitle}
                    body={this.props.contentBody}/>
                <RandomNumber number={this.state.value}
                              onUpdate={this._updateValue} />
            </div>
        );
    }

    _updateValue(randomValue){
        this.setState({
            value: randomValue
        });
    }
}

App.defaultProps = {
    header: 'Default header',
    contentTitle: 'Default contentTitle',
    contentBody: 'Default contentBody'
}
//defualtProps를 설정함으로써 props를 설정하지 않았을 때 기본적으로 나오게 하는 역할을 한다. 
//여기서 문자, 숫자 등 다양한 값을 넣을 수 있다.
export default App;

/*
Line 3~5 : 같은 폴더에 있는 js 파일들을 import 합니다.
Line 12 : 초기 state를 설정합니다.
Line 16 : updateValue() 메소드에서 this.setState 에 접근 할 수 있도록 bind 합니다.
Line 20~22 : state 를 변경 할 때는 setState({key: value}) 메소드 를 사용합니다.
Line 31-32 : RandomNumber 컴포넌트를 사용합니다.
*/
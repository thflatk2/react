import React from 'react';
import ReactDOM from 'react-dom';


class RandomNumber extends React.Component {
    _update(){
        let value = Math.round(Math.random()*100);
        this.props.onUpdate(value);
    }

    constructor(props){
        super(props);
        this._update = this._update.bind(this);
    }

    render(){
        return (
            <div>
                <h1>RANDOM NUMBER: { this.props.number }</h1>
                <button onClick={this._update}>Randomize</button>
            </div>
        );
    }
}

export default RandomNumber;
/*
랜덤 숫자를 나타내는 h1 element와, 클릭 하면 새로운 랜덤값으로 바꾸는 button element를 렌더링 합니다.

이 컴포넌트에서는 두가지 prop을 사용합니다.

number: 랜덤 값
onUpdate: function 형태의 prop 으로서, parent 컴포넌트에 정의된 메소드를 실행 할 수 있게 합니다.
코드 설명

Line 8: props 로 받은 함수를 실행합니다.
Line 11 ~ 14: React 컴포넌트의 생성자입니다. 
super(props) 로 상속받은 React.Component 의 생성자 메소드를 실행 한 후, 저희가 입력한 코드를 실행합니다.
13번 줄에서는 update 메소드에서 this.props 에 접근 할 수 있도록 binding 을 해줍니다.
Line 20: 버튼을 클릭하였을 시 update() 메소드를 실행합니다.
*/
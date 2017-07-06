import React from 'react';


class Header extends React.Component {
    render(){
        return (
            <h1>{ this.props.title }</h1>
        );
    }
}

export default Header;

//props 값이 렌더링 될 위치에 { this.props.propsName } 를 넣습니다.
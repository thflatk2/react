import React from 'react';


class Content extends React.Component {
    render(){
        return (
            <div>
                <h2>{ this.props.title }</h2>
                <p> { this.props.body } </p>
            </div>
        );
    }
}

Content.propTypes = {
    title: React.PropTypes.string,
    body: React.PropTypes.string.isRequired
};

export default Content;

//props 값이 랜더링 될 위체에 contentTitle 와 contentBody props 를 넣어주었습니다.
//propTypes를 이용하여 Type을 모두 string으로 지정하고, body는 isRequired를 추가하여 필수 props로 설정하였습니다.
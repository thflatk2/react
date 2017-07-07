import React from 'react';
import Header from './Header';
import Content from './Content';

class App extends React.Component {
    render(){
        return  (
            <div>
                <Header/>
                <Content/>
            </div>
        );
    }
}

export default App;

//Header와 Content를 import하여 사용합니다.
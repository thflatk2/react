import React from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';

class App extends React.Component {
    render(){

        return (
                <Contacts/>
        );
    }
}

class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactData: [
                {name: "Abet", phone: "010-0000-0001"},
                {name: "Betty", phone: "010-0000-0002"},
                {name: "Charlie", phone: "010-0000-0003"},
                {name: "David", phone: "010-0000-0004"}
            ],
            selectedKey: -1,
            //선택된 Contact가 없을 시에는 -1로 설정됩니다.
            selected: {
                name: "",
                phone: ""
            }
        };
    }

    _insertContact(name, phone){
        let newState = update(this.state, {
        	// 첫 파라미터는 처리 할 배열이며 두번째는 처리 할 명령들을 지니고 있는 객체 타입입니다.
            contactData: {
                $push: [{"name": name, "phone": phone}]
        		//push - 배열에  Object를 추가해주는 역할을 합니다.
            }
        });
        this.setState(newState);
    }
    /*
     * _insertContact(name, phone) 메소드를 ContactCreator 의 prop 으로 전달 해 주었습니다.
     */


    _onSelect(key){
        if(key==this.state.selectedKey){
            console.log("key select cancelled");
            this.setState({
                selectedKey: -1,
                selected: {
                    name: "",
                    phone: ""
                }
            });
            return;
        }

        this.setState({
            selectedKey: key,
            selected: this.state.contactData[key]
        });
        console.log(key + " is selected");
    }
    /*_onSelect() 메소드는 컴포넌트가 클릭 될 때 실행 할 메소드 입니다. 
     * 선택 할 컴포넌트가 이미 선택되어있다면 선택을 해제합니다.
	      이 메소드는 child 컴포넌트의 onSelect prop 으로 전달됩니다.
     */

    _isSelected(key){
        if(this.state.selectedKey == key){
            return true;
        }else{
            return false;
        }
    }
    /*_isSelect(key) 메소드는 child 컴포넌트에게 해당 컴포넌트가 선택된 상태인지 아닌지 알려줍니다.
	    이 메소드를 실행 한 결과 값이 child 컴포넌트의 isSelected prop 으로 전달 됩니다.
     */

    _removeContact(){
        if(this.state.selectedKey==-1){
            console.log("contact not selected");
            return;
        }
        //선택도니 Contact가 없다면 작업을 취소합니다.

        this.setState({
            contactData: update(
                this.state.contactData,
                {
                    $splice: [[this.state.selectedKey, 1]]
                //push와 반대로 splice는 제거하는 역할을 합니다.
                }
            ),
            selectedKey: -1
            //삭제된 후에 선택된 키를 초기화시켜줍니다.
        });
    }

    _editContact(name, phone){
        this.setState({
            contactData: update(
                this.state.contactData,
                {
                    [this.state.selectedKey]: {
                        name: { $set: name },
                        phone: { $set: phone }
                    }
                }
            ),
            selected: {
                name: name,
                phone: phone
            }
        });
    }



    render(){
        return(
            <div>
                <h1>Contacts</h1>
                <ul>
                    {this.state.contactData.map((contact, i) => {
                        return (<ContactInfo name={contact.name}
                                            phone={contact.phone}
                                              key={i}
                                       contactKey={i}
                                       isSelected={this._isSelected.bind(this)(i)}
                                         onSelect={this._onSelect.bind(this)}/>);
                    })}
                </ul>
                /* map과 Arrow Function 기능이 사용되었습니다.
                 * map() 메소드는 파라미터로 전달 된 함수를 통하여 배열 내의 요소를 프로세싱하여 그 결과로 새로운 배열을 생성합니다.
                 * 문제입니다
                 * var scores = [1,2,3,4,5];
                 * 
                 * function add(score){
                 * 	return score + 5;
                 * }
                 * var newScores = scores.map(add);
                 * newScores의 결과값은 무엇일까요
                 * 
                 * => arrow function은 간결한 코드를 위해서 탄생했습니다.
                 * 	문제입니다.
                 * 		result = x => x * x
                 * 		console.log(result(5));
                 *  결과값을 알려주세요.
                 *  
                 *  
                 */
                <ContactCreator onInsert={this._insertContact.bind(this)}/>
                <ContactRemover onRemove={this._removeContact.bind(this)}/>
                <ContactEditor onEdit={this._editContact.bind(this)}
                              contact={this.state.selected}
                              isSelected={(this.state.selectedKey != -1)}/>
        </div>
        );
    }
}


class ContactInfo extends React.Component {

    handleClick(){
        this.props.onSelect(this.props.contactKey);
    }
    /*해당 컴포넌트가 클릭되면 handleClick() 메소드가 실행되며,
	이 메소드 내부에선 parent 컴포넌트에서 prop 으로 전달받은 onSelect() 메소드를 실행합니다.
	여기서 인수 contactKey 는 해당 컴포넌트의 고유 번호입니다.
	컴포넌트를 매핑할 때 key 를 사용하긴 하였으나,
	이는 prop으로 간주되지 않으며 React 내부에서 사용하는 용도이기에 직접 접근이 불가합니다.
     */

    shouldComponentUpdate(nextProps, nextState){
    	return (JSON.stringify(nextProps) != JSON.stringify(this.props));
    }
    //필요한 정보만 랜더링을 할 수 있게 도와준다.
    
    render() {
        console.log("rendered: " + this.props.name);

        let getStyle = isSelect => {
        	// getStyle 이라는 함수를 선언했습니다. arrow function 이 사용되었는데요, 매개변수가 오직 하나라면 괄호가 생략 될 수 있습니다.
            if(!isSelect) return;

            let style = {
                fontWeight: 'bold',
                backgroundColor: '#4efcd8'
            };

            return style;
        };
        // 매개변수가 참이면 배경색이 아쿠아색인 스타일을 반환하며 거짓이면 비어있는 스타일을 반환합니다.

        return(
            <li style={getStyle(this.props.isSelected)}
                onClick={this.handleClick.bind(this)}>
                {this.props.name} {this.props.phone}
            </li>
        );
    }
}

class ContactCreator extends React.Component {
    constructor(props) {
        super(constructor);
        // Configure default state
        this.state = {
            name: "",
            phone: ""
        };
    }
    /*
     * 초기 state 값을 지정하고, 렌더링 부분 코드에서 input 의 value를 state를 사용하도록 수정한 후,
	       인풋박스에 텍스트를 적으려고 시도해보면 값이 고정되서 변경되지 않습니다.
	       이 부분을 해결하기 위하여, onChange 이벤트를 통하여 인풋박스에 텍스트를 입력 시 status 를 업데이트하도록 설정해야 합니다.
     */

    handleClick(){
        this.props.onInsert(this.state.name, this.state.phone);
        this.setState({
            name: "",
            phone: ""
        });
    }
    /*
     * handleClick() 에서는 parent 컴포넌트인 Contacts 에서 props 로 받아온 메소드를 실행합니다.
	       그 후, 인풋 박스 값을 비웁니다.
     */

    handleChange(e){
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    /*인풋박스의 값을 변경 할 때 실행 될 handleChange(e) 메소드를 만들었습니다.
 	    여기서 파라미터 e 는 JavaScript 의 Event 인터페이스입니다.
      e 를 사용함으로서 한 메소드로 여러 인풋박스를 인풋박스의 name 에 따라 처리 할 수 있게됩니다.
    */
    render() {
        return (
            <div>
                <p>
                    <input type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange.bind(this)}/>

                    <input type="text"
                        name="phone"
                        placeholder="phone"
                        value={this.state.phone}
                        onChange={this.handleChange.bind(this)}/>
                    /*onChange={this.handleChange.bind(this)}를 넣어주었습니다.
                   	인풋박스가 변경 될 때 해당 메소드를 실행한다는 의미 입니다. bind 를 통하여 컴포넌트의 this 에 접근 할 수 있게 됩니다.
                  	값을 집어 넣을 공간 및 버튼 생성
                     */
                    <button onClick={this.handleClick.bind(this)}>
                    Insert
                    </button>
                   //버튼을 클릭 했을 때 실행 될 메소드를 만들었습니다.
                </p>
            </div>
        );
    }
}

class ContactRemover extends React.Component {
    handleClick() {
        this.props.onRemove();
    }
    //버튼이 클릭되면 handleClick() 메소드가 실행 되며, 
    //해당 메소드에선 parent 컴포넌트에서 전달 받은 onRemove() 메소드가 실행됩니다.

    render() {
        return (
            <button onClick={this.handleClick.bind(this)}>
                Remove selected contact
            </button>
        );
    }
}

class ContactEditor extends React.Component {
    constructor(props) {
        super(constructor);
        // Configure default state
        this.state = {
            name: "",
            phone: ""
        };
    }

    handleClick(){
        if(!this.props.isSelected){
            console.log("contact not selected");

            return;
        }

        this.props.onEdit(this.state.name, this.state.phone);
    }
    //선택 된 Contact가 없다면 작업을 취소합니다.
    //onEdit()은 parent 컴포넌트에서 전달 받을 메소드 입니다.

    handleChange(e){
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            name: nextProps.contact.name,
            phone: nextProps.contact.phone
        });
    }
    //인풋박스의 value 부분은 유동적이기에 prop값이 바뀔 때마다 state를 업데이트 하기 위해서 사용하는 API

    render() {
        return (
            <div>
                <p>
                    <input type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange.bind(this)}/>

                    <input type="text"
                        name="phone"
                        placeholder="phone"
                        value={this.state.phone}
                        onChange={this.handleChange.bind(this)}/>
                    <button onClick={this.handleClick.bind(this)}>
                        Edit
                    </button>
                </p>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

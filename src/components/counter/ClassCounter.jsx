import React, {Component} from 'react';

class ClassCounter extends Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
        }

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }
    render() {
        return (
            <div>
                <ClassButton by={1} incr={this.increment} decr={this.decrement}/>
                <ClassButton by={5} incr={this.increment} decr={this.decrement}/>
                <ClassButton by={10} incr={this.increment} decr={this.decrement}/>
                <span className="count">{this.state.counter}</span><br/>
                <button id="resetBtn" onClick={()=>this.setState({counter:0})}>Reset</button>
            </div>
        );

    }
    increment(by){
        this.setState(
            (prevState)=> {
                     return {counter: prevState.counter+by}
                    })
    }
    decrement(by){
        this.setState(
            (prevState)=> {
                return {counter: prevState.counter-by}
            })
    }
}

export default ClassCounter;


class ClassButton extends Component {
    render() {
        return (
            <div className="counter">
                <button onClick={()=>this.props.incr(this.props.by)}>+{this.props.by}</button>
                <button onClick={()=>this.props.decr(this.props.by)}>-{this.props.by}</button><br/>
            </div>
        );
    }

}


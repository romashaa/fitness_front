import React, {useState} from 'react';
import "./Counter.css"

const Counter = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <CounterButton by={1} incr={incrementParent} decr={decrementParent}/>
            <CounterButton by={5} incr={incrementParent} decr={decrementParent}/>
            <CounterButton by={10} incr={incrementParent} decr={decrementParent}/>
            <button id="resetBtn" onClick={()=>setCount(0)}>Reset</button>
            <span className="count">{count}</span>
        </div>
    );
    function incrementParent(by){
       setCount(count+by)
    }
    function decrementParent(by){
        setCount(count-by)
    }

};


function CounterButton({incr, decr, by}) {
    return (
        <div className="counter">
            <button onClick={()=>incr(by)}>+{by}</button>
            <button onClick={()=>decr(by)}>-{by}</button><br/>

        </div>
    );
};


export default Counter;
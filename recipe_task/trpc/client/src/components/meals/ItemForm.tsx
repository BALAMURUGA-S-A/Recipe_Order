  import React, { useRef, useState } from 'react';
import Input from '../ui/Input';
import "./ItemFood.css"

export default function ItemForm(props) {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const [amount, setAmount] = useState(1);
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current?.value;
        const enteredAmountNumber = +enteredAmount;

        if ( enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(props.id, enteredAmountNumber);
    };

    const decreaseAmountHandler = (event) => {
        event.stopPropagation();
        setAmount((prevAmount) => {
            if (prevAmount > 1) {
                return prevAmount - 1;
            }
            return prevAmount;
        });
    };

    const increaseAmountHandler = (event) => {
        event.stopPropagation();
        setAmount((prevAmount) => {
            if (prevAmount < 5) {
                return prevAmount + 1;
            }
            return prevAmount;
        });
    };

    return (
        <form className="form" onSubmit={submitHandler}>
            <div className='form-button'>
                <Input
                    ref={amountInputRef}
                    label="Amount"
                    input={{
                        id: "amount_" + props.id,
                        type: "number",
                        min: '1',
                        max: '5',
                        step: '1',
                        value: amount.toString(),
                    }}
                />
                <button type="button" className='addbutton' onClick={decreaseAmountHandler}>-</button>
                <button type="button" className='addbutton' onClick={increaseAmountHandler}>+</button>
            </div>
            <button className='finalbutton' type="submit">+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    );
}

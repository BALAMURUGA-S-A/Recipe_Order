import { useRef } from 'react';
import "./User.css";
import * as Yup from 'yup';

const Checkout = (props) => {

  const schema = Yup.object().shape({
    name: Yup.string().required('Please enter a valid name.'),
    street: Yup.string().required('Please enter a valid street.'),
    pincode: Yup.string().length(6, 'Enter a valid postal code (5 characters long).').required('Please enter a valid postal code.'),
    city: Yup.string().required('Please enter a valid city.'),
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const pincodeRef = useRef();
  const cityRef = useRef();

  const confirmHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = {
        name: nameRef.current.value,
        street: streetRef.current.value,
        pincode: pincodeRef.current.value,
        city: cityRef.current.value,
      };

      await schema.validate(formData, { abortEarly: false });
      props.onConfirm(formData);
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      console.log(validationErrors);
    }
  };

  return (
    <form className="userform" onSubmit={confirmHandler}>
      <h1 className='userhead'>Enter the Details</h1>
      <div className="usercontrol">
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRef} />
      </div>

      <div className="usercontrol">
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetRef} />
      </div>

      <div className="usercontrol">
        <label htmlFor='pincode'>Pin Code</label>
        <input type='text' id='pincode' ref={pincodeRef} />
      </div>

      <div className="usercontrol">
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityRef} />
      </div>

      <div className="useractions">
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className="submit">Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
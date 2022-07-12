import classes from "./CheckOut.module.css";
import useInput from "../../hooks/use-input";


const isEmpty = (value) => value?.trim() !== "";


const CheckOut = (props) => {
  const {
    value: enteredName,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurChangeHandler,
    isValid: firstNameIsValid,
    reset: resetName,
    hasError: nameHasError,
  } = useInput(isEmpty);

  const {
    value: enteredStreet,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurChangeHandler,
    isValid: streetIsValid,
    reset: resetStreet,
    hasError: streetHasError,
  } = useInput(isEmpty);
  const {
    value: enteredPostal,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurChangeHandler,
    isValid: postalIsValid,
    reset: resetPostal,
    hasError: PostalHasError,
  } = useInput(isEmpty);
  const {
    value: enteredCity,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurChangeHandler,
    isValid: cityIsValid,
    reset: resetCity,
    hasError: cityHasError,
  } = useInput(isEmpty);

  let formIsValid = false;

  if (firstNameIsValid && streetIsValid && cityIsValid && postalIsValid) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
   

    props.onConfirm({
        name:enteredName,
        city:enteredCity,
        postal:enteredPostal,
        street:enteredStreet
    })

    resetName();
    resetCity();
    resetPostal();
    resetStreet();
  };

  const nameClass = nameHasError ? `${classes.invalid}` : '';
  const streetClass = streetHasError ? `${classes.invalid}` : '';
  const postalClass = PostalHasError ? `${classes.invalid}` : '';
  const cityClass = cityHasError ? `${classes.invalid}` : '';

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
        <div className={`${classes.control} ${nameClass}`}>
          <label htmlFor={"name"}>Your Name</label>
          <input
            onChange={nameChangeHandler}
            onBlur={nameBlurChangeHandler}
            value={enteredName}
            type="text"
            id="name"
          />
        </div>
        {nameHasError && <p className="error-text">Please enter a name.</p>}

        <div className={`${classes.control} ${streetClass}`}>
          <label htmlFor={"street"}>Street</label>
          <input
            onChange={streetChangeHandler}
            value={enteredStreet}
            type="text"
            id="street"
            onBlur={streetBlurChangeHandler}
          />
        </div>
        {streetHasError && <p className="error-text">Please enter a street.</p>}

        <div className={`${classes.control} ${postalClass}`}>
          <label htmlFor={"postal"}>Postal Code</label>
          <input
            onChange={postalChangeHandler}
            onBlur={postalBlurChangeHandler}
            value={enteredPostal}
            type="text"
            id="postal"
          />
        </div>
        {PostalHasError && <p className="error-text">Please enter a postal.</p>}

        <div className={`${classes.control} ${cityClass}`}>
          <label htmlFor={"city"}>City</label>
          <input
            onChange={cityChangeHandler}
            onBlur={cityBlurChangeHandler}
            value={enteredCity}
            type="text"
            id="city"
          />
        </div>
        {cityHasError && (
          <p className="error-text">Please enter a city name.</p>
        )}

        <div className={classes.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button  className={classes.submit}>Confirm</button>
        </div>
     
    </form>
  );
};
export default CheckOut;

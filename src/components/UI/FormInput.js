
const FormInput = (props) => {
    <>
  <div className={props.className}>
    <label htmlFor={props.label}>{props.labelContent}</label>
    <input
      onChange={props.onChange}
      onBlur={props.onBlur}
      value={props.value}
      type="text"
      id={props.id}
    />
  </div>
  {props.error && <p className="error-text">{props.errorMessage}</p>}
  </>
};

export default FormInput;

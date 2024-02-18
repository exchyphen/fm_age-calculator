import "./ageInput.css";

const AgeInput = (props) => {
  return (
    <>
      {props.errorState || props.allError ? (
        <div className="label-input-container">
          <label className="input-label error-label">{props.title}</label>
          <input
            className="input error-input"
            type="number"
            placeholder={props.placeholder}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            required
          ></input>
          {props.allError ? null : props.value === "" ? (
            <div className="error-message">This field is required</div>
          ) : (
            <div className="error-message">Must be a valid {props.title}</div>
          )}
        </div>
      ) : (
        <div className="label-input-container">
          <label className="input-label">{props.title}</label>
          <input
            className="input"
            type="number"
            placeholder={props.placeholder}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            required
          ></input>
        </div>
      )}
    </>
  );
};

export default AgeInput;

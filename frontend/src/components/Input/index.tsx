import TextareaAutosize from "react-textarea-autosize";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onChangeText?: any;
  errorMessage?: string;
  value?:string;
}
const Input = ({ label, errorMessage,value, ...props }: InputProps) => {
  return (
    <div className="form-input">
      {label && (
        <div className="form-input__label">
          <label htmlFor={props.id}>{label}</label>
          {errorMessage && <div className="form-input__error">{errorMessage}</div>}
        </div>
      )}

      <div className="form-input__container">
        <input {...props} value={value} />
      </div>
    </div>
  );
};

Input.Textarea = function ({ label, errorMessage, onChangeText, value, ...props }: InputProps) {
  return (
    <div className="form-input">
      <div className="form-input__label">
        <label htmlFor={props.id}>{label}</label>
        {errorMessage && <div className="form-input__error">{errorMessage}</div>}
      </div>
      <TextareaAutosize
        value={value}
        placeholder="Write your problem here..."
        className="form-input__textarea"
        onChange={onChangeText}
      />
    </div>
  );
};

export default Input;

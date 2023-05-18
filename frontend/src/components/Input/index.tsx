import TextareaAutosize from "react-textarea-autosize";
import { useAppSelector } from "../../redux/hook";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}
const Input = ({ label, errorMessage, ...props }: InputProps) => {
  const themeRedux = useAppSelector((state) => state.theme);
  return (
    <div className="form-input">
      <div className="form-input__label">
        <label htmlFor={props.id}>{label}</label>
        {errorMessage && (
          <div className="form-input__error">{errorMessage}</div>
        )}
      </div>
      <div className="form-input__container">
        <input {...props} />
      </div>
    </div>
  );
};

Input.Textarea = function ({ label, errorMessage, ...props }: InputProps) {
  return (
    <div className="form-input">
      <div className="form-input__label">
        <label htmlFor={props.id}>{label}</label>
        {errorMessage && (
          <div className="form-input__error">{errorMessage}</div>
        )}
      </div>
      <TextareaAutosize
        minRows={5}
        maxRows={5}
        placeholder="Write your problem here..."
        className="form-input__textarea"
      />
    </div>
  );
};

export default Input;

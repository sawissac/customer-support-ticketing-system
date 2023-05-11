interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

const Input = ({ label, errorMessage, ...props }: InputProps) => {
  return (
    <div className="com_input_container">
      <div className="lable_container">
        <label htmlFor={props.id}>{label}</label>
        {errorMessage && <div className="error_message">{errorMessage}</div>}
      </div>
      <div className="input_container">
        <input {...props} />
      </div>
    </div>
  );
};

export default Input;

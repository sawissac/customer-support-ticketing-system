interface StatusProps extends React.InputHTMLAttributes<HTMLDivElement> {
   
  }
  
  const Status = ({ }: StatusProps) => {
    return (
      <div className="status_container">
        <ul>
            <li><a href="">Open</a></li>
            <li><a href="">Processing</a></li>
            <li><a href="">Close</a></li>
        </ul>
      </div>
    );
  };
  export default Status;
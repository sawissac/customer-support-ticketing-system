import { ReactNode } from "react";

interface CardProps{
    disabled?: boolean;
    icon?: ReactNode;
    label: string;
    total:number;
  }
  
  const ReportCard = ({ disabled, label,icon,total}: CardProps) => {
    return (
      <div className="report-card">
            <div className="report-card__icon">
                {icon}
            </div>
            <div className="report-card__text">
                <label htmlFor="">{total}</label>
                <label htmlFor="">{label}</label>
            </div>
      </div>
    );
  };
  export default ReportCard;
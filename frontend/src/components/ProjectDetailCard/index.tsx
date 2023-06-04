import  { ReactNode } from "react";


interface Card {
  icon?: ReactNode;
  name: string;
  id: number;
}

const ProjectDetailCard = ({ id, name }: Card) => {
  return (
    <>
      <div className="project-detail-card-container">
        <p>{id}.</p>
        <label htmlFor="">{name}</label>
      </div>
    </>
  );
};
export default ProjectDetailCard;

import React from "react";

interface ShowIfInterface {
  sif: boolean;
  show: any;
}

const ShowIf = ({
  sif,
  show,
}: ShowIfInterface) => {
  return <>{sif ? show : null}</>;
};

export default ShowIf;

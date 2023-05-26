import { IconFileDownload } from "@tabler/icons-react";
import React from "react";

interface MessageInterface {
  userName: string;
  description: string;
  subject: string;
}

const Message = ({ userName, description, subject }: MessageInterface) => {
  return (
    <div className="message">
      <div className="message__header">From {userName}</div>
      <div className="message__description">
        <h5>{subject}</h5>
        {description}
      </div>
    </div>
  );
};

interface FileAttachmentInterface {
  link: string;
  label: string;
}

Message.FileAttachment = ({ link, label }: FileAttachmentInterface) => {
  return (
    <div className="message-file-attachment">
      <a
        href={link}
        target="_blank"
      >
        <IconFileDownload size={25} />
        {label}
      </a>
    </div>
  );
};

export default Message;

import { IconFileDownload } from "@tabler/icons-react";

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
        <h4>{subject}</h4>
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
      <a href={link} target="_blank">
        <IconFileDownload size={25} />
        {label}
      </a>
    </div>
  );
};

export default Message;

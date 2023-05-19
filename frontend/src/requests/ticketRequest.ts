import axios from "axios";

export function createTicket({
  tickets_id,
  customer_project_id,
  subject,
  description,
  status,
  priority,
  drive_link,
  token,
}: any) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/user",
        {
          tickets_id,
          customer_project_id,
          subject,
          description,
          status, 
          priority,
          drive_link,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        resolve(response.data);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}

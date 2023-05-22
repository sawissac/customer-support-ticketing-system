import axios from "axios";

export function createTicket({
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
        "http://127.0.0.1:8000/api/ticket",
        {
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

export function updateTicket({
  ticketId,
  customer_project_id,
  subject,
  description,
  priority,
  drive_link,
  status,
  token,
  start_date,
  end_date,
}: any) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `http://127.0.0.1:8000/api/ticket/${ticketId}`,
        {
          customer_project_id,
          subject,
          description,
          status,
          priority,
          drive_link,
          start_date,
          end_date,
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

export function getAllTicket({ token }: any) {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://127.0.0.1:8000/api/ticket`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        resolve(response.data);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}

import axios from "axios";

export function createEmployeeAssign({
  employee_id,
  ticket_id,
  status,
  task_name,
  start_date,
  end_date,
  token,
  project_id,
}: any) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/employee-assign",
        {
          employee_id,
          ticket_id,
          status,
          task_name,
          start_date,
          end_date,
          project_id
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

export function updateEmployeeAssign({
  id,
  employee_id,
  ticket_id,
  status,
  task_name,
  start_date,
  end_date,
  token,
}: any) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `http://127.0.0.1:8000/api/employee-assign/${id}`,
        {
          employee_id,
          ticket_id,
          status,
          task_name,
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

export function deleteEmployeeAssignUser({id, token}:any){
  return new Promise((resolve, reject) => {
    axios
      .delete(`http://127.0.0.1:8000/api/employee-assign/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
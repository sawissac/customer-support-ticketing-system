import axios from "axios";

export function createEmployeeProject({
  project_id,
  user_id,
  token,
}: any) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/employee-project",
        {
          project_id,
          user_id,
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
export function getEmployeeProject({ id, token }: any) {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://127.0.0.1:8000/api/employee-project/${id}`, {
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

export function updateEmployeeProject({
  id,
  project_id,
  user_id,
  token,
}: any) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `http://127.0.0.1:8000/api/employee-project/${id}`,
        {
          project_id,
          user_id,
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

export function deleteEmployeeProjectUser({ id, token }: any) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`http://127.0.0.1:8000/api/employee-project/${id}`, {
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
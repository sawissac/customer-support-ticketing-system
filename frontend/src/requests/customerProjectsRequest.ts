import axios from "axios";

export function createCustomerProject({ project_id, user_id, token }: any) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/customer-project",
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

export function getCustomerProjectPaginate({ page, token }: any) {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://127.0.0.1:8000/api/customer-paginate${page ? "?page=" + page : ""}`, {
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

export function getCustomerProject({ id, token }: any) {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://127.0.0.1:8000/api/customer-project/${id}`, {
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

export function updateCustomerProject({ id, project_id, user_id, token }: any) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `http://127.0.0.1:8000/api/customer-project/${id}`,
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

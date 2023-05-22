import axios from "axios";

export function createProject({ name, token }: any) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/project",
        {
          name,
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

export function getProject({ id, token }: any) {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://127.0.0.1:8000/api/project/${id ? "/" + id : ""}`, {
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

export function getProjectList({ id, token }: any) {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://127.0.0.1:8000/api/project-list${id ? "/" + id : ""}`, {
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

export function getAllProject({ token }: any) {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://127.0.0.1:8000/api/project`, {
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

export function updateProject({ id, name, token }: any) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `http://127.0.0.1:8000/api/project/${id}`,
        {
          name,
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

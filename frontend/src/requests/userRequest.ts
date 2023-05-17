import axios from "axios";

export function createUser({
  name,
  email,
  password,
  password_confirmation,
  role,
  token,
}: any) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/user",
        {
          name,
          email,
          password,
          password_confirmation,
          role,
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
export function getUser({ id, token }: any) {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://127.0.0.1:8000/api/user/${id}`, {
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

export function updateUser({ id, name, email, role, token }: any) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `http://127.0.0.1:8000/api/user/${id}`,
        {
          name,
          email,
          role,
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

export function getAllEmployee({ token }: any) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `http://127.0.0.1:8000/api/employee`,
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

export function getAllCustomer({ token }: any) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `http://127.0.0.1:8000/api/customer`,
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
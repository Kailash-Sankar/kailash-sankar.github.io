import axios from "axios";

const server = axios.create();

const url = {
  repos: "https://api.github.com/users/kailash-sankar/repos?sort=created",
};

server.interceptors.response.use(
  function (response) {
    // ignore 2xx response
    return response;
  },
  function (error) {
    console.log("Interceptor err", error);
    if (error && error.response) {
      // show some message
    }
    return Promise.reject(error);
  }
);

async function getRepoList() {
  const res = await server.get(url.repos, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });
  return res.data || [];
}

// async function saveForm(formData) {
//   const res = await server.post(`/save`, formData);
//   return res;
// }

export default {
  getRepoList,
};

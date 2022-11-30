import axios from 'axios'

const apiUrl = process.env.API_URL ?? 'https://api.racket.ph'

enum AxiosMethods {
  POST = 'post',
  GET = 'get',
  DELETE = 'delete',
  PUT = 'put',
  PATCH = 'patch',
}

function httpRequest(
  method: AxiosMethods,
  url: string,
  bodyParameters?: Record<string, number | string>
) {
  axios.defaults.headers.common = {
    Authorization: `bearer ${process.env.APP_SECRET}`,
  }
  return axios[method](`${apiUrl}/${url}`, bodyParameters)
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error))
}

const exportedObject = {
  get(url: string) {
    return httpRequest(AxiosMethods.GET, url)
  },

  delete(url: string, bodyParameters: Record<string, string>) {
    return httpRequest(AxiosMethods.DELETE, url, bodyParameters)
  },

  post(url: string, bodyParameters: Record<string, number | string>) {
    return httpRequest(AxiosMethods.POST, url, bodyParameters)
  },

  put(url: string, bodyParameters: Record<string, string>) {
    return httpRequest(AxiosMethods.PUT, url, bodyParameters)
  },

  patch(url: string, bodyParameters: Record<string, string>) {
    return httpRequest(AxiosMethods.PATCH, url, bodyParameters)
  },
}

export default exportedObject

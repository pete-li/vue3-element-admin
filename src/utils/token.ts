export const GET_TOKEN = () => {
  return localStorage.getItem('token')
}

export const SET_TOKEN = (data: string) => {
  return localStorage.setItem('token', data)
}

export const REMOVE_TOKEN = () => {
  return localStorage.removeItem('token')
}

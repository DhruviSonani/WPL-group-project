export const setLoginDetails = (data) => localStorage.setItem("Login", JSON.stringify(data))
export const getLoginDetails = () =>  JSON.parse(localStorage.getItem("Login"))
export const removeLoginDetails = () => localStorage.removeItem('Login')
import axios from "axios";
//การสร้าง Register
export const register = async (dataRegister) => {
  return await axios.post(import.meta.env.VITE_API + "/register", dataRegister);
};
//การสร้าง Login
export const login = async (dataLogin) => {
  return await axios.post(import.meta.env.VITE_API + "/login", dataLogin);
};
//การสร้าง currentUser
export const currentUser = async (authtoken) => {
  return await axios.post(
    import.meta.env.VITE_API + "/current-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
//การสร้าง currentAdmin
export const currentAdmin = async (authtoken) => {
  return await axios.post(
    import.meta.env.VITE_API + "/current-admin",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

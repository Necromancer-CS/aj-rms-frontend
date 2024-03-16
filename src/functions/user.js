import axios from "axios";
//การแสดงข้อมูล
export const list = async (authtoken) => {
  return await axios.get(import.meta.env.VITE_API + "/user", {
    headers: {
      authtoken,
    },
  });
};

//การแสดงข้อมูล
export const changeRole = async (authtoken, data) => {
  return await axios.post(
    import.meta.env.VITE_API + "/change-role",
    { data },
    {
      headers: {
        authtoken,
      },
    }
  );
};

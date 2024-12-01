import { axiosInstance } from "../axios/axios";
import { setLogout } from "../redux/features/userSlice";

export async function logout(dispatch) {
  try {
    const response = await axiosInstance.post("/api/auth/logout");
    if (response.data.message === "Logged out successfully") {
      localStorage.removeItem("inform_user");
      dispatch(setLogout());
  
    }
  } catch (error) {
    console.log(error);
  }
}

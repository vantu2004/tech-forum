import { useGoogleLogin } from "@react-oauth/google";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";
import { useUserAuthStore } from "../stores/useUserAuthStore";

const useGoogleAuth = () => {
  // Lấy ra các hàm cập nhật state trong Zustand store bằng getState()
  // → có thể gọi update ngay cả ngoài React component.
  const { setIsLoading, setIsAuthenticated, setUserAuth } =
    useUserAuthStore.getState();

  // Khởi tạo Google Login hook
  const loginGoogle = useGoogleLogin({
    flow: "auth-code", // Dùng Authorization Code Flow (FE chỉ nhận code, BE đổi code → tokens)
    scope: "openid email profile", // xin quyền email + profile cơ bản
    prompt: "select_account", // luôn hiển thị popup chọn tài khoản

    // Hàm chạy khi login thành công
    onSuccess: async ({ code }) => {
      setIsLoading?.(true); // bật trạng thái loading trong store

      try {
        // Gửi code sang backend để đổi lấy token + thông tin user
        const { data } = await axiosInstance.post("/users/google", { code });

        // BE trả về data.userAuth → lưu vào store
        setUserAuth?.(data.userAuth);

        // Đánh dấu đã đăng nhập thành công
        setIsAuthenticated?.(true);
      } catch (err) {
        console.error(err);

        // Nếu lỗi thì clear user + set trạng thái chưa login
        setUserAuth?.(null);
        setIsAuthenticated?.(false);

        // Hiện thông báo lỗi
        toast.error(err?.response?.data?.error || "Google login failed");
      } finally {
        // Tắt trạng thái loading trong mọi trường hợp
        setIsLoading?.(false);
      }
    },

    // Hàm chạy khi có lỗi từ Google OAuth (ví dụ popup bị đóng)
    onError: (err) => {
      console.error("Google OAuth Error:", err);
      toast.error("Google OAuth Error");
    },
  });

  // Trả về hàm loginGoogle để gọi trong component (ví dụ onClick={() => loginGoogle()})
  return loginGoogle;
};

export default useGoogleAuth;

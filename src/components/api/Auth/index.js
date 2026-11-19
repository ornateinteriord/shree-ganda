import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import TokenService from "../../token/tokenService";
import { get, post } from "../authHooks";

export const extractErrorMessage = (error, defaultMsg = "An error occurred. Please try again.") => {
  const data = error?.response?.data;
  if (typeof data === "string" && data.trim()) return data;
  if (data?.message) return data.message;
  if (data?.error?.message) return data.error.message;
  if (typeof data?.error === "string") return data.error;
  if (data?.msg) return data.msg;

  const status = error?.response?.status;
  if (status === 400) return "Invalid username or password. Please try again.";
  if (status === 401) return "Incorrect password. Please try again.";
  if (status === 403) return "Member under pending approval by admin.";
  if (status === 404) return "Account not found. Please check your credentials.";
  if (status >= 500) return "Server error. Please try again later.";

  if (error?.message && !error.message.includes("status code")) {
    return error.message;
  }

  return defaultMsg;
};

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      return await post("/api/auth/signup", data);
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Signup failed. Please try again."));
    }
  });
};

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      return await post("/api/auth/login", data);
    },

    onSuccess: (response) => {
      if (response?.success && response?.token) {
        TokenService.setToken(response.token);
        window.dispatchEvent(new Event("storage")); 

        const userStatus =
          response?.user?.status ||
          response?.status ||
          TokenService.decodeToken()?.status;

        const role = TokenService.getRole();

        if (userStatus && userStatus.toString().toLowerCase() !== "active") {
          TokenService.removeToken();
          window.dispatchEvent(new Event("storage"));
          toast.info(response.message || "Member under pending approval by admin.");
          return;
        }

        toast.success(response.message || "Logged in successfully");

        const roleLower = role?.toString().trim().toLowerCase();

        if (roleLower === "promoter") {
          navigate("/PromotAdmin");
        } else if (roleLower === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/userDashboard");
        }
      } else {
        toast.error(response?.message || "Login failed");
        console.error("Login failed:", response?.message);
      }
    },

    onError: (error) => {
      const errorMessage = extractErrorMessage(error, "Login failed. Please check your credentials.");
      if (error?.response?.status === 403) {
        toast.info(errorMessage);
      } else {
        toast.error(errorMessage);
      }
      console.error("Login error:", error);
    }
  });
};

export const useResetpassword = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await post("/api/auth/reset-password", data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      const errorMessage = extractErrorMessage(error, "Something went wrong");
      toast.error(errorMessage);
    }
  });
};

export const useGetDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardstats"],
    queryFn: async () => {
      const data = await get("/api/auth/dashboardstats");
      return data;
    },
  });
};

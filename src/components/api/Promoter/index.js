import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { get, post, put } from "../authHooks";

export const useGetPromoterDashboard = (promoter_id) => {
  return useQuery({
    queryKey: ["promoterDashboard", promoter_id],
    queryFn: async () => {
      if (!promoter_id) return null;
      return await get(`/api/promoter/dashboard/${promoter_id}`);
    },
    enabled: !!promoter_id,
  });
};

export const useUpdatePromoterProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ promoter_id, data }) => {
      return await put(`/api/promoter/profile/${promoter_id}`, data);
    },
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["promoterDashboard", variables.promoter_id],
      });
    },
  });
};

export const useGetMyUsers = (promoter_id) => {
  return useQuery({
    queryKey: ["myUsers", promoter_id],
    queryFn: async () => {
      if (!promoter_id) return { users: [] };
      return await get(`/api/promoter/my-users/${promoter_id}`);
    },
    enabled: !!promoter_id,
  });
};

export const useGetPromoterSentInterests = (promoter_id) => {
  return useQuery({
    queryKey: ["promoterSentInterests", promoter_id],
    queryFn: async () => {
      if (!promoter_id) return { content: [] };
      return await get(`/api/promoter/interests/sent/${promoter_id}`);
    },
    enabled: !!promoter_id,
  });
};

export const useGetPromoterReceivedInterests = (promoter_id) => {
  return useQuery({
    queryKey: ["promoterReceivedInterests", promoter_id],
    queryFn: async () => {
      const response = await get(`/api/promoter/interests/received/${promoter_id}`);
      if (response?.success) {
        return response.content || [];
      }
      throw new Error(response?.message || "Failed to fetch received interests");
    },
    enabled: !!promoter_id,
  });
};

export const usePromoterRegister = () => {
  return useMutation({
    mutationFn: async (data) => {
      return await post("/api/promoter/register", data);
    },
  });
};

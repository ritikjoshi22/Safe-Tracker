import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";

// Hook for adding a new employee
export const useAddEmployeeMutation = () =>
  useMutation({
    mutationFn: async ({ name, phoneNumber, address, serviceType, password }) =>
      (
        await apiClient.post("api/employees/add", {
          name,
          phoneNumber,
          address,
          serviceType,
          password,
        })
      ).data,
  });

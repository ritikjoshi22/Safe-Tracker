import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";

// Hook for adding a new employee
export const useAddEmployeeMutation = () =>
  useMutation({
    mutationFn: async ({ name, phoneNumber, email, address, serviceType, password }) =>
      (
        await apiClient.post("api/employees/add", {
          name,
          phoneNumber,
          email,
          address,
          serviceType,
          password,
        })
      ).data,
  });
export const useSigninEmpMutation = () =>
  useMutation({
    mutationFn: async ({ email, password, serviceType }) =>
      (
        await apiClient.post("api/employees/signin", {
          email,
          password,
          serviceType
        })
      ).data,
  });

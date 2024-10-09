import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { searchScholarship } from "../services/prompt.api";

export function useSearch() {
    const [formData, setFormData] = useState({
        country: '',
        degrees: '',
        major: '',
        funding_type: '',
        email: ''
      });

      useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') as string);
        if (user && user.email) {
          setFormData((prev) => ({ ...prev, email: user.email })); // Set email from localStorage
        }
      }, []);

      const {
        data,
        mutate: handleSearchScholarship,
        isPending,
        isError,
      } = useMutation({
        mutationKey: ['resultSearch'],
        mutationFn: () => searchScholarship(formData),
        onSuccess: (data) => {
          console.log('Search results:', data);
        },
      });

      return {data, handleSearchScholarship, isPending, isError, formData, setFormData}
}
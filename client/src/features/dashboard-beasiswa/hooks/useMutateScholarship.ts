import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBeasiswa } from "../services/dashboard.api";

export function useMutateScholarship() {
  const queryClient = useQueryClient();

const {mutate: deleteScholarship} = useMutation({
  mutationFn: async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this scholarship?');
    if(confirmed){
      await deleteBeasiswa(id);
    }
  },
  onSuccess: () => {
    // Invalidasi cache agar data terbaru muncul
    queryClient.invalidateQueries();
  },
});

  return { deleteScholarship };
}
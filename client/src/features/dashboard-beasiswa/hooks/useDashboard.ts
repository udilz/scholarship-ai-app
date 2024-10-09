import { useQuery } from "@tanstack/react-query";
import { getBeasiswa } from "../services/dashboard.api";
import { IDataScholarship } from "../types/scholarship.type";

export function useDashboard () {
    const {data, isLoading,isError} = useQuery<IDataScholarship[]>({
        queryKey: ['data'],
        queryFn: async () => {
          const data = await getBeasiswa()
          return data
        }
      })
      return {data, isLoading, isError}
}
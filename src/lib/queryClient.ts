import { QueryClient, QueryClientProvider } from "react-query";


export const queryClient = new QueryClient({
  defaultOptions: {
    // mutations: {
    //   onError: (e) => {
    //     if ("message" in (e as Error)) {
    //       showErrorToast((e as Error).message);
    //     }
    //   },
    // },
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 60 * 1000 * 5,
      onError: (e) => {
        // if ("message" in (e as Error)) {
        //   showErrorToast((e as Error).message);
        // }
      },
      // queryFn: defaultQueryFn,
    },
  },
});
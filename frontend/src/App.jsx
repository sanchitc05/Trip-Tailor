import { BrowserRouter } from "react-router-dom";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import AppRouter from "./routes/AppRouter";
import { AppContextProvider } from "./context/AppContext";
import { ToastProvider } from "./context/ToastContext";
import AppErrorBoundary from "./components/errors/AppErrorBoundary";
import { useSessionExpiry } from "./hooks/useSessionExpiry";

function dispatchGlobalError(message) {
  window.dispatchEvent(new CustomEvent("app-error", { detail: { message } }));
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => dispatchGlobalError(error.message || "Query failed."),
  }),
  mutationCache: new MutationCache({
    onError: (error) => dispatchGlobalError(error.message || "Action failed."),
  }),
  defaultOptions: {
    queries: {
      staleTime: 60000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  useSessionExpiry();
  return (
    <ToastProvider>
...
      <AppErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <TooltipProvider>
              <BrowserRouter>
                <AppRouter />
              </BrowserRouter>
            </TooltipProvider>
          </AppContextProvider>
        </QueryClientProvider>
      </AppErrorBoundary>
    </ToastProvider>
  );
}

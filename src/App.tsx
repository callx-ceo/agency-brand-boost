
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Agency from "./pages/Agency";
import NotFound from "./pages/NotFound";
import SuperAdminDashboard from "./components/superadmin/SuperAdminDashboard";
import AgentDashboardPage from "./pages/AgentDashboard";
import { ImpersonationProvider } from "./contexts/ImpersonationContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route 
            path="/agency" 
            element={
              <ImpersonationProvider>
                <Agency />
              </ImpersonationProvider>
            } 
          />
          <Route path="/super-admin" element={<SuperAdminDashboard />} />
          <Route 
            path="/agent" 
            element={
              <ImpersonationProvider>
                <AgentDashboardPage />
              </ImpersonationProvider>
            } 
          />
          <Route path="/publisher" element={<div className="p-8 text-center"><h1 className="text-2xl">Publisher Dashboard - Coming Soon</h1></div>} />
          <Route path="/advertiser" element={<div className="p-8 text-center"><h1 className="text-2xl">Advertiser Dashboard - Coming Soon</h1></div>} />
          <Route path="/guide" element={<div className="p-8 text-center"><h1 className="text-2xl">Guide Dashboard - Coming Soon</h1></div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

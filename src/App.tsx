
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Agency from "./pages/Agency";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/agency" element={<Agency />} />
          {/* Future routes for other roles */}
          <Route path="/super-admin" element={<div className="p-8 text-center"><h1 className="text-2xl">Super Admin Dashboard - Coming Soon</h1></div>} />
          <Route path="/publisher" element={<div className="p-8 text-center"><h1 className="text-2xl">Publisher Dashboard - Coming Soon</h1></div>} />
          <Route path="/advertiser" element={<div className="p-8 text-center"><h1 className="text-2xl">Advertiser Dashboard - Coming Soon</h1></div>} />
          <Route path="/agent" element={<div className="p-8 text-center"><h1 className="text-2xl">Agent Dashboard - Coming Soon</h1></div>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

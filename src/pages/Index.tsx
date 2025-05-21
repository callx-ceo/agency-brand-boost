
import { useState } from "react";
import AdminPanel from "../components/AdminPanel";
import AdminSidebar from "../components/AdminSidebar";
import { Toaster } from "sonner";

const Index = () => {
  const [activeSection, setActiveSection] = useState("branding");

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <div className="flex">
        <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">Agency Admin Panel</h1>
          <AdminPanel activeSection={activeSection} />
        </div>
      </div>
    </div>
  );
};

export default Index;

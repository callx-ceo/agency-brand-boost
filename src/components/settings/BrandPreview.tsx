
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface BrandPreviewProps {
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

const BrandPreview = ({
  logoUrl,
  primaryColor,
  secondaryColor,
  fontFamily,
}: BrandPreviewProps) => {
  // Apply branding to the preview
  useEffect(() => {
    const previewRoot = document.getElementById("brand-preview-root");
    if (previewRoot) {
      previewRoot.style.setProperty("--preview-primary-color", primaryColor);
      previewRoot.style.setProperty("--preview-secondary-color", secondaryColor);
      previewRoot.style.setProperty("--preview-font-family", getFontFamilyString(fontFamily));
    }
  }, [primaryColor, secondaryColor, fontFamily]);

  const getFontFamilyString = (font: string) => {
    switch (font) {
      case "Roboto":
        return "'Roboto', sans-serif";
      case "Open Sans":
        return "'Open Sans', sans-serif";
      case "Lato":
        return "'Lato', sans-serif";
      case "Poppins":
        return "'Poppins', sans-serif";
      default:
        return "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
    }
  };

  return (
    <div 
      id="brand-preview-root"
      className="space-y-6"
      style={{
        "--preview-primary-color": primaryColor,
        "--preview-secondary-color": secondaryColor,
        "--preview-font-family": getFontFamilyString(fontFamily),
      } as React.CSSProperties}
    >
      <div className="text-center mb-8">
        <h3 className="text-lg font-medium mb-4">Live Preview</h3>
        <p className="text-gray-500">
          This is how your branded portal will appear to your users
        </p>
      </div>

      {/* Header Preview */}
      <div className="rounded-lg overflow-hidden shadow-sm border">
        <div 
          className="p-4 flex items-center justify-between"
          style={{ backgroundColor: primaryColor, color: "#ffffff" }}
        >
          <div className="flex items-center gap-3">
            <img 
              src={logoUrl} 
              alt="Agency Logo" 
              className="h-8 w-auto max-w-[100px]" 
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <div className="hidden sm:block font-medium">Agency Portal</div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20"
            >
              Dashboard
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20"
            >
              Reports
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Content Preview */}
        <div 
          className="p-6 bg-white"
          style={{ fontFamily: "var(--preview-font-family)" }}
        >
          <h2 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
            Welcome to Your Agency Portal
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">Call Analytics {i}</CardTitle>
                  <CardDescription>Performance overview</CardDescription>
                </CardHeader>
                <CardContent className="py-2 flex-grow">
                  <div className="h-24 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                    Chart/Data
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline"
                    size="sm"
                    className={cn("w-full", i === 2 && "text-white")}
                    style={{
                      ...(i === 2 ? { backgroundColor: secondaryColor, borderColor: secondaryColor } : {})
                    }}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button 
              style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
            >
              Create New Report
            </Button>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-center text-gray-500">
        Note: This is a simplified preview. The actual styling may vary slightly in the final implementation.
      </div>
    </div>
  );
};

export default BrandPreview;

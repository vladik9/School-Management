import type React from "react";
export default function ShareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl">DocShare</div>
            <div className="text-sm text-gray-500">Secure Document Sharing</div>
          </div>
        </div>
      </header>
      {children}
      <footer className="border-t bg-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © 2023 DocShare. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

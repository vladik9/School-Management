"use client";

import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import translations from "@/lib/translations";
import React from "react";
import { processGetDocumentByShareLink } from "@/controllers/documents";
interface DocumentPageProps {
  params: {
    id: string;
  };
}

export default function DocumentPage({ params }: DocumentPageProps) {
  const [downloading, setDownloading] = useState(false);


  const handleDownload = async () => {
    await processGetDocumentByShareLink(params.id);
    setDownloading(true);

    // Simulate download process
    setTimeout(() => {
      setDownloading(false);

      // Reset the downloaded state after 3 seconds
      setTimeout(() => {
      }, 3000);

      // In a real app, you would initiate the actual file download here
    }, 1500);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-2xl">
        <Card className="shadow-lg">
          <CardContent className="pt-6 pb-4">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-blue-50 w-full py-10 rounded-lg flex flex-col items-center justify-center">
                <FileText className="h-16 w-16 text-blue-600 mb-4" />
                <h3 className="text-lg font-medium">{translations.documentReady}</h3>
                <p className="text-gray-500 max-w-md mt-2">
                  {translations.documentShared}
                </p>
              </div>

              <Button
                size="lg"
                className="mt-6 px-8 py-6 text-lg h-auto"
                onClick={handleDownload}
                disabled={downloading}
              >
                <>
                  <Download className="mr-2 h-5 w-5" />
                  {translations.download}
                </>
              </Button>
            </div>
          </CardContent>


        </Card>
      </div>
    </main>
  );
}

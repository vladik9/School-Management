"use client";

import { useEffect, useState } from "react";
import { Download, FileText, Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import translations from "@/lib/translations";
import React from "react";

interface DocumentPageProps {
  params: {
    id: string;
  };
}

export default function DocumentPage({ params }: DocumentPageProps) {
  const [downloading, setDownloading] = useState(false);


  // Mock document data - in a real app, you would fetch this based on the ID
  const document = {
    id: params.id,
    name: "Doc name",
    type: "Doc type",
    shareUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/share/${params?.id}`,
  };

  useEffect(() => {
    console.log("Searching for document");
    const searchihg = async () => {
      const response = await fetch(`/api/document/${params?.id}`);
      const data = await response.json();
      console.log(data);
    };
    searchihg();



  }, []);
  const handleDownload = () => {
    setDownloading(true);

    // Simulate download process
    setTimeout(() => {
      setDownloading(false);

      // Reset the downloaded state after 3 seconds
      setTimeout(() => {
      }, 3000);

      // In a real app, you would initiate the actual file download here
      // window.location.href = `/api/download/${document.id}`;
    }, 1500);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader className="border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">{document.name}</CardTitle>
                  <CardDescription>
                    {document.type}
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>

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

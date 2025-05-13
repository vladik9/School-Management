"use client";

import { useState } from "react";
import { Check, Copy, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import translations from "@/lib/translations";

interface ShareLinkProps {
  id: number;
  onGenerate: (id: number, link: string) => void,

}

export default function ShareLink({ id, onGenerate }: ShareLinkProps) {
  const [copied, setCopied] = useState(false);
  const [currentLink, setCurrentLink] = useState('');
  const generateLink = () => {

    // Default implementation if no onGenerate function is provided
    const randomString = Math.random().toString(36).substring(2, 40);
    const newLink = `${process.env.NEXT_PUBLIC_BASE_URL}/share/${randomString}`;
    setCurrentLink(newLink);
    setCopied(false);
    onGenerate(id, randomString); // Call the onGenerate function with the new link
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex w-full max-w-md flex-col space-y-2">
      <div className="flex w-full items-center space-x-2">
        <div className="relative flex-1">
          <Input
            value={currentLink}
            readOnly
            placeholder={translations.yourLinkWillBeHere}
            className="pr-10 font-medium text-sm"
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
        </div>
        <Button
          onClick={copyToClipboard}
          size="icon"
          className={cn("flex-shrink-0 transition-all", copied ? "bg-green-600 hover:bg-green-700" : "")}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
          disabled={!currentLink}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span className="sr-only">{copied ? "Copied" : "Copy to clipboard"}</span>
        </Button>
      </div>
      <Button onClick={generateLink} className="w-full" aria-label="Generate link">
        <Link className="h-4 w-4 mr-2" />
        {translations.generateLink}
      </Button>
    </div>
  );
}

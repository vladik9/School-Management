"use client";

import { useState } from "react";
import { Check, Copy, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import translations from "@/lib/translations";

interface ShareLinkProps {
  link?: string;
  onGenerate?: () => string;
}

export default function ShareLink({ link = translations.yourLinkWillBeHere, onGenerate }: ShareLinkProps) {
  const [copied, setCopied] = useState(false);
  const [currentLink, setCurrentLink] = useState(link);
  //TODO - add a logic to control how link is generated
  const generateLink = () => {
    if (onGenerate) {
      const newLink = onGenerate();
      setCurrentLink(newLink);
    } else {
      // Default implementation if no onGenerate function is provided
      const randomString = Math.random().toString(36).substring(2, 10);
      const newLink = `https://example.com/share/${randomString}`;
      setCurrentLink(newLink);
    }
    setCopied(false);
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
    <div className="flex w-full max-w-md items-center space-x-2">
      <div className="relative flex-1">
        <Input
          value={currentLink}
          readOnly
          placeholder="Generated link will appear here"
          className="pr-10 font-medium text-sm"
          onClick={(e) => (e.target as HTMLInputElement).select()}
        />
      </div>
      <Button onClick={generateLink} className="flex-shrink-0" aria-label="Generate link">
        <Link className="h-4 w-4 mr-2" />
        {translations.generateLink}
      </Button>
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
  );
}

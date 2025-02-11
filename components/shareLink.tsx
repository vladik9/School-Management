import React from 'react';
interface ShareLinkProps {
  link: string;
}
export default function ShareLink({ link = "Link" }: ShareLinkProps) {
  return (
    <div>{link}</div>
  );
}

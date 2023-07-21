"use client";

import Image from "next/image";
import { useRef } from "react";

function CopyLink({ link }: { link: string }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
    }
  };

  return (
    <div className="flex items-center">
      <input
        ref={inputRef}
        type="text"
        value={link}
        readOnly
        className="block w-full rounded-l-md border-0 bg-gray-800 px-2 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-gray-700  placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
      />
      <button
        onClick={copyToClipboard}
        className="flex h-9 w-10 items-center justify-center rounded-r-md bg-indigo-600 text-white hover:bg-indigo-500"
      >
        <Image
          src="/clipboard.svg"
          width={20}
          height={20}
          alt="copy"
          className="invert"
        />
      </button>
    </div>
  );
}

export default CopyLink;

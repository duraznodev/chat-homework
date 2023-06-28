import { useEffect } from "react";

export function Message({ message, own, color, user_name }) {
  return (
    <div
      // title={text}
      className={`rounded-2xl flex flex-col p-4 overflow-hidden break-all ${
        own ? "ms-14" : "me-14"
      } ${color}`}
    >
      <span className="font-medium text-sm">{user_name}</span>
      <span>{message}</span>
    </div>
  );
}

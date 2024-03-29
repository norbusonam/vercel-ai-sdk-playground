"use client";

import { useActions, useUIState } from "ai/rsc";
import { AI } from "./action";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          // Add user message to UI state
          setMessages((currentMessages) => [
            ...currentMessages,
            {
              id: Date.now(),
              display: <div>{inputValue}</div>,
            },
          ]);

          // Submit and get response message
          const responseMessage = await submitUserMessage(inputValue);
          setMessages((currentMessages) => [
            ...currentMessages,
            responseMessage,
          ]);

          setInputValue("");
        }}
      >
        <Input
          placeholder="Send a message..."
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
      </form>
      {
        // View messages in UI state
        messages.map((message) => (
          <div key={message.id}>{message.display}</div>
        ))
      }
    </div>
  );
}

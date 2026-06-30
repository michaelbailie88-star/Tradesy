"use client";

import { sendMessage } from "@/services/messages";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

interface Message {
  id: string;
  content: string;
  createdAt: Date;
  senderId: string;
  sender: {
    name: string | null;
    role: string;
  };
}

export default function MessageThread({ 
  jobId, 
  initialMessages 
}: { 
  jobId: string; 
  initialMessages: Message[];
}) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState(initialMessages);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: "smooth" | "auto" = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Polling for new messages
  useEffect(() => {
    const pollMessages = async () => {
      try {
        const response = await fetch(`/api/messages?jobId=${jobId}`);
        if (response.ok) {
          const newMessages = await response.json();
          // Only update if message count changed or if we have new IDs
          if (newMessages.length !== messages.length) {
            setMessages(newMessages);
          }
        }
      } catch (error) {
        console.error("Error polling messages:", error);
      }
    };

    const interval = setInterval(pollMessages, 5000);
    return () => clearInterval(interval);
  }, [jobId, messages.length]);

  async function handleSubmit(formData: FormData) {
    const content = formData.get("content") as string;
    if (!content.trim()) return;

    setIsSubmitting(true);
    
    const result = await sendMessage(formData);
    
    if (result?.success) {
      // Optimistically add message? Or just wait for revalidation.
      // Since it's a server action with revalidatePath, 
      // the page props should update if this component was in a server component.
      // But we are in a client component.
      
      // For now, let's manually add it to the state for immediate feedback
      const newMessage: Message = {
        id: Math.random().toString(),
        content,
        createdAt: new Date(),
        senderId: (session?.user as any).id,
        sender: {
          name: session?.user?.name || "Me",
          role: (session?.user as any).role
        }
      };
      setMessages([...messages, newMessage]);
      (document.getElementById("message-form") as HTMLFormElement).reset();
    } else if (result?.error) {
      alert(result.error);
    }
    
    setIsSubmitting(false);
  }

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-xl shadow-md border border-gray-200">
      <div className="p-4 border-b border-gray-100 bg-gray-50 rounded-t-xl">
        <h3 className="font-bold text-gray-900">Job Messages</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length > 0 ? (
          messages.map((msg) => {
            const isMe = msg.senderId === (session?.user as any)?.id;
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  isMe ? 'bg-primary-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-900 rounded-bl-none'
                }`}>
                  {!isMe && (
                    <p className="text-[10px] font-bold uppercase mb-1 opacity-70">
                      {msg.sender.name} ({msg.sender.role})
                    </p>
                  )}
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-[10px] mt-1 ${isMe ? 'text-primary-200' : 'text-gray-400'}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-gray-400 italic">
            No messages yet. Start the conversation!
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-100">
        <form id="message-form" action={handleSubmit} className="flex space-x-2">
          <input type="hidden" name="jobId" value={jobId} />
          <input
            type="text"
            name="content"
            required
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition disabled:bg-primary-400"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

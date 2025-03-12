import type { MetaFunction } from "@remix-run/node";
import { useState, useRef } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Reseller Outreach" },
    { name: "description", content: "Generate outreach messages for resellers" },
  ];
};

const geminiModels = [
  "gemini-pro",
  "gemini-ultra",
  "gemini-1.5-pro"
];

const messages = {
  "gemini-pro": [
    "Hey {name}, I saw your listing for ${price}. Would you be willing to take ${desiredPrice} in cash today?",
    "Hello {name}, your price of ${price} seems a bit high. Would you consider ${desiredPrice} I can pay in cash today?",
    "Hi {name}, I'm interested in your item listed at ${price}. Can we discuss the price? Would you take ${desiredPrice} I can pay in cash today? (Gemini Pro)",
    "Hey {name}, I saw your listing for ${price}. I can pay ${desiredPrice} in cash today.",
    "Hello {name}, your price of ${price} seems a bit high. I can pay ${desiredPrice} in cash today.",
  ],
  "gemini-ultra": [
    "Greetings, {name}! Regarding your item listed at ${price}, are you open to price discussions? I can pay ${desiredPrice} in cash today.",
    "Dear {name}, your listed price of ${price} appears somewhat elevated. Could we explore potential adjustments? I can pay ${desiredPrice} in cash today.",
    "Hello {name}, I am intrigued by your item priced at ${price}. Would you consider a price negotiation? I can pay ${desiredPrice} in cash today. (Gemini Ultra)",
    "Greetings, {name}! Regarding your item listed at ${price}, would you take ${desiredPrice} I can pay in cash today?",
    "Dear {name}, your listed price of ${price} appears somewhat elevated. Would you consider ${desiredPrice} I can pay in cash today?",
  ],
  "gemini-1.5-pro": [
    "Hey {name}, noticed your listing at ${price}. Open to offers? I can pay ${desiredPrice} in cash today.",
    "Hi {name}, is the ${price} price tag negotiable? I can pay ${desiredPrice} in cash today.",
    "Interested in your item at ${price}, {name}. Price talk? I can pay ${desiredPrice} in cash today. (Gemini 1.5 Pro)",
    "Hey {name}, noticed your listing at ${price}. Would you take ${desiredPrice} I can pay in cash today?",
    "Hi {name}, is the ${price} price tag negotiable? Would you take ${desiredPrice} I can pay in cash today?",
  ],
};

export default function Index() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
    const [desiredPrice, setDesiredPrice] = useState("");
  const [model, setModel] = useState(geminiModels[0]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [message, setMessage] = useState("");
  const messageRef = useRef(null);

  const generateMessage = () => {
    // Simulate Gemini API call
    const modelMessages = messages[model];
    const generatedMessage = modelMessages[messageIndex]
      .replace("{name}", name)
      .replace("${price}", price)
        .replace("${desiredPrice}", desiredPrice);
    setMessage(generatedMessage);
    setMessageIndex((messageIndex + 1) % modelMessages.length);
  };

  const copyToClipboard = () => {
    const text = message;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          console.log('Text copied to clipboard');
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";  //avoid scrolling to bottom of page in MS Edge.
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }

      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Reseller Outreach Automation
          </h1>
        </header>
        <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <div className="flex flex-col gap-4">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
               <label htmlFor="desiredPrice">Desired Price:</label>
            <input
              type="text"
              id="desiredPrice"
              value={desiredPrice}
              onChange={(e) => setDesiredPrice(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <label htmlFor="model">Gemini Model:</label>
            <select
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="border border-gray-300 rounded p-2"
            >
              {geminiModels.map((model) => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
            <button
              onClick={generateMessage}
              className="bg-blue-500 text-white rounded p-2"
            >
              Generate Message
            </button>
          </div>
          {message && (
            <div className="mt-4 p-4 border border-gray-300 rounded">
              <p>Bot Preview:</p>
              <p ref={messageRef}>{message}</p>
              <button
                onClick={copyToClipboard}
                className="bg-green-500 text-white rounded p-2 mt-2"
              >
                Copy Text
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

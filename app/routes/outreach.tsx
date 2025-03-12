import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Outreach Message Generator" }];
};

export default function OutreachRoute() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState("");
  const [generatedMessage, setGeneratedMessage] = useState("");

  const generateMessage = async () => {
    // Basic templates
    const templates = [
      `Hey ${name} Can you do ${price} Cash? I can pick it up today.`,
      `${price}? I can pick the phone up now.`,
      `Hey ${name} can we do $${price} cash and purchase the phone today.`,
      `Hi [Seller's Name],\nI hope this message finds you well. I came across your listing for the [Phone Model] on Facebook Marketplace, and I'm interested in purchasing it. I've been looking for a [Phone Model] for a while, and your listing caught my eye.\nI noticed that you're asking [Listed Price] for the phone, and I was wondering if there might be some room for negotiation. I have a budget in mind, and I'm hoping we can work together to find a price that works for both of us.\nI've done some research, and I see that similar phones in the market are priced around [Comparable Price]. Given that and considering any additional features or accessories that come with your phone, would you be open to discussing the price?\nI understand the value of the [Phone Model], and I'm genuinely interested in making a fair deal. If there's any flexibility on the price, I'd be happy to arrange a convenient time to meet and finalize the purchase.\nAdditionally, could you provide more details about the phone's condition, any accessories included, and if there are any issues or concerns I should be aware of?\nThank you for your time, and I look forward to hearing from you soon.\nBest regards,\n[Your Name]`,
      `Hey ${name}, my name is [Your Name]. I run an electronics business in north Las Vegas. I buy phones; by any chance, would you be willing to sell for less than your offer price if I paid in cash?`,
    ];

    // Gemini API Placeholder - Since we cannot directly call the Gemini API
    // in this environment, we'll simulate its response.
    const geminiSuggestion = `Based on the name ${name}, price ${price}, and product ${product}, consider highlighting the urgency of a quick cash transaction.`;

    // Combine templates and Gemini suggestion
    const combinedMessage = `${templates[0]}\n\n${geminiSuggestion}`;

    setGeneratedMessage(combinedMessage);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Outreach Message Generator</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Seller's Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            placeholder="Your Offer Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="product">
            Product:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="product"
            type="text"
            placeholder="Product Name"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={generateMessage}
          >
            Generate Message
          </button>
        </div>
        {generatedMessage && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Generated Message:</h3>
            <p className="text-gray-800 whitespace-pre-line">{generatedMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

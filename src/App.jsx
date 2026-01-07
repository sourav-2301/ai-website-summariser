import { useState } from "react";
import UrlInput from "./components/UrlInput";
import SummaryBox from "./components/SummaryBox";
import Loader from "./components/Loader";
import { getSummary } from "./services/aiService";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarise = async () => {
    if (!url) {
      setSummary("Please enter a URL");
      return;
    }

    setLoading(true);
    setSummary("");

    try {
      let finalUrl = url.trim();

      // ✅ Ensure URL starts with http/https
      if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
        finalUrl = "https://" + finalUrl;
      }

      // ✅ Fetch visible website text
      const textResponse = await fetch(`https://r.jina.ai/${finalUrl}`);
      const websiteText = await textResponse.text();

      // ✅ Send text to Groq AI
      const aiSummary = await getSummary(websiteText);

      setSummary(aiSummary);
    } catch (error) {
      console.error("Summarise Error:", error);
      setSummary("Failed to summarise website.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h2>AI Website Summariser</h2>

      <UrlInput
        url={url}
        setUrl={setUrl}
        onSummarise={handleSummarise}
      />

      {loading && <Loader />}

      <SummaryBox summary={summary} />
    </div>
  );
}

export default App;

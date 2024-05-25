"use client";
import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setTranscript("");
    setLoading(true);

    const videoId = videoUrl.split("v=")[1];
    if (!videoId) {
      setError("Invalid YouTube URL");
      setLoading(false);
      console.log(videoId);
      return;
    }

    try {
      const response = await axios.get(`/api/transcript?videoId=${videoId}`);
      setTranscript(response.data.transcript);
    } catch (err) {
      setError("Failed to retrieve transcript");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">YouTube Transcript Retriever</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={videoUrl}
          onChange={handleInputChange}
          placeholder="Enter YouTube video URL"
          className="border p-2 w-full mb-4 text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Get Transcript
        </button>
      </form>
      {loading && <p className="text-blue-500 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {transcript && (
        <pre className="bg-gray-100 p-4 mt-4 text-black">{transcript}</pre>
      )}
    </div>
  );
};

export default Home;

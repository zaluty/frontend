import { useState } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();
  const [videoUrl, setVideoUrl] = useState("");
  const [transcription, setTranscription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setTranscription("");

    try {
      const response = await axios.post("/api/transcribe", { videoUrl });
      setTranscription(response.data.transcription);
    } catch (err) {
      setError(
        "Failed to fetch transcription. Please check the URL and try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">YouTube Transcription App</h1>
      {!session ? (
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Sign in with Google
        </button>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <input
              type="text"
              placeholder="Enter YouTube video URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Get Transcription
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {transcription && (
            <div className="mt-6 p-4 bg-white rounded shadow-md w-full max-w-md">
              <h2 className="text-xl font-bold mb-2">Transcription:</h2>
              <p>{transcription}</p>
            </div>
          )}
          <button
            onClick={() => signOut()}
            className="mt-4 bg-red-500 text-white p-2 rounded"
          >
            Sign out
          </button>
        </>
      )}
    </div>
  );
};

export default Home;

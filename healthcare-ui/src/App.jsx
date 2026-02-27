import { useState } from "react";

export default function App() {

  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const predict = async () => {

    if (!symptoms) return;

    setLoading(true);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/predict?symptoms=${symptoms}`
      );

      const data = await res.json();
      setResult(data);

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-3">
          Healthcare AI Assistant
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Describe your symptoms and get guidance instantly
        </p>

        <input
          type="text"
          placeholder="e.g. fever, headache, cough"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          onClick={predict}
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Analyzing..." : "Submit"}
        </button>

        {result && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">

            <p className="mb-2">
              <strong>Disease:</strong> {result.disease}
            </p>

            <p className="mb-2">
              <strong>Urgency:</strong> {result.urgency}
            </p>

            <p className="mb-2">
              <strong>Medicine:</strong> {result.medicine}
            </p>

            <p className="text-sm text-gray-500 mt-3">
              This is not a medical diagnosis. Please consult a doctor.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}
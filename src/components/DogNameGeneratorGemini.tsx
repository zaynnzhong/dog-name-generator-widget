import { useState } from "react";
import { Heart, Sparkles, Dog } from "lucide-react";

interface DogNameGeneratorProps {
  apiKey?: string;
}

export default function DogNameGeneratorGemini({
  apiKey,
}: DogNameGeneratorProps) {
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [preference, setPreference] = useState("");
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const preferences = [
    { value: "food", label: "🍖 Food", emoji: "🍕" },
    { value: "object", label: "⚽ Objects", emoji: "🎾" },
    { value: "location", label: "🌎 Places", emoji: "🏔️" },
    { value: "nature", label: "🌺 Nature", emoji: "🌸" },
    { value: "character", label: "🦸 Characters", emoji: "🎭" },
    { value: "color", label: "🎨 Colors", emoji: "🌈" },
  ];

  const generateNames = async () => {
    if (!breed || !gender || !preference) {
      alert("Please fill in all fields!");
      return;
    }

    if (!apiKey) {
      alert("API key is required. Please check your setup.");
      return;
    }

    setIsLoading(true);
    setShowResults(false);

    try {
      const prompt = `Generate 5 creative and playful dog names for a ${gender} ${breed} dog. The names should be inspired by ${preference}. Make the names fun, memorable, and suitable for a beloved pet. Return only the names, one per line, without numbers or bullets.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.9,
              topK: 1,
              topP: 1,
              maxOutputTokens: 2048,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedText) {
        const names = generatedText
          .split("\n")
          .filter((name: string) => name.trim())
          .slice(0, 5);
        setGeneratedNames(names);
        setShowResults(true);
      } else {
        throw new Error("No names generated");
      }
    } catch (error) {
      console.error("Error generating names:", error);
      alert("Failed to generate names. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateAgain = () => {
    setShowResults(false);
    setGeneratedNames([]);
  };

  return (
    <>
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          padding: "24px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          color: "white",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <Dog size={32} style={{ color: "#fbbf24" }} />
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                margin: "0",
                background: "linear-gradient(45deg, #fbbf24, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Dog Name Generator
            </h1>
          </div>
          <p
            style={{
              fontSize: "16px",
              opacity: "0.9",
              margin: "0",
            }}
          >
            Create the perfect name for your furry friend! 🐕✨
          </p>
        </div>

        {!showResults ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#f3f4f6",
                }}
              >
                Dog Breed
              </label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="e.g., Golden Retriever, Labrador, Mixed"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "16px",
                  outline: "none",
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  backdropFilter: "blur(10px)",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.background = "rgba(255,255,255,0.2)";
                  e.target.style.transform = "scale(1.02)";
                }}
                onBlur={(e) => {
                  e.target.style.background = "rgba(255,255,255,0.1)";
                  e.target.style.transform = "scale(1)";
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#f3f4f6",
                }}
              >
                Gender
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                }}
              >
                {["male", "female"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      border: "none",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      background:
                        gender === g
                          ? "linear-gradient(45deg, #10b981, #059669)"
                          : "rgba(255,255,255,0.1)",
                      color: "white",
                      textTransform: "capitalize",
                      transform: gender === g ? "scale(1.05)" : "scale(1)",
                      boxShadow:
                        gender === g
                          ? "0 4px 12px rgba(16,185,129,0.3)"
                          : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (gender !== g) {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.2)";
                        e.currentTarget.style.transform = "scale(1.02)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (gender !== g) {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.1)";
                        e.currentTarget.style.transform = "scale(1)";
                      }
                    }}
                  >
                    {g === "male" ? "🐕" : "🐩"} {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#f3f4f6",
                }}
              >
                Name Inspiration
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "8px",
                }}
              >
                {preferences.map((pref) => (
                  <button
                    key={pref.value}
                    onClick={() => setPreference(pref.value)}
                    style={{
                      padding: "12px 8px",
                      borderRadius: "8px",
                      border: "none",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      background:
                        preference === pref.value
                          ? "linear-gradient(45deg, #8b5cf6, #7c3aed)"
                          : "rgba(255,255,255,0.1)",
                      color: "white",
                      transform:
                        preference === pref.value ? "scale(1.05)" : "scale(1)",
                      boxShadow:
                        preference === pref.value
                          ? "0 4px 12px rgba(139,92,246,0.3)"
                          : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (preference !== pref.value) {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.2)";
                        e.currentTarget.style.transform = "scale(1.02)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (preference !== pref.value) {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.1)";
                        e.currentTarget.style.transform = "scale(1)";
                      }
                    }}
                  >
                    {pref.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateNames}
              disabled={isLoading || !breed || !gender || !preference}
              style={{
                padding: "16px",
                borderRadius: "12px",
                border: "none",
                fontSize: "18px",
                fontWeight: "bold",
                cursor:
                  isLoading || !breed || !gender || !preference
                    ? "not-allowed"
                    : "pointer",
                transition: "all 0.3s",
                background:
                  isLoading || !breed || !gender || !preference
                    ? "rgba(255,255,255,0.3)"
                    : "linear-gradient(45deg, #f59e0b, #d97706)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginTop: "8px",
                transform: isLoading ? "scale(0.98)" : "scale(1)",
                boxShadow:
                  !isLoading && breed && gender && preference
                    ? "0 6px 20px rgba(245,158,11,0.4)"
                    : "none",
              }}
              onMouseEnter={(e) => {
                if (!isLoading && breed && gender && preference) {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(245,158,11,0.5)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    breed && gender && preference
                      ? "0 6px 20px rgba(245,158,11,0.4)"
                      : "none";
                }
              }}
            >
              {isLoading ? (
                <>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTop: "2px solid white",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Names
                </>
              )}
            </button>
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              animation: "fadeInUp 0.6s ease-out",
            }}
          >
            <div
              style={{
                marginBottom: "24px",
              }}
            >
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  margin: "0 0 8px 0",
                  color: "#fbbf24",
                }}
              >
                Perfect Names for Your {gender} {breed}! 🎉
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  opacity: "0.9",
                  margin: "0",
                }}
              >
                Inspired by {preference} themes
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              {generatedNames.map((name, index) => (
                <div
                  key={index}
                  style={{
                    padding: "16px",
                    background: "rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    animation: `slideIn 0.4s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <span>{name}</span>
                  <Heart
                    size={20}
                    style={{
                      color: "#f472b6",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={generateAgain}
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "none",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
                background: "rgba(255,255,255,0.2)",
                color: "white",
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.3)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Generate New Names
            </button>
          </div>
        )}

        <div
          style={{
            marginTop: "24px",
            textAlign: "center",
            fontSize: "12px",
            opacity: "0.7",
          }}
        >
          <p style={{ margin: "0" }}>Powered by Google Gemini AI ✨</p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}

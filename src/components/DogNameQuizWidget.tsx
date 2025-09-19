import { useState } from "react";
import {
  Heart,
  Sparkles,
  Dog,
  Key,
  ArrowRight,
  ArrowLeft,
  Trophy,
} from "lucide-react";

interface DogNameQuizWidgetProps {
  apiKey?: string;
}

interface QuizAnswers {
  age: string;
  size: string;
  personality: string;
  furType: string;
  activity: string;
  treat: string;
  nameStyle: string;
}

export default function DogNameQuizWidget({
  apiKey: propApiKey,
}: DogNameQuizWidgetProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    age: "",
    size: "",
    personality: "",
    furType: "",
    activity: "",
    treat: "",
    nameStyle: "",
  });
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [apiKey, setApiKey] = useState(propApiKey || "");
  const [quizStarted, setQuizStarted] = useState(false);

  const questions = [
    {
      id: "age",
      question: "What's your dog's age?",
      emoji: "🎂",
      options: [
        { value: "puppy", label: "Puppy (under 1 year)", emoji: "🐶" },
        { value: "young", label: "Young adult (1-3 years)", emoji: "🐕" },
        { value: "mature", label: "Mature (4-7 years)", emoji: "🦮" },
        { value: "senior", label: "Senior (8+ years)", emoji: "🐕‍🦺" },
      ],
    },
    {
      id: "size",
      question: "What's your dog's size?",
      emoji: "📏",
      options: [
        { value: "teacup", label: "Teacup (Under 5 lbs)", emoji: "🐁" },
        { value: "small", label: "Small (5-20 lbs)", emoji: "🐕" },
        { value: "medium", label: "Medium (20-50 lbs)", emoji: "🐩" },
        { value: "large", label: "Large (50-90 lbs)", emoji: "🦮" },
        { value: "giant", label: "Giant (90+ lbs)", emoji: "🐕‍🦺" },
      ],
    },
    {
      id: "personality",
      question: "Which best describes your dog's personality?",
      emoji: "🎭",
      options: [
        { value: "goofy", label: "Goofy & playful", emoji: "🤪" },
        { value: "loyal", label: "Loyal & protective", emoji: "🛡️" },
        { value: "elegant", label: "Elegant & graceful", emoji: "👑" },
        {
          value: "mischievous",
          label: "Mischievous troublemaker",
          emoji: "😈",
        },
        { value: "calm", label: "Calm & chill", emoji: "😌" },
      ],
    },
    {
      id: "furType",
      question: "What's your dog's fur type?",
      emoji: "✂️",
      options: [
        { value: "short", label: "Short & sleek", emoji: "✨" },
        { value: "long", label: "Long & flowing", emoji: "💇‍♀️" },
        { value: "curly", label: "Curly or wavy", emoji: "🌀" },
        { value: "fluffy", label: "Fluffy & thick", emoji: "☁️" },
        {
          value: "hairless",
          label: "Hairless or very short fuzz",
          emoji: "🧴",
        },
      ],
    },
    {
      id: "activity",
      question: "Your dog's favorite activity is...",
      emoji: "🎾",
      options: [
        { value: "chasing", label: "Chasing balls or frisbees", emoji: "🎾" },
        { value: "snuggling", label: "Snuggling on the couch", emoji: "🛋️" },
        { value: "exploring", label: "Exploring the outdoors", emoji: "🏔️" },
        { value: "training", label: "Training & learning tricks", emoji: "🎯" },
        { value: "barking", label: "Barking at strangers", emoji: "🗣️" },
      ],
    },
    {
      id: "treat",
      question: "Pick a treat your dog can't resist:",
      emoji: "🦴",
      options: [
        { value: "peanutbutter", label: "Peanut butter", emoji: "🥜" },
        { value: "bacon", label: "Bacon", emoji: "🥓" },
        { value: "cheese", label: "Cheese", emoji: "🧀" },
        { value: "chicken", label: "Chicken", emoji: "🍗" },
        { value: "anything", label: "Anything edible", emoji: "🍽️" },
      ],
    },
    {
      id: "nameStyle",
      question: "Do you want your dog's name to be...",
      emoji: "💎",
      options: [
        { value: "cute", label: "Cute & sweet", emoji: "🥰" },
        { value: "strong", label: "Strong & bold", emoji: "💪" },
        { value: "funny", label: "Funny & quirky", emoji: "😂" },
        { value: "classy", label: "Classy & timeless", emoji: "🎩" },
        { value: "unique", label: "Unique & rare", emoji: "⭐" },
      ],
    },
  ];


  const handleAnswerSelect = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      generateNames();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getPersonalityType = () => {
    // Determine personality type based on answers
    if (answers.personality === "goofy" || answers.activity === "chasing")
      return "goofball";
    if (answers.personality === "loyal" || answers.personality === "protective")
      return "protector";
    if (answers.personality === "elegant" || answers.nameStyle === "classy")
      return "royal";
    if (answers.personality === "mischievous" || answers.nameStyle === "funny")
      return "clown";
    if (answers.personality === "calm" || answers.activity === "snuggling")
      return "zen";
    return "goofball"; // default
  };

  const generateNames = async () => {
    if (!apiKey) {
      alert("API key is required. Please add your Gemini API key first.");
      return;
    }

    setIsLoading(true);

    try {
      const personalityType = getPersonalityType();

      let prompt = `Based on this dog quiz profile, generate 5 perfect dog names:

Age: ${answers.age}
Size: ${answers.size}  
Personality: ${answers.personality}
Fur Type: ${answers.furType}
Favorite Activity: ${answers.activity}
Favorite Treat: ${answers.treat}
Name Style Preference: ${answers.nameStyle}

Personality Type: ${personalityType}

Generate 5 creative dog names that match this personality profile. Make them ${answers.nameStyle} and suitable for a ${answers.personality} ${answers.size} dog. Consider their ${answers.furType} fur and love for ${answers.activity}. Return only the names, one per line, without numbers or bullets.`;

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
        if (response.status === 400) {
          throw new Error("Invalid API key. Please check your Gemini API key.");
        }
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
      if (error instanceof Error && error.message.includes("API key")) {
        alert(
          "Invalid API key. Please check your Gemini API key and try again."
        );
      } else {
        alert("Failed to generate names. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({
      age: "",
      size: "",
      personality: "",
      furType: "",
      activity: "",
      treat: "",
      nameStyle: "",
    });
    setShowResults(false);
    setGeneratedNames([]);
    setQuizStarted(false);
  };

  // API Key Input Screen
  if (false) {
    return (
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
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <Key size={32} style={{ color: "#fbbf24" }} />
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
              Setup Required
            </h1>
          </div>
          <p style={{ fontSize: "16px", opacity: "0.9", margin: "0 0 8px 0" }}>
            Enter your free Google Gemini API key to start the quiz! 🚀
          </p>
          <p style={{ fontSize: "14px", opacity: "0.8", margin: "0" }}>
            ✨ 100% Free • No sign-up required • Works instantly
          </p>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "8px",
              color: "#f3f4f6",
            }}
          >
            Google Gemini API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIza..."
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
              marginBottom: "16px",
            }}
            required
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "8px",
              border: "none",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              background: "linear-gradient(45deg, #f59e0b, #d97706)",
              color: "white",
              transition: "all 0.2s",
            }}
          >
            🚀 Start Quiz
          </button>
        </div>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            padding: "16px",
            backdropFilter: "blur(10px)",
          }}
        >
          <h3
            style={{ fontSize: "16px", margin: "0 0 12px 0", color: "#fbbf24" }}
          >
            📝 How to get your FREE API key:
          </h3>
          <ol
            style={{
              fontSize: "14px",
              opacity: "0.9",
              margin: "0",
              paddingLeft: "20px",
            }}
          >
            <li style={{ marginBottom: "8px" }}>
              Visit{" "}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fbbf24", textDecoration: "underline" }}
              >
                Google AI Studio
              </a>
            </li>
            <li style={{ marginBottom: "8px" }}>Click "Create API Key"</li>
            <li style={{ marginBottom: "8px" }}>
              Copy the key that starts with "AIza..."
            </li>
            <li>Paste it above and start the quiz!</li>
          </ol>
          <p style={{ fontSize: "12px", opacity: "0.7", margin: "12px 0 0 0" }}>
            🔒 Your API key stays private and is only used to generate names
          </p>
        </div>
      </div>
    );
  }

  // Quiz Start Screen
  if (!quizStarted) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "32px 24px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Dog size={48} style={{ color: "#fbbf24", marginBottom: "16px" }} />
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            margin: "0 0 12px 0",
            background: "linear-gradient(45deg, #fbbf24, #f59e0b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          What's Your Dog's Perfect Name?
        </h1>
        <p style={{ fontSize: "18px", opacity: "0.9", margin: "0 0 8px 0" }}>
          Take this fun 2-minute quiz to discover the name that matches your
          dog's unique personality.
        </p>
        <p style={{ fontSize: "16px", opacity: "0.8", margin: "0 0 32px 0" }}>
          Ever feel like your pup's name doesn't fully capture their charm?
          Answer a few fun questions, and we'll reveal the perfect name that
          suits their personality, breed, and vibe.
        </p>
        <p
          style={{
            fontSize: "14px",
            opacity: "0.7",
            margin: "0 0 24px 0",
            fontStyle: "italic",
          }}
        >
          ⚠️ Warning: You might end up renaming your dog.
        </p>

        <button
          onClick={() => setQuizStarted(true)}
          style={{
            padding: "18px 32px",
            borderRadius: "12px",
            border: "none",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            background: "linear-gradient(45deg, #f59e0b, #d97706)",
            color: "white",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.3s",
            boxShadow: "0 6px 20px rgba(245,158,11,0.4)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(245,158,11,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(245,158,11,0.4)";
          }}
        >
          <Sparkles size={20} />
          Start Quiz
          <ArrowRight size={20} />
        </button>

        <div style={{ marginTop: "32px", fontSize: "14px", opacity: "0.7" }}>
          <p style={{ margin: "0" }}>
            🎯 7 quick questions • 🤖 AI-powered results • ✨ Personalized just
            for your pup
          </p>
        </div>

      </div>
    );
  }

  // Results Screen
  if (showResults) {
    const personalityType = getPersonalityType();
    const personalityEmojis = {
      goofball: "🤪",
      protector: "🛡️",
      royal: "👑",
      clown: "🤡",
      zen: "🧘‍♀️",
    };

    const personalityDescriptions = {
      goofball:
        "Your pup is playful, lovable, and a little ridiculous (in the best way)!",
      protector:
        "Strong, commanding, and loyal - a guardian with a heart of gold.",
      royal: "Your pup has regal vibes and deserves a name fit for royalty.",
      clown:
        "The life of the party — always making you laugh and sometimes a little chaotic.",
      zen: "Calm, gentle, and wise - your dog embodies peaceful energy.",
    };

    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "24px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Trophy size={48} style={{ color: "#fbbf24", marginBottom: "16px" }} />
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            margin: "0 0 8px 0",
            color: "#fbbf24",
          }}
        >
          Your Dog is "The{" "}
          {personalityType.charAt(0).toUpperCase() + personalityType.slice(1)}"!
        </h2>
        <div style={{ fontSize: "32px", margin: "8px 0" }}>
          {personalityEmojis[personalityType as keyof typeof personalityEmojis]}
        </div>
        <p style={{ fontSize: "16px", opacity: "0.9", margin: "0 0 24px 0" }}>
          {
            personalityDescriptions[
              personalityType as keyof typeof personalityDescriptions
            ]
          }
        </p>

        <h3
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            margin: "0 0 16px 0",
            color: "#fbbf24",
          }}
        >
          Perfect Names for Your {answers.size} {answers.personality} Pup! 🎉
        </h3>

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

        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            onClick={restartQuiz}
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
            Take Quiz Again
          </button>
        </div>

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
    );
  }

  // Quiz Questions
  const currentQ = questions[currentQuestion];
  const currentAnswer = answers[currentQ.id as keyof QuizAnswers];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "24px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          color: "white",
        }}
      >
        {/* Progress Bar */}
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <span style={{ fontSize: "14px", opacity: "0.8" }}>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span style={{ fontSize: "14px", opacity: "0.8" }}>
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: "6px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "linear-gradient(45deg, #fbbf24, #f59e0b)",
                borderRadius: "3px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Question */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>
            {currentQ.emoji}
          </div>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              margin: "0",
              color: "#fbbf24",
            }}
          >
            {currentQ.question}
          </h2>
        </div>

        {/* Answer Options */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          {currentQ.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswerSelect(currentQ.id, option.value)}
              style={{
                padding: "16px 20px",
                borderRadius: "12px",
                border: "none",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s",
                background:
                  currentAnswer === option.value
                    ? "linear-gradient(45deg, #10b981, #059669)"
                    : "rgba(255,255,255,0.1)",
                color: "white",
                transform:
                  currentAnswer === option.value ? "scale(1.02)" : "scale(1)",
                boxShadow:
                  currentAnswer === option.value
                    ? "0 4px 12px rgba(16,185,129,0.3)"
                    : "none",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
              onMouseEnter={(e) => {
                if (currentAnswer !== option.value) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.transform = "scale(1.01)";
                }
              }}
              onMouseLeave={(e) => {
                if (currentAnswer !== option.value) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.transform = "scale(1)";
                }
              }}
            >
              <span style={{ fontSize: "20px" }}>{option.emoji}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              fontSize: "16px",
              fontWeight: "600",
              cursor: currentQuestion === 0 ? "not-allowed" : "pointer",
              background:
                currentQuestion === 0
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(255,255,255,0.2)",
              color: "white",
              opacity: currentQuestion === 0 ? 0.5 : 1,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (currentQuestion !== 0) {
                e.currentTarget.style.background = "rgba(255,255,255,0.3)";
              }
            }}
            onMouseLeave={(e) => {
              if (currentQuestion !== 0) {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              }
            }}
          >
            <ArrowLeft size={16} />
            Back
          </button>

          {currentAnswer && (
            <button
              onClick={nextQuestion}
              disabled={isLoading}
              style={{
                padding: "14px 24px",
                borderRadius: "8px",
                border: "none",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: isLoading ? "not-allowed" : "pointer",
                background: isLoading
                  ? "rgba(255,255,255,0.3)"
                  : "linear-gradient(45deg, #f59e0b, #d97706)",
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transform: isLoading ? "scale(0.98)" : "scale(1)",
                boxShadow: !isLoading
                  ? "0 6px 20px rgba(245,158,11,0.4)"
                  : "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(245,158,11,0.5)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(245,158,11,0.4)";
                }
              }}
            >
              {isLoading ? (
                <>
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTop: "2px solid white",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  Generating...
                </>
              ) : currentQuestion === questions.length - 1 ? (
                <>
                  <Sparkles size={16} />
                  Get My Names!
                </>
              ) : (
                <>
                  Next
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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

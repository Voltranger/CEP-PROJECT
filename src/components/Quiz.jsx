import { useState } from "react";

export default function Quiz({ title = "Quick Quiz", questions = [] }) {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const score = answers.reduce((sum, a, i) => {
    if (a === null) return sum;
    return sum + (a === questions[i].correctIndex ? 1 : 0);
  }, 0);

  function selectAnswer(qIndex, optionIndex) {
    if (submitted) return;
    const next = [...answers];
    next[qIndex] = optionIndex;
    setAnswers(next);
  }

  function submit() {
    setSubmitted(true);
  }

  function reset() {
    setAnswers(Array(questions.length).fill(null));
    setSubmitted(false);
  }

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold text-black mb-3">{title}</h3>
      <ol className="space-y-4">
        {questions.map((q, qi) => (
          <li key={qi} className="bg-white/80 border border-gray-300 rounded-xl p-4">
            <p className="font-semibold text-black mb-3">{qi + 1}. {q.prompt}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((opt, oi) => {
                const isChosen = answers[qi] === oi;
                const isCorrect = submitted && oi === q.correctIndex;
                const isWrong = submitted && isChosen && oi !== q.correctIndex;
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => selectAnswer(qi, oi)}
                    className={
                      "text-left px-3 py-2 rounded-lg border transition-all duration-200 " +
                      (isCorrect
                        ? "bg-green-100 border-green-400"
                        : isWrong
                        ? "bg-red-100 border-red-400"
                        : isChosen
                        ? "bg-cyan-50 border-cyan-400"
                        : "bg-white border-gray-300 hover:bg-gray-50")
                    }
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <p className="mt-2 text-sm text-gray-700">
                Correct answer: <span className="font-medium">{q.options[q.correctIndex]}</span>
              </p>
            )}
          </li>
        ))}
      </ol>
      <div className="flex items-center gap-3 mt-4">
        {!submitted ? (
          <button
            type="button"
            onClick={submit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Submit
          </button>
        ) : (
          <>
            <span className="text-black font-semibold">
              Score: {score} / {questions.length}
            </span>
            <button
              type="button"
              onClick={reset}
              className="px-4 py-2 rounded-lg bg-gray-200 text-black hover:bg-gray-300"
            >
              Retry
            </button>
          </>
        )}
      </div>
    </div>
  );
}



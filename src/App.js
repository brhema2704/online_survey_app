

import React, { useState, useEffect } from 'react';
import './App.css';

const questionsList = [
  "What is your favorite color?",
  "How often do you exercise?",
  "What is your dream job?",
  "How do you prefer to spend your weekends?",
  "What is your favorite type of cuisine?",
  "How many hours do you spend on social media each day?",
  "What motivates you to work hard?",
  "What is your biggest fear?",
  "How do you handle stress?",
  "What is your favorite book?"
];

function App() {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    // Randomly select 5 questions from the questionsList
    const randomQuestions = [];
    while (randomQuestions.length < 5) {
      const randomIndex = Math.floor(Math.random() * questionsList.length);
      const question = questionsList[randomIndex];
      if (!randomQuestions.includes(question)) {
        randomQuestions.push(question);
      }
    }
    setQuestions(randomQuestions);
  }, []);

  const handleChange = (question, value) => {
    setResponses({
      ...responses,
      [question]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Responses submitted:", responses);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = () => {
    console.log("Feedback submitted:", feedback);
    setFeedbackSubmitted(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Online Survey Dashboard</h1>
        <p>Answer the following questions to provide your feedback.</p>
      </header>
      {submitted ? (
        <div className="thank-you">
          <h2>Thank you for your responses!</h2>
          <p>Your responses have been recorded.</p>
          <h3>Your Responses:</h3>
          <div className="responses">
            {questions.map((question, index) => (
              <div key={index} className="response-item">
                <strong>{question}</strong>
                <p>{responses[question]}</p>
              </div>
            ))}
          </div>
          <h3>Additional Feedback:</h3>
          {!feedbackSubmitted ? (
            <>
              <textarea
                value={feedback}
                onChange={handleFeedbackChange}
                placeholder="Leave your feedback here..."
                rows="4"
                className="feedback-input"
              />
              <button onClick={handleFeedbackSubmit}>Submit Feedback</button>
            </>
          ) : (
            <div className="thank-you-feedback">
              <h4>Thank you for your feedback!</h4>
              <p>Your feedback has been submitted.</p>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={index}>
              <label>{question}</label>
              <input
                type="text"
                value={responses[question] || ''}
                onChange={(e) => handleChange(question, e.target.value)}
                required
              />
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default App;

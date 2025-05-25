import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSpinner } from '@fortawesome/free-solid-svg-icons';

export function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [userQuestion, setUserQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    const questionToSend = userQuestion.trim();
    setMessages((prev) => [...prev, { type: 'user', text: questionToSend }]);
    setUserQuestion('');
    setLoading(true);

    try {
      const response = await axios.post('https://querypdf.onrender.com/ask_question/', {
        user_question: questionToSend,
      });

      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: response.data.answer || 'No response from server.' },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: 'Error fetching response. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center w-full max-w-3xl mx-auto px-4 py-8">
      <div className="w-full bg-white shadow-lg rounded-lg p-4 max-h-[70vh] overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'bot' && (
              <img src="./icon.svg" alt="Bot" className="h-6 w-6 mr-2 self-start" />
            )}
            <div
              className={`rounded-lg p-3 max-w-sm text-sm ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-green-600 text-white'
              }`}
            >
              {message.text}
            </div>
            {message.type === 'user' && (
              <FontAwesomeIcon icon={faUser} className="ml-2 text-blue-600 pt-1" />
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-gray-700">
            <FontAwesomeIcon icon={faSpinner} spin />
            <span>Loading...</span>
          </div>
        )}
      </div>

      <form
        onSubmit={handleQuestionSubmit}
        className="mt-4 w-full flex items-center bg-white shadow-md rounded-lg px-4 py-2"
      >
        <input
          className="flex-1 p-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          type="text"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          placeholder="Ask something about the document..."
        />
        <button
          type="submit"
          className="ml-2 text-green-600 hover:text-green-800"
          aria-label="Send"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.1667 11L2.75 18.3333L6.01608 11L2.75 3.66666L20.1667 11ZM20.1667 11H5.95833"
              stroke="#222222"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </main>
  );
}

import React, { useState } from "react";
import qaData from "../../qaData.json";
import "./index.css";
import icon from "../../botIcon.svg";
import { FiSend } from "react-icons/fi";

interface Message {
    id: number;
    question: string;
    answer: string;
}

const ChatBot: React.FC = () => {
    const [userInput, setUserInput] = useState<string>("");
    const [conversation, setConversation] = useState<Message[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const userQuestion = userInput.trim().toLowerCase();
        const matchingQuestion = qaData.questions.find(
            (q) => q.question.toLowerCase() === userQuestion
        );

        const newMessage: Message = {
            id: Date.now(),
            question: userInput,
            answer: matchingQuestion ? matchingQuestion.answer : "I don't understand your question.",
        };

        setConversation((prevConversation) => [...prevConversation, newMessage]);
        setUserInput("");
    };

    return (
        <div className="main-container">
            <div className="chat-container">
                {conversation.map((message) => (
                    <div key={message.id} className="chat-bubble">
                        <div className="question-container">
                            <div className="question">Q.&nbsp; {message.question}</div>
                        </div>
                        <div className="answer">
                            <div className="bot-icon">
                                <img className="bot-image" src="https://github.com/imagekit-developer/imagekit-react/assets/55666140/337f2f71-9114-4679-90a5-6faf47a92632" />&nbsp;&nbsp;
                                <div style={{ fontWeight: "600" }}>Bot</div>
                            </div>
                            <div className="bot-ans">{message.question.trim().toLowerCase() === "How to delete duplicates in an array".trim().toLowerCase() ? (
                                <>
                                    <div className="text">To delete duplicates from an array.</div>
                                    <pre className="code">
                                        <code>{message.answer}</code>
                                    </pre>
                                </>
                            ) : (
                                <div className="text">{message.answer}</div>
                            )}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="input-section">
                <form className="user-input-form" onSubmit={handleSubmit}>
                    <div className="user-input-container">
                        <input
                            type="text"
                            className="user-input-box"
                            value={userInput}
                            onChange={handleInputChange}
                            placeholder="Ask a question..."
                        />
                        <FiSend className="user-input-btn" onClick={handleSubmit} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatBot;

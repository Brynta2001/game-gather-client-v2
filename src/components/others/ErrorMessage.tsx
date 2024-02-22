import React from 'react';

interface ErrorMessageProps {
    text: string;
}
// ErrorMessage component displays an error message to the user.
const ErrorMessage: React.FC<ErrorMessageProps> = ({ text }) => {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Oh no! </strong>
        <span className="block sm:inline">{text}</span>
    </div>
    );
};

export default ErrorMessage;
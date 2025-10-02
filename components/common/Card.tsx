

import React from 'react';

// FIX: Extend CardProps with React.HTMLAttributes<HTMLDivElement> to allow passing standard div props like onClick.
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
    return (
        <div
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
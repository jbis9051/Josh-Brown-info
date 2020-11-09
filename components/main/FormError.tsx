import React from 'react';

interface FormErrorProps {
    className?: string
    error: string | undefined | null,
}

export const FormError: React.FunctionComponent<FormErrorProps> = ({className, error}) => {
    if (!error) {
        return null;
    }
    return (
        <span className={className}>{error}</span>
    );
}

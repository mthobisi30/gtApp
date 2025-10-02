import React from 'react';

interface QrCodeProps {
    value: string;
    size?: number;
    className?: string;
}

const QrCode: React.FC<QrCodeProps> = ({ value, size = 200, className }) => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&qzone=1`;

    return (
        <img 
            src={qrUrl} 
            alt="QR Code" 
            width={size} 
            height={size} 
            className={className}
        />
    );
};

export default QrCode;

import React from 'react';
import Card from '../common/Card';
import Icon from '../common/Icon';
import Button from '../common/Button';
import { useAppContext } from '../../context/AppContext';

const Scan: React.FC = () => {
    const { setToast } = useAppContext();

    const handleScan = () => {
        setToast({ message: 'Scanned transaction #TX123 successfully!', type: 'success' });
    }

    return (
        <div className="max-w-md mx-auto text-center">
            <Card>
                <h2 className="text-3xl font-bold mb-4">Scan QR Code</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Scan a provider's code to confirm a transaction or check the status of a service.
                </p>
                <div className="flex justify-center items-center my-8">
                    <div className="p-8 bg-gray-100 dark:bg-gray-700 rounded-2xl">
                         <Icon name="qr" className="w-32 h-32 text-gray-800 dark:text-gray-200" />
                    </div>
                </div>
                <Button onClick={handleScan} className="w-full !py-3 !text-lg">
                    Tap to Scan
                </Button>
            </Card>
        </div>
    );
};

export default Scan;
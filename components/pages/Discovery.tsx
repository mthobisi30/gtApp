import React, { useEffect, useState } from 'react';
import Card from '../common/Card';
import Icon from '../common/Icon';
import { getServiceCategories } from '../../services/geminiService';
import type { ServiceCategory } from '../../types';
import { useAppContext } from '../../context/AppContext';

const CategoryCard: React.FC<{ category: ServiceCategory }> = ({ category }) => {
    const { setToast } = useAppContext();
    return (
        <Card 
            className="flex flex-col items-center justify-center p-4 hover:shadow-xl hover:scale-105 transition-transform duration-200 cursor-pointer"
            onClick={() => setToast({ message: `Browsing ${category.name} services`, type: 'info' })}
        >
            <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-full mb-3">
                 <Icon name={category.icon} className="w-8 h-8 text-red-500" />
            </div>
            <p className="font-bold text-center">{category.name}</p>
        </Card>
    )
};

const AdvertiserBillboard: React.FC = () => {
    const { setToast } = useAppContext();
    return (
        <Card className="bg-gradient-to-r from-gray-800 to-black text-white mb-6">
            <h3 className="text-xl font-bold">Promoted Service</h3>
            <p className="mt-1">Get your car detailed today with SparkleClean! 20% off for new customers.</p>
            <button 
                onClick={() => setToast({ message: 'Navigating to SparkleClean...', type: 'info' })}
                className="mt-3 bg-white text-black font-bold py-2 px-4 rounded-lg"
            >
                Learn More
            </button>
        </Card>
    );
}

const Discovery: React.FC = () => {
    const [categories, setCategories] = useState<ServiceCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            const serviceCategories = await getServiceCategories();
            setCategories(serviceCategories);
            setLoading(false);
        };
        fetchCategories();
    }, []);

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="text-center p-8 text-gray-500 dark:text-gray-400">Loading categories...</div>;
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Discover Services</h2>
            <div className="relative mb-6">
                <input 
                    type="text" 
                    placeholder="Search for services..." 
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Icon name="search" className="w-6 h-6 text-gray-400" />
                </div>
            </div>
            
            <AdvertiserBillboard />

            <h3 className="text-2xl font-bold mb-4">Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredCategories.map(cat => (
                    <CategoryCard key={cat.id} category={cat} />
                ))}
            </div>
        </div>
    );
};

export default Discovery;
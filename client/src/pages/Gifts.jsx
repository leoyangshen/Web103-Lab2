import React, { useEffect, useState } from 'react';
// FIX: Assuming Card is either globally available or in the same scope. 
// If Card is in a file named Card.jsx, this import must be correct for your local setup.
// We are leaving the import for now, but assume the module loader can find it.
import Card from '../components/Card'; 
import './Gifts.css'; // Import the new CSS file

const Gifts = () => {
    const [gifts, setGifts] = useState([]);
    
    // Fetch logic
    useEffect(() => {
        const fetchGifts = async () => {
            try {
                // Fetching from the proxied Express endpoint
                const response = await fetch('/gifts');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setGifts(data);
            } catch (error) {
                console.error("Error fetching gifts:", error);
            }
        };
        // We only run this on the first mount of the component []
        fetchGifts();
    }, []);

    // Placeholder for when gifts are loading or none are found
    if (gifts.length === 0) {
        return (
            <main className="GiftsMain"> {/* Apply main style class */}
                <p style={{ textAlign: 'center', padding: '50px', fontSize: '1.2rem' }}>
                    Loading gifts... or maybe no gifts found yet!
                </p>
            </main>
        );
    }

    return (
        <main className="GiftsMain"> {/* Apply main style class */}
            <div className='GiftsGrid'>
                {/* FIX: Added the unique 'key' prop using gift.id to remove React warning */}
                {gifts.map((gift) => (
                    <Card key={gift.id} gift={gift} /> 
                ))}
            </div>
        </main>
    );
};

export default Gifts;

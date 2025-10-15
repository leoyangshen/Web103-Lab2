import { useParams, useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
// import './CreateGift.css' // REMOVED to avoid compilation error
import './CreateGift.css';

const EditGift = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [gift, setGift] = useState({
        id: 0, name: '',
        pricepoint: '',
        audience: '',
        image: '',
        description: '',
        submittedby: '',
        submittedon: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- 1. Data Fetching (Pre-fill Form) ---
    useEffect(() => {
        // Only fetch if ID is present
        if (!id) {
            setLoading(false);
            return;
        }

        const fetchGift = async () => {
            setLoading(true);
            try {
                // Use relative path for Vite proxy
                const response = await fetch(`/gifts/${id}`); 
                
                if (!response.ok) {
                    throw new Error("Failed to fetch gift for editing");
                }

                const data = await response.json();
                setGift(data);
                setError(null);
            } catch (err) {
                console.error("Error fetching gift details:", err.message);
                setError("Could not load gift details. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchGift();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setGift( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        });
    };
    
    // --- 2. Update Logic (Post-Patch Navigation) ---
    const updateGift = async (event) => {
        event.preventDefault();

        // Create the payload for the PATCH request
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gift),
        };

        try {
            // Use relative path for Vite proxy
            const response = await fetch(`/gifts/${id}`, options);
            
            if (response.ok) {
                // FIX: Navigate to the Home Page (/) after successful update
                navigate('/');
            } else {
                // IMPORTANT: Using alert() here as a fallback since a proper modal isn't implemented.
                const errorText = await response.text();
                console.error("Failed to update gift:", response.status, errorText);
                alert("Update failed. Please check server logs.");
            }
        } catch (error) {
            console.error("Network error during update:", error);
            alert("A network error occurred while updating the gift.");
        }
    };

    if (loading) return <div className='CreateGift'><center><h2>Loading...</h2></center></div>;
    if (error) return <div className='CreateGift'><center><h2>Error: {error}</h2></center></div>;

    return (
        <div className='CreateGift'>
            <center><h2>Edit Gift</h2></center>
            <form onSubmit={updateGift}>
                <label>Name</label> <br />
                <input type='text' id='name' name='name' value={gift.name} onChange={handleChange} required /><br />
                <br/>

                <label>Description</label><br />
                <textarea rows='5' cols='50' id='description' name='description' value={gift.description} onChange={handleChange} required></textarea>
                <br/>

                <label>Image URL</label><br />
                <input type='url' id='image' name='image' value={gift.image} onChange={handleChange} /><br />
                <br/>

                <label>Price Point</label><br />
                <input type='text' id='pricepoint' name='pricepoint' value={gift.pricepoint} onChange={handleChange} required /><br />
                <br/>

                <label>Audience</label><br />
                <input type='text' id='audience' name='audience' value={gift.audience} onChange={handleChange} required /><br />
                <br/>

                <label>Submitted By</label><br />
                <input type='text' id='submittedby' name='submittedby' value={gift.submittedby} onChange={handleChange} required /><br />
                <br/>
                
                {/* Note: submittedon field is omitted as it should be managed by the server */}

                <input type='submit' value='Update Gift' />
            </form>
        </div>
    );
};

export default EditGift;


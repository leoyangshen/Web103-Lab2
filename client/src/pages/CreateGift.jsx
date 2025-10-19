import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateGift.css'; // Re-enabling the local CSS import

const CreateGift = () => {
    const navigate = useNavigate();

    // --- Date logic to set 'submittedon' automatically ---
    const date = new Date()
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); 
    let year = date.getFullYear()
    let currentDate = year + '-' + month + '-' + day

    const [gift, setGift] = useState({
        id: 0, 
        name: '',
        pricepoint: '',
        audience: '',
        image: '',
        description: '',
        submittedby: '',
        submittedon: currentDate
    })
    
    const handleChange = (event) => {
        const { name, value } = event.target

        setGift( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }
    
    // --- Async function to handle form submission and API call ---
    const createGift = async (event) => {
        event.preventDefault() // Prevents the default form submission (page reload)

        // 1. Prepare the options object using the current 'gift' state
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(gift),
        };

        // 2. Perform the fetch request
        try {
            // Use relative path for Vite proxy
            const response = await fetch('/gifts', options);
            
            if (response.ok) {
                // Navigate to the Home Page (/) after successful creation
                navigate('/');
            } else {
                // Read the detailed error message from the response body
                const errorText = await response.text();
                console.error("Failed to create gift:", response.status, errorText);
                alert("Creation failed. Please check server logs.");
            }
        } catch (error) {
            console.error("Network or processing error:", error);
            alert("A network error occurred. Could not connect to the server.");
        }
    }

    return (
        <div className='create-gift-page-container'>
            <div className='form-container'>
                <h2 className='form-title'>Add a New Gift</h2>
                <form onSubmit={createGift}>
                    {/* Name */}
                    <div className='form-group'>
                        <label htmlFor='name' className='label-text'>Gift Name</label>
                        <input 
                            type='text' 
                            id='name' 
                            name='name' 
                            value={gift.name} 
                            onChange={handleChange} 
                            required 
                            className='input-field' 
                        />
                    </div>

                    {/* Pricepoint */}
                    <div className='form-group'>
                        <label htmlFor='pricepoint' className='label-text'>Pricepoint</label>
                        <input 
                            type='text' 
                            id='pricepoint' 
                            name='pricepoint' 
                            value={gift.pricepoint} 
                            onChange={handleChange} 
                            className='input-field' 
                        />
                    </div>

                    {/* Image URL */}
                    <div className='form-group'>
                        <label htmlFor='image' className='label-text'>Image URL (Optional)</label>
                        <input 
                            type='text' 
                            id='image' 
                            name='image' 
                            value={gift.image} 
                            onChange={handleChange} 
                            className='input-field' 
                        />
                    </div>

                    {/* Description */}
                    <div className='form-group'>
                        <label htmlFor='description' className='label-text'>Description</label>
                        <textarea 
                            id='description' 
                            name='description' 
                            value={gift.description} 
                            onChange={handleChange} 
                            rows='4'
                            className='input-field textarea-field'
                        ></textarea>
                    </div>

                    {/* Audience */}
                    <div className='form-group'>
                        <label htmlFor='audience' className='label-text'>Audience</label>
                        <input 
                            type='text' 
                            id='audience' 
                            name='audience' 
                            value={gift.audience} 
                            onChange={handleChange}
                            className='input-field' 
                        />
                    </div>

                    {/* Submitted By */}
                    <div className='form-group'>
                        <label htmlFor='submittedby' className='label-text'>Submitted By</label>
                        <input 
                            type='text' 
                            id='submittedby' 
                            name='submittedby' 
                            value={gift.submittedby} 
                            onChange={handleChange} 
                            required
                            className='input-field'
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type='submit' 
                        className='submit-button'
                    >
                        Submit Gift
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateGift

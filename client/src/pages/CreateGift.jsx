import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import './CreateGift.css' // Removed to fix the compilation error

const CreateGift = () => {
    const navigate = useNavigate();

    // --- Date logic to set 'submittedon' automatically ---
    const date = new Date()
    // Ensure month and day are two digits by padding with leading zero if needed
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
          body: JSON.stringify(gift), // Sends the data to the server
        };
        
        // 2. Await the fetch call
        try {
            const response = await fetch('/gifts', options);
            
            // Check for success (e.g., status 201 Created)
            if (response.ok) {
                // Redirect to the home page after success
                navigate('/');
            } else {
                console.error("Failed to create gift. Server response status:", response.status);
                // Using alert() as a fallback for user feedback
                alert("Failed to create gift. Check console for details."); 
            }
        } catch (error) {
            console.error("Network error during gift creation:", error);
            alert("A network error occurred while creating the gift.");
        }
    }

    // --- JSX using Tailwind CSS for clean, mobile-responsive styling ---
    return (
        <div className='max-w-xl mx-auto p-6 mt-10 shadow-xl rounded-xl bg-white border border-gray-200'>
            <h2 className='text-3xl font-extrabold text-gray-800 mb-6 text-center'>Add a Gift</h2>
            
            <form onSubmit={createGift} className='space-y-4'>
                
                {/* Name */}
                <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                    <input 
                        type='text' 
                        id='name' 
                        name='name' 
                        value={gift.name} 
                        onChange={handleChange} 
                        required
                        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500'
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor='description' className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                    <textarea 
                        id='description' 
                        name='description' 
                        rows='4'
                        value={gift.description} 
                        onChange={handleChange} 
                        required
                        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-y'
                    ></textarea>
                </div>

                {/* Image URL */}
                <div>
                    <label htmlFor='image' className='block text-sm font-medium text-gray-700 mb-1'>Image URL</label>
                    <input 
                        type='url' 
                        id='image' 
                        name='image' 
                        value={gift.image} 
                        onChange={handleChange} 
                        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500'
                    />
                </div>

                {/* Price Point */}
                <div>
                    <label htmlFor='pricepoint' className='block text-sm font-medium text-gray-700 mb-1'>Price Point</label>
                    <input 
                        type='text' 
                        id='pricepoint' 
                        name='pricepoint' 
                        value={gift.pricepoint} 
                        onChange={handleChange} 
                        required
                        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500'
                    />
                </div>

                {/* Audience */}
                <div>
                    <label htmlFor='audience' className='block text-sm font-medium text-gray-700 mb-1'>Audience</label>
                    <input 
                        type='text' 
                        id='audience' 
                        name='audience' 
                        value={gift.audience} 
                        onChange={handleChange}
                        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500' 
                    />
                </div>

                {/* Submitted By */}
                <div>
                    <label htmlFor='submittedby' className='block text-sm font-medium text-gray-700 mb-1'>Submitted By</label>
                    <input 
                        type='text' 
                        id='submittedby' 
                        name='submittedby' 
                        value={gift.submittedby} 
                        onChange={handleChange} 
                        required
                        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500'
                    />
                </div>

                {/* Submit Button */}
                <button 
                    type='submit' 
                    className='w-full py-3 mt-6 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300'
                >
                    Submit Gift
                </button>
            </form>
        </div>
    )
}

export default CreateGift


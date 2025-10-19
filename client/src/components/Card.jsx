import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Card.css'; // Import the external CSS file

const Card = ({ gift }) => {
    const navigate = useNavigate();

    // Function to handle edit click and prevent the parent link from firing
    const handleEditClick = (e) => {
        // Prevents the click from propagating to the parent <Link>
        e.preventDefault();
        // Navigate programmatically to the edit page
        navigate(`/edit/${gift.id}`);
    };

    return (
        // Outer Link wraps the entire card to go to the detail page
        <Link to={`/gift/${gift.id}`} className="card-link">
            <div className="card">
                <div className="card-content">
                    <div className="card-header">
                        <h3 className="card-title" title={gift.name}>{gift.name}</h3>
                        
                        {/* Button for Edit action */}
                        <button 
                            className="edit-button"
                            onClick={handleEditClick}
                            aria-label={`Edit ${gift.name}`}
                        > Edit
                        </button>
                    </div>

                    {/* Image */}
                    {gift.image && (
                        <img 
                            src={gift.image} 
                            alt={gift.name} 
                            style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                            // Fallback if image fails to load
                            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x150/e0e0e0/333333?text=Gift+Image"; }}
                        />
                    )}
                    
                    <p className="card-info">**Price:** {gift.pricepoint}</p>
                    <p className="card-info">**Audience:** {gift.audience}</p>
                    <p className="card-info">**Submitted By:** {gift.submittedby}</p>
                </div>
            </div>
        </Link>
    );
};

export default Card;

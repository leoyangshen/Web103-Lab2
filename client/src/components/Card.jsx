import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Assuming 'moreIcon' and 'gift' are passed as props

const Card = ({ gift }) => {
    // useNavigate is required to handle the navigation when the edit button is clicked.
    const navigate = useNavigate();
    
    // --- Embedded CSS for simple styling ---
    const styleBlock = (
        <style jsx="true">{`
            .card {
                border: 1px solid #e0e0e0;
                border-radius: 12px;
                padding: 16px;
                margin: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
                transition: transform 0.2s, box-shadow 0.2s;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                min-height: 250px;
                background-color: #fff;
            }
            .card:hover {
                transform: translateY(-3px);
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
            }
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 10px;
            }
            .card-title {
                font-size: 1.5rem;
                font-weight: 700;
                color: #333;
                margin: 0;
                /* Ensures text doesn't overflow */
                overflow: hidden; 
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .card-info {
                font-size: 1rem;
                color: #666;
            }
            .card-footer {
                margin-top: 15px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                gap: 10px;
            }
            .edit-button {
                background: none;
                border: 1px solid #ccc;
                color: #555;
                padding: 6px 12px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 0.9rem;
                font-weight: 500;
                transition: background-color 0.2s;
            }
            .edit-button:hover {
                background-color: #f0f0f0;
                border-color: #999;
            }
            /* Style the Link to remove default anchor styling */
            .card-link {
                text-decoration: none;
                color: inherit;
                display: block;
            }
        `}</style>
    );

    // Function to handle edit click and prevent the parent link from firing
    const handleEditClick = (e) => {
        // Prevents the click from propagating to the parent <Link>
        e.preventDefault(); 
        // Navigate programmatically to the edit page
        navigate(`/edit/${gift.id}`);
    };

    return (
        // 1. Outer Link wraps the entire card to go to the detail page
        // Use Link component to avoid a full page reload for navigation
        <Link to={`/gift/${gift.id}`} className="card-link">
            <div className="card">
                {styleBlock}
                <div className="card-content">
                    <div className="card-header">
                        <h3 className="card-title" title={gift.name}>{gift.name}</h3>
                        
                        {/* 2. Button for Edit action (NOT a Link) */}
                        {/* We use the handleEditClick to navigate and stop propagation */}
                        <button 
                            className="edit-button"
                            onClick={handleEditClick}
                            aria-label={`Edit ${gift.name}`}
                        >
                            Edit
                        </button>
                    </div>

                    {/* Placeholder for Image (as we haven't fixed the URL issue yet) */}
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


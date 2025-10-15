import { useParams, useNavigate, Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
// import './GiftDetails.css' <--- Removed this line to stop the compilation error
import './GiftDetails.css';

const GiftDetails = ({data}) => {

    const [gift, setGift] = useState({id: 0, name: "", pricepoint: "", audience: "", image: "", description: "", submittedby: "", submittedon: ""})
    const { id } = useParams();
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Fetch gift data using the Vite Proxy path
    useEffect(() => {
        if (!id) return;

        const fetchGiftById = async () => {
          try {
            // Use relative path for Vite proxy
            const response = await fetch(`/gifts/${id}`); 
            
            if (!response.ok) {
                // Handle 404 or other errors by navigating away
                console.error(`Error fetching gift: ${response.status}`);
                navigate('/');
                return;
            }

            const data = await response.json();
            setGift(data);
          } catch (error) {
            console.error("Network error fetching gift:", error);
            navigate('/');
          }
        };
        fetchGiftById();
    }, [id, navigate]); // Depend on ID and navigate

    // Delete logic (remains the same)
    const handleDelete = async () => {
        if (isDeleting) return;

        setIsDeleting(true);
        try {
            const options = { method: 'DELETE' };
            const response = await fetch(`/gifts/${id}`, options);
            
            if (response.ok) {
                navigate('/'); // Navigate to home after successful delete
            } else {
                console.error("Failed to delete gift:", response.status);
                // NOTE: Using a simple JS alert() here, please replace with a custom modal in your final code.
                alert("Failed to delete the gift."); 
            }
        } catch (error) {
            console.error("Network error during delete:", error);
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
        }
    };


    return (
        <div className="GiftDetails">
            <main id="gift-content" className="gift-info">
                <div className="image-container">
                    <img id="image" src={gift.image} alt={gift.name} />
                </div>
                <div className="gift-details">
                    <h2 id="name">{gift.name}</h2>
                    <p id="submittedBy">{'Submitted By: ' + gift.submittedby}</p>
                    <p id="submittedOn">{'Submitted On: ' + gift.submittedon}</p>
                    <p id="pricePoint">{'Price: ' + gift.pricepoint}</p>
                    <p id="audience">{'Great For: ' + gift.audience}</p>
                    <p id="description">{gift.description}</p>
                    <div className="gift-actions">
                        {/* CRITICAL FIX: Ensure the ID is correctly passed in the link */}
                        <Link to={`/edit/${id}`} className="action-button edit-button">
                            Edit Gift
                        </Link>
                        <button 
                            onClick={() => setShowDeleteModal(true)} 
                            className="action-button delete-button"
                        >
                            Delete Gift
                        </button>
                    </div>
                </div>
            </main>

            {/* Simple Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="delete-modal-overlay">
                    <div className="delete-modal">
                        <h3>Confirm Deletion</h3>
                        <p>Are you sure you want to delete {gift.name}?</p>
                        <div className="modal-actions">
                            <button onClick={handleDelete} disabled={isDeleting}>
                                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                            <button onClick={() => setShowDeleteModal(false)} disabled={isDeleting}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GiftDetails


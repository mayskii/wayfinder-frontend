import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaArrowLeft } from 'react-icons/fa';
import './MyRoutesPage.css';
import { useNavigate } from 'react-router-dom';

const MyRoutesPage = ({ routes, setRoutes, isAuthenticated, updateRoute }) => {
    const [editingNotesId, setEditingNotesId] = useState(null);
    const [draftNote, setDraftNote] = useState('');
    const navigate = useNavigate();

    if (!isAuthenticated) return <p>Please sign in to see your routes.</p>;

    const handleEditClick = (route) => {
    setEditingNotesId(route.id);
    setDraftNote(route.notes || '');
    };

    const handleSaveClick = async (route) => {
    const updatedRoute = { ...route, notes: draftNote };
    await updateRoute(updatedRoute);
    setRoutes(prev => prev.map(r => (r.id === route.id ? updatedRoute : r)));
    setEditingNotesId(null);
    setDraftNote('');
    };

    return (
    <div className="my-routes-page">
        <div className="journal-header">
            <button
            className="back-btn"
            onClick={() => navigate('/')}
            title="Back to main page"
            >
            <FaArrowLeft />
            </button>
            <h2>My Routes Journal</h2>
        </div>

        <ul className="routes-list">
            {routes.map(route => (
            <li key={route.id} className="route-item">
            <div className="route-card-header">
                <h3 className="route-title">{route.name}</h3>
                <div className="route-actions">
                    <button
                        className="edit-btn"
                        onClick={() => handleEditClick(route)}
                        >
                            Edit Notes
                    </button>
                </div>
            </div>

            <div className="route-card-body">
                {editingNotesId === route.id ? (
                    <div className="notes-editor">
                    <textarea
                        value={draftNote}
                        onChange={(e) => setDraftNote(e.target.value)}
                        placeholder="Write your notes here..."
                    />
                    <div className="notes-actions">
                    <button
                        className="save-btn"
                        onClick={() => handleSaveClick(route)}
                    >
                        Save
                    </button>
                    <button
                        className="cancel-btn"
                        onClick={() => setEditingNotesId(null)}
                    >
                        Cancel
                    </button>
                    </div>
                </div>
                ) : (
                <p className="route-notes">{route.notes || "No notes yet…"}</p>
                )}
            </div>
            </li>
        ))}
        </ul>
    </div>
    );
};

MyRoutesPage.propTypes = {
    routes: PropTypes.array.isRequired,
    setRoutes: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    updateRoute: PropTypes.func.isRequired,
};

export default MyRoutesPage;

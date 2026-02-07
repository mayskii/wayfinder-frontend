import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTrashAlt, FaCloudDownloadAlt, FaBook } from 'react-icons/fa';
import './SavedRoutes.css';

const SavedRoutes = ({
    routes,
    setRoutes,
    loadRoute,
    deleteRoute,
    isAuthenticated,
    navigate
}) => {
    const [dragIndex, setDragIndex] = useState(null);

    if (!isAuthenticated) return null;

    const handleDragStart = (index) => {
    setDragIndex(index);
    };

    const handleDragOver = (e) => {
    e.preventDefault();
    };

    const handleDrop = (dropIndex) => {
    if (dragIndex === null || dragIndex === dropIndex) return;

    const updated = [...routes];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(dropIndex, 0, moved);

    setRoutes(updated);
    setDragIndex(null);
    };

    return (
    <div className="saved-routes">
        <div className="saved-routes-header">
                <h4>Saved Routes</h4>
                <button
                    className="my-routes-btn"
                    onClick={() => navigate('/my-routes')}
                    title="My Routes Journal"
                >
                    <FaBook />
                </button>
            </div>
        <ul>
        {routes.map((route, index) => (
            <li
            key={route.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className={dragIndex === index ? 'dragging' : ''}
            >
            <div className="route-name">{route.name}</div>

            <div className="button-container">
                <button
                className="load-btn"
                onClick={() => loadRoute(route)}
                >
                <FaCloudDownloadAlt />
                </button>

                <button
                className="delete-btn"
                onClick={() => deleteRoute(route.id)}
                >
                <FaTrashAlt />
                </button>
            </div>
            </li>
        ))}
        </ul>
    </div>
    );
};

SavedRoutes.propTypes = {
    routes: PropTypes.array.isRequired,
    setRoutes: PropTypes.func.isRequired,
    loadRoute: PropTypes.func.isRequired,
    deleteRoute: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    navigate: PropTypes.func.isRequired,
};

export default SavedRoutes;
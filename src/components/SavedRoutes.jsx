import PropTypes from 'prop-types';
import { FaTrashAlt, FaCloudDownloadAlt } from 'react-icons/fa';
import './SavedRoutes.css';

const SavedRoutes = ({ routes, loadRoute, deleteRoute, isAuthenticated }) => {

    if (!isAuthenticated){
        return null
    }

    return (
        <div className='saved-routes'>
            <h4>Saved Routes</h4>
            <ul>
                {routes.map((route) => (
                    <li key={route.id}>
                        <div className="route-name">{route.name}</div>
                        <div className="button-container">
                            <button className="load-btn" onClick={() => loadRoute(route)}>
                                <FaCloudDownloadAlt />
                            </button>
                            <button className="delete-btn" onClick={() => deleteRoute(route.id)}>
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
    loadRoute: PropTypes.func.isRequired,
    deleteRoute: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.func.isRequired
};

export default SavedRoutes;

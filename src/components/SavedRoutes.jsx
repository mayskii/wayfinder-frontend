import PropTypes from 'prop-types';

const SavedRoutes = ({ routes,  loadRoute, deleteRoute }) => {
    return(
        <div  className='saved-routes'>
            <h4>Saved Routes</h4>
            <ul>
                {routes.map((route) => (
                    <li key={route.id}>{route.name}
                    <button onClick={() => loadRoute(route)}>Load</button>
                    <button onClick={() => deleteRoute(route.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

SavedRoutes.propTypes = {
    routes: PropTypes.array.isRequired,
};

export default SavedRoutes;
import PropTypes from 'prop-types';

const SavedRoutes = ({ routes }) => {
    return(
        <div  className='saved-routes'>
            <h4>Saved Routes</h4>
            <ul>
                {routes.map((route) => (
                    <li key={route.id}>{route.name}
                    <button>Load</button>
                    <button>Delete</button>
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
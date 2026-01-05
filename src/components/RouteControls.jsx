const RouteControls = ({ createRoute }) => {
    return (
    <div className='route-controls'>
        <h4>Route Controls</h4>
        <button onClick={createRoute}>Create Route</button>
        <button>Optimize Route</button>
        <button>Save Route</button>
    </div>
    );
}

export default RouteControls
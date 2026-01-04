const AttractionList = () => {
    return (
    <div className='attraction-list'>
        <h2>Attractions List (Selection Block)</h2>
        <ul>
            <li><input type='checkbox' /> Museum A</li>
            <li><input type='checkbox' /> Museum B</li>
            <li><input type='checkbox' /> Museum C</li>
        </ul>
        <button>Select All</button>
        <button>Deselect All</button>
    </div>
    );
};

export default AttractionList;

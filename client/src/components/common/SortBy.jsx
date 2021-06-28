import { useState } from 'react'

const SortBy = ({ setSortBy }) => {
    const [status, setStatus] = useState('All')

    const statusChange = (e) => {
        setStatus(e.target.value)
        setSortBy(e.target.value)
    }


    let customColor = '';
    if (status === 'Processing') {
        customColor = 'Processing'
    }
    else if (status === 'Shipping') {
        customColor = 'Shipping'
    }
    else if (status === 'Deliverd') {
        customColor = 'Deliverd';
    }

    return (
        <>
            <div className="sort_container   ml-auto d-flex mr-3">
                <h6 className="mt-2">Sort By:</h6>
                <select className={`select ${customColor} ml-3`}
                    onChange={statusChange}
                    id="select">
                    <option className='All' value="All" >ALL</option>
                    <option className='Processing' value="Processing" >Processing</option>
                    <option className='Shipping' value="Shipping">Shipping</option>
                    <option className='Deliverd' value="Deliverd">Deliverd</option>
                </select>
            </div>
        </>
    );
}

export default SortBy;

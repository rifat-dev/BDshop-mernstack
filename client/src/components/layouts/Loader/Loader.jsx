import { Fragment } from 'react';
import './loader.css'


const Loader = () => {
    return (
        <Fragment>
            <div className="animation">
                <div className="bouncer">
                    <div className="a"></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </Fragment>
    );
}

export default Loader;

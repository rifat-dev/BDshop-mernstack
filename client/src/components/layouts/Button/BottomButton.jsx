import { useEffect, useState } from 'react';

const BottomButton = () => {

    const [show, setShow] = useState(false)

    const bottomToTop = () => {
        window.scrollTo(0, 0)
    }

    useEffect(() => {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 500) {
                setShow(true)
            } else {
                setShow(false)
            }
        })
    }, [])

    return (
        < >
            <button onClick={bottomToTop} className="buttomBatton" style={show ? { display: 'block' } : { display: 'none' }}  >
                <i class="bi bi-arrow-up-short"></i>
            </button>
        </>
    );
}

export default BottomButton;

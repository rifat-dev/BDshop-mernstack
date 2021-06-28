import '../../App.css'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <div className="row   offset-md-2 my-2">
            {step1 ? (
                <div className="col-md-3 mx-4" id="pointerActive" >
                    <p>Shipping</p>
                </div>
            ) :
                (
                    <div className="col-md-3 mx-4" id="pointerInActive" >
                        <p>Shipping</p>
                    </div>
                )
            }
            {step2 ?
                <div className="col-md-3" id="pointerActive">
                    <p>Confirm Order</p>
                </div>
                :
                <div className="col-md-3" id="pointerInActive">
                    <p>Confirm Order</p>
                </div>
            }

            {step3 ?
                <div className="col-md-3 mx-4" id="pointerActive">
                    <p>Payment</p>
                </div>
                :
                <div className="col-md-3 mx-4" id="pointerInActive">
                    <p>Payment</p>
                </div>}

        </div>
    )
}

export default CheckoutSteps
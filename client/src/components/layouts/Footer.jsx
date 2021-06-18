import React, { Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer className="py-1 mt-5" style={{ backgroundColor: 'black', color: 'white' }}>
            {/* <p className="text-center mt-1">
                    Shopping Cart - 2021-2021, All Rights Reserved By Tajul Islam Rifath
                </p> */}
            <Row>
                <Col className='text-center py-3'>Copyright &copy; Tajul Islam Rifat</Col>
            </Row>
        </footer>
    )
}

export default Footer
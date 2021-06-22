import { Card } from 'react-bootstrap';
import './Blog.css'

import qualityImg from '../../../assets/img1.jpg'
import delivaryImg from '../../../assets/image3.png'
import customerImg from '../../../assets/signup.jpg'

const Blog = () => {
    return (
        <div className='container blog'>
            <h2>Why you Choose us</h2>
            <p className='p-text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br />
                Necessitatibus recusandae natus minus sequi distinctio ratione nobis animi est.
            </p>
            <div className='card_container'>
                <Card className='custom_card' style={{ width: '21rem' }}>
                    <Card.Img className="card_body_img" variant="top" src={qualityImg} />
                    <Card.Body className='card_Body'>
                        <div className='d-flex align-items-center'>
                            <img src="https://i.ibb.co/48jGMhK/Group-204.png" alt="" />
                            <h5 className='mb-0 ml-2'>Products Quality</h5>
                        </div>
                        <div className='card_b_text'>
                            <Card.Text className='card_p'>
                                A quality product creates unshakeable customer loyalty that generates increased leads. When customers find a product they trust, they return, make repeat purchases, and recommend the product or service to others
                                <p className="collapse" id="collapseExample1">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                                </p>
                            </Card.Text>
                            <span className='see_moreBtn' data-toggle="collapse" data-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1">See more <i class="bi bi-arrow-right-circle-fill"></i></span>
                        </div>
                    </Card.Body>
                </Card>

                <Card className='custom_card' style={{ width: '21rem' }}>
                    <Card.Img className="card_body_img" variant="top" src={delivaryImg} />
                    <Card.Body className='card_Body'>
                        <div className='d-flex align-items-center'>
                            <img src="https://i.ibb.co/Krndkz0/Group-1133.png" alt="" />
                            <h5 className='mb-0 ml-2'>Home Delivary</h5>
                        </div>
                        <div className='card_b_text'>
                            <Card.Text className='card_p'>
                                Taking good control of the delivery process in order to make sure that the parcel is delivered to the customers on time. ... It may lead to the efficiency of businesses can be increased and the amount of time and effort spent can be reduced in dealing with deliveries.
                                <p className="collapse" id="collapseExample2">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                                </p>
                            </Card.Text>
                            <span className='see_moreBtn' data-toggle="collapse" data-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2">See more <i class="bi bi-arrow-right-circle-fill"></i></span>
                        </div>
                    </Card.Body>
                </Card>

                <Card className='custom_card' style={{ width: '21rem' }}>
                    <Card.Img className="card_body_img" variant="top" src={customerImg} />
                    <Card.Body className='card_Body'>
                        <div className='d-flex align-items-center'>
                            <img src="https://i.ibb.co/tMnm9qm/Group-245.png" alt="" />
                            <h5 className='mb-0 ml-2'>Customers Satisfaction</h5>
                        </div>
                        <div className='card_b_text'>
                            <Card.Text className='card_p'>
                                Customer satisfaction plays an important role within your business. Not only is it the leading indicator to measure customer loyalty, identify unhappy customers, reduce churn and increase revenue; it is also a key point of differentiation that helps you to attract new customers in competitive business environments.
                                <p className="collapse" id="collapseExample">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                                </p>
                            </Card.Text>
                            <span className='see_moreBtn' data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">See more <i class="bi bi-arrow-right-circle-fill"></i></span>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Blog;
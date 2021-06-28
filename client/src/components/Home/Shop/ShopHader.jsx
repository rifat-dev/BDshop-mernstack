
import shopImg from '../../../assets/shopping.svg'

const ShopHader = () => {
    return (
        <div className=" shop_hader row" >
            <div className="col-md-6 shop_hader_img">
                <img src={shopImg} alt="" />
            </div>
            <div className="col-md-6 shop_hader_text ">
                <h1>Happy Shopping</h1>
                <p>Supporting our local economy allows for job growth, development, and innovation. Think about this - when you pay sales tax on our items, the money goes back to the community, repairing our roads, supporting our schools, police, and other services</p>
                <p className="shop_now" >Sopping Now</p>
            </div>
        </div>
    );
}

export default ShopHader;

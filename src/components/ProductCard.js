import { Avatar, Card } from "antd";
import { Link } from "react-router-dom";
import thumb from "../assets/images/thumbnail.jpg";

const {Meta} = Card;
const ProductCard = (props) =>{
    const publicFolder = "http://localhost:5000/image/";

    return (
        <Link to={`/products/${props.data._id}`} className="no-link">
      <Card
        style={{
          fontFamily: "Poppins",
          cursor: "Pointer",
          height: "100%"
        }}
        cover={
          <img src={props.data.image ? publicFolder + props.data.image : thumb } alt="Thumbnail" />

        }
      >
        <Meta className="meta-description"
          title={props.data.title}
          description={
          <div>
            <span className="rs">Rs.</span>
            <span className="price">
              {props.data.price}
            </span>
          </div>
          }
        />
      </Card>
    </Link>
    );
};

export default ProductCard;
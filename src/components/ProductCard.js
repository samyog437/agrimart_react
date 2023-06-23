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
          fontFamily: "Inter",
          cursor: "Pointer",
        }}
        cover={
          <img src={props.data.image ? publicFolder + props.data.image : thumb } alt="Thumbnail" />

        }
      >
        <Meta
          title={props.data.title}
          description={`Rs.${props.data.price}`}
        />
      </Card>
    </Link>
    );
};

export default ProductCard;
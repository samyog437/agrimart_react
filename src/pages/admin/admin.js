import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Modal } from "antd";
import AddProductTab from "./AddProductTab.js";
import ProductListTab from "./ProductListTab";
import OrdersTab from "./OrdersTab";
import { ToastContainer, toast } from "react-toastify";

const { TabPane } = Tabs;

const AdminPage = (props) => {
  const publicFolder = "http://localhost:5000/image/";
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [deliveries, setDeliveries] = useState([]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(imageFile);
    setImage(imageFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = {
      title,
      price,
      image,
    };
    const formData = new FormData();
    formData.append("title", newProduct.title);
    formData.append("price", newProduct.price);
    if (newProduct.image) {
      formData.append("image", newProduct.image);
    }
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${props.token}`,
      },
    };
    axios
      .post(`/products/`, formData, config)
      .then((response) => {
        console.log(response.data.product._id);
        toast.success("Product Added Successfully");
        fetchProducts(); // Refresh the products list
        setTitle("");
        setPrice("");
        setImage(null);
        setPreviewImage(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDeliveries = async () => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${props.token}`,
      },
    };
    try {
      const response = await axios.get("/delivery/all", config);
      setDeliveries(response.data.deliveries);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchDeliveries();
  }, []);

  const handleEdit = (productId) => {
    setCurrentProductId(productId);
    setEditModalVisible(true);
    const product = products.find((item) => item._id === productId);
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setPreviewImage(publicFolder + product.image);
    }
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
    setCurrentProductId(null);
    setTitle("");
    setPrice("");
    setImage(null);
    setPreviewImage(null);
  };

  const handleSaveEdit = () => {
    const updatedProduct = {
      title,
      price,
      image,
    };
    const formData = new FormData();
    formData.append("title", updatedProduct.title);
    formData.append("price", updatedProduct.price);
    if (updatedProduct.image) {
      formData.append("image", updatedProduct.image);
    }
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${props.token}`,
      },
    };
    axios
      .put(`/products/${currentProductId}`, formData, config)
      .then((response) => {
        console.log(response.data.product._id);
        toast.success("Product Updated Successfully");
        fetchProducts(); // Refresh the products list
        handleCancelEdit();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeliveryStatusChange = async (deliveryId, status) => {
    try {
      const updatedDelivery = {
        deliveryStatus: status,
      };
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
      };
  
      const response = await axios.put(`/delivery/${deliveryId}`, updatedDelivery, config);
      console.log(response.data);
      
      // Update the deliveries data with the updated delivery status
      const updatedDeliveries = deliveries.map((delivery) => {
        if (delivery._id === deliveryId) {
          return {
            ...delivery,
            deliveryStatus: status,
          };
        }
        return delivery;
      });
  
      setDeliveries(updatedDeliveries); // Update the deliveries state
  
      // Handle successful update
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };
  
  

  return (
    <>
      <div style={{ padding: "20px 100px" }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Add Product" key="1">
            <AddProductTab
              handleSubmit={handleSubmit}
              title={title}
              handleTitleChange={handleTitleChange}
              price={price}
              handlePriceChange={handlePriceChange}
              handleImageChange={handleImageChange}
              previewImage={previewImage}
            />
          </TabPane>
          <TabPane tab="Product List" key="2">
            <ProductListTab products={products} handleEdit={handleEdit} />
          </TabPane>
          <TabPane tab="Orders" key="3">
          <OrdersTab
                deliveries={deliveries}
                handleDeliveryStatusChange={handleDeliveryStatusChange}
                />
          </TabPane>
        </Tabs>

        {/* Edit Product Modal */}
        <Modal
          title="Edit Product"
          visible={editModalVisible}
          onCancel={handleCancelEdit}
          onOk={handleSaveEdit}
          destroyOnClose
        >
          <AddProductTab
            handleSubmit={handleSaveEdit}
            title={title}
            handleTitleChange={handleTitleChange}
            price={price}
            handlePriceChange={handlePriceChange}
            handleImageChange={handleImageChange}
            previewImage={previewImage}
          />
        </Modal>
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminPage;

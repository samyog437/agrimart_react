import { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Button, Tabs, Table, Modal } from "antd";

const { TabPane } = Tabs;

const AdminPage = (props) => {
  const { TextArea } = Input;

  const publicFolder = "http://localhost:5000/image/";
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

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
        alert("Product Added Successfully");
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

  useEffect(() => {
    fetchProducts();
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
        alert("Product Updated Successfully");
        fetchProducts(); // Refresh the products list
        handleCancelEdit();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <div className="table-row" onClick={() => handleEdit(record._id)}>
            <img
            src={publicFolder + image}
            alt="Product"
            style={{ width: "50px" }}
            />
        </div>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
  ];

  return (
    <div style={{ padding: "20px 100px" }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Add Product" key="1">
        <Form name="basic" layout="vertical" autoComplete="off">
            <Form.Item
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Field cannot be empty!",
                },
              ]}
            >
              <Input value={title} onChange={handleTitleChange} />
            </Form.Item>

            <Form.Item
              label="Price"
              rules={[
                {
                  required: true,
                  message: "Field cannot be empty!",
                },
              ]}
            >
              <Input value={price} onChange={handlePriceChange} />
            </Form.Item>

            <Form.Item label="Upload" valuePropName="fileList">
              <div>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="preview-container">
                {previewImage && <img src={previewImage} alt="Product Thumbnail" />}
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" onClick={handleSubmit} style={{ width: "30%" }}>
                Add Product
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Product List" key="2">
          <Table dataSource={products} columns={columns} pagination={{
            pageSize: 5,
          }} onRow={(record) => ({
            onClick: () => handleEdit(record._id),
          })} />
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
        <Form name="basic" layout="vertical" autoComplete="off">
            <Form.Item
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Field cannot be empty!",
                },
              ]}
            >
              <Input value={title} onChange={handleTitleChange} />
            </Form.Item>

            <Form.Item
              label="Price"
              rules={[
                {
                  required: true,
                  message: "Field cannot be empty!",
                },
              ]}
            >
              <Input value={price} onChange={handlePriceChange} />
            </Form.Item>

            <Form.Item label="Upload" valuePropName="fileList">
              <div>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="preview-container">
                {previewImage && <img src={previewImage} alt="Product Thumbnail" />}
              </div>
            </Form.Item>
          </Form>
      </Modal>
    </div>
  );
};

export default AdminPage;

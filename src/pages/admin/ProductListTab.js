import React from "react";
import { Table } from "antd";

const ProductListTab = ({ products, handleEdit }) => {
  const publicFolder = "http://localhost:5000/image/";

  const productColumns = [
    {
      title: "SN",
      dataIndex: "",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <div className="table-row" onClick={() => handleEdit(record._id)}>
          <img src={publicFolder + image} alt="Product" style={{ width: "50px" }} />
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
    <Table
      dataSource={products}
      columns={productColumns}
      pagination={{
        pageSize: 5,
      }}
      onRow={(record) => ({
        onClick: () => handleEdit(record._id),
      })}
    />
  );
};

export default ProductListTab;

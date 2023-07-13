import React from "react";
import { Table, Button } from "antd";

const OrdersTab = ({ deliveries, handleDeliveryStatusChange }) => {
  const deliveryColumns = [
    {
      title: "SN",
      dataIndex: "",
      render: (text, record, index) => index + 1,
    },
    {
      title: "City",
      dataIndex: "city",
    },
    {
      title: "Area",
      dataIndex: "area",
    },
    {
      title: "Landmark",
      dataIndex: "landmark",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
    },
    {
      title: "Products",
      dataIndex: "products",
      render: (products) => (
        <ul>
          {products.map((product) => (
            <li key={product.productId}>
              {product.productId.title} - Quantity: {product.quantity}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      render: (status, record) => (
        <div
          style={{
            backgroundColor: status === "Delivered" ? "green" : "yellow",
            color: status === "Delivered" ? "white" : "black",
            padding: "4px",
            borderRadius: "4px",
          }}
        >
          <span>{status}</span>
          <span style={{marginLeft: "2rem"}}>
            {status === "Ongoing" ? (
            
            <Button
              onClick={() => handleDeliveryStatusChange(record._id, "Delivered")}
            >
              Mark as Delivered
            </Button>
          ) : (
            <Button
              onClick={() => handleDeliveryStatusChange(record._id, "Ongoing")}
            >
              Mark as Ongoing
            </Button>
          )}
            </span>
        </div>
      ),
    },
  ];

  return (
    <Table
      dataSource={deliveries}
      columns={deliveryColumns}
      pagination={{
        pageSize: 5,
      }}
    />
  );
};

export default OrdersTab;

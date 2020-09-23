import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
// icons
import { DeleteOutlined } from "@ant-design/icons";
// ui
import { Table, Input, Button, Popconfirm, Form, InputNumber } from "antd";

const EditableContext = React.createContext();

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

// =================================================================

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableTable = () => {
  const [count, setCount] = useState(2);
  const [dataSource, setDataSource] = useState([
    {
      key: "0",
      image:
        "https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_grande_f861cbf4-1bf9-4357-a453-ffc48bdbd2ba_350x350.jpg?v=1596714398",
      color: "Black",
      size: "US 4.5 - 5 | EU 36",
      price: "59.99",
      quantity: 109,
      incoming: 10,
      sku: 101,
      name: "Edward King 0",
      age: "32",
      address: "London, Park Lane no. 0",
    },
    {
      key: "1",
      image:
        "https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_grande_f861cbf4-1bf9-4357-a453-ffc48bdbd2ba_350x350.jpg?v=1596714398",
      color: "Black",
      size: "US 6 | EU 38",
      price: "59.99",
      quantity: 109,
      incoming: 10,
      sku: 101,
      name: "Edward King 1",
      age: "32",
      address: "London, Park Lane no. 1",
    },
  ]);

  const columns = [
    {
      title: "",
      dataIndex: "image",
      render: (image) => <ImgStyle alt="" src={image} />,
    },
    {
      title: "Color",
      dataIndex: "color",
      editable: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      editable: true,
      render: (price) => (
        <InputNumberStyle
          value={price}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
        />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      editable: true,
      render: (val) => <Input value={val} min={0} />,
    },
    {
      title: "Incoming",
      dataIndex: "incoming",
      render: (val) => <a href="#">{val}</a>,
    },
    {
      title: "SKU",
      dataIndex: "sku",
      editable: true,
    },
    {
      title: "",
      dataIndex: "key",
      fixed: "right",
      render: (text, record) =>
        dataSource.length >= 1 ? (
          <>
            <ButtonEdit href="/products/inventory/123">Edit</ButtonEdit>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <Button icon={<DeleteOutlined />} />
            </Popconfirm>
          </>
        ) : null,
    },
  ];

  const handleDelete = (key) => {
    const _dataSource = [...dataSource];
    setDataSource(_dataSource.filter((item) => item.key !== key));
  };

  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };

    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const _columns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <Table
      rowSelection={{
        type: "checkbox",
        ...rowSelection,
      }}
      components={components}
      rowClassName={() => "editable-row"}
      dataSource={dataSource}
      columns={_columns}
      scroll={{ x: 1000, y: 300 }}
    />
  );
};
const InputNumberStyle = styled(InputNumber)``;

const ImgStyle = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;

const ButtonEdit = styled(Button)`
  margin-right: 10px;
`;

export default EditableTable;

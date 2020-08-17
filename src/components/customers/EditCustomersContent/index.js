import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";
// icons
import { DownOutlined } from "@ant-design/icons";
// ui
import {
  Select,
  Tag,
  Table,
  Checkbox,
  Button,
  Dropdown,
  Row,
  Col,
  Input,
  Form,
} from "antd";

const EditableContext = React.createContext();

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

const dataSourceDefault = [
  {
    key: "0",
    name: "Edward King 0",
    email: "test@gmail.com",
    first_name: "Danny",
    last_name: "Rose",
    tax_exempt: true,
    accept: true,
    tags: ["aaa", "bbb", "xxx"],
    address: "London, Park Lane no. 0",
  },
  {
    key: "1",
    name: "Edward King 1",
    email: "test@gmail.com",
    first_name: "Danny",
    last_name: "Rose",
    tax_exempt: false,
    accept: false,
    tags: ["111", "222", "333"],
    address: "London, Park Lane no. 1",
  },
];

const EditCustomersContent = () => {
  const [isAddFields, setShowAddFields] = useState(false);
  const [fields, setFields] = useState([
    {
      title: "Email",
      name: "email",
      isShow: true,
    },
    {
      title: "Fist Name",
      name: "first_name",
      isShow: true,
    },
    {
      title: "Last Name",
      name: "last",
      isShow: true,
    },
    {
      title: "Tags",
      name: "tags",
      isShow: false,
    },
    {
      title: "Accepts marketing",
      name: "accepts",
      isShow: false,
    },
    {
      title: "Tax exempt",
      name: "tax_exempt",
      isShow: false,
    },
  ]);

  const [dataSource, setDataSource] = useState(dataSourceDefault);

  const columnsInit = [
    {
      title: "Customer",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      editable: true,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      editable: true,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      editable: true,
    },
    {
      title: "Tax Exempt",
      dataIndex: "tax_exempt",
      render: (value) => <Checkbox checked={value} />,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      render: (tags) => {
        let arr = [];
        for (let i = 0; i < tags.length; i++) {
          const el = tags[i];
          arr.push(<TagAllow key={i}>{el}</TagAllow>);
        }
        return arr;
      },
    },
    {
      title: "Accepts marketing",
      dataIndex: "accept",
      render: (value) => <Checkbox checked={value} />,
    },
  ];

  const onSelectTag = async (index, item) => {
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (i === index) {
        field.isShow = true;
        console.log("fields: ", fields);
        setFields(fields);
      }
    }
    setFields(fields);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });

    setDataSource(newData);
  };

  const columns = columnsInit.map((col) => {
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

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <EditContent>
      <EditFields>
        <p>Currently editing these fields:</p>
        <div>
          {fields &&
            fields.length > 0 &&
            fields.map((item, i) => {
              if (item.isShow) {
                return (
                  <TagAllow key={i} closable color="#9a9797">
                    {item.title}
                  </TagAllow>
                );
              }
            })}
          <Dropdown
            overlay={
              <PopupMenu>
                <Row gutter={24}>
                  <Col md={8}>
                    <p>Attribution</p>
                  </Col>
                  <Col md={16}>
                    {fields &&
                      fields.length > 0 &&
                      fields.map((item, i) => {
                        if (item.isShow) {
                          return (
                            <TagDisable key={i} color="#d2d2d2">
                              {item.title}
                            </TagDisable>
                          );
                        } else {
                          return (
                            <TagAllow
                              key={i}
                              color="#9a9797"
                              onClick={() => onSelectTag(i, item)}
                            >
                              {item.title}
                            </TagAllow>
                          );
                        }
                      })}
                  </Col>
                </Row>
              </PopupMenu>
            }
            trigger={["click"]}
            placement="bottomCenter"
          >
            <ButtonAddFields>
              Add fields <DownOutlined />
            </ButtonAddFields>
          </Dropdown>
        </div>
      </EditFields>

      {/* table */}
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </EditContent>
  );
};

const EditContent = styled.div``;

const EditFields = styled.div`
  padding: 20px;
`;

const PopupMenu = styled.div`
  background: #fff;
  box-shadow: var(
    --p-card-shadow,
    0 0 0 1px rgba(63, 63, 68, 0.05),
    0 1px 3px 0 rgba(63, 63, 68, 0.15)
  );
  border-radius: 3px;
  padding: 20px;
  width: 550px;
`;

const TagDisable = styled(Tag)`
  cursor: not-allowed;
  margin-bottom: 7px;
  background-color: #dfe3e8 !important;
  color: #454f5b !important;
  opacity: 0.5;
  padding: 4px 10px;
`;

const TagAllow = styled(Tag)`
  cursor: pointer;
  margin-bottom: 7px;
  background-color: #dfe3e8 !important;
  color: #454f5b !important;
  padding: 4px 10px;
`;

const ButtonAddFields = styled(Button)`
  color: #333;
  border-color: #333;
`;

export default EditCustomersContent;

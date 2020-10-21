import React, { useState, useEffect } from "react";
import styled from "styled-components";
// data
// import { productsTree } from "../fakeData";
// icons
import { AudioOutlined, RightOutlined, LeftOutlined } from "@ant-design/icons";
// ui
import {
  Modal,
  Select,
  Checkbox,
  Menu,
  Row,
  Col,
  Button,
  Input,
  List,
  Typography,
  Empty,
} from "antd";

const { Search } = Input;

const data = [
  "All products",
  "Popular products",
  "Collections",
  "Product types",
  "Tags",
  "Vendors",
];

const MDSelectProducts = (props) => {
  console.log('props', props.products)
  const [title, setTitle] = useState("Select products");
  const [indexMenu, setIndexMenu] = useState(null);
  const [listProducts, setListProducts] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [subMenu, setSubMenu] = useState([]);

  const { isOpen, onCancel, onAdd } = props;

  const onBack = () => {
    setIndexMenu(null);
    setTitle("Select products");
  };

  useEffect(() => {
    let listProduct = []
    props.products.map(data => {
      data.isChecked = false
      data.variants.map(item => {
        item.isChecked = false
        item.total_value = 1
      })
      listProduct.push(data)
    })
    setListProducts(listProduct);
  }, [props.products]);

  const handleSelectItem = (index) => {
    let node = (
      <div>
        <BackButton href="#" onClick={() => onBack()}>
          <LeftOutlined />
        </BackButton>
        {data[index]}
      </div>
    );
    setIndexMenu(index);
    setTitle(node);
    if (index === 2) {
      setSubMenu(["Home Page"]);
    } else if (index === 5) {
      setSubMenu(["mysolidshoes"]);
    } else {
    }
  };

  const onCheckAllChange = (e, pro) => {
    pro.isChecked = e.target.checked
    let data = listProducts;

    pro.variants && pro.variants.map(item => {
      item.isChecked = e.target.checked
    })
    let index = data.findIndex(item => item.ID === pro.ID)
    data[index] = pro

    setListProducts(data);


    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const changeValuesCheckbox = (e, pro, vari) => {
    pro.variants[vari].isChecked = e.target.checked
    let checked = pro.variants.find(data => data.isChecked !== true)
    if (checked === undefined) {
      pro.isChecked = true
    } else {
      pro.isChecked = false
    }
    let data = listProducts;
    let index = data.findIndex(item => item.ID === pro.ID)
    data[index] = pro
    setListProducts(data);

    setIndeterminate(false);
    setCheckAll(e.target.checked);
    // if (values.length < data.length) {
    //   setCheckAll(false);
    // } else {
    //   setCheckAll(true);
    // }

  };

  const handleSelectSubItem = (index) => {
    setIndexMenu(99);

    let node = (
      <div>
        <BackButton href="#" onClick={() => onBack()}>
          <LeftOutlined />
        </BackButton>
        {indexMenu === 5 ? "mysolidshoes" : "Home page"}
      </div>
    );

    setTitle(node);
  };
  console.log('listProducts', listProducts)
  return (
    <ModalStyle
      visible={isOpen}
      centered
      title={title}
      onOk={onAdd}
      onCancel={onCancel}
      footer={
        <FooterStyle>
          <Row>
            <Col md={12}>
              <AlignLeft>
                <Button
                  disabled={
                    checkedList && checkedList.length > 0 ? false : true
                  }
                  type={
                    checkedList && checkedList.length > 0 ? "text" : "default"
                  }
                >
                  {checkedList && checkedList.length > 0
                    ? `${checkedList.length} variants selected`
                    : "No variants"}
                </Button>
              </AlignLeft>
            </Col>
            <Col md={12}>
              <Button onClick={onCancel}>Cancel</Button>
              <Button type="primary" onClick={() => onAdd(listProducts)}>
                Add order
              </Button>
            </Col>
          </Row>
        </FooterStyle>
      }
    >
      <SearchBox>
        <SearchStyle
          placeholder="Search products"
          onSearch={(value) => console.log(value)}
        />
      </SearchBox>

      {indexMenu === null && (
        <ListStyle
          bordered
          dataSource={data}
          renderItem={(item, i) => (
            <ListItemStyle
              actions={[<RightOutlined />]}
              onClick={() => handleSelectItem(i)}
            >
              <Typography.Text mark></Typography.Text> {item}
            </ListItemStyle>
          )}
        />
      )}

      {(indexMenu === 0 || indexMenu === 1 || indexMenu === 99) && (
        <div>
          {listProducts &&
            listProducts.length > 0 &&
            listProducts.map((prod, i) => (
              <div key={i}>
                <ProductItemStyle>
                  <Checkbox
                    onChange={(e) => onCheckAllChange(e, prod)}
                    checked={prod.isChecked}
                    value={prod.isChecked}
                  />
                  <InfoProduct>
                    <ImgProduct src={prod.images && prod.images[0]} alt="" />
                    <ProductName>{prod.title}</ProductName>
                  </InfoProduct>
                </ProductItemStyle>

                <div>
                  <div
                  // onChange={changeValuesCheckbox}
                  // value={checkedList}
                  >
                    {prod.variants &&
                      prod.variants.length > 0 &&
                      prod.variants.map((item, k) => (
                        <div>
                          {console.log('1111111111111111111222222222222222', item, item.isChecked, typeof (item.isChecked))}

                          <CheckboxItem key={k}>
                            {/* <CheckboxStyle key={k} value={item.isChecked}></CheckboxStyle> */}
                            <Checkbox
                              id={k}
                              onChange={(e) => changeValuesCheckbox(e, prod, k)}
                              checked={item.isChecked}
                            />
                            <ContentItem>
                              <ContentItemLeft>
                                <TextColor>{item.color}</TextColor>
                                <TextSize>{item.variantName}</TextSize>
                                {/* <TextSize>
                                {item.isChecked ? "true" : "false"}
                              </TextSize> */}
                              </ContentItemLeft>

                              <ContentItemRight>
                                <TextSpan>{item.variantValues} in stock</TextSpan>
                                <TextSpan>${item.price}</TextSpan>
                              </ContentItemRight>
                            </ContentItem>
                          </CheckboxItem>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {(indexMenu === 2 || indexMenu === 5) && (
        <ListStyle
          bordered
          dataSource={subMenu}
          renderItem={(item, i) => (
            <ListItemStyle
              actions={[<RightOutlined />]}
              onClick={() => handleSelectSubItem(i)}
            >
              <Typography.Text mark></Typography.Text> {item}
            </ListItemStyle>
          )}
        />
      )}

      {(indexMenu === 3 || indexMenu === 4) && <Empty />}
    </ModalStyle>
  );
};

const BackButton = styled.a`
  margin-right: 10px;
  color: #999;
`;

const ProductItemStyle = styled.div`
  display: inline-flex;
  width: 100%;
  align-items: center;
`;

const ImgProduct = styled.img`
width: 40px;
margin-right: 15px;
}
`;
const ProductName = styled.h3`
  margin: 0;
`;

const InfoProduct = styled.div`
  display: inline-flex;
  width: 100%;
  align-items: center;
  padding-left: 10px;
`;

const CheckboxGroupStyle = styled(Checkbox.Group)`
  display: inline-block;
  width: 100%;
  padding-left: 30px;
`;

const CheckboxItem = styled.div`
  display: inline-flex;
  width: 100%;
  margin-top: 15px;
  border-top: 1px solid #ddd;
  padding-top: 15px;
`;

const TextColor = styled.span`
  color: #29bc94;
  margin-right: 10px;
`;

const TextSize = styled.span`
  color: #763eaf;
`;

const ContentItem = styled.div`
  width: calc(100% - 15px);
  display: inline-flex;
  align-items: center;
  padding-left: 10px;
`;

const CheckboxStyle = styled(Checkbox)``;
const ContentItemLeft = styled.div`
  text-align: left;
  width: 50%;
`;

const ContentItemRight = styled.div`
  text-align: right;
  width: 50%;
`;

const ModalStyle = styled(Modal)`
  width: 700px !important;
`;

const FooterStyle = styled.div``;

const AlignLeft = styled.div`
  text-align: left;
`;

const SearchBox = styled.div`
  padding: 0 0 15px;
`;

const SearchStyle = styled(Search)`
  width: 100%;
`;

const TextSpan = styled.span`
  margin-left: 24px;
`;

const ListItemStyle = styled(List.Item)`
  cursor: pointer;
`;

const ListStyle = styled(List)``;

export default MDSelectProducts;

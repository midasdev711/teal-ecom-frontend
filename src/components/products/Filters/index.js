import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TweenOneGroup } from "rc-tween-one";
// icons
import { StarOutlined, DownOutlined, SortAscendingOutlined } from "@ant-design/icons";
// ui
import { Row, Col, Input, Button, Dropdown, Radio, Tag } from "antd";

const { Search } = Input;

const Filters = (props) => {
  //console.log('props filters', props)
  const { productLists } = props
  const [valueSubscription, setValueSubscription] = useState(0);
  const [originalProductLists, setOriginalProductLists] = useState([]);
  const [filterProductLists, setFilterProductLists] = useState([]);
  const [tagsDropDown, setTagsDropDown] = useState(false);
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const onChangeSubscription = (e) => {
    setValueSubscription(e.target.value);
  };
  // const forMap = (tag) => {
  //   const tagElem = (
  //     <TagContent
  //       closable
  //       onClose={(e) => {
  //         e.preventDefault();
  //         handleClose(tag);
  //       }}
  //     >
  //       {tag}
  //     </TagContent>
  //   );
  //   return (
  //     <span key={tag} style={{ display: "inline-block" }}>
  //       {tagElem}
  //     </span>
  //   );
  // };
  // const tagChild = tags.map(forMap);
  useEffect(() => {
    if (productLists !== undefined) {
      setOriginalProductLists(productLists)
    }
  }, [props])

  useEffect(() => {
    if (originalProductLists?.length > 0) {
      setFilterProductLists(productLists)
    }
  }, [originalProductLists])
  useEffect(() => {
    props.getFilterData(filterProductLists)
  }, [filterProductLists])


  const handleSearch = (event) => {
    const { name, value } = event.target
    let cloneProductData = originalProductLists.slice()
    let productNameFilter
    if (cloneProductData?.length > 0) {
      productNameFilter = cloneProductData.filter(data => {
        return (
          (data && data.title.toLowerCase().search(value.toLowerCase()) !== -1)
        )
      })
    }
    if (productNameFilter === undefined) {
      setFilterProductLists(originalProductLists)
    } else {
      setFilterProductLists(productNameFilter)
    }

  }
  // const handleClose = (removedTag) => {
  //   const removeTags = tags.filter((tag) => tag !== removedTag);
  //   setTags(removeTags);
  // };
  // const saveInputRef = (input) => {
  //   input = input;
  // };
  // const handleTagsFilters = (event) => {
  //   const { name, value } = event.target
  //   // let cloneProductData = originalProductLists.slice()
  //   // let productNameFilter  
  //   // if (cloneProductData?.length > 0) {
  //   //   productNameFilter = cloneProductData.filter(data => {
  //   //     return (
  //   //       (data && data.title.toLowerCase().search(value.toLowerCase()) !== -1)
  //   //     )
  //   //   })
  //   // }
  //   // if(productNameFilter === undefined){
  //   //   setFilterProductLists(originalProductLists)
  //   // }else{
  //   //   setFilterProductLists(productNameFilter)
  //   // }
  // }
  // const handleTagsDropDown = () => {
  //   setTagsDropDown(!tagsDropDown)
  // }
  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);

  // };

  // const handleInputConfirm = () => {
  //   let tag = tags;
  //   if (inputValue && tag.indexOf(inputValue) === -1) {
  //     tag = [...tag, inputValue];
  //   }
  //   setTags(tag);
  //   //setInputVisible(false);
  //   setInputValue("");

  // };
  // const handleSearchTagsData = () => {

  //   let cloneProductData = originalProductLists.slice()
  //   let productNameFilter
  //   if (cloneProductData?.length > 0) {
  //     productNameFilter = cloneProductData.filter(data => {
  //       return (
  //         (data && data.tags?.length > 0 && data.tags?.map(t => t === tags.length > 0 && tags.map(d => d))
  //         ))
  //     })
  //   }
  //   console.log('productNameFilter', productNameFilter)
  //   if (productNameFilter === undefined) {
  //     setFilterProductLists(originalProductLists)
  //   } else {
  //     setFilterProductLists(productNameFilter)
  //   }
  // }
  // const handleClearTags = () => {
  //   setTags([])
  // }
  const handleShortHighToLowPrice = () =>{
    let data = originalProductLists.slice()
    let info = data.sort(function (a, b) {
      return (b.salePrice * 1) - (a.salePrice * 1);
    });
    setFilterProductLists(info)
  }
  const handleShortLowToHighPrice = () =>{
    let data = originalProductLists.slice()
    let info = data.sort(function (a, b) {
      return (a.salePrice * 1) - (b.salePrice * 1);
    });
    setFilterProductLists(info)
  }
  const handleLatestData = () => {
    let data = originalProductLists.slice()
    let info = data.sort(function (a, b) {
      return (b.createdAt * 1) - (a.createdAt * 1);
    });
    setFilterProductLists(info)
  }
  const handleOldData = () => {
    let data = originalProductLists.slice()
    let info = data.sort(function (a, b) {
      return (a.createdAt * 1) - (b.createdAt * 1);
    });
    setFilterProductLists(info)
  }
  return (
    <ContentFilters>
      <Row gutter={0}>
        <Col md={10}>
          <SearchBox
            placeholder="Filter products"
            name="title"
            // onSearch={(value) => console.log(value)}
            onChange={(event) => handleSearch(event)}
          />
        </Col>
        {/* <Col md={3}>
          <Dropdown
            overlay={
              <DropdownBox>
                <RadioGroupStyle
                  onChange={onChangeSubscription}
                  value={valueSubscription}
                >
                  <RadioStyle value={1}>mysolidshoes</RadioStyle>
                </RadioGroupStyle>
                <ButtonLink type="text">Clear</ButtonLink>
              </DropdownBox>
            }
            trigger={["click"]}
          >
            <ButtonBox block type="default">
              Product vendor <DownOutlined />
            </ButtonBox>
          </Dropdown>
        </Col> */}
        {/* <Col md={3}>
          <Dropdown
            overlay={
              <DropdownBox>
                <RadioGroupStyle
                  onChange={onChangeSubscription}
                  value={valueSubscription}
                >
                  <RadioStyle value={1}>Available on Online Store</RadioStyle>
                  <RadioStyle value={2}>Unavailable on Online Store</RadioStyle>
                </RadioGroupStyle>
                <ButtonLink type="text">Clear</ButtonLink>
              </DropdownBox>
            }
            trigger={["click"]}
          >
            <ButtonBox block type="default">
              Availability <DownOutlined />
            </ButtonBox>
          </Dropdown>
        </Col> */}
        {/* <Col md={2}>
          <Dropdown
            onClick={handleTagsDropDown}
            overlay={
              <DropdownBox>
                <Input
                  ref={saveInputRef}
                  type="text"
                  size="large"
                  placeholder="Vintage, cotton, summer"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                />
                <TweenOneGroup
                  className="tag-content"
                  enter={{
                    scale: 0.8,
                    opacity: 0,
                    type: "from",
                    duration: 100,
                    with: 10,
                    onComplete: (e) => {
                      e.target.style = "";
                    },
                  }}
                  leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                  appear={false}
                >
                  {tagChild}
                </TweenOneGroup>
                <TagsConformButtons>
                <ButtonLink type="link" onClick={()=>handleClearTags()}>Clear</ButtonLink>
                <SearchTags>
                <ButtonLink type="link" onClick={()=>handleSearchTagsData()}>Search</ButtonLink>
                </SearchTags>
              
                </TagsConformButtons>
              </DropdownBox>
            }
            trigger={["click"]}
            visible={tagsDropDown}
          >
            <ButtonBox block type="default">
              Tagged with <DownOutlined />
            </ButtonBox>
          </Dropdown>
        </Col> */}
        <Col md={2}>
          <ButtonLast block type="default" onClick={() => props.onOpen(true)}>
            More filters
          </ButtonLast>
        </Col>
        {/* <Col md={2}>
          <ButtonSaved block type="default" disabled icon={<StarOutlined />}>
            Saved
          </ButtonSaved>
        </Col> */}
        <Col md={2}>
          <Dropdown
            overlay={
              <DropdownBox>
                <h3>Sort by</h3>
                <RadioGroupStyle
                  onChange={onChangeSubscription}
                  value={valueSubscription}
                >
                  {/* <RadioStyle value={1}>Order number (ascending)</RadioStyle>
                  <RadioStyle value={2}>Order number (descending)</RadioStyle> */}
                  <RadioStyle value={3} onClick={() => handleOldData()}>Date (oldest first)</RadioStyle>
                  <RadioStyle value={4} onClick={() => handleLatestData()}>Date (newest first)</RadioStyle>
                  {/* <RadioStyle value={5}>Customer name (A-Z)</RadioStyle>
                  <RadioStyle value={6}>Customer name (Z-A)</RadioStyle> */}
                  {/* <RadioStyle value={7}>Payment status (A-Z)</RadioStyle>
                  <RadioStyle value={8}>Payment status (Z-A)</RadioStyle>
                  <RadioStyle value={9}>Fulfillment status (A-Z)</RadioStyle>
                  <RadioStyle value={10}>Fulfillment status (Z-A)</RadioStyle> */}
                 
                  <RadioStyle value={11} onClick={() => handleShortLowToHighPrice()}>Total price (low to high)</RadioStyle>
                  <RadioStyle value={12} onClick={() => handleShortHighToLowPrice()}>Total price (high to low)</RadioStyle>
                </RadioGroupStyle>
              </DropdownBox>
            }
            trigger={["click"]}
          >
            <ButtonContent>
              <ButtonSaved
                block
                type="default"
                icon={<SortAscendingOutlined />}
              >
                Sort
              </ButtonSaved>
            </ButtonContent>
          </Dropdown>
        </Col>
      </Row>
    </ContentFilters>
  );
};;

const ContentFilters = styled.div`
  padding: 15px;
`;

const ButtonSaved = styled(Button)`
  margin-left: 10px;
  padding: 6px 12px;
  height: auto;
`;

const DropdownBox = styled.div`
  padding: 15px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ButtonContent = styled.div`
  width: 100%;
  padding-left: 10px;
`;

const ButtonLink = styled(Button)`
  color: #ccc;
  margin: 10px 0 0;
  padding: 0 3px;
  display: block;
`;

const RadioGroupStyle = styled(Radio.Group)`
  width: 100%;
`;

const RadioStyle = styled(Radio)`
  display: block;
  height: 30px;
  line-height: 30px;
  width: 100%;
`;

const SearchBox = styled(Search)`
  border-radius: 4px 0 0 4px;
  padding: 6px 12px 6px 35px !important;
`;

const ButtonBox = styled(Button)`
  padding: 6px 12px;
  height: auto;
  border-radius: 0;
  border-left: 0;
`;

const ButtonLast = styled(Button)`
  padding: 6px 12px;
  height: auto;
  border-radius: 0 4px 4px 0;
  border-left: 0;
`;
const TagContent = styled(Tag)`
  padding: 5px 10px;
  marginbottom: 10px;
`;
const TagsConformButtons = styled.div`
  display:flex,
`;
const SearchTags = styled.div`
margin-left: 54%;
`;

export default Filters;

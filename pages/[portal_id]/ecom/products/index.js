
import React from "react";
import { NewPageLayout } from "../../../../src/components/views";
import { ViewProducts } from "../../../../src/components/products";
import PageHeader from "../../../../src/components/PageHeader";
import styled from "styled-components";
import { Layout } from "antd";
import Link from "next/link";

const Products = () => {
  return (
    <NewPageLayout>
      <ProductContent>
        {/* <EmptyProductContent>
        <PageHeader
            PageName="Your Products"
            ImportButtonName="Import products"
            CreateButtonName="Add product"
            path="products/new"
            isData={true}
            isImport={true}
          />
          <EmptyDataContent>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
              <Message>
                Currently you do not have any products to manage.
              </Message>
              <Button type="primary" size="large">
                <Link href="products/new">
                  <a>Add product</a>
                </Link>
              </Button>
            </Empty>
          </EmptyDataContent>
          <TEPageFooter>
            Learn more about
            <Link href="#">
              <a> products.</a>
            </Link>
          </TEPageFooter>
        </EmptyProductContent> */}
        <ViewsProductContent>
          {/* <PageHeader
            PageName="Products"
            ImportButtonName="Import products"
            CreateButtonName="Add product"
            path="products/new"
            isData={true}
            isImport={true}
          /> */}
          <TitleHeader>Products</TitleHeader>
          <ViewProducts />
          {/* <TEPageFooter>
            Learn more about
            <Link href="#">
              <a> products.</a>
            </Link>
          </TEPageFooter> */}
        </ViewsProductContent>
      </ProductContent>
    </NewPageLayout>
  );
};

const ProductContent = styled.div`
  padding: 20px;
`;

const EmptyProductContent = styled.div`
  padding: 20px;
  max-width: 60rem;
  margin: 0 auto;
`;

const StyledSettingFooter = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

const ViewsProductContent = styled.div`
  max-width: 950px;
  margin: 80px auto;
  padding: 0;
`;

const EmptyDataContent = styled(Layout.Content)`
  padding: 20px;
  width: 100%;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  min-height: 50vh;
  align-items: center;
  background: white;
  box-shadow: 0px 4px 4px rgba(186, 195, 201, 0.25);
  border-radius: 5px;
`;

const Message = styled.p`
  color: #637381;
  font-size: 14px;
`;

const TitleHeader = styled.h3`
  font-size: 23px;
  color: #404950;
  font-weight: bold;
  margin-bottom: 0;
`;

export default Products;


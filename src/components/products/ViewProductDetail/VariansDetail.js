import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
// icons
import { DownOutlined } from "@ant-design/icons";
// ui
import { Button, Dropdown, Menu } from "antd";
import EditableTable from "./EditableTable";

const VariansDetail = () => {
  const variantList = [
    "All",
    "None",
    "Black",
    "Green",
    "US 4.5 - 5 | EU 36",
    "US 6 | EU 38",
    "US 7 | EU 40",
  ];
  return (
    <VariantStyle>
      <TitleStyle>
        <TextTitle>Variants</TextTitle>
        <AlignRight>
          <Link href="#">
            <ActionRight href="#">Add variant</ActionRight>
          </Link>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="0">Edit options</Menu.Item>
                <Menu.Item key="1">Reorder variants</Menu.Item>
              </Menu>
            }
          >
            <Button type="link">
              More options <DownOutlined />
            </Button>
          </Dropdown>
        </AlignRight>
      </TitleStyle>

      <Filters>
        Select:{" "}
        {variantList &&
          variantList.length > 0 &&
          variantList.map((item, i) => (
            <Button type="link" key={i}>
              {item}
            </Button>
          ))}
      </Filters>
      <EditableTable />
    </VariantStyle>
  );
};

const Filters = styled.div`
  padding: 0 24px 24px;
`;

const AlignRight = styled.div`
  text-align: right;
  width: 202px;
`;

const VariantStyle = styled.div`
  background: #fff;
`;

const TextTitle = styled.span`
  width: calc(100% - 202px);
`;

const TitleStyle = styled.h3`
  overflow: hidden;
  font-weight: bold;
  font-size: 18px;
  color: #222;
  padding: 10px 24px;
  display: inline-flex;
  align-items: center;
  width: 100%;
`;

const ActionRight = styled.a`
  font-size: 14px;
  font-weight: 400;
`;

export default VariansDetail;

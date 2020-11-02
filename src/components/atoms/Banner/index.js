import React from 'react';
import styled from 'styled-components';
import { Typography } from "antd";
const { Title, Text } = Typography;

const Banner = ({title, description, image, backgroundColor}) => {
    return (
        <BannerContainer backgroundColor={backgroundColor}>
            <BannerContent>
                <BannerTitle>{title}</BannerTitle>
                <BannerDescription>{description}</BannerDescription>
            </BannerContent>
            <BannerImage>{image}</BannerImage>
        </BannerContainer>);
};

const BannerContainer = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    padding-right: 50px;
    padding-left: 39px;
    background-color: ${props => props.backgroundColor || "white"};
`;

const BannerContent = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const BannerTitle = styled(Title)`
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: bold!important;
    font-size: 37px!important;
    line-height: 37px!important;
    color: #413604!important;
`;

const BannerDescription = styled(Text)`
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 150%;
    color: #413604;
`;

const BannerImage = styled.div`
    display: flex;
    align-items: center;
`;

export default Banner;

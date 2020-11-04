import React from 'react';
import styled from 'styled-components';
import { Typography, Button } from "antd";
const { Text } = Typography;

const HomeLinkButton = ({title, onClick, image, backgroundColor}) => {
    return (
        <ButtonContainer>
            <ButtonContent onClick={onClick} backgroundColor={backgroundColor}>
                {image}
            </ButtonContent>
            <ButtonTitle>{title}</ButtonTitle>
        </ButtonContainer>
        );
};

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 50px;
`;

const ButtonContent = styled(Button)`
    background-color: ${props => props.backgroundColor || "white"};
    width: 100px;
    height: 100px;
    border-radius: 10px;
    margin-bottom: 10px;
    &:hover {
        background-color: ${props => props.backgroundColor || "white"}!important;
        opacity: 0.8;
        box-shadow: 0px 0px 25px #989898;
    }
`;

const ButtonTitle = styled(Text)`
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #404950;
`;

export default HomeLinkButton;

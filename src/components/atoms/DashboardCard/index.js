import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography, Button } from "antd";
import { Line } from 'react-chartjs-2';
const { Text } = Typography;

const DashboardCard = ({ title, subtitle, onClick, image, count, view, chartData, type = 'blog', isNew = false }) => {
    let unit = type == 'blog' ? 'posts' : type == 'page' ? 'followers' : 'orders';

    const data = {
        datasets: [
            {
                fill: false,
                borderColor: '#44BA76',
                pointBorderWidth: 2,
                pointRadius: 1,
                data: chartData,
            }
        ]
    }

    const options = {
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                display: false
            }],
            xAxes: [{
                display: false
            }]
        },
        tooltips: {
            enabled: false
        }
    }
    if (isNew) {
        var ButtonContent = (
            <AddBlog onClick={onClick}>
                <img src={'/images/new.svg'} />
                <NewTitle paddingTop={10}>Create</NewTitle>
            </AddBlog>
        )
    } else {
        var ButtonContent = (
            <Blog onClick={onClick}>
                <BlogImage>
                    {image}
                </BlogImage>
                <NewTitle paddingTop={15}>{title}</NewTitle>
                <SubTitle>{subtitle}</SubTitle>
                <div className="chart-box">
                    <Line
                        data={data}
                        options={options}
                        height={50}
                    />
                </div>
                <div className="chart-detail">
                    <DetailText>Try Insights for Free</DetailText>
                </div>
                <BlogInformation>
                    <BlogText><img src={'/images/icon_eye.svg'} />{view}</BlogText>
                    <BlogText>{count} {unit}</BlogText>
                </BlogInformation>
            </Blog>
        )
    }
    return ButtonContent;
};

const NewTitle = styled(Text)`
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 18px;
    color: #404950;
    padding-top: ${props => props.paddingTop}px;
`;

const SubTitle = styled(Text)`
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #404950;
    padding-top: 10px;
`;

const BlogImage = styled.div`
    height: 50px;
    width: 50px;
    border-radius: 10px;
    overflow: hidden;
    img {
        height: 50px;
        width: 50px;
    }
`;

const BlogInformation = styled.div`
    width: 100%;
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const AddBlog = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 300px;
    height: 295px;
    padding: 0;
    border-radius: 10px;
    border: none;
    overflow: hidden;
    box-shadow: 0px 2px 8px rgba(64, 73, 80, 0.15);
    &:hover {
        opacity: 0.8;
        box-shadow: 0px 38px 100px rgba(64, 73, 80, 0.15);
    }
    @media (max-width: 450px) {
        margin: 20px auto;
    }
`;

const Blog = styled(Button)`
    width: 300px;
    height: 295px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px;
    margin-right: 25px;
    overflow: hidden;
    border: none;
    box-shadow: 0px 2px 8px rgba(64, 73, 80, 0.15);
    .chart-box {
        height: 60px;
        width: 100%;
        margin-top: 30px;
        display: block;
    }
    .chart-detail {
        height: 60px;
        width: 100%;
        margin-top: 30px;
        background: #E5F4FE;
        border-radius: 5px;
        display: none;
    }
    &:hover {
        opacity: 0.8;
        box-shadow: 0px 38px 100px rgba(64, 73, 80, 0.15);
        .chart-box {
            display: none;
        }
        .chart-detail {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    @media (max-width: 450px) {
        margin: 20px auto;
    }
`;

const BlogText = styled(Text)`
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #404950;
    img {
        margin-right: 5px;
    }
`;

const DetailText = styled(Text)`
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    color: #0095F8;
`;

export default DashboardCard;

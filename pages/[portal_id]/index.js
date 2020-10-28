import { Button } from 'antd'
import styled from "styled-components"
import React from 'react'
import { useRouter } from "next/router"
import { getUserData } from '../../src/utils'

const Index = () => {
    let userData = getUserData()
    const router = useRouter()

    const handleDefaultAction = (url) => {
        // console.log('url', url);
        router.push(`/[portal_id]/${url}`, { pathname: `/${userData?.uniqueID}/${url}` }, { shallow: true });
        localStorage.setItem('channelName', url === 'ecom' ? 'Ecommerce' : 'stories')
    }

    return (
        <NewContent>
            <DefaultPortal>
                <Button className="default-page-button" size="large" onClick={() => handleDefaultAction('stories')}>
                    Stories
                </Button>
                <Button className="default-page-button" size="large" onClick={() => handleDefaultAction('ecom')}>
                    E-commerce
                </Button>
            </DefaultPortal>
        </NewContent>
    )
}
const NewContent = styled.div`
  width: 100%;
`;
const DefaultPortal = styled.div`
  display: flex;
  align-item: center;
  margin: 0px auto;
  justify-content: center;
  padding-top: 60px;
  .default-page-button {
    margin-right: 15px;
  }
`;

export default Index 
import { Button, message } from 'antd'
import styled from "styled-components"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import { getUserData } from '../../src/utils'
import InviteUserPopup from '../../src/components/commanComponents/inviteUserPopup'
import { useDispatch, useSelector } from "react-redux";
import { clearStatus, userInvitation } from '../../src/redux/actions/users'

const Index = () => {
    let Dispatch = useDispatch()
    let userData = getUserData()
    const router = useRouter()
    const [isOpenDeleteSelected, setShowMDDeleteSelected] = useState(false);
    const apiStatus = useSelector(state => state.usersReducer.status)
    useEffect(() => {
        if (apiStatus === "success") {
            clearStatus()
            setShowMDDeleteSelected(false)
            message.success("Send user invitation successfully.")
        } else if (apiStatus === "fail") {
            message.error("Something wrong please check")
        }
    }, [apiStatus])
    const handleDefaultAction = (url) => {
        router.push(`/[portal_id]/${url}`, { pathname: `/${userData?.uniqueID}/${url}` }, { shallow: true });
        localStorage.setItem('channelName', url === 'ecom' ? 'Ecommerce' : 'stories')
    }
    const onShowMdDeleteSelected = (value) => {
        setShowMDDeleteSelected(value);
    };
    const onDeleteSelected = (value) => {
        Dispatch(userInvitation(value, userData?.ID))
    };

    return (
        <NewContent>
            <DefaultPortal>
                <Button className="default-page-button" size="large" onClick={() => handleDefaultAction('stories')}>
                    Stories
                </Button>
                <Button className="default-page-button" size="large" onClick={() => handleDefaultAction('ecom')}>
                    E-commerce
                </Button>
                <Button className="default-page-button" size="large" onClick={() => setShowMDDeleteSelected(true)}>
                    Invite User
                </Button>
                {
                    isOpenDeleteSelected && <InviteUserPopup
                        onCancel={onShowMdDeleteSelected}
                        onDelete={(value) => onDeleteSelected(value)}
                        isOpen={isOpenDeleteSelected}
                        buttonText="Invite"
                    />
                }

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
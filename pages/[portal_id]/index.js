import { Row, message, Typography } from 'antd'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getUserData } from '../../src/utils'
import InviteUserPopup from '../../src/components/commanComponents/inviteUserPopup'
import { LayoutWithNoSidebar } from '../../src/components/views'
import { Banner, HomeLinkButton } from '../../src/components/atoms'
import { useDispatch, useSelector } from 'react-redux'
import { clearStatus, userInvitation } from '../../src/redux/actions/users'

const { Title } = Typography

const Index = () => {
    let Dispatch = useDispatch()
    let userData = getUserData()
    const router = useRouter()
    const [isOpenDeleteSelected, setShowMDDeleteSelected] = useState(false)
    const apiStatus = useSelector(state => state.usersReducer.status)
    useEffect(() => {
        if (apiStatus === 'success') {
            clearStatus()
            setShowMDDeleteSelected(false)
            message.success('Send user invitation successfully.')
        } else if (apiStatus === 'fail') {
            message.error('Something wrong please check')
        }
    }, [apiStatus])
    const handleDefaultAction = url => {
        router.push(
            `/[portal_id]/${url}`,
            { pathname: `/${userData?.uniqueID}/${url}` },
            { shallow: true }
        )
        localStorage.setItem(
            'channelName',
            url === 'ecom' ? 'Ecommerce' : 'blogs'
        )
    }
    const onShowMdDeleteSelected = value => {
        setShowMDDeleteSelected(value)
    }
    const onDeleteSelected = value => {
        Dispatch(userInvitation(value, userData?.ID))
    }

    return (
        <LayoutWithNoSidebar>
            <Banner
                title='Create. Share. Sell.'
                description='Unleash your creativity. Whether you want to share some stories or sell your products, the choice is yours.'
                image={<img alt='unfulied' src='/images/home-banner.png' />}
                backgroundColor='#FFE000'
            ></Banner>
            <Title1>For you</Title1>
            <ButtonBlock>
                <HomeLinkButton
                    title='Blogs'
                    backgroundColor='#E84118'
                    onClick={() => handleDefaultAction('blogs/')}
                    image={<img alt='unfulied' src='/images/home-stories.svg' />}
                ></HomeLinkButton>
                <HomeLinkButton
                    title='Ecommerce'
                    backgroundColor='#00A8FF'
                    onClick={() => handleDefaultAction('ecom')}
                    image={<img alt='unfulied' src='/images/home-ecommerce.svg' />}
                ></HomeLinkButton>
                <HomeLinkButton
                    title='Pages'
                    backgroundColor='#4EEC91'
                    onClick={() => handleDefaultAction('pages/')}
                    image={<img alt='unfulied' src='/images/home-pages.svg' />}
                ></HomeLinkButton>
                {isOpenDeleteSelected && (
                    <InviteUserPopup
                        onCancel={onShowMdDeleteSelected}
                        onDelete={value => onDeleteSelected(value)}
                        isOpen={isOpenDeleteSelected}
                        buttonText='Invite'
                    />
                )}
            </ButtonBlock>
        </LayoutWithNoSidebar>
    )
}

const ButtonBlock = styled(Row)`
  margin-top: 30px;
`

const Title1 = styled(Title)`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold !important;
  font-size: 22px !important;
  line-height: 22px !important;
  color: #404950 !important;
  margin-top: 50px !important;
`

export default Index

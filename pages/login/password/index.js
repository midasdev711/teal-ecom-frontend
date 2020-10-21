import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { compose } from 'redux';
import { withApollo, useLazyQuery } from 'react-apollo';
import { connect, useDispatch } from 'react-redux';

// import { KEY_SESSION_USER } from '../../../src/utils/constants';
import { InputText, TLogo } from '../../../src/components/atoms';

// actions
import { login } from '../../../src/redux/actions/users';

import { notification, Form, Typography, Button, Row } from 'antd';

const openNotification = errorMessage => {
	notification.error({
		message: 'Error',
		description: <div>{errorMessage}</div>,
	});
};

const InputPasswordForm = props => {
	const router = useRouter();
	const dispatch = useDispatch();
	// const [authUser, { loading, data, error }] = useLazyQuery(LOGIN_USER_QUERY);
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (props.isLogin) {
			setLoading(false)
			let userPortalId = JSON.parse(localStorage.getItem("userData"))
			console.log('userPortalId', userPortalId?.uniqueID)
			router.push("/[portal_id]/ecom", { pathname: `/${userPortalId?.uniqueID}/ecom` }, { shallow: true });
		}
	}, [props.isLogin]);

	useEffect(() => {
		if (props.errorMsg) {
			setLoading(false)
			notification.error({
				message: 'Error',
				description: props.errorMsg,
			})
		}
	}, [props.errorMsg]);

	const onFinish = async values => {
		setLoading(true)
		const { password } = values;
		await props.login(props.email, password);
	};

	return (
		<Pannel>
			<Form name="normal_login" className="login-form" initialValues={{ remember: false }} onFinish={onFinish}>
				<TLogo />
				<AdjustRow>
					<LoginTitle>Welcome back!</LoginTitle>
					<Link href="/recover">
						<LinkText fontSize={13}>Log in issues?</LinkText>
					</Link>
				</AdjustRow>
				<Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
					<InputText
						type="password"
						placeholder="Password"
						onChange={e => {
							setPassword(e.target.value);
						}}
					/>
				</Form.Item>

				<Form.Item>
					<ContinuButton
						type="primary"
						htmlType="submit"
						loading={loading}
						disabled={password === ''}
						className="login-form-button"
					>
						Continue
					</ContinuButton>
				</Form.Item>
			</Form>
			<CenteredRow>
				<Link href="/signup">
					<SignupLinkText>Sign up</SignupLinkText>
				</Link>
				or continue with <LinkText>Phone</LinkText> / <LinkText>Facebook</LinkText> /{' '}
				<LinkText>Google</LinkText>
			</CenteredRow>
			<BottomSection></BottomSection>
			<CenteredRow>
				<AppLinkButton>
					<ButtonIcon src="/images/icon_ios.svg" />
				</AppLinkButton>
				<AppLinkButton>
					<ButtonIcon src="/images/icon_android.svg" />
				</AppLinkButton>
			</CenteredRow>
			<CenteredRow>
				By continuing, you agree to Juicy Pie’s{' '}
				<Link href="/terms">
					<LinkText>Terms & Privacy</LinkText>
				</Link>
			</CenteredRow>
		</Pannel>
	);
};

const Pannel = styled.div`
	width: 350px;
	margin: 0 auto;
	padding-top: 235px;
	@media only screen and (max-width: 451px) {
		padding-top: 86px;
	}
`;

const LinkText = styled.a`
	font-size: ${props => (props.fontSize ? props.fontSize + 'px' : '15px')};
	text-decorator: none;
	color: #788995;
	padding: 0 3px;
`;

const SignupLinkText = styled(LinkText)`
	color: #0095f8;
`;

const AdjustRow = styled(Row)`
	display: flex;
	margin: 10px 0 15px 0;
	justify-content: space-between;
	text-align: center;
	font-size: 15px;
	line-height: 145%;
	color: #788995;
`;

const LoginTitle = styled(Typography.Text)`
	font-weight: bold;
	font-size: 17px;
	line-height: 17px;
	color: rgba(64, 73, 80, 0.95);
`;

const CenteredRow = styled(AdjustRow)`
	justify-content: center;
`;

const BottomSection = styled.div`
	margin-top: 52px;
	@media only screen and (max-width: 451px) {
		margin-top: 159px;
	}
`;

const ContinuButton = styled(Button)`
	width: 100%;
	background: #80cafb !important;
	border: none;
	height: 40px;
	border-radius: 5px;
	font-weight: bold;
	font-size: 15px;
	line-height: 15px;
	text-align: center;
	color: rgba(255, 255, 255, 0.7);
`;

const AppLinkButton = styled.a`
	text-decorator: none;
	margin: 4px;
`;

const ButtonIcon = styled.img`
	object-fit: cover;
	height: 31px;
`;

const mapStateToProps = store => {
	return {
		email: store.usersReducer.email,
		isLogin: store.usersReducer.isLogin,
		userData: store.usersReducer.userData,
		errorMsg: store.usersReducer.errorMsg,
	};
};

const mapDispatchToProps = {
	login,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputPasswordForm);

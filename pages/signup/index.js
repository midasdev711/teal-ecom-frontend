import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { connect, useDispatch } from 'react-redux';

import { InputText, TELogo } from '../../src/components/atoms';
import { validateEmail } from '../../src/utils';

// actions
import { signup } from '../../src/redux/actions/users';

// ui
import { Form, Typography, Button, Row, notification } from 'antd';

const openNotification = errorMessage => {
	notification.error({
		message: 'Error',
		description: <div>{errorMessage}</div>,
	});
};

const SignupForm = props => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [formData, setFormData] = useState();
	const [emailExist, setEmailExist] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (props.isSignup) {
			router.push('/login');
		}
	}, [props.isSignup]);

	useEffect(() => {
		if (props.errorMsg) {
			notification.error({
				message: 'Error',
				description: props.errorMsg,
			});
		}
	}, [props.errorMsg]);

	const onFinish = async values => {
		await props.signup(values.email, values.password, values.name , values.mobileNo);
	};

	const handleSocialRegister = type => {};

	return (
		<Pannel>
			<Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
				<TELogo />
				<AdjustRow>
					<FormTitle>Create your Juicy Pie account</FormTitle>
				</AdjustRow>
				<Form.Item name="name" rules={[{ required: true, message: 'Please input your Full Name!' }]}>
					<InputText placeholder="Full Name" />
				</Form.Item>
				<Form.Item name="mobileNo" rules={[{ required: true, message: 'Please input your mobile number!' }]}>
					<InputText type="text" placeholder="Mobile Number" />
				</Form.Item>
				<Form.Item
					name="email"
					type="email"
					rules={[
						{ required: true, message: 'Please input your Email Address!' },
						({ getFieldValue }) => ({
							validator(rule, value) {
								const isValideEmail = validateEmail(value);
								if (!emailExist && isValideEmail) {
									return Promise.resolve();
								} else if (!isValideEmail) {
									return Promise.reject('Please enter valid email!');
								} else {
									return Promise.reject('Email already exist!');
								}
							},
						}),
					]}
				>
					<InputText placeholder="Email" onChange={() => setEmailExist(false)} />
				</Form.Item>
				<Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
					<InputText type="password" placeholder="Password" />
				</Form.Item>

				<Form.Item>
					<ContinuButton type="primary" htmlType="submit" className="login-form-button" loading={loading}>
						Continue
					</ContinuButton>
				</Form.Item>
			</Form>
			<CenteredRow>
				<Link href="/login">
					<LoginLinkText>Log in</LoginLinkText>
				</Link>
				or continue with <LinkText>Phone</LinkText> /{' '}
				<LinkText onClick={e => handleSocialRegister('facebook')}>Facebook</LinkText> /{' '}
				<LinkText onClick={e => handleSocialRegister('google')}>Google</LinkText>
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
	padding-top: 142px;
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

const LoginLinkText = styled(LinkText)`
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

const FormTitle = styled(Typography.Text)`
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
		isSignup: store.usersReducer.isSignup,
		errorMsg: store.usersReducer.errorMsg,
	};
};

const mapDispatchToProps = {
	signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);

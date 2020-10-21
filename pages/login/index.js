import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Form, Row, Typography } from 'antd';
import { compose } from 'redux';
import { useDispatch, connect } from 'react-redux';
import { withApollo } from 'react-apollo';
// import { setUserEmail } from '../../src/redux/actions';
import { InputText, TLogo } from '../../src/components/atoms';
import { validateEmail } from '../../src/utils';
// actions
import { setUserEmail } from '../../src/redux/actions/users'

const InputEmailForm = props => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [useid, setUserid] = useState('');
  const [submitable, setSubmitable] = useState(false);

  const onFinish = async (values) => {
    const { email } = values;
    console.log(email)
    await props.setUserEmail(email);
    // await dispatch(setUserEmail(values.email));
    router.push('/login/password');
  };

  const handleChangeInput = (event) => {
    const changedValue = event.target.value;
    setUserid(changedValue);

    if (validateEmail(changedValue)) {
      setSubmitable(true);
    }
  };

  return (
    <Pannel>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <TLogo />
        <AdjustRow>
          <LoginTitle>Access Juicy Pie</LoginTitle>
          <Link href='/recover'>
            <LinkText fontSize={13}>Log in issues?</LinkText>
          </Link>
        </AdjustRow>
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <InputText
            onChange={handleChangeInput}
            value={useid}
            placeholder='Email or username'
          />
        </Form.Item>

        <Form.Item>
          <ContinuButton
            type='primary'
            htmlType='submit'
            className='login-form-button'
            disabled={!submitable}
          >
            Continue
          </ContinuButton>
        </Form.Item>
      </Form>
      <CenteredRow>
        <Link href='/signup'>
          <SignupLinkText>Sign up</SignupLinkText>
        </Link>
        or continue with <LinkText>Phone</LinkText> /{' '}
        <LinkText>Facebook</LinkText> / <LinkText>Google</LinkText>
      </CenteredRow>

      <CenteredRow>
        <AppLinkButton>
          <ButtonIcon src='/images/icon_ios.svg' />
        </AppLinkButton>
        <AppLinkButton>
          <ButtonIcon src='/images/icon_android.svg' />
        </AppLinkButton>
      </CenteredRow>
      <CenteredRow>
        By continuing, you agree to Juicy Pie’s{' '}
        <Link href='/terms'>
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
  font-size: ${(props) => (props.fontSize ? props.fontSize + 'px' : '15px')};
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

// export default compose(
//   connect((state) => state, {}),
//   withApollo
// )(InputEmailForm);

const mapStateToProps=  store => {
  return {
    email: store.usersReducer.email
  }
}

const mapDispatchToProps = {
  setUserEmail
}

export default connect(mapStateToProps, mapDispatchToProps)(InputEmailForm)
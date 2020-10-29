import React, { useEffect, useState } from "react";
import styled from "styled-components";
// ui
import { Modal, Button, Input } from "antd";

const InviteUserPopup = props => {
  const { isOpen, onCancel, onDelete, count, name, message, buttonText } = props;
  const [errorFlag, setErrorFlag] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const handleChange = (e) => {
    const { value } = e.target
    let data = emailValidation(value)
    setErrorFlag(!data)
    setEmail(value)
  }
  const emailValidation = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email.toLowerCase());
  }
  useEffect(() => {
    email !== "" ? setEmail("") : null
    errorFlag ? setErrorFlag(false) : null
  }, [])
  return (
    <Modal
      title={`User Invitation`}
      centered
      visible={isOpen}
      footer={
        <FooterCustom>
          <Button onClick={() => onCancel(false)}>Cancel</Button>
          {
            errorFlag || email === "" ? (<Button type="primary" danger onClick={onDelete} disabled>
              {buttonText}
            </Button>) : (<Button type="primary" danger onClick={() => onDelete(email)}>
              {buttonText}
            </Button>)
          }

        </FooterCustom>
      }
      onOk={() => onCancel(false)}
      onCancel={() => onCancel(false)}
    >
      <DescriptionForm>
        {/* {message} */}
        <label>Email:</label>
        <Input name="email" type="email" onChange={(event) => handleChange(event)} placeholder="Enter email address" />
        {
          errorFlag ? <label style={{ color: "red" }} >{`${email === "" ? ("Email required") : ("Please enter valid email")}`}</label> : null
        }
      </DescriptionForm>
    </Modal>
  );
};

const DescriptionForm = styled.p`
  font-size: 14px;
  margin-bottom: 15px;
`;

const FooterCustom = styled.div`
  text-align: right;
`;

export default InviteUserPopup;
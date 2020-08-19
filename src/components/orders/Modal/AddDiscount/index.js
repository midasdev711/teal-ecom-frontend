import React from "react";
import styled from "styled-components";

const AddDiscount = () => {
  return (
    <DiscountPopover>
      <DiscountBy>
        <p className="name-discount-blog">Discount this order by</p>
        <PopoverButton className="popover-button">
          <button className="popover-button-1">$</button>
          <button className="popover-button-2">%</button>
          <input className="inpuy-div" type="text" placeholder="$ 0.00" />
        </PopoverButton>
        <div className="Reason">
          <p className="name-reason">Reason</p>
          <input
            className="loyalty-name"
            type="text"
            placeholder="Damaged item, loyalty discount"
          />
        </div>
        <div className="border-set"></div>
        <ButtonDiscount>
          <div className="close-buton">
            <button>Close</button>
          </div>
          <div className="apply-buton">
            <button>apply</button>
          </div>
        </ButtonDiscount>
      </DiscountBy>
    </DiscountPopover>
  );
};

const DiscountPopover = styled.div`
  width:329px;
  padding:14px;
  background-color:  rgba(255,255,255,0.98);
  box-shadow: 0 2px 7px 1px rgba(39,44,48,0.16);
  border-radius:3px;

  & .name-discount-blog{
    font-size: 14px;
    font-weight: 400;
    color: #212b36;
    margin-bottom: 2px;
  }

  & .border-set{
    border-top:1px solid #dfe3e8;
    margin:14px -14px 14px -14px;
  }
}
`;

const ButtonDiscount = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & .close-buton {
    & button {
      border: 1px solid #c4cdd5;
      font-size: 14px;
      color: #212b36;
      padding: 9px 15px;
      background: #fff;
      border-radius: 3px;
    }
  }
  & .apply-buton {
    & button {
      border: 1px solid #bac0e6;
      font-size: 14px;
      color: #fff;
      padding: 9px 15px;
      background: #bac0e6;
      border-radius: 3px;
    }
  }
`;

const DiscountBy = styled.div`
  & .Reason {
    padding-top: 15px;
    & .name-reason {
      font-size: 14px;
      font-weight: 400;
      color: var(--p-text, #212b36);
      margin-bottom: 2px;
    }
    & .loyalty-name {
      border: 1px solid #c4cdd5;
      outline: none;
      padding: 4px 9px;
      width: 100%;
    }
  }
`;

const PopoverButton = styled.div`
  border: 1px solid #c4cdd5;
  width: 69%;
  display: flex;
  & button.popover-button-1 {
    font-size: 14px;
    background: #fff;
    border: none;
    width: 50px;
    border-right: 1px solid #c4cdd5;
    height: 32px;
  }
  button.popover-button-2 {
    font-size: 14px;
    background: #fff;
    border: none;
    width: 50px;
    border-right: 1px solid #c4cdd5;
    height: 32px;
  }
  .inpuy-div {
    outline: none;
    box-shadow: none;
    border: none;
    padding-left: 10px;
    width: 100%;
  }
`;

export default AddDiscount;

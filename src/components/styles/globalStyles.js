import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  body {
    margin: 0px;
    font-family: Proxima Nova;
    font-weight: normal;
    font-size: 16px;
  }
  .ant-tabs{
    .ant-tabs-nav{
      padding: 0 15px !important;
      margin-bottom: 0px;
      .ant-tabs-nav-list{
        width: 100%;
        .ant-tabs-tab{
          padding: 15px;
        }
        .ant-tabs-ink-bar{
          background: #0095f8;
          height: 3px;
        }
      }
    }
    .ant-tabs-content{
    }
  }
  .ant-table-wrapper{
    .ant-pagination{
      margin-right: 24px;
    }
  }
  .ant-input-search {
    padding-left: 45px;
    .ant-input-suffix{
      position: absolute;
      left: 0;
      margin: 0;
      top: 8px;
      font-size: 18px;
      .ant-input-search-icon{
        margin: 0;
        &::before{
          border: none;
        }
      }
    }
  }
  .ant-drawer-right{
    .ant-drawer-mask{
      background: none;
    }
    .ant-drawer-content-wrapper{
      width: 400px !important;
    }
    .ant-drawer-body{
      padding: 15px 0;
      .ant-collapse-item{
        border: none;
        .ant-collapse-header{
          padding: 10px 15px;
          color: #000;
        }
        .ant-collapse-content{
          border:none;
          border-bottom: 1px solid #d9d9d9;
        }
      }
      .ant-collapse-item-active{
        .ant-collapse-header{
        }
      }
    }
  }
  .ant-popover-inner-content{
    ${'' /* padding: 0; */}
  }
  .ProseMirror {
    font-family: Proxima Nova;
    padding-bottom: 50px;
    .selected {
      background-color: transparent;
    }
  }
  .smartblock-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
  }
  .smartblock-menu {
    // left: -35px!important;
  }
  .smartblock-inline-menu-arrow {
    left: 40px!important;
  }
  .smartblock-edit-menu {
    width: 135px;
    height: 45px;
    border-radius: 3px;
    background-color: white;
    box-shadow: 0 3px 40px 8px rgba(116, 116, 116, 0.2);
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .smartblock-inline-menu-inner {
    width: 205px;
    height: 45px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .smartblock-menu-top {
    display: flex;
    .smartblock-btn {
      background-color: transparent;
    }
  }
  .smartblock-menu:before {
    display: none;
  }
  .smartblock-menu {
    background-color: transparent;
    box-shadow: none;
  }
  .smartblock-container {
    width: 750px;
  }
`;

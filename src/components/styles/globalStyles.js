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
    padding-left: 0;
    padding-right: 0;
    .selected {
      background-color: transparent;
    }
    p {
      font-size: 18px;
      color: #313649;
    }
    h1 {
      font-size: 26px;
      color: #404950;
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
    width: 135px;
    height: 45px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .smartblock-menu-top {
    display: flex;
    .smartblock-btn {
      // background-color: #f0f0f0;
      // border-radius: 50%;
    }
  }
  .smartblock-menu:before {
    // display: none;
  }
  .smartblock-menu {
    // background-color: transparent;
    // box-shadow: none;
  }
  .smartblock-container {
    padding-left: 100px;
    padding-right: 100px;
    padding-top: 150px;
    background: white;
    border-radius: 10px;
  }
  .ant-tabs{
    .ant-tabs-nav{
      &::before{
        border: none;
      }
      padding: 0 !important;
      .ant-tabs-nav-wrap{
        .ant-tabs-nav-list{
          .ant-tabs-tab{
            padding: 10px 0;
            margin-right: 20px;
            .ant-tabs-tab-btn{
              font-family: Proxima Nova;
              font-style: normal;
              font-weight: normal;
              font-size: 14px;
              line-height: 20px;
              /* or 20px */


              color: #404950;
            }
          }
          .ant-tabs-tab-active{
            .ant-tabs-tab-btn{
              font-family: Proxima Nova;
              font-style: normal;
              font-weight: bold;
              font-size: 14px;
              line-height: 20px;
              /* or 20px */

              text-align: center;

              color: #0095F8;
            }
          }
          .ant-tabs-ink-bar{
            height: 2px;
            background: #0095F8;
          }
        }
      }
      .ant-tabs-extra-content{
        .ant-btn{
          margin-right: 7px;
        }
      }
    }
  }
  .ant-table{
    .ant-table-thead > tr > th {
      background: #EEF1F2;
      font-family: Proxima Nova;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: #404950;
      padding: 1px 0;
    }
  }
  .ant-badge-status-dot{
    width: 10px;
    height: 10px;
  }
`;

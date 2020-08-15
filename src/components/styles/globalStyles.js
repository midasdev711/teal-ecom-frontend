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
  .ant-popover-inner-content {
    padding: 10px 0  !important;
  }

  .ant-popover-placement-bottom {
    left: 1232px !important;
    top: 320px !important;
  }
`;

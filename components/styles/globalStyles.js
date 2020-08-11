import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    margin: 0px;
    font-family: Proxima Nova;
    font-weight: normal;
    font-size: 16px;
  }
  .ant-select-selector {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }
`;

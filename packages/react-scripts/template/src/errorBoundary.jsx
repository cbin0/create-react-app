import React from 'react'
import fundebug from "fundebug-javascript"

fundebug.apikey = "e8fe7493276ea7b5f3c74d1e405d9623b2d5bbe0a266e5893d616f92ebc0a81f";


export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    // 将component中的报错发送到Fundebug
    fundebug.notifyError(error, {
      metaData: {
        info: info,
        VERSION: VERSION,
        COMMITHASH: COMMITHASH,
        BRANCH: BRANCH,
        UPTIME: UPTIME,
      }
    });
  }

  render() {
    if (this.state.hasError) {
      return null
      // 也可以在出错的component处展示出错信息
      // return <h1>出错了!</h1>;
    }
    return this.props.children;
  }
}

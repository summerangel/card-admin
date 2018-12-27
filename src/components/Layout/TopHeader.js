import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import { getStorage, removeStorage } from '../../modules/utils';
import './TopHeader.scss';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class TopHeader extends Component {
  state = {
    user: JSON.parse(localStorage.getItem('user')) || {},
  };
  logout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a href="javascript:;" onClick={this.logout}>
            退出
          </a>
        </Menu.Item>
      </Menu>
    );
    const { user } = this.state;
    return (
      <Header className="header">
        <Dropdown overlay={menu} className="header-login-user">
          <span style={{ color: '#fff' }}>
            <Icon type="user" />
            {user && user.name || '测试账号'}
            <Icon type="down" />
          </span>
        </Dropdown>
        <div className="logo">
          <Link to="/">
            {/*<img src="data:image/png;base64,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" />*/}
             <div className="logo_text">卡管理后台系统</div>
          </Link>
        </div>
      </Header>
    );
  }
}
TopHeader.propTypes = {
  user: PropTypes.object,
};
export default TopHeader;

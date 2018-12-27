import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { request, api, msg } from '../../modules/request';
import { Common } from '../../modules/common';

const { Sider } = Layout;
const { SubMenu } = Menu;

class SiderBar extends Component {
  static propTypes = {
    items: PropTypes.array,
    currentKey: PropTypes.string,
  };
  static defaultProps = {
    items: [],
    currentKey: 1,
  };
  state = {
    user: localStorage.getItem('user') || {},
    menuData: [
      {
        code: 'card',
        id: 0,
        children: [
          {
            code: 'card',
            id: 1,
            name: '场景设置',
            url: '/card/index',
          },
        ],
        name: '场景',
        url: '/card/index',
      },
      {
        code: 'card',
        id: 2,
        children: [
          {
            code: 'card',
            id: 3,
            name: '权益管理',
            url: '/card/index',
          },
          {
            code: 'card',
            id: 4,
            name: '生成规则',
            url: '/card/index',
          },
        ],
        name: '权益',
        url: '/card/index',
      },
      {
        code: 'card',
        id: 5,
        children: [
          {
            code: 'card',
            id: 6,
            name: '类型管理',
            url: '/card/card-type',
          },
          {
            code: 'card',
            id: 7,
            name: '级别设置',
            url: '/card/card-class',
          },
          {
            code: 'card',
            id: 8,
            name: '会员卡查询',
            url: '/card/card-search',
          },
        ],
        name: '卡管理',
        url: '',
      },
      {
        code: 'card',
        id: 9,
        children: [
          {
            code: 'card',
            id: 10,
            name: '账户类型',
            url: '/card/index',
          },
          {
            code: 'card',
            id: 11,
            name: '会计科目',
            url: '/card/index',
          },
          {
            code: 'card',
            id: 12,
            name: '记账规则',
            url: '/card/index',
          },
        ],
        name: '账户管理',
        url: '/card/index',
      },
    ],
    currentKey: 1,
  };

  componentDidMount() {
    this.setState({ currentKey: this.props.currentKey });
  }

  handleClick = (e) => {
    let key = e.key;
    if (key.indexOf('sub') > -1) return;
    this.setState({
      currentKey: key,
    });
  };

  render() {
    const { menuData } = this.state;
    return (
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[this.state.currentKey]}
          defaultSelectedKeys={[1]}
          onClick={this.handleClick.bind(this)}
          style={{ height: '100%', borderRight: 0 }}
        >
          {menuData.map((item, index) => {
            if (item.children.length > 0) {
              const childItems = item.children.map((node) => {
                return (
                  <Menu.Item key={node.id}>
                    <Link to={node.url} replace>
                      {node.name}
                    </Link>
                  </Menu.Item>
                );
              });
              return (
                <SubMenu key={'sub-' + item.id} title={<span>{item.name}</span>}>
                  {childItems}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item key={index}>
                  <Link to={item.url} replace>
                    {item.name}
                  </Link>
                </Menu.Item>
              );
            }
          })}
        </Menu>
      </Sider>
    );
  }
}
export default SiderBar;

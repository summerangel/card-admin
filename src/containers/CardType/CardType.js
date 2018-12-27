/**
 * Created by summer on 2018/12/27.
 */
import React, { Component } from 'react';
import { Select, Table, DatePicker, Button } from 'antd';
import { isEmpty } from 'lodash';

import EBreadcrumb from '../../components/Breadcrumb/EBreadcrumb';
import api, { request } from '../../modules/request';

import './CardType.scss';

const Option = Select.Option;
const tableTitle = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '编码',
    dataIndex: 'code',
    key: 'code',
  },
];
export default class CardType extends Component {
  state = {
    breadData: [
      {
        path: '/task/index',
        name: '卡管理',
      },
      {
        path: '/task/index',
        name: '类型管理',
      },
    ],
    cardList: [],
  };

  componentDidMount() {
    this.fetchCardType();
  }

  fetchCardType = () => {
    request
      .post(api.GW_INTERACT_API, {
        serviceName: 'queryCardTypes',
      })
      .then((res) => {
        console.log(res);
        this.setState({
          cardList: res,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { breadData, cardType, cardList } = this.state;
    return (
      <div className="card-type-wrapper">
        <EBreadcrumb breadData={breadData} />
        <div className="Filter">
          <Button type="primary">添加卡类别</Button>
        </div>
        <div className="Table">
          <Table columns={tableTitle} dataSource={cardList} />
        </div>
      </div>
    );
  }
}

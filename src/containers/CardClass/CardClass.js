/**
 * Created by summer on 2018/12/27.
 */
import React, { Component } from 'react';
import { Select, Table, DatePicker, Button } from 'antd';
import { isEmpty } from 'lodash';

import EBreadcrumb from '../../components/Breadcrumb/EBreadcrumb';
import api, { request } from '../../modules/request';

import './CardClass.scss';
const Option = Select.Option;

const SELECTED_ATTR = ['selectedTermDate', 'selectedCardType', 'selectedCity'];
const tableTitle = [
  {
    title: '卡名称',
    dataIndex: 'cardName',
    key: 'cardName',
  },
  {
    title: '级别',
    dataIndex: 'cardLevel',
    key: 'cardLevel',
  },
  {
    title: '背景图',
    dataIndex: 'cardUrl',
    key: 'cardUrl',
  },
  {
    title: 'logo图',
    dataIndex: 'logoUrl',
    key: 'logoUrl',
  },
  {
    title: '卡介绍',
    dataIndex: 'instructions',
    key: 'instructions',
  },
  {
    title: '上限值',
    dataIndex: 'maxValue',
    key: 'maxValue',
  },
  {
    title: '下限值',
    dataIndex: 'minValue',
    key: 'minValue',
  },
  // {
  //   title: '有限期',
  //   dataIndex: 'validdate',
  //   key: 'validdate',
  // },
];
export default class CardClass extends Component {
  state = {
    breadData: [
      {
        path: '/card/index',
        name: '卡管理',
      },
      {
        path: '/card/card-class',
        name: '级别设置',
      },
    ],
    cardType: [
      {
        text: '黄金会员',
        value: 'gold_member',
      },
      {
        text: '钻石会员',
        value: 'diamand_member',
      },
      {
        text: 'VIP会员',
        value: 'vip_member',
      },
    ],
    selectedCardType: 'gold_member',
    cardList: [],
  };

  componentDidMount() {
    this.fetchCardClass();
  }

  handleSelectChange = (value, type = SELECTED_ATTR[0]) => {
    this.setState((state, props) => {
      return {
        [type]: value,
      };
    }, this.fetchCardClass);
  };

  fetchCardClass = () => {
    request
      .post(api.GW_INTERACT_API, {
        serviceName: 'queryPartnerCardLevels',
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
      <div className="card-class-wrapper">
        <EBreadcrumb breadData={breadData} />
        <div className="Filter">
          <Button type="primary">添加等级</Button>
          <Select
            defaultValue={cardType[0].text}
            style={{ width: 106, marginLeft: 40 }}
            onChange={(value) => {
              this.handleSelectChange(value, SELECTED_ATTR[1]);
            }}
          >
            {!isEmpty(cardType) &&
              cardType.map((asset, index) => {
                return (
                  <Option key={index} value={asset.value}>
                    {asset.text}
                  </Option>
                );
              })}
          </Select>
        </div>
        <div className="Table">
          <Table columns={tableTitle} dataSource={cardList} />
        </div>
      </div>
    );
  }
}

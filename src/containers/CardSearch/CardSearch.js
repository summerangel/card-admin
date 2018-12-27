/**
 * Created by summer on 2018/12/27.
 */
import React, { Component } from 'react';
import { Select, Table, DatePicker, Button, Form, Input, Row, Col } from 'antd';
import { isEmpty } from 'lodash';

import EBreadcrumb from '../../components/Breadcrumb/EBreadcrumb';
import { api, request } from '../../modules/request';
import { formatDate } from '../../modules/utils';

import './CardSearch.scss';

const FormItem = Form.Item;
const Option = Select.Option;

const SELECTED_ATTR = ['selectedTermDate', 'selectedCardType', 'selectedCity'];
const tableTitle = [
  {
    title: '卡号',
    dataIndex: 'cardNo',
    key: 'cardNo',
  },
  {
    title: '卡名称',
    dataIndex: 'cardName',
    key: 'cardName',
  },
  {
    title: '发行方名称',
    dataIndex: 'cardRelease',
    key: 'cardRelease',
  },
  {
    title: '会员名称',
    dataIndex: 'memberName',
    key: 'memberName',
  },
  {
    title: '权益金额',
    dataIndex: 'rightAmount',
    key: 'rightAmount',
  },
  {
    title: '已使用金额',
    dataIndex: 'usedAmount',
    key: 'usedAmount',
  },
];

export default class CardSearch extends Component {
  state = {
    breadData: [
      {
        path: '/task/index',
        name: '卡管理',
      },
      {
        path: '/task/index',
        name: '会员卡查询',
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
    cardList: [
      {
        id: 1,
        cardNo: '123445',
        cardName: '黄金会员',
        cardRelease: '悦诗风吟',
        memberName: '张三',
        rightAmount: 20,
        usedAmount: 0,
      },
      {
        id: 2,
        cardNo: '123445',
        cardName: '黄金会员',
        cardRelease: '悦诗风吟',
        memberName: '张三',
        rightAmount: 20,
        usedAmount: 0,
      },
      {
        id: 3,
        cardNo: '123445',
        cardName: '黄金会员',
        cardRelease: '悦诗风吟',
        memberName: '张三',
        rightAmount: 20,
        usedAmount: 0,
      },
    ],
  };

  componentDidMount() {
    // this.fetchCityListData();
  }

  fetchCityListData = () => {
    request
      .get(api.TASK_CITY_LIST_API, {
        merchantId: this.state.merchantId,
      })
      .then((res) => {
        this.setState((state, props) => {
          return {
            city: res.data,
            selectedCity: res.data[0].key,
          };
        }, this.fetchTaskListData);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  fetchTaskListData = () => {
    const { dateMonth, selectedCardType, selectedCity } = this.state;
    request
      .get(api.TASK_LIST_API, {
        dateMonth: dateMonth,
        assetType: selectedCardType,
        cityCode: selectedCity,
        merchantId: localStorage.getItem('merchantId'),
        pageNum: 1,
        pageSize: 100,
      })
      .then((res) => {
        if (!!res.data) {
          this.setState({
            taskListData: res.data.content,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleSelectChange = (value, type = SELECTED_ATTR[0]) => {
    this.setState((state, props) => {
      return {
        [type]: value,
      };
    }, this.fetchTaskListData);
  };

  handleDateChange = (date, dateString) => {
    console.log(date, formatDate(dateString));
    this.setState((state, props) => {
      return {
        dateMonth: formatDate(dateString),
      };
    }, this.fetchTaskListData);
  };

  render() {
    const { breadData, cardType, cardList } = this.state;
    return (
      <div className="card-search-wrapper">
        <EBreadcrumb breadData={breadData} />
        <Form
          // onSubmit={this.handleSubmit}
          style={{ backgroundColor: '#ffffff', padding: '20px 20px 0px 20px', marginTop: '30px' }}
        >
          <Row>
            <Col span={7}>
              <FormItem label="手机号">
                <Input placeholder="请输入手机号" type="number" maxLength={11} minLength={10} />
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem
                style={{
                  marginLeft: '20px',
                }}
              >
                <Button type="primary" htmlType="submit" className="buttonStyle">
                  查询
                </Button>
              </FormItem>
            </Col>
            <Col span={6} />
          </Row>
        </Form>
        <div className="Table">
          <Table columns={tableTitle} dataSource={cardList} />
        </div>
      </div>
    );
  }
}

/**
 * Created by summer on 2018/12/27.
 */
import React, { Component } from 'react';
import { Table, Button, Form, Input, Row, Col, message } from 'antd';

import EBreadcrumb from '../../components/Breadcrumb/EBreadcrumb';
import api, { request } from '../../modules/request';

import './CardSearch.scss';

const FormItem = Form.Item;
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
    dataIndex: 'issuerName',
    key: 'issuerName',
  },
  {
    title: '会员名称',
    dataIndex: 'memberName',
    key: 'memberName',
  },
  {
    title: '权益金额',
    dataIndex: 'interestsAmount',
    key: 'interestsAmount',
  },
  {
    title: '已使用金额',
    dataIndex: 'usageAmount',
    key: 'usageAmount',
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
    cardList: [],
    mobile: '18017237797',
  };

  componentDidMount() {
    this.fetchCardListData();
  }

  fetchCardListData = () => {
    request
      .post(api.GW_INTERACT_API, {
        serviceName: 'queryMemberCard',
        identityValue: this.state.mobile,
      })
      .then((res) => {
        console.log(res);
        this.setState({
          cardList: res,
        });
      })
      .catch((e) => {
        console.log(e);
        if (e.responseCode === 'card01') {
          message.error(e.responseMsg);
        }
      });
  };

  handleSubmit = () => {
    this.fetchCardListData();
  };

  inputChange = (e) => {
    const value = e.target.value;
    this.setState({
      mobile: value,
    });
  };

  render() {
    const { breadData, mobile, cardList } = this.state;
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
                <Input
                  placeholder="请输入手机号"
                  type="number"
                  maxLength={11}
                  minLength={10}
                  value={mobile}
                  onChange={this.inputChange}
                />
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem
                style={{
                  marginLeft: '20px',
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="buttonStyle"
                  onClick={this.handleSubmit}
                >
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

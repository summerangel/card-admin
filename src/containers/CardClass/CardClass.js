/**
 * Created by summer on 2018/12/27.
 */
import React, { Component } from 'react';
import {Select, Table, DatePicker, Button } from 'antd';
import {isEmpty} from 'lodash';

import EBreadcrumb from '../../components/Breadcrumb/EBreadcrumb';
import {api, request} from '../../modules/request';

import './CardClass.scss';
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
        key: 'name'
    },
    {
        title: '编码',
        dataIndex: 'code',
        key: 'code'
    }
];
export default class CardClass extends Component {
    state = {
        breadData: [
            {
                path: '/task/index',
                name: '卡管理',
            },
            {
                path: '/task/index',
                name: '级别设置',
            },
        ],
        cardList: [
            {
                id: 1,
                name: '黄金会员',
                code: '商家介绍'
            },
            {
                id: 2,
                name: '铂金会员',
                code: '商家介绍2'
            },
            {
                id: 3,
                name: '普通会员',
                code: '商家介绍3'
            }
        ]
    };

    render() {
        const {breadData, cardType, cardList } = this.state;
        return (
            <div className="card-class-wrapper">
                <EBreadcrumb breadData={breadData}/>
                <div className="Filter">
                    <Button type="primary">添加等级</Button>
                </div>
                <div className="Table">
                    <Table columns={tableTitle} dataSource={cardList}/>
                </div>
            </div>
        )
    }
}
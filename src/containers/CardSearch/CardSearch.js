/**
 * Created by summer on 2018/12/27.
 */
import React, { Component } from 'react';
import {Select, Table, DatePicker, Button } from 'antd';
import {isEmpty} from 'lodash';

import EBreadcrumb from '../../components/Breadcrumb/EBreadcrumb';
import {api, request} from '../../modules/request';
import {formatDate} from '../../modules/utils';

import './CardSearch.scss';

const Option = Select.Option;

const SELECTED_ATTR = ['selectedTermDate', 'selectedCardType', 'selectedCity'];
const tableTitle = [
    {
        title: '卡名称',
        dataIndex: 'cardName',
        key: 'cardName',
    },
    {
        title: '卡编码',
        dataIndex: 'cardCode',
        key: 'cardCode'
    },
    {
        title: '背景图',
        dataIndex: 'cardBg',
        key: 'cardBg'
    },
    {
        title: 'logo图',
        dataIndex: 'cardLogo',
        key: 'cardLogo'
    },
    {
        title: '卡介绍',
        dataIndex: 'cardDesc',
        key: 'cardDesc'
    },
    {
        title: '上限值',
        dataIndex: 'cardMax',
        key: 'cardMax'
    },
    {
        title: '下限值',
        dataIndex: 'cardMin',
        key: 'cardMin'
    },
    {
        title: '有限期',
        dataIndex: 'validdate',
        key: 'validdate'
    }
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
                cardName: '黄金会员卡',
                cardCode: '测试商户',
                cardBg: 'https://www.freeexchange.cn/assets/innisfree.jpeg',
                cardLogo: 'https://www.freeexchange.cn/assets/innisfreeLogo.jpeg',
                cardDesc: '测试商户',
                cardMax: '20',
                cardMin: '8',
                validdate: '2019.12.1'
            },
            {
                id: 2,
                cardName: '黄金会员卡',
                cardCode: '测试商户',
                cardBg: 'https://www.freeexchange.cn/assets/innisfree.jpeg',
                cardLogo: 'https://www.freeexchange.cn/assets/innisfreeLogo.jpeg',
                cardDesc: '测试商户',
                cardMax: '20',
                cardMin: '8',
                validdate: '2019.12.1'
            },
            {
                id: 3,
                cardName: '黄金会员卡',
                cardCode: '测试商户',
                cardBg: 'https://www.freeexchange.cn/assets/innisfree.jpeg',
                cardLogo: 'https://www.freeexchange.cn/assets/innisfreeLogo.jpeg',
                cardDesc: '测试商户',
                cardMax: '20',
                cardMin: '8',
                validdate: '2019.12.1'
            }
        ]
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
        const {dateMonth, selectedCardType, selectedCity} = this.state;
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
        const {breadData, cardType, cardList } = this.state;
        return (
            <div className="card-search-wrapper">
                <EBreadcrumb breadData={breadData}/>
                <div className="Filter">
                    <Button type="primary">添加等级</Button>
                    <Select
                        defaultValue={cardType[0].text}
                        style={{width: 106, marginLeft: 40}}
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
                    <Table columns={tableTitle} dataSource={cardList}/>
                </div>
            </div>
        );
    }
}
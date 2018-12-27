import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Breadcrumb.scss';
import {Link} from 'react-router-dom';
import {Breadcrumb} from 'antd';
class EBreadcrumb extends Component {

    render() {
        const {breadData = []} = this.props;
        return (
            <div className="breadContainer">
                <Breadcrumb separator=">">
                    {breadData.map((item, index) => (
                        index === breadData.length - 1 ?
                            <Breadcrumb.Item key={index}>{item.name}</Breadcrumb.Item>
                            :
                            <Breadcrumb.Item key={index}>
                                <Link to={item.path}>{item.name}</Link>
                            </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </div>

        );
    }
}
EBreadcrumb.propTypes = {
    breadData: PropTypes.array,
};

export default EBreadcrumb;

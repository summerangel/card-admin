import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Steps.scss';
import {Link} from 'react-router-dom';
import {Steps} from 'antd';
class ESteps extends Component {

  render() {
    const {
      stepsData = [],
      current=0,
    } = this.props;
    return (
      <div className="stepsContainer">
        <Steps current={current}>
        {stepsData.map((item,index)=>(
        <Steps.Step title={item} description="" key={index}/>
        ))}
      </Steps>    
      </div>  

    );
  }
}
ESteps.propTypes = {
  breadData: PropTypes.array,
  current:PropTypes.number,
};

export default ESteps;

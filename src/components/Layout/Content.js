import React, { Component } from 'react';

class Content extends Component {
  render() {
    return (
      <div
        style={{
          minHeight: '200px',
          backgroundColor: '#ffffff',
          width: '100%',
          padding: '30px',
          marginTop: '30px',
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Content;

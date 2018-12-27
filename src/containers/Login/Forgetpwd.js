import React from 'react';
import { Layout, Form, Icon, Input, Button } from 'antd';
import { InputPwd } from '../../components/FormInput/FormInput';
import './Login.scss';
import api, { request } from '../../modules/request';
import { msg } from '../../modules/common';
import { setStorage } from '../../modules/utils';
import { checkPhoneNumber, checkPassword } from '../../modules/input-test';

const { Header, Content } = Layout;

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      computedTime: '',
      isdisabled: 0,
    };
  }
  state = {};
  componentDidMount() {
    this.props.form.validateFields();
  }
  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     const checkPnResult = checkPhoneNumber(values.mobile);
  //     const checkPResult = checkPassword(values.password, '请输入6~20位的数字和字母');
  //     if (checkPnResult !== true) {
  //       msg('error', checkPnResult);
  //       return;
  //     }
  //     if (checkPResult !== true) {
  //       msg('error', checkPResult);
  //       return;
  //     }
  //     if (!err) {
  //       request
  //         .post(api.FORGET_RETSET_CODE, {
  //           mobile: values.mobile,
  //           code: values.code,
  //           newPassword: values.password,
  //           type: '2',
  //         })
  //         .then(
  //           res => {
  //             if (res.responseCode === '000') {
  //               msg('success', '密码修改成功');
  //               setTimeout(function() {
  //                 window.location.href = '/';
  //               }, 500);
  //             } else {
  //               msg('error', res.responseMsg);
  //             }
  //           },
  //           error => {
  //             msg('error', error.responseMsg);
  //           }
  //         );
  //     }
  //   });
  // };
  getUserDetail = (e) => {
    e.preventDefault();

    let userid = '2';
    request
      .get(api.USER_USER_DETAIL, {}, { restParams: { userid } })
      .then((res) => {}, (error) => {});
  };
  mobileChange = (e) => {
    e.preventDefault();

    const mobile = e.target.value.replace(/\D/g, '');
    // this.props.dispatch(setMobile(mobile));
  };
  codeChange = (e) => {
    const code = e.target.value.replace(/\D/g, '');
    // this.props.dispatch(setVerifyCode(code));
  };
  getCode = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const checkPnResult = checkPhoneNumber(values.mobile);
      if (checkPnResult !== true) {
        msg('error', checkPnResult);
        return;
      }
      if (this.data.computedTime) {
        return;
      }

      request.get(api.FORGET_SEND_CODE, { mobile: values.mobile, type: '2' }).then(
        (res) => {
          if (res.responseCode === '000') {
            this.counter();
            msg('success', '验证码发送成功');
          } else {
            msg('error', res.responseMsg);
          }
        },
        (error) => {
          msg('error', error.responseMsg);
        }
      );
    });
  };
  counter = (e) => {
    let that = this;
    that.data.computedTime = 60;
    that.timer = setInterval(() => {
      that.data.computedTime--;
      that.setState({
        computedTime: that.data.computedTime,
      });
      if (that.data.computedTime == 0) {
        clearInterval(that.timer);
      }
    }, 1000);
  };
  render() {
    const {
      mobile,
      code,
      verifyCodeWaiting,
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    const mobileError = isFieldTouched('mobile') && getFieldError('mobile');
    const codeError = isFieldTouched('code') && getFieldError('code');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
        </Header>
        <Content>
          <div className="login-content box-center" style={{ minHeight: 'calc( 100vh - 64px )' }}>
            <div className="login">
              <Form onSubmit={this.handleSubmit} className="login-form">
                <div className="login-title">重置密码</div>
                <FormItem validateStatus={mobileError ? 'error' : ''} help={mobileError || ''}>
                  {getFieldDecorator('mobile', {
                    rules: [{ required: true, message: '请输入正确的手机号' }],
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="请输入手机号"
                      onChange={this.mobileChange}
                      maxLength={11}
                      size="large"
                      type="number"
                    />
                  )}
                </FormItem>
                <FormItem
                  className="photo-code-content"
                  validateStatus={codeError ? 'error' : ''}
                  help={codeError || ''}
                >
                  {getFieldDecorator('code', {
                    rules: [{ required: true, message: '请输入正确的手机验证码' }],
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="text"
                      placeholder="请输入手机验证码"
                      onChange={this.codeChange}
                      maxLength={6}
                      size="large"
                    />
                  )}

                  {!this.data.computedTime ? (
                    <Button
                      type="primary"
                      size="large"
                      className="get-code"
                      onClick={this.getCode.bind(this)}
                    >
                      获取验证码
                    </Button>
                  ) : (
                    <Button type="primary" size="large" className="get-code" disabled>
                      重新发送({this.data.computedTime}s)
                    </Button>
                  )}
                </FormItem>
                <FormItem validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入6-20位数字+字母的密码' }],
                  })(
                    <InputPwd
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="请输入新密码"
                      maxLength={20}
                      minLength={6}
                      type="password"
                      size="large"
                    />
                  )}
                </FormItem>
                <FormItem>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    className="login-form-button"
                    disabled={hasErrors(getFieldsError())}
                  >
                    确定
                  </Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}

// const mapStateToProps = state => {
//   const {
//     login: { mobile, code, verifyCodeWaiting },
//   } = state;
//
//   return {
//     mobile,
//     code,
//     verifyCodeWaiting,
//   };
// };
export default Login;

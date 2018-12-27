import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Form, Icon, Input, Button } from 'antd';
import { InputPwd } from '../../components/FormInput/FormInput';
import './Login.scss';
import { request, api } from '../../modules/request';
import { msg } from '../../modules/common';
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
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     //   const checkPnResult = checkPhoneNumber(values.mobile);
  //     const checkPResult = checkPassword(values.password);
  //     //   if (checkPnResult !== true) {
  //     //     msg('error', checkPnResult);
  //     //     return;
  //     //   }
  //     if (checkPResult !== true) {
  //       msg('error', checkPResult);
  //       return;
  //     }
  //     if (!err) {
  //       let that = this;
  //       LoginServices.fetchLogin({ email: values.email, password: values.password }).then((res) => {
  //         if (!res) {
  //           return;
  //         }
  //         if (!res.operatorDto) {
  //           return;
  //         }
  //         localStorage.setItem('user', JSON.stringify(res.operatorDto));
  //         localStorage.setItem('token', res.token);
  //         localStorage.setItem('mobile', res.operatorDto.mobile);
  //         localStorage.setItem(
  //           'merchantId',
  //           res.operatorDto && res.operatorDto.merchantDto && res.operatorDto.merchantDto.id
  //         );
  //         localStorage.setItem('operatorId', res.operatorDto && res.operatorDto.id);
  //         msg('success', '登录成功');
  //         window.location.href = '/';
  //       });
  //     }
  //   });
  // };
  emailChange = (e) => {
    e.preventDefault();

    const mobile = e.target.value.replace(/\D/g, '');
    // this.props.dispatch(setMobile(mobile));
  };

  render() {
    const {
      mobile,
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    const mobileError = isFieldTouched('mobile') && getFieldError('mobile');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
        </Header>
        <Content>
          <div className="login-content box-center" style={{ minHeight: 'calc( 100vh - 64px )' }}>
            <div className="login">
              {/*<Form onSubmit={this.handleSubmit} className="login-form">*/}
              <Form className="login-form">
                <div className="login-title">登录</div>
                <FormItem validateStatus={mobileError ? 'error' : ''} help={mobileError || ''}>
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: '请输入正确的邮箱' }],
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="请输入登录邮箱"
                      onChange={this.emailChange}
                      size="large"
                    />
                  )}
                </FormItem>
                <FormItem validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入正确的密码' }],
                  })(
                    <InputPwd
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="请输入密码"
                      maxLength={20}
                      minLength={6}
                      type="password"
                      size="large"
                    />
                  )}
                </FormItem>
                {/* <Link to="/forgetpwd/index">
                  <p className="forget-name">忘记密码</p>
                </Link> */}
                <FormItem>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    className="login-form-button"
                    disabled={hasErrors(getFieldsError())}
                  >
                    登录
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

const mapStateToProps = (state) => {
  const {
    login: { mobile, code, verifyCodeWaiting },
  } = state;

  return {
    mobile,
    code,
    verifyCodeWaiting,
  };
};
// export default connect(mapStateToProps)(Form.create()(Login));
export default mapStateToProps;

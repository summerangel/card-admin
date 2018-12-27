import React, { Component, createElement } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'; // BrowserRouter HashRouter
import { Layout, Button } from 'antd';

import './App.scss';

import { TopHeader, SiderBar } from './components/Layout/index';

import Login from './containers/Login/Login';
import Forgetpwd from './containers/Login/Forgetpwd';
import CardType from './containers/CardType/CardType';
import CardSearch from './containers/CardSearch/CardSearch';
import CardClass from './containers/CardClass/CardClass';

const { Content } = Layout;

const NoMatch = ({ location, linkElement = 'a', actions }) => (
  <div className="page">
    <div className="page_nomatch">
      <div className="img_block" />
      <div className="nomatch_content">
        <h3>404</h3>
        <div className="nomatch_desc">
          抱歉，你访问的页面不存在<code>{location.pathname}</code>
        </div>
        <div className="nomatch_actions">
          {actions ||
            createElement(
              linkElement,
              {
                to: '/dashboard',
                href: '/dashboard',
              },
              <Button type="primary">返回首页</Button>
            )}
        </div>
      </div>
    </div>
  </div>
);

const isLoggedIn = localStorage.getItem('token');
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router basename="/admin">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (isLoggedIn ? <Redirect to="/card/index" /> : <Login />)}
            />
            <Route path={`/login`} component={Login} />
            <Route exact path="/forgetpwd/index" render={() => <Forgetpwd />} />

            {/* 卡管理 */}
            <Route
              path="/card"
              render={({ match: { url }, location }) => (
                <Layout>
                  <TopHeader />
                  <Layout>
                    <SiderBar currentKey="0" />
                    <Layout style={{ minHeight: 'calc( 100vh - 64px )', padding: 20 }}>
                      <Content style={{ margin: 0 }}>
                        <Switch>
                          <Route path="/card/card-type" component={CardType} />
                          <Route path="/card/card-search" component={CardSearch} />
                          <Route path="/card/card-class" component={CardClass} />
                          <Route component={NoMatch} />
                        </Switch>
                      </Content>
                    </Layout>
                  </Layout>
                </Layout>
              )}
            />
            <Route
              path="/author"
              render={({ match: { url }, location }) => (
                <Layout>
                  <TopHeader />
                  <Layout>
                    <SiderBar currentKey="1" />
                    <Layout style={{ minHeight: 'calc( 100vh - 64px )', padding: 20 }}>
                      <Content style={{ margin: 0 }}>
                        <Switch>
                          <Route path={`/card/index`} component={NoMatch} />
                          <Route component={NoMatch} />
                        </Switch>
                      </Content>
                    </Layout>
                  </Layout>
                </Layout>
              )}
            />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;

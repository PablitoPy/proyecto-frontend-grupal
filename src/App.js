import React, { useState } from 'react';
import './App.css';
import { Layout, Menu } from 'antd';
import "antd/dist/antd.css";
import TaskList from './TaskList';
import TypeList from './TypeList';
import TaskForm from './TaskForm';
import TypeForm from './TypeForm';
import Home from './Home';
import About from './About';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { AppstoreOutlined } from '@ant-design/icons';
 
const { SubMenu } = Menu;
const { Header, Footer, Content } = Layout;
 
 
function AppMenu() {
  const [current, setCurrent] = useState()
  return (
    // Definicion del menu principal
    <Menu onClick={(value) => setCurrent(value)} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <SubMenu key="tasks" icon={<AppstoreOutlined />} title="Tasks">
        <Menu.Item key="tasks:1"><Link to="/tasks">Tasks</Link></Menu.Item>
        <Menu.Item key="tasks:2"><Link to="/tasks/new">New Task</Link></Menu.Item>
      </SubMenu>
      <SubMenu key="types" icon={<AppstoreOutlined />} title="Types">
        <Menu.Item key="types:1"><Link to="/types">Types</Link></Menu.Item>
        <Menu.Item key="types:2"><Link to="/types/new">New Type</Link></Menu.Item>
      </SubMenu>
      <Menu.Item key="about" icon={<AppstoreOutlined />}>
        <Link to="/about">About</Link>
      </Menu.Item>
    </Menu>
  );
}
 
function TaskRoutes({ match }) {
  return (
    <>
      <Route exact path={`${match.path}/new`} component={TaskForm} />
      <Route
        exact
        path={`${match.path}/edit/:taskId`}
        component={TaskForm}
      />
      <Route exact path={`${match.path}/`} component={TaskList} />
    </>
  );
}
 
function TypeRoutes({ match }) {
  return (
    <>
      <Route exact path={`${match.path}/new`} component={TypeForm} />
      <Route
        exact
        path={`${match.path}/edit/:typeId`}
        component={TypeForm}
      />
      <Route exact path={`${match.path}/`} component={TypeList} />
    </>
  );
}
 
function App() {
  return (
      <Router>
        <Layout>
          <Header style={{ color: 'white' , fontSize: 30, textAlign: 'center'}}>
              <div>ToDo List</div>
          </Header>
          <Content>
              
              <div className="site-layout-content">
                  <AppMenu/>
                  <br/>
                  {/* Secccion donde se van a mostrar los diferentes componentes que rendericemos */}
                  <>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                    {/* Hacemos esto porque tasks tiene subrutas */}
                    <Route path="/tasks" component={TaskRoutes} />
                    <Route path="/types" component={TypeRoutes} />
 
 
                  </>
              </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>
              <p>Teléfono</p>
              <p>Dirección</p>
              <p>Ciudad - País</p>
          </Footer>
        </Layout>
      </Router>
      
  );
}
 
export default App;
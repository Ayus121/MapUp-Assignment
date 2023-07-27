import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button ,Typography} from 'antd';
import BasicMap from '../BasicMap/BasicMap';
import SearchBox from '../SearchBox/SearchBox';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];
const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectPosition,setSelectPosition] = useState(null);
  // console.log(selectPosition);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
			display:'flex',
			justifyContent:'space-between'
          }}
		  >
		<Typography.Title>Map-Up Assignment</Typography.Title>
		  <Button type='primary' style={{float:'right',marginTop:'15px'}}>Login</Button>
		  </Header>
        <Content style={{ margin: '0 16px', }} >
          <Breadcrumb style={{margin: '16px 0',}}>
            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
          </Breadcrumb>
          {/* // SearchBox */}
          <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
          <div style={{padding: 24,width:'100%', height:'100%',background: colorBgContainer}}>
            {/* //BasicMap */}
            <BasicMap selectPosition={selectPosition} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', }} >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Home;
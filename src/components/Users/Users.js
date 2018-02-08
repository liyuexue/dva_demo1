import React from 'react';
import styles from './Users.css';
import { Table, Icon, Divider } from 'antd';

// 页面
function Users({list}) {
  const columns = [
    {
      title:"姓名",
      dataIndex:'username',
      key:'name'
    },
    {
      title:"邮箱",
      dataIndex:'email',
      key:'email'
    },
    {
      title:"网站",
      dataIndex:'website',
      key:'website'
    }
  ]
  return (
    <div className={styles.normal}>
      <Table columns={columns} dataSource={list} rowKey="id"></Table>
    </div>
  );
}

export default Users;

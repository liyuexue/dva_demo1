import React,{Component} from 'react';
import { connect } from 'dva';
import styles from './Users.css';
import UserList from '../components/Users/Users'
import {Button,Modal,Input  } from 'antd'

class Users extends Component{
  constructor(props){
    super(props)
    this.state = {
      visible:false,
      createVal:{
        name:'',
        email:'',
        website:''
      }
    }
  }
  showModal =  () => {
    this.setState({
      visible:true
    })
  }
  handleCancel = () => {
    this.setState({
      visible:false
    })
  }
  handleOk = () => {
    this.setState({
      visible:false
    })
    this.props.dispatch({
      type:'users/create',
      payload:{
        values:{
          ...this.state.createVal
        }
      }
    })
  }
  changeModal = (e) => {
    this.setState({
      createVal : {
        ...this.state.createVal,
        [e.target.name] :e.target.value
      }
    })
  }
  render(){
    let {list} = this.props;
    let {name,email,website} = this.state.createVal;
    return (
      <div className={styles.normal}>
        <Button type="primary" onClick={this.showModal} style={{margin:'15px'}}>添加数据</Button>
        {/* 把数据引过来 */}
        <UserList list={list}></UserList>
        <Modal
          title="添加数据"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
         {/* 添加name属性方便查找添加的是哪个input的value值 */}
          <Input style={{marginBottom:'10px'}} placeholder="用户名" name='name' value={name} onChange={(e) => this.changeModal(e)}/>
          <Input style={{marginBottom:'10px'}} placeholder="邮箱" name="email" value={email} onChange={(e) => this.changeModal(e)} />
          <Input placeholder="网站" name='website' value={website} onChange={(e) => this.changeModal(e)}/>
        </Modal>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    list:state.users.list
  };
}

export default connect(mapStateToProps)(Users);

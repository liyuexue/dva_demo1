//引入数据
import * as userServer from '../services/users'

export default {
  namespace: 'users',
  state: {
    list:[],
    total:null,
    page:null
  },
  reducers: {
    save(state,{payload:{data:list,total,page}}) {
      return {...state,list,total,page}
    }
  },
  effects: {
    *fetch({ payload: { page } }, { call, put }) {
      const { data, headers } = yield call(userServer.fetch, { page });
      yield put({ type: 'save', payload: { 
        data, 
        total: headers['x-total-count'] ,
        page:parseInt(page,10)
      } });
    },
    *create({payload:values},{call,put}) {
      let a = yield call(userServer.create,values);
      yield put({type:'reload'})
    },
    // 添加数据的判断类型
    *reload(action,{put,select}) {
      const page = yield select(state => {
        return state.users.page
      });
      yield put({type:'fetch',payload:{page}})
    }
  },
  subscriptions: {
    // 监听路由
    setup({dispatch,history}) {
      return history.listen(({pathname,query}) => {
        if(pathname === '/users'){
          dispatch({type:'fetch',payload:query});
        }
      });
    },
  },
};

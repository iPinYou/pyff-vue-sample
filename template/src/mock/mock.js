import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './data/user';
let _Users = Users;
export default {
    /**
     * mock bootstrap
     */
    bootstrap() {
        const mock = new MockAdapter(axios);
        // mock success request
        mock.onGet('/success').reply(200, {
            msg: 'success',
        });
        // mock error request
        mock.onGet('/error').reply(500, {
            msg: 'failure',
        });
        // 登录
        mock.onPost('/login').reply((config) => {
            const { username, password } = JSON.parse(config.data);
            return new Promise((resolve, reject) => {
                let user = null;
                setTimeout(() => {
                    const hasUser = LoginUsers.some((u) => {
                        if (u.username === username && u.password === password) {
                            user = JSON.parse(JSON.stringify(u));
                            user.password = undefined;
                            return true;
                        }
                    });

                    if (hasUser) {
                        resolve([200, { code: 200, msg: '请求成功', user }]);
                    } else {
                        resolve([200, { code: 500, msg: '账号或密码错误' }]);
                    }
                }, 100);
            });
        });

        // 获取用户列表
        mock.onGet('/user/list').reply((config) => {
            const { name } = config.params;
            const mockUsers = _Users.filter((user) => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        users: mockUsers,
                    }]);
                }, 100);
            });
        });
        // 获取用户列表（分页）
        mock.onGet('/user/listpage').reply((config) => {
            const { page, name } = config.params;
            let mockUsers = _Users.filter((user) => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            const total = mockUsers.length;
            mockUsers = mockUsers.filter((u, index) => index < 10 * page && index >= 10 * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total,
                        users: mockUsers,
                    }]);
                }, 100);
            });
        });

        // 删除用户
        mock.onGet('/user/remove').reply((config) => {
            const { id } = config.params;
            _Users = _Users.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功',
                    }]);
                }, 50);
            });
        });

        //改变用户状态
        mock.onGet('/user/changeText').reply((config)=>{
            let { currentState,currentEmail } = config.params;
            _Users.some((u) => {
                if (u.email === currentEmail&&u.state==true) {
                    u.state=false;
                }
                else if(u.email === currentEmail&&u.state==false){
                    u.state=true;
                }
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '更改成功',
                    }]);
                }, 50);
            });
        });

        // 批量删除用户
        mock.onGet('/user/batchremove').reply((config) => {
            let { emails } = config.params;
            emails = emails.split(',');
            _Users = _Users.filter(u => !emails.includes(u.email));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功',
                    }]);
                }, 50);
            });
        });

        // 编辑用户
        mock.onGet('/user/edit').reply((config) => {
            const { email,name,tel,state } = config.params;
                _Users.some((u) => {
                    if (u.email === email) {
                        u.email=email;
                        u.name = name;
                        u.tel = tel;
                        u.state = state;
                    }
                });
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve([200, {
                            code: 200,
                            msg: '编辑成功',
                        }]);
                    }, 50);
                });
        });

        // 新增用户
        mock.onGet('/user/add').reply((config) => {
                const { email, name, tel, state } = config.params;
                _Users.push({
                    email,
                    name,
                    tel,
                    state,
                });
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve([200, {
                            code: 200,
                            msg: '新增成功',
                        }]);
                    }, 50);
                });
        });

        // 开启这个用户的状态
        mock.onGet('/user/changestate').reply((config)=>{
            let { emails } = config.params;
            emails =emails.split(',');
            _Users.some((u) => {
                emails.forEach(function (email) {
                    if(u.email===email&&u.state===true){
                        u.state=true;
                    }
                    else if(u.email===email&&u.state===false) {
                        u.state=true;
                    }
                })

            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '成功',
                    }]);
                }, 50);
            });
        });

        // 关闭这个用户的状态
        mock.onGet('/user/changestatedown').reply((config)=>{
            let { emails } = config.params;
            emails =emails.split(',');
            _Users.some((u) => {
                emails.forEach(function (email) {
                    if(u.email===email&&u.state===true){
                        u.state=false;
                    }
                    else if(u.email===email&&u.state===false) {
                        u.state=false;
                    }
                })
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '成功',
                    }]);
                }, 50);
            });
        });
    },
};

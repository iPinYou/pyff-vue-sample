import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某',
  },
];

const Users = [];

for (let i = 0; i <100; i++) {
    Users.push(Mock.mock({
        email: Mock.Random.email(),
        name: Mock.Random.cname(),
        tel:"18713593706",
        'state|1':true,
        // state: Mock.Random.integer(0, 1),
    }));
}

export { LoginUsers, Users };

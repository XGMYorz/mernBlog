要将您的博客登录系统功能实现为通过GitHub登录，并将GitHub的头像和名称信息显示在您的博客界面中，您需要使用OAuth 2.0协议来实现与GitHub API的交互。以下是一个基于Node.js（Express框架）和React的示例步骤来实现这一功能：

### 步骤 1: 创建GitHub应用
1. 登录到你的GitHub账户，导航到GitHub应用注册页面：`https://github.com/settings/applications/new`
2. 填写应用信息（应用名称、描述、授权范围等），授权范围需要至少包含`user:email`，以便获取用户信息。
3. 生成客户端ID和客户端秘密，记录下来，这些将用于在您的博客代码中配置。

### 步骤 2: 安装依赖
在您的博客项目中安装必要的依赖：
```bash
npm install express axios
```

### 步骤 3: 配置服务器端逻辑
1. 在服务器端（如使用Express）创建一个路由，用于处理GitHub的登录和回调。
2. 在路由处理函数中，使用GitHub的OAuth授权链接：
   ```javascript
   const express = require('express');
   const axios = require('axios');
   const app = express();
   const clientId = 'your_client_id';
   const clientSecret = 'your_client_secret';
   const redirectUri = 'http://your_blog_domain.com/callback';

   app.get('/login/github', (req, res) => {
       const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
       res.redirect(authUrl);
   });

   app.get('/callback', (req, res) => {
       const code = req.query.code;
       const data = {
           client_id: clientId,
           client_secret: clientSecret,
           code,
           redirect_uri: redirectUri,
           grant_type: 'authorization_code'
       };

       axios.post('https://github.com/login/oauth/access_token', data)
           .then(response => {
               const accessToken = response.data.access_token;
               axios.get('https://api.github.com/user', {
                   headers: {
                       'Authorization': `token ${accessToken}`
                   }
               })
                   .then(userResponse => {
                       // 处理用户信息，可以用于登录验证或获取头像等
                       console.log(userResponse.data);
                       res.send('用户信息获取成功');
                   })
                   .catch(error => {
                       console.error('获取用户信息失败', error);
                       res.status(500).send('获取用户信息失败');
                   });
           })
           .catch(error => {
               console.error('获取访问令牌失败', error);
               res.status(500).send('获取访问令牌失败');
           });
   });

   app.listen(3000, () => {
       console.log('Server is running on port 3000');
   });
   ```
### 步骤 4: 配置客户端（React项目）
1. 在React应用中，创建一个接口来处理与GitHub API的请求。
2. 使用axios或fetch API来调用服务器端的逻辑，将用户引导到GitHub登录页面并处理回调。
3. 确保在用户登录成功后，从服务器端获取到的用户信息中获取头像和用户名，并在博客界面中展示。

### 步骤 5: 安全性与权限
- 确保正确管理客户端ID和客户端秘密，不要将其公开或在任何非安全的环境中使用。
- 使用HTTPS保护您的应用和用户数据。
- 遵循GitHub的OAuth授权政策和最佳实践。

以上步骤提供了一个基本的框架来整合GitHub登录功能到您的博客中，并从GitHub获取用户信息。请注意，根据您的具体需求和使用场景，可能需要进行额外的配置和调整。
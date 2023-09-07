# Vue3-Element-Plus-Admin

### 介绍 📖

这是一款基于 Vue3.3、TypeScript、Vite4.3、Pinia、Element-Plus、Echarts等 开源的后台管理框架，使用目前最新技术栈开发。该系统实现了包括用户管理、电商商品管理、主题切换等功能。另外本项目还封装了常用组件、自定义指令、动态路由、按钮级别权限控制等。

### 在线预览 👀

- Link：暂无

### 代码仓库 ⭐

- GitHub：https://github.com/pete-li/vue3-element-admin

### 项目功能 🔨

- 使用 Vue3.3 + TypeScript 开发，单文件组件**＜ script setup ＞**
- 采用 Vite4.3 作为项目开发、打包工具
- 使用 Pinia 替代 Vuex，轻量、简单、易用，集成 Pinia 持久化插件
- 使用 TypeScript 对 Axios 整个二次封装（请求拦截、响应拦截、常用请求封装…）
- 支持 Element 主题颜色切换、暗黑模式。
- 使用 VueRouter 进行路由权限拦截、页面按钮权限配置、路由动态懒加载
- 使用 KeepAlive 对页面进行缓存，支持多级嵌套页面缓存
- 使用 自定义指令 对按钮权限功能进行封装
- 使用 Prettier 统一格式化代码，集成 ESLint、Stylelint 代码校验规范
- 使用 husky、commitlint、git-cz 规范提交信息

### 安装使用步骤 📔

- **Clone：**

```text
git clone https://github.com/pete-li/vue3-element-admin
```

- **Install：**

```text
pnpm install
```

- **Run：**

```text
pnpm dev
pnpm serve
```

- **Build：**

```text
# 开发环境
pnpm build:dev

# 测试环境
pnpm build:test

# 生产环境
pnpm build:pro
```

- **Lint：**

```text
# eslint 检测代码
pnpm lint:eslint

# prettier 格式化代码
pnpm lint:prettier

# stylelint 格式化样式
pnpm lint:stylelint
```

- **commit：**

```text
# 提交代码（提交前会自动执行 lint:lint-staged 命令）
pnpm commit
```

### 项目截图 📷

- 登录页：





- 首页：





- 表格页：





- 数据可视化



- 数据大屏：



### 项目后台接口 🧩

- 用户管理接口： http://139.198.104.58:8212/swagger-ui.html
- 商品管理接口： http://139.198.104.58:8209/swagger-ui.html

### 文件资源目录 📚

```text
Geeker-Admin
├─ .husky                 # husky 配置文件
├─ .vscode                # VSCode 推荐配置
├─ build                  # Vite 配置项
├─ public                 # 静态资源文件
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ directives          # 全局指令文件
│  ├─ layout              # 框架布局模块
│  ├─ router              # 路由管理
│  ├─ store               # pinia仓库管理
│  ├─ styles              # 全局样式文件
│  ├─ utils               # 常用工具库
│  ├─ views               # 项目所有页面
│  ├─ App.vue             # 项目主组件
│  ├─ main.ts             # 项目入口文件
│  └─ vite-env.d.ts       # 声明 js 模块以支持 ts 类型推理
├─ .editorconfig          # 统一不同编辑器的编码风格
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ .env.test              # 测试环境配置
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.cjs          # Eslint 校验配置文件
├─ .gitignore             # 忽略 git 提交
├─ .prettierignore        # 忽略 Prettier 格式化
├─ .prettierrc.json       # Prettier 格式化配置
├─ .stylelintignore       # 忽略 stylelint 格式化
├─ .stylelintrc.cjs       # stylelint 样式格式化配置
├─ CHANGELOG.md           # 项目更新日志
├─ commitlint.config.cjs  # git 提交规范配置
├─ index.html             # 入口 html
├─ LICENSE                # 开源协议文件
├─ package.json           # 依赖包管理
├─ pnpm-lock.yaml         # 依赖包包版本锁
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 全局配置文件
```

### 浏览器支持 🌎

- 本地开发推荐使用 Chrome 最新版浏览器 [Download](https://www.google.com/intl/zh-CN/chrome/)。
- 生产环境支持现代浏览器，不再支持 IE 浏览器，更多浏览器可以查看 [Can I Use Es Module](https://caniuse.com/?search=ESModule)。

| ![IE](https://i.imgtg.com/2023/04/11/8z7ot.png) | ![Edge](https://i.imgtg.com/2023/04/11/8zr3p.png) | ![Firefox](https://i.imgtg.com/2023/04/11/8zKiU.png) | ![Chrome](https://i.imgtg.com/2023/04/11/8zNrx.png) | ![Safari](https://i.imgtg.com/2023/04/11/8zeGj.png) |
| :---------------------------------------------: | :-----------------------------------------------: | :--------------------------------------------------: | :-------------------------------------------------: | :-------------------------------------------------: |
|                   not support                   |                  last 2 versions                  |                   last 2 versions                    |                   last 2 versions                   |                   last 2 versions                   |
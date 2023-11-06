
* URL解析: 解析url协议/域名/端口/路径/参数 。
* DNS查询： 即域名解析。根据域名去先去本地服务器查找是否有对应的IP地址（递归查询）。找不到就去根服务器去查找IP地址信息。根服务器会让你去指定的服务器查找（迭代查询）
  - 域名解析过程
  首先介绍两个概念：递归查询和迭代查询
  （1）**递归查询**：本机向本地域名服务器发出一次查询请求，就静待最终的结果。如果**本地域名服务器**无法解析，自己会以DNS客户机的身份向其它域名服务器查询，直到得到最终的IP地址告诉本机。
  （2）**迭代查询**：本地域名服务器向**根域名服务器查询**，根域名服务器告诉它下一步到哪里去查询，然后它再去查，每次它都是以客户机的身份去各个服务器查询。

  **本地=》 根=》 顶级域名服务器 =》 权限域名服务器**

* TCP连接： 请求之前需经过TCP3次握手连接。连接成功后即可请求
* http请求： 请求行/请求头/请求体
* 请求响应
* 页面渲染： 
  * 解析html,生成Dom树
  * 解析css,生成css规则树
  * 合并Dom树和css规则树生成render树
  * 布局render树，layout/reflow计算位置，大小
  * 绘制render树，paint 绘制页面像素信息
  * 浏览器将render树的各层信息发送给GPU，GPU将各层合成，呈现在屏幕上




flex-direction
flex-wrap
flex-flow
justify-content
align-items
align-content


order
flex-grow
flex-shrink
flex-basis
flex
align-self


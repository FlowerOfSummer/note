### XSS (Cross Site Scripting) 跨站脚本攻击
XSS攻击可以分为三种类型：反射型XSS、存储型XSS和DOM型XSS。
#### 防范措施
- 对于所有输入的数据，都需要进行过滤和转义，特别是URL参数和表单提交中的数据，应该使用URL编码和HTML实体编码等方式进行处理，避免恶意脚本的注入。
- 对于所有传递给服务器的请求，都需要进行身份验证和权限控制，避免未经授权的用户提交和执行恶意代码
- 使用HTTP-only Cookie：使用HTTP-only Cookie可以防止恶意 JavaScript代码获取用户的Cookie

### CSRF（Cross-Site Request Forgery） 跨站请求伪造

- 验证 HTTP Referer 字段；
- 在请求地址中添加 token 并验证；
- 在 HTTP 头中自定义属性并验证。
### Sql注入


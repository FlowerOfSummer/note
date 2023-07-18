###   git reset 与 revert 区别，revert 多个 mr 改如何处理

- git reset 用于撤销提交，将 HEAD 指针指向之前的某个提交，同时将暂存区和工作区恢复到该提交状态
- git revert 用于撤销某个提交，但是会新建一个提交来记录这个撤销操作，因此不会改变历史提交记录
- 如果要 revert 多个 MR，可以使用 git revert -n 命令，然后手动解决冲突并提交


###  git 如何撤回 add 后的内容
```js

// 如果您已经使用了 `git add` 命令将文件添加到暂存区，但是想要撤回这个操作，可以使用以下命令：
// git reset HEAD <file>
```
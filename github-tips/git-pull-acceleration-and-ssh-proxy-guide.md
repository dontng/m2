# GitHub 解决 Git Pull/Clone 龟速与卡壳终极优化指南

> **适用场景**：国内网络环境下，执行 `git pull`、`git fetch`、`git clone` 时速度极慢、经常卡死在 `Counting objects`、`Compressing objects` 或直接连接超时（Connection timed out）。

---

## 一、 为什么 Git 配置了代理依然会卡壳？

很多开发者明明在 Git 中执行了：
```bash
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```
但在使用 SSH 地址（`git@github.com:user/repo.git`）时，依然经常卡死。

### 核心根因：
1. **代理协议脱节**：
   * Git 的 `http.proxy` 和 `https.proxy` **仅对 HTTPS 协议生效**。
   * 当 remote 地址是 `git@github.com:...` 时，底层走的是系统的 OpenSSH 客户端，**完全不经过 Git 的 HTTP 代理配置**。
2. **22 端口干扰严重**：
   * 默认 SSH 走 22 端口，国内网络运营商对 GitHub 22 端口有严重的 QoS 限速、TCP 阻断和丢包。
   * 大文件或多 commit 拉取时，极易因长时间无数据交换而断开或假死。

---

## 二、 解决方案：SSH 代理 + 443 备用端口 + 心跳保活

这是目前最优雅、最彻底的解决方案，一次配置，全局所有 SSH 仓库（包括 pull / push / clone）全部秒级响应。

### 1. 编辑或创建 `~/.ssh/config`

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/config  # 或使用 vim / code 编辑
```

添加以下内容：

```ssh
Host github.com
    HostName ssh.github.com
    Port 443
    User git
    ProxyCommand nc -X connect -x 127.0.0.1:7890 %h %p
    ServerAliveInterval 30
    ServerAliveCountMax 5
```

> **参数说明**：
> * `Host github.com`：匹配所有指向 github.com 的 SSH 连接。
> * `HostName ssh.github.com` + `Port 443`：走 GitHub 官方提供的 443 端口 SSH 通道，绕开被严重干扰的 22 端口。
> * `ProxyCommand nc -X connect -x 127.0.0.1:7890 %h %p`：
>   * 使用系统自带的 `nc` (netcat) 命令，将 SSH 数据流通过本地 HTTP/CONNECT 代理（端口根据你的实际代理软件如 Clash/Mihomo 修改，通常为 7890）转发。
>   * 如果代理是 SOCKS5，也可使用 `nc -X 5 -x 127.0.0.1:7890 %h %p`。
> * `ServerAliveInterval 30` & `ServerAliveCountMax 5`：每 30 秒发送心跳包保活，防止拉取大仓库时连接意外中断。

### 2. 设置安全权限

```bash
chmod 600 ~/.ssh/config
```

### 3. 测试 SSH 连接是否顺畅

执行：
```bash
ssh -T git@github.com
```

如果看到类似以下提示，说明代理转发与公钥验证完全成功，延迟通常小于 1 秒：
```text
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

---

## 三、 两种协议（SSH vs HTTPS）最佳配置对比

| 项目 | SSH 协议 (`git@github.com:...`) | HTTPS 协议 (`https://github.com/...`) |
| :--- | :--- | :--- |
| **主要配置位置** | `~/.ssh/config` | `~/.gitconfig` |
| **代理命令/参数** | `ProxyCommand nc -X connect -x 127.0.0.1:7890 %h %p` | `git config --global http.https://github.com.proxy http://127.0.0.1:7890` |
| **认证方式** | SSH Key (`id_ed25519` / `id_rsa`) | GitHub Personal Access Token 或 GitHub CLI |
| **卡顿主要原因** | 22 端口丢包、未配置 SSH 代理 | 未走代理或 TLS 握手被阻断 |

> **提示**：只为 GitHub 设置 HTTPS 代理（避免影响局域网或内网 GitLab）：
> ```bash
> git config --global http.https://github.com.proxy http://127.0.0.1:7890
> git config --global https.https://github.com.proxy http://127.0.0.1:7890
> ```

---

## 四、 常见问题与排错

### 1. `ProxyCommand: nc: command not found`
* Ubuntu / Debian 安装：
  ```bash
  sudo apt-get install netcat-openbsd
  ```
* CentOS / RHEL / Fedora 安装：
  ```bash
  sudo yum install nc # 或 nmap-ncat
  ```
* Windows (Git Bash / PowerShell)：
  可使用 `connect.exe`（Git 官方自带）：
  ```ssh
  ProxyCommand connect -H 127.0.0.1:7890 %h %p
  ```

### 2. 测试时提示 `Host key verification failed`
首次通过 `ssh.github.com:443` 连接可能会要求确认指纹，直接输入 `yes` 即可；或执行：
```bash
ssh-keyscan -p 443 ssh.github.com >> ~/.ssh/known_hosts
```

---

## 五、 效果验证

在任何 Git 仓库中执行：
```bash
git pull --verbose
```
你将看到握手秒级完成，对象以最高带宽下载，不再出现任何卡壳现象！

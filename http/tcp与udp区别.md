###  tcp 与 udp 的区别
```js
// TCP 是一种面向连接的协议，UDP 是一种无连接的协议。
// TCP 提供可靠的数据传输，UDP 不保证数据传输的可靠性。
// TCP 保证数据传输的顺序，UDP 不保证数据传输的顺序。
// TCP 的头部较大，UDP 的头部较小。
// TCP 的传输速度较慢，UDP 的传输速度较快。

// TCP协议是一种面向连接的协议，它在传输数据之前需要先建立连接，然后再进行数据传输。TCP协议提供可靠的数据传输，它通过确认机制和重传机制来保证数据传输的可靠性。TCP协议保证数据传输的顺序，因为它会对数据进行编号和排序。TCP协议的头部较大，因为它需要包含很多控制信息。TCP协议的传输速度较慢，因为它需要进行连接的建立和断开等操作。

// UDP协议是一种无连接的协议，它不需要建立连接就可以进行数据传输。UDP协议不保证数据传输的可靠性，因为它没有确认机制和重传机制。UDP协议不保证数据传输的顺序，因为它不会对数据进行编号和排序。UDP协议的头部较小，因为它只需要包含很少的控制信息。UDP协议的传输速度较快，因为它不需要进行连接的建立和断开等操作。
```
import socket
import re
import select

def service_client(new_socket, request):
  """为这个客户端返回数据"""

  # 1. 接收浏览器发送过来的请求，即http请求
  # GET / HTTP/1.1
  # ……
  # request = new_socket.recv(1024).decode("utf-8")
  # print(">>>" * 20)
  # print(request)

  request_lines = request.splitlines()
  print("")
  print(">"*20)
  print(request_lines)

  # GET /index.html HTTP/1.1
  # get post put del
  ret = re.match(r"[^/]+(/[^ ]*)", request_lines[0])
  file_name = ""
  if ret:
    file_name = ret.group(1)
    print("*"*50, file_name)
    if file_name == '/':
      file_name = '/index.html'

  # 2. 返回http格式的数据给浏览器

  try:
    # f = open("../buickmall/index.html", "rb")
    f = open("../buickmall" + file_name, "rb")
  except:
    response = "HTTP/1.1 404 NOT FOUND\r\n"
    response += "\r\n"
    response += "---file not found---"
    new_socket.send(response.encode("utf-8"))
  else:
    html_content = f.read()
    f.close()
    # 2.2 准备发送给浏览器的数据：Body
    response_body = html_content
    # 2.1 准备发送给浏览器的数据：Header
    response_header = "HTTP/1.1 200 OK\r\n"
    response_header += "Content-Length:%d\r\n" % len(response_body)
    response_header += "\r\n"

    response = response_header.encode("utf-8") + response_body
    
    # 将Response发送给浏览器
    new_socket.send(response)

  # 关闭套接字
  # new_socket.close()

def main():
  """用来完成整体的控制"""
  # 1. 创建套接字
  tcp_server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  tcp_server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

  # 2. 绑定
  tcp_server_socket.bind(("", 7890))

  # 3. 变为监听套接字
  tcp_server_socket.listen(128)
  tcp_server_socket.setblocking(False)  # 将套接字变为非阻塞

  # 创建一个epoll对象
  epl = select.epoll()

  # 将监听套接字对应的fd注册到epoll中
  epl.register(tcp_server_socket.fileno(), select.EPOLLIN)

  fd_event_dict = dict()

  while True:
    fd_event_list = epl.poll()  # 默认会阻塞，直到os检测到数据到来，通过事件通知的方式告诉程序，此时才会解阻塞

    # [(fd, event), (……)]
    # 参数fd：套接字对应的文件描述符
    # 参数event：这个fd是什么事件，例如可调用recv接收等
    for fd, event in fd_event_list:
      # 4. 等待新客户端的链接
      if fd == tcp_server_socket.fileno():
        new_socket, client_addr = tcp_server_socket.accept()
        epl.register(new_socket.fileno(), select.EPOLLIN)
        fd_event_dict[new_socket.fileno()] = new_socket
      elif event==select.EPOLLIN:
        # 判断已经链接的客户端是否有数据发送过来
        recv_data = fd_event_dict[fd].recv(1024).decode("utf-8")
        if recv_data:
          # 5. 为这个客户端服务
          service_client(fd_event_dict[fd], recv_data)
        else:
          fd_event_dict[fd].close()
          epl.unregister(fd)
          del fd_event_dict[fd]

  # 6.关闭监听套接字
  tcp_server_socket.close()

if __name__ == "__main__":
  main()
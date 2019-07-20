import socket
import re

def service_client(new_socket):
  """为这个客户端返回数据"""

  # 1. 接收浏览器发送过来的请求，即http请求
  # GET / HTTP/1.1
  # ……
  request = new_socket.recv(1024).decode("utf-8")
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
    # 2.1 准备发送给浏览器的数据：Header
    response = "HTTP/1.1 200 OK\r\n"
    response += "\r\n"
    # 2.2 准备发送给浏览器的数据：Body
    # response += "<h1>hahaha</h1>"
    
    # 将Response Header发送给浏览器
    new_socket.send(response.encode("utf-8"))
    # 将Response Body发送给浏览器
    new_socket.send(html_content)

  # 关闭套接字
  new_socket.close()

def main():
  """用来完成整体的控制"""
  # 1. 创建套接字
  tcp_server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

  # 2. 绑定
  tcp_server_socket.bind(("", 7890))

  # 3. 变为监听套接字
  tcp_server_socket.listen(128)

  while True:
    # 4. 等待新客户端的链接
    new_socket, client_addr = tcp_server_socket.accept()

    # 5. 为这个客户端服务
    service_client(new_socket)

  # 6.关闭监听套接字
  tcp_server_socket.close()

if __name__ == "__main__":
  main()
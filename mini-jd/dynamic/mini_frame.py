import re
import urllib.parse
import json
import logging
from pymysql import connect

"""
URL_FUNC_DICT = {
  "/index.html":index,
  "/login.html":login,
  "/register.html":register,
  "/list.html":list
}
"""

URL_FUNC_DICT = dict()

def route(url):
  def set_func(func):
    # URL_FUNC_DICT["/index.html"] = index
    URL_FUNC_DICT[url] = func
    def call_func(*args, **kwargs):
      return func(*args, **kwargs)
    return call_func
  return set_func

@route(r"/index.html")
def index(ret, entry):
  with open("./templates/index.html",'r', encoding='UTF-8') as f:
    return f.read()

@route(r"/login.html")
def login(ret, entry):
  with open("./templates/login.html",'r', encoding='UTF-8') as f:
    return f.read()

@route(r"/register.html")
def register(ret, entry):
  with open("./templates/register.html",'r', encoding='UTF-8') as f:
    return f.read()

@route(r"/list.html")
def list(ret, entry):
  with open("./templates/list.html",'r', encoding='UTF-8') as f:
    return f.read()

# 给路由参数添加正则表达式的原因：在实际开发时，url中往往会带有很多的参数，例如：/add/3.html 中3 就是参数，
# 如果没有正则的话，那么就需要编写 N 次 @route 来进行添加 url 对应的函数到字典中，此时字典中的键值对有 N 个，浪费空间，
# 而采用了正则的话,那么只要编写1次 @route 就可以完成多个 url 
# 例如/add/3.html、/add/8.html 等对同一个函数，此时的字典中键值对减少很多
@route(r"/add/(\d+)\.html\?uid=(\d+)")
def add_cart(ret, entry):
  # 1. 获取商品id
  pid = ret.group(1)
  uid = ret.group(2)
  print("pid:", pid, "uid:", uid)

  # 2. 判断一下是否有这个商品
  # 创建Connection连接
  conn = connect(host='localhost',port=3306,user='root',password='123456',database='jing_dong',charset='utf8')
  # 获得Cursor对象
  cursor = conn.cursor()
  sql = "select price from goods where id=%s;"
  cursor.execute(sql, [pid])
  price = cursor.fetchone()
  # 如果要是没有这个商品，那么就认为是非法的请求
  if not price:
    cursor.close()
    conn.close()
    return "没有这个商品，大哥，我们是创业公司，请手下留情……"
  else:
    price = price[0]
    print("price:", price)

  # 3. 判断一下是否已经加入过购物车
  sql = "select d.id as detailid from carts as c,cart_detail as d where c.customer_id=%s and d.good_id=%s;"
  cursor.execute(sql, [uid,pid])
  detailid = cursor.fetchone()
  print("detailid:", detailid)

  if detailid:  # 如果加入过，就把数量+1
    detailid = detailid[0]
    print("detailid", detailid)
    sql = "update cart_detail set quantity=quantity+1 where id=%s"
    cursor.execute(sql, [detailid])
  else:  # 没加入过，就插入一条新的记录
    # 判断一下用户是否有购物车
    sql = "select id from carts where customer_id=%s"
    cursor.execute(sql, [uid])
    cartid = cursor.fetchone()
    print("cartid:", cartid)

    if not cartid:  # 如果没有购物车，就创建一个
      sql = "insert into carts values(0,%s)"
      cursor.execute(sql, [uid])
      cartid = cursor.lastrowid
    # 插入购物项
    sql = "insert into cart_detail values(0,%s,%s,1,%s)"
    cursor.execute(sql, [cartid,pid,price])
  conn.commit()
  cursor.close()
  conn.close()

  return "加入购物车成功"

@route(r"/shopcart.html\?uid=(\d+)")
def shopcart(ret, entry):
  uid = ret.group(1)
  with open("./templates/shopcart.html",'r', encoding='UTF-8') as f:
    content = f.read()

  conn = connect(host='localhost',port=3306,user='root',password='123456',database='jing_dong',charset='utf8')
  cursor = conn.cursor()

  sql = "select g.img,g.name,d.price,d.quantity from carts as c,cart_detail as d,goods as g where c.customer_id=%s and c.id=d.cart_id and d.good_id=g.id;"
  cursor.execute(sql, [uid])
  cart_infos = cursor.fetchall()

  sql = "select id,img,name,price from goods order by id desc limit 4"
  cursor.execute(sql)
  best_sellers = cursor.fetchall()

  cursor.close()
  conn.close()

  li_template = """<li class="col-md-12 cart-item-list">
          <div class="col-md-2">
            <input type="checkbox" name="items">
            <img class="p-img" src="%s" alt="商品图片">
          </div>
          <div class="col-md-4">
            <p>%s</p>
          </div>
          <div class="col-md-1 price">￥<span>%s</span></div>
          <div class="col-md-2">
            <div class="input-group">
              <span class="input-group-btn">
                <button class="btn btn-default decrease">-</button>
              </span>
              <input type="text" class="form-control" readonly="true" value="%s">
              <span class="input-group-btn">
                <button class="btn btn-default increase">+</button>
              </span>
            </div>
          </div>
          <div class="col-md-3">￥<span>%s</span></div>
        </li>
  """

  html = ""
  for line_info in cart_infos:
    html += li_template % (line_info[0],line_info[1],line_info[2],line_info[3],line_info[2]*line_info[3])
  content = re.sub(r"\{%content%\}", html, content)

  li_template = """<li class="col-lg-3 col-md-4 col-sm-4 col-xs-6 best_seller_product">
          <div class="col-md-6 best_seller_img">
            <img src="%s" alt="%s">
          </div>
          <div class="col-md-6">
            <div class="p-name">
              <a href="#">%s</a>
            </div>
            <p>￥%s</p>

            <button class="btn btn-default">
              <span class="glyphicon glyphicon-shopping-cart"></span>&nbsp;加入购物车
            </button>
          </div>
        </li>
  """

  html = ""
  for line_info in best_sellers:
    html += li_template % (line_info[1],line_info[2],line_info[2],line_info[3])
  content = re.sub(r"\{%bestseller%\}", html, content)

  return content


@route(r"/users/add.html")
def add_users(ret, entry):
  kv_dict = dict()
  info_list = entry.split("&")
  for info in info_list:
    kv = info.split("=")
    kv_dict[kv[0]] = urllib.parse.unquote(kv[1])  # kv_dict['username'] = 'abc'
  # for temp in kv_dict.items():
  #   print(temp)
  # ('username', 'aaaaaa')
  # ('password', '123456')
  # ('email', 'a%40b.com')

  conn = connect(host='localhost',port=3306,user='root',password='123456',database='jing_dong',charset='utf8')
  cursor = conn.cursor()

  # 1、查询用户是否已存在
  sql = "select * from customers where name=%s;"
  cursor.execute(sql, [kv_dict['username']])
  user = cursor.fetchone()
  if user:
    data = {"code":2,"msg":"该用户已存在！"}
  else:
    sql = "insert into customers (name,passwd,email) values(%s,MD5(%s),%s);"
    cursor.execute(sql, [kv_dict['username'], kv_dict['password'], kv_dict['email']])
    conn.commit()
    data = {"code":1,"msg":"注册成功！"}

  cursor.close()
  conn.close()

  return json.dumps(data)

def application(environ, start_response):
    start_response('200 OK', [('Content-Type', 'text/html;charset=utf-8')])

    file_name = environ['PATH_INFO']
    # file_name = "/index.html"
    params = environ['PARAMS']
    entry = environ['ENTRY']

    print("file_name:", file_name)
    print("params:", params)
    print("entry:", entry)

    """
    if file_name == '/index.html':
      return index()
    elif file_name == "/login.html":
      return login()
    elif file_name == "/register.html":
      return register()
    elif file_name == "/list.html":
      return list()
    else:
      return 'Hello World!爱你呦~'
    """

    logging.basicConfig(level=logging.INFO,  
                    filename='./log.txt',  
                    filemode='a',  
                    format='%(asctime)s - %(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s')
    logging.info("访问的是：%s" % file_name)

    try:
      # func = URL_FUNC_DICT[file_name]
      # return func()
      # return URL_FUNC_DICT[file_name]()
      for url, func in URL_FUNC_DICT.items():
        # {
        #   r/index.html":index,
        #   ……,
        #   r/add/\d+\.html":add_cart,
        # }
        if params:
          ret = re.match(url, file_name + "?" + params)
        else:
          ret = re.match(url, file_name)
        if ret:
          return func(ret, entry)
      else:
        logging.warning("没有对应的函数……")
        return "请求的url(%s)没有对应的函数...." % file_name
    except Exception as ret:
      print(ret)
      return "产生了异常：%s" % str(ret)
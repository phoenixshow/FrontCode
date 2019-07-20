from pymysql import connect

class JD(object):
  def __init__(self):
    self.is_login = False
    # 创建Connection连接
    self.conn = connect(host='localhost',port=3306,user='root',password='123456',database='jing_dong',charset='utf8')
    # 获得Cursor对象
    self.cursor = self.conn.cursor()

  def __del__(self):
    # 关闭Cursor对象
    self.cursor.close()
    # 关闭Connection对象
    self.conn.close()

  def execute_sql(self, sql):
    self.cursor.execute(sql)
    for temp in self.cursor.fetchall():
      print(temp)

  def register(self):
    username = input("请输入用户名：")
    pwd = input("请输入密码：")
    addr = input("请输入地址：")
    tel = input("请输入电话：")
    sql = "insert into customers values(0,%s,%s,%s,password(%s));"
    self.cursor.execute(sql,[username,addr,tel,pwd])
    self.conn.commit()
    print("注册成功了！")

  def login(self):
    username = input("请输入用户名：")
    pwd = input("请输入密码：")
    sql = "select id from customers where name=%s and passwd=password(%s)"
    self.cursor.execute(sql,[username, pwd])
    self.uid = self.cursor.fetchone()  # (1,)
    if self.uid:
      self.uid = self.uid[0]
      # print(self.uid)
      self.is_login = True
    return self.is_login

  def show_all_items(self):
    """显示所有的商品"""
    sql = "select * from goods;"
    self.execute_sql(sql)

  def show_cates(self):
    sql = "select name from goods_cates;"
    self.execute_sql(sql)
    
  def show_brands(self):
    sql = "select name from goods_brands;"
    self.execute_sql(sql)
    
  def add_cates(self):
    item_name = input("请输入新商品分类的名称：")
    sql = """insert into goods_cates (name) values("%s");""" % item_name
    self.cursor.execute(sql)
    self.conn.commit()
    
  def update_cates(self):
    id = 0
    while True:
      try:
        id = int(input("请输入要修改的商品分类的id："))
      except Exception as ret:
        print("请输入正确的id编号！")
      else:
        break
    item_name = input("请输入新商品分类的名称：")
    sql = """update goods_cates set name="%s" where id="%s";""" % (item_name, id)
    self.cursor.execute(sql)
    self.conn.commit()
    
  def delete_cates(self):
    id = 0
    while True:
      try:
        id = int(input("请输入要删除的商品分类的id："))
      except Exception as ret:
        print("请输入正确的id编号！")
      else:
        break
    isdel = input("您确认要删除编号为%s的商品分类吗？按y确认，其它键返回主菜单：" % id)
    if isdel == "y":
      # 方案一真删：将所有分类下商品的类别置为NULL，再删除分类
      # 方案二假删：添加是否显示该分类的字段，更新该字段为隐藏
      pass

  def get_info_by_name(self):
    find_name = input("请输入要查询的商品的名字：")
    # sql = """select * from goods where name="%s";""" % find_name
    # print("-->%s<--" % sql)
    # self.execute_sql(sql)
    sql = "select * from goods where name=%s"
    self.cursor.execute(sql,[find_name])
    print(self.cursor.fetchall())

  def create_order(self):
    pid = input("请输入商品的编号：")
    num = input("请输入商品的数量：")
    sql = "select * from goods where id=%s;"
    result = self.cursor.execute(sql,[pid])
    if result:
      sql = "insert into orders values(0,now(),%s);"
      self.cursor.execute(sql,[self.uid])
      # print("cursor.lastrowid-->", self.cursor.lastrowid)
      sql = "insert into order_detail values(0,%s,%s,%s);"
      self.cursor.execute(sql,[self.cursor.lastrowid,pid,num])
      self.conn.commit()
      print("下单成功！")
    else:
      print("您要购买的商品已下架！")

  @staticmethod
  def sys_menu():
      print("------------京东------------")
      print("1 >>> 注册")
      print("2 >>> 登录")
      print("3 >>> 退出")
      return input("请输入功能对应的序号：")

  @staticmethod
  def print_menu():
      print("")
      print("------系统菜单------")
      print("1：所有的商品")
      print("2：所有的商品分类")
      print("3：所有的商品品牌分类")
      print("4：添加商品分类")
      print("5：修改商品分类")
      print("6：删除商品分类")
      print("7：根据名字查询商品")
      print("8：下单")
      print("其他任意键：退出")
      return input("请输入功能对应的序号：")

  def run(self):
    while True:
      num = self.sys_menu()
      if num == "1":
        # 注册
        self.register()
      elif num == "2":
        # 登录
        if self.login():
          print("登录成功！")
          break
        else:
          print("用户名或密码有误，请重新输入……")
      elif num == "3":
        break
      else:
        print("输入有误，请重新输入……")

    if self.is_login:
      while True:
        num = self.print_menu()
        if num == "1":
          # 查询所有商品
          self.show_all_items()
        elif num == "2":
          # 查询分类
          self.show_cates()
        elif num == "3":
          # 查询品牌分类
          self.show_brands()
        elif num == "4":
          # 添加商品分类
          self.add_cates()
        elif num == "5":
          # 修改商品分类
          self.update_cates()
        elif num == "6":
          # 删除商品分类
          self.delete_cates()
        elif num == "7":
          # 根据名字查询商品
          self.get_info_by_name()
        elif num == "8":
          # 下单
          self.create_order()
        else:
          print("------再见------")
          break
    else:
        print("------再见------")


def main():
  # 1. 创建一个京东商城对象
  jd = JD()

  # 2. 调用这个对象的run方法，让其运行
  jd.run()

if __name__ == "__main__":
  main()
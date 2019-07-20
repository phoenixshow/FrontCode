# for temp in [11, 22, 33]:
#   print(temp)

# for temp in "abcdef":
#   print(temp)

# for temp in 100:    
#   print(temp)

# from collections import Iterable

# print(isinstance([11, 22, 33], Iterable))
# print(isinstance((11, 22, 33), Iterable))
# print(isinstance("abc", Iterable))
# print(isinstance(100, Iterable))

# a = 0
# b = 1
# print(a)

# a, b = b, a+b  # (1, 0+1)
# print(a)

# a, b = b, a+b  # (1, 0+1)
# print(a)

# a, b = b, a+b  # (1, 0+1)
# print(a)

# a = (11, 22, 33)
# print(list(a))

# nums = [x*2 for x in range(10)]
# print(nums)

# nums = (x*2 for x in range(10))
# print(nums)

# for num in nums:
#   print(num)

# import urllib.request

# req = urllib.request.urlopen("http://www.baidu.com")
# content = req.read()

# print(content)


# Python2适用
# import MySQLdb

# Python3适用
# import pymysql

# from pymysql import connect

# # 创建Connection连接
# conn = connect(host='localhost',port=3306,database='jing_dong',user='root',password='123456',charset='utf8')
# # 获得Cursor对象
# cursor = conn.cursor()

# count = cursor.execute("select * from goods;")
# print("查询到%d条数据" % count)

# # print(cursor.fetchone());
# # print(cursor.fetchone());
# # print(cursor.fetchone());
# # print(cursor.fetchone());
# # print(cursor.fetchmany());
# # print(cursor.fetchmany(3));
# # print(cursor.fetchall());
# # print(cursor.fetchall());

# # line_content = cursor.fetchone();
# # print(line_content)
# # print(line_content[0])
# # print(line_content[1])
# # print(line_content[2])

# # for temp in line_content:
# #   print(temp)

# lines = cursor.fetchmany(5);

# for temp in lines:
#   print(temp)

# # 关闭Cursor对象
# cursor.close()
# conn.close()

# # print(cursor.fetchone(), "---->");
# # count = cursor.execute("select * from goods;")

from pymysql import connect

# 创建Connection连接
conn = connect(host='localhost',port=3306,database='jing_dong',user='root',password='123456',charset='utf8')
# 获得Cursor对象
cs1 = conn.cursor()

# print(cs1.execute("""insert into goods_cates (name) values ("硬盘")"""))
# print(cs1.execute("""insert into goods_cates (name) values ("硬盘2")"""))
# print(cs1.execute("""insert into goods_cates (name) values ("硬盘3")"""))

# conn.commit()

print(cs1.execute("""insert into goods_cates (name) values ("硬盘3")"""))
print(cs1.execute("""insert into goods_cates (name) values ("硬盘4")"""))

conn.rollback()

print(cs1.execute("""insert into goods_cates (name) values ("硬盘4")"""))

conn.commit()
# def outside1(test):
#   print('执行了装饰器外部函数1')
#   def inside(*args, **kwargs):
#     print('welcome1')
#     return test(*args, **kwargs)
#   return inside

# def outside2(test):
#   print('执行了装饰器外部函数2')
#   def inside(*args, **kwargs):
#     print('welcome2')
#     return test(*args, **kwargs)
#   return inside

# @outside1
# @outside2
# def func(*args, **kwargs):
#   print(args, kwargs)

# # a = outside(func)
# # a()

# func([3,5],a=1,b=2)



# 用类对函数进行装饰
class Test(object):
  def __init__(self, func):
    self.func = func

  def __call__(self):
    print("这里是装饰器添加的功能……")
    return self.func()

@Test  # 相当于get_str = Test(get_str)
# @Test.静态方法    （扩展）
def get_str():
  return "haha"

print(get_str())
"""
nums = list()

a = 0
b = 1
i = 0
while i < 10:
    nums.append(a)
    a, b = b, a+b
    i += 1

for num in nums:
    print(num)
"""

class Fibonacci(object):
  def __init__(self, all_num):
    self.all_num = all_num
    self.current_num = 0
    self.a = 0
    self.b = 1

  def __iter__(self):
    return self

  def __next__(self):
    if self.current_num < self.all_num:
      ret = self.a

      self.a, self.b = self.b, self.a+self.b
      self.current_num += 1
      
      return ret
    else:
      raise StopIteration

fibo = Fibonacci(10)

for num in fibo:
  print(num)
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

import urllib.request

req = urllib.request.urlopen("http://www.baidu.com")
content = req.read()

print(content)
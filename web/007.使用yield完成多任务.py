import time

def task_1():
  while True:
    print("---1---")
    time.sleep(0.1)
    yield

def task_2():
  while True:
    print("---2---")
    time.sleep(0.1)
    yield

def main():
  # 此时并非函数调用，而是创建生成器
  t1 = task_1()
  t2 = task_2()
  # 先让t1运行一会儿，当t1中遇到yield的时候，再返回到这里
  # 然后执行t2，当它遇到yield的时候，再次切换到t1中
  # 这样t1/t2/t1/t2的交替运行，最终实现了多任务……协程
  while True:
    next(t1)  # 调用task_1，yield时返回
    next(t2)  # 调用task_2，yield时返回

if __name__ == "__main__":
    main()
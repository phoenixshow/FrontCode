import urllib.request
import gevent
from gevent import monkey

monkey.patch_all()

def downloader(img_name, img_url):
  req = urllib.request.urlopen(img_url)

  img_content = req.read()

  with open(img_name, "wb") as f:
      f.write(img_content)

def main():
  gevent.joinall([
    gevent.spawn(downloader, "3.png", "https://rpic.douyucdn.cn/live-cover/roomCover/2019/04/15/29d0dac1b2434ab0f0a45269d68c4c89_big.png"),
    gevent.spawn(downloader, "4.jpg", "https://rpic.douyucdn.cn/live-cover/appCovers/2019/06/12/5409054_20190612220528_small.jpg")
  ])

if __name__ == "__main__":
    main()
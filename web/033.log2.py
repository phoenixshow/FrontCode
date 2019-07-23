import logging  

# file = open("./log.txt", encoding="utf-8", mode="a")
# logging.basicConfig(level=logging.WARNING,  
#                     stream=file,  
#                     format='%(asctime)s - %(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s')  

logging.basicConfig(level=logging.WARNING,  
                    filename='./log.txt',  
                    filemode='a',  
                    format='%(asctime)s - %(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s')  
# use logging  
logging.debug('这是 loggging debug message') 
logging.info('这是 loggging info message')   
logging.warning('这是 loggging a warning message')  
logging.error('这是 an loggging error message')  
logging.critical('这是 loggging critical message')
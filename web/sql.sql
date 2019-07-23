-- 注释（单行注释）， 也可以使用#号

-- 创建数据库
create database mydatabase charset utf8;

create database `database` charset utf8;

-- 创建中文数据库
create database 中国 charset utf8;
create database `中国` charset utf8;

-- 中文字符集
set names gbk;

-- 查看所有数据库
show databases;

-- 创建数据库
create database informationtest charset utf8;

-- 查看以information_开始的数据库（_需要被转义）
show databases like 'information_%'; -- 相当于information%
show databases like 'information\_%';
show databases like '中%';

-- 查看数据库的创建语句
show create database mydatabase;
show create database `database`;

-- 查看数据库文件保存路径
show variables like 'datadir';

-- 修改数据库informationtest的字符集
alter database informationtest charset GBK;

-- 删除数据库
drop database informationtest;

-- 创建表
-- 显式地将student表放在mydatabase数据库下
create table if not exists mydatabase.student(
name varchar(10),
gender varchar(10),
number varchar(10),
age int
)charset utf8;

-- 进入数据库
use mydatabase;

-- 创建表
create table class(
name varchar(10),
room varchar(10)
)charset utf8;

-- 查看所有表
show tables;

-- 查看以s结尾的表
show tables like '%s';

-- 查看表的创建语句
show create table student;
show create table student\g
show create table student\G  -- 将查到的结构旋转90度变成纵向

-- 查看表结构
desc class;
describe class;
show columns from class;

-- 重命名表：student表 -> my_student
rename table student to my_student;

-- 修改表选项:字符集
alter table my_student charset = GBK;

-- 查看表的字段
desc my_student;

-- 给学生表增加ID，放到第一个位置
alter table my_student 
add column id int 
first;

-- 将学生表中number学号字段变成固定长度，且放到第二位（id之后）
alter table my_student modify number char(10) after id;

-- 修改学生表中的gender字段为sex
alter table my_student 
change gender sex varchar(10);

-- 删除学生表中age年龄字段
alter table my_student drop age;

-- 删除数据表
drop table class;

-- 插入数据
insert into my_student values(1,'bc20190001', 'Jim','male'),(2,'bc20190002','Lily','female');

-- 插入数据：指定字段列表
insert into my_student(number,sex,name,id) values('bc20190003','male','Tom',3),('bc20190004','female','Lucy',4);

-- 查看所有数据库
select * from my_student;

-- 查看指定字段、指定条件的数据
select id,number,sex,name from my_student where id=1;  -- 查看满足id为1的学生信息

-- 更新数据
update my_student set sex='female' where name='Jim';

-- 删除数据
delete from my_student where sex='male';

-- 插入数据（带中文）
insert into my_student values(5,'bc20190005','陈炜庭','男');

-- \x

-- 查看所有字符集
show character set;

-- 查看服务器默认的对外处理的字符集
show variables like 'character_set%';

-- 修改服务器认为的客户端数据的字符集为UTF8
set character_set_client=utf8

-- 修改服务器给定数据的字符集为utf8;
set character_set_results=utf8;

-- 快捷设置字符集
set names gbk;

-- 创建整型表
create table my_int(
int_1 tinyint,
int_2 smallint,
int_3 int,
int_4 bigint
)charset utf8;

-- 插入数据
insert into my_int values(100,100,100,100);  -- 有效数据
insert into my_int values('a','b','199','f');  -- 无效数据：类型限定
insert into my_int values(255,10000,100000,1000000); -- 错误：超出范围

-- 给表增加一个无符号类型
alter table my_int add int_5 tinyint unsigned; -- 无符号类型

-- 插入数据
insert into my_int values(127,10000,10000,100000,255);

-- 指定显示宽度为1
alter table my_int add int_6 tinyint(1) unsigned;

-- 插入数据
insert into my_int values(127,0,0,0,255,255);

-- 显示宽度为2，0填充
alter table my_int add int_7 tinyint(2) zerofill;

-- 插入数据
insert into my_int values(1,1,1,1,1,1,1);
insert into my_int values(100,100,100,100,100,100,100);

-- 浮点数表
create table my_float(
f1 float,
f2 float(10,2), -- 10位在精度范围之外
f3 float(6,2) -- 6位在精度范围之内
)charset utf8;

-- 插入数据
insert into my_float values(1000.10,1000.10,1000.10);
insert into my_float values(1234567890,12345678.90,1234.56);
insert into my_float values(3e38,3.01e7,1234.56);
insert into my_float values(9999999999,99999999.99,9999.99);

-- 超出长度插入数据
insert into my_float values(123456,1234.12345678,123.9876543); -- 小数部分可以超出长度
insert into my_float values(123456,1234.12,12345.56); -- 最后一个整数部分超出

-- 创建定点数表
create table my_decimal(
f1 float(10,2),
d1 decimal(10,2)
)charset utf8;

-- 插入数据
insert into my_decimal values(12345678.90,12345678.90); -- 有效数据
insert into my_decimal values(1234.123456,1234.123456);

-- 查看警告
show warnings;

-- 插入数据
insert into my_decimal values(99999999.99,99999999.99); -- 没有问题
insert into my_decimal values(99999999.99,99999999.999);

-- 创建时间日期表
create table my_date(
d1 datetime,
d2 date,
d3 time,
d4 timestamp,
d5 year
);

-- 插入数据
insert into my_date values('2019-07-09 15:19:36','2019-07-09', '15:19:36','2019-07-09 15:19:36', 2019);

-- 时间使用负数
insert into my_date values('2019-07-09 15:19:36','2019-07-09', '-15:19:36','2019-07-09 15:19:36', 2019);
insert into my_date values('2019-07-09 15:19:36','2019-07-09', '-215:19:36','2019-07-09 15:19:36', 2019);
insert into my_date values('2019-07-09 15:19:36','2019-07-09', '-2 15:19:36','2019-07-09 15:19:36', 2019); -- -2表示过去2天，就是48小时

-- year可以使用2位或4位
insert into my_date values('2019-07-09 15:19:36','2019-07-09', '15:19:36','2019-07-09 15:19:36', 69);
insert into my_date values('2019-07-09 15:19:36','2019-07-09', '15:19:36','2019-07-09 15:19:36', 70);

-- timestamp：修改记录
update my_date set d1='2019-07-09 20:13:15' where d5=2069

-- 创建枚举表
create table my_enum(
gender enum('男','女','保密')
)

-- 插入数据
insert into my_enum values('男'),('保密'); -- 有效数据
insert into my_enum values('male');

-- 将字段结果取出来进行+0运算
select gender + 0, gender from my_enum;

-- 数值插入枚举元素
insert into my_enum values(1),(2);

-- 创建班级表
create table my_class(
name varchar(20) not null,
room varchar(20) null -- 代表允许为空，不写默认就是允许为空
);

-- 创建表
create table my_teacher(
name varchar(20) not null comment '姓名',
money decimal(10,2) not null comment '工资'
);

-- 默认值 
create table my_default(
name varchar(20) not null,
age tinyint unsigned default 0,
gender enum('男','女','保密') default '男'
);

-- 插入数据
insert into my_default (name) values('阿闯');

insert into my_default values('男闺蜜',18,default);

-- 增加主键
create table my_pri1(
name varchar(20) not null comment '姓名',
number char(10) primary key comment '学号：bc2019+0001，不能重复'
);

-- 复合主键
create table my_pri2(
number char(10) comment '学号：bc2019+0001',
course char(10) comment '课程代码：bc2589+0001',
score tinyint unsigned default 60 comment '成绩',
-- 增加主键限制：学号和课程号应该是对应的，具有唯一性
primary key(number, course)
);

-- 追加主键
create table my_pri3(
course char(10) not null comment '课程编号：bc2589+0001',
name varchar(10) not null comment '课程名字'
);

alter table my_pri3 modify course char(10) primary key comment '课程编号：bc2589+0001';

alter table my_pri3 add primary key(course);

-- 向pri1、2表插入数据
insert into my_pri1 values('古天乐', 'bc20190001'),('蔡康永', 'bc20190002');
insert into my_pri2 values('bc20190001','bc25890001',90),
('bc20190001','bc25890002',85),
('bc20190002','bc25890001',92);

-- 主键冲突（重复）
insert into my_pri1 values('刘涛', 'bc20190002'); -- 不可以，主键冲突
insert into my_pri2 values('bc20190001','bc25890001',100);

-- 删除主键
alter table my_pri3 drop primary key;

-- 自增长
create table my_auto(
id int primary key  auto_increment comment '自动增长',
name varchar(10) not null
);

-- 触发自增长
insert into my_auto(name) values('邓丽君');
insert into my_auto values(null,'成龙');
insert into my_auto values(default,'吴绮莉');

-- 指定数据
insert into my_auto values(6,'黄晓明');
insert into my_auto values(null,'杨颖');

-- 修改表选项的值（自增长）
alter table my_auto auto_increment=4; -- 向下修改（改小）
alter table my_auto auto_increment=10; -- 向上修改（改大）

-- 查看自增长对应的变量
show variables like 'auto_increment%';

-- 修改自增长步长
set auto_increment_increment=5;  -- 一次自增5

-- 插入记录：使用自增长
insert into my_auto values(null,'蔡徐坤');
insert into my_auto values(null,'杨紫');

-- 删除自增长
alter table my_auto modify id int primary key; -- 错误：主键理论上是单独存在的
alter table my_auto modify id int;

-- 唯一键
create table my_unique1(
number char(10) unique comment '学号：唯一，允许为空',
name varchar(20) not null
);

create table my_unique2(
number char(10) not null comment '学号',
name varchar(20) not null,
-- 增加唯一键
unique key(number)
);

create table my_unique3(
id int primary key auto_increment,
number char(10) not null,
name varchar(20) not null
);

-- 追加唯一键
alter table my_unique3 add unique key(number);

-- 插入数据
insert into my_unique1 values(null,'大雄'),('bc20190001', '胖虎'),(null,'小静');
insert into my_unique1 values('bc20190001','哆啦A梦');

-- 删除唯一键
alter table my_unique3 drop index number;

-- 给my_class表增加主键
alter table my_class add primary key(name);

-- 插入数据
insert into my_class values('Python1903', 'A201');
insert into my_class values('Python1903', 'A205');

-- 主键冲突：更新
insert into my_class values('Python1903', 'A205') 
-- 冲突处理
on duplicate key update
-- 更新教室
room='A205';


insert into my_class values('Python1809', 'A203');

-- 主键冲突：替换
replace into my_class values('Python1809', 'B203');

replace into my_class values('Python1811', 'B409');

-- 复制创建表
create table my_copy like my_teacher;

alter table my_copy drop money;

-- 蠕虫复制
insert into my_copy select name from my_class;
-- 蠕虫复制
insert into my_copy select * from my_copy;

-- 更新部分班级(前三个Python1809为Java1809)
update my_copy set name='Java1809' where name='Python1809' limit 3;

-- 删除数据：限制记录数为10
delete from my_copy where name='Python1811' limit 10;

delete from my_student where id=5;

-- 给my_student表增加主键
alter table my_student modify id int primary key auto_increment;

-- 清空表：重置自增长
truncate my_student;

-- select 选项
select * from my_copy;
select all * from my_copy;

-- 去重
select distinct * from my_copy;

-- 向学生表插入数据
insert into my_student values(null,'bc20190001','张三','男'),
(null,'bc20190002','李四','男'),
(null,'bc20190003','王五','女'),
(null,'bc20190004','赵六','男'),
(null,'bc20190005','小明','男');

-- 字段别名
select 
id,
number as 学号,
name as 姓名,
sex 性别 from my_student;

-- 多表数据源
select * from my_student,my_class;

-- 子查询
select * from (select * from my_student) as s;

-- 增加age年龄和height身高字段
alter table my_student add age tinyint unsigned;
alter table my_student add height tinyint unsigned;

-- 增加字段值：rand取得一个0-1之间的随机数，floor向下取整
-- rand()*20 => 0-20 + 20 => 20-40
update my_student set age=floor(rand()*20+20),height=floor(rand()*20+170);

-- 找学生id为1、3、5的学生
select * from my_student where id=1 || id=3 || id=5; -- 逻辑判断
select * from my_student where id in(1,3,5); -- 落在集合中

-- 找身高在180-190之间的学生
select * from my_student where height>=180 and height<=190;
select * from my_student where height between 180 and 190;
select * from my_student where height between 190 and 180;
select * from my_student where 1;  -- 所有条件都满足

-- 根据性别分组
select * from my_student group by sex;

-- 分组统计：身高高矮、平均年龄、总年龄
select sex,count(*),max(height),min(height),avg(age),sum(age) from my_student group by sex;

-- 修改id为4的记录，把年龄设置为NULL
update my_student set age=null where id=4;

select sex,count(*),count(age),max(height),min(height),avg(age),sum(age) from my_student group by sex;

-- 修改id为1的记录，性别设置为女
update my_student set sex='女' where id=1;

select sex,count(*),count(age),max(height),min(height),avg(age),sum(age) from my_student group by sex desc;

alter table my_class drop primary key;
alter table my_class add id int primary key auto_increment;

alter table my_student add c_id int;
update my_student set c_id=ceil(rand()*3);

-- 多字段分组：先班级，后男女
select c_id,sex,count(*) from my_student group by c_id,sex;  -- 多字段排序

-- 多字段分组：先班级，后男女
select c_id,sex,count(*),group_concat(name) from my_student group by c_id,sex;  -- 多字段排序

-- 求出所有班级人数大于等于2的学生人数
select c_id,count(*) from my_student group by c_id having count(*)>=2;

select c_id,count(*) from my_student where count(*)>=2 group by c_id ;

select c_id,count(*) as total from my_student group by c_id having total>=2;

select c_id,count(*) as total from my_student where total>=2 group by c_id ;

-- having子句进行条件查询
select name as 名字,number as 学号 from my_student where 名字 like '张%';

-- 排序
select * from my_student group by c_id;
select * from my_student order by c_id;

-- 多字段排序：先班级排序，后性别排序
select * from my_student order by c_id,sex desc;

-- 查询学生：前两个
select * from my_student limit 2;

-- 查询学生：前两个
select * from my_student limit 0,2; -- 记录数是从0开始编号
select * from my_student limit 2,2; -- 记录数是从0开始编号
select * from my_student limit 4,2;

-- 更改ID为班级表的第一列
alter table my_class change id id int first;

-- 交叉连接
-- my_student cross join my_class是数据源
select * from my_student cross join my_class;

-- 内连接
select * from my_student inner join my_class on my_student.c_id=my_class.id;

select * from my_student inner join my_class on c_id=my_class.id;


select * from my_student inner join my_class on c_id=id;  -- 两张表都有id字段

-- 字段和表别名
select s.*,c.name as c_name,c.room from my_student as s inner join my_class as c on s.c_id=c.id;

-- 把学生表id为5的c_id设置NULL
update my_student set c_id=null where id=5;

-- where代替on
select s.*,c.name as c_name,c.room from my_student as s inner join my_class as c where s.c_id=c.id;

-- 左连接
select s.*,c.name as c_name,c.room from my_student as s left join my_class as c 
-- 左表为主表：最终记录数至少不少于左表已有的记录数
on s.c_id=c.id;

-- 右连接
select s.*,c.name as c_name,c.room from my_student as s right join my_class as c 
-- 右表为主表：最终记录数至少不少于右表已有的记录数
on s.c_id=c.id;

select s.*,c.name as c_name,c.room from my_class as c right join my_student as s 
-- 左表为主表：最终记录数至少不少于左表已有的记录数
on s.c_id=c.id;


-- 自然内连接
select * from my_student natural join my_class;

-- 修改班级表的name字段名为c_name
alter table my_class change name c_name varchar(20) not null;

-- 自然左外连接
select * from my_student natural left join my_class;

-- 外连接模拟自然外连接：using
select * from my_student left join my_class using(id);


-- 创建外键
create table my_foreign1(
id int primary key auto_increment,
name varchar(20) not null comment '学生姓名',
c_id int comment '班级id',
-- 增加外键
foreign key(c_id) references my_class(id)
);

-- 创建表
create table my_foreign2(
id int primary key auto_increment,
name varchar(20) not null comment '学生姓名',
c_id int comment '班级id'
);

-- 增加外键
alter table my_foreign2 add 
-- 指定外键名
constraint student_class_1 
-- 指定外键字段
foreign key(c_id) 
-- 引用父表主键
references my_class(id);

-- 删除外键
alter table my_foreign1 drop foreign key my_foreign1_ibfk_1;

--插入数据：外键字段在父表中不存在
insert into my_foreign2 values(null,'郭富城',4);  -- 没有4班级

insert into my_foreign2 values (null,'项羽',1);
insert into my_foreign2 values (null,'刘邦',2);
insert into my_foreign2 values (null,'韩信',2);

-- 更新父表记录
update my_class set id=4 where id=1; -- 失败：id=1的记录已经被学生引用
update my_class set id=4 where id=3; -- 可以：没有引用

-- 插入数据
insert into my_foreign1 values(null,'马超',3);

-- 增加外键
alter table my_foreign1 add foreign key(c_id) references my_class(id);

-- 创建外键：指定模式：删除置空，更新级联
create table my_foreign3(
id int primary key auto_increment,
name varchar(20) not null,
c_id int,
-- 增加外键
foreign key(c_id)
-- 引用表
references my_class(id)
-- 指定删除模式
on delete set null
-- 指定更新模式
on update cascade
);

-- 插入数据
insert into my_foreign3 values
(null,'刘备',1),
(null,'曹操',1),
(null,'孙权',1),
(null,'诸葛亮',2),
(null,'周瑜',2);

-- 解除my_foreign2表的外键
alter table my_foreign2 drop foreign key student_class_1;

-- 更新父表主键
update my_class set id=3 where id=1;

-- 删除父表主键
delete from my_class where id=2;

-- 联合查询
select * from my_class
union -- 默认去重
select * from my_class;

select * from my_class
union all -- 不去重
select * from my_class;

select id,c_name,room from my_class
union all -- 不去重
select name,number,id from my_student;

-- 需求：男生升序，女生降序（年龄）
(select * from my_student where sex='男' order by age asc limit 9999999)
union
(select * from my_student where sex='女' order by age desc limit 9999999);

-- 标量子查询
select * from my_student where c_id=(select id from my_class where c_name='Python1809');  -- id一定只有一个值（一行一列）

-- 列子查询
select * from my_student where c_id in(select id from my_class);

-- any,some,all
select * from my_student where c_id=any(select id from my_class);
select * from my_student where c_id=some(select id from my_class);
select * from my_student where c_id=all(select id from my_class);

select * from my_student where c_id!=any(select id from my_class);
select * from my_student where c_id!=some(select id from my_class);
select * from my_student where c_id!=all(select id from my_class);

select * from my_student where 
age=(select max(age) from my_student) 
and 
height=(select max(height) from my_student);

-- 行子查询
select * from my_student where
-- (age,height)称之为行元素
(age,height)=(select max(age), max(height) from my_student);

select * from my_student order by age desc,height desc limit 1;


insert into my_student values(null,'bc20190006','陈炜庭','男',52,165,1);
insert into my_student values(null,'bc20190006','陈炜','女',25,175,2);

select * from my_student group by c_id order by height desc;

-- 表子查询（每班身高最高的学生）
select * from 
(select * from my_student order by height desc limit 9999999) 
as student 
group by c_id; -- 每个班选出第一个学生

-- exists子查询
select * from my_student where 
exists(select * from my_class where id=1); -- 是否成立

select * from my_student where 
exists(select * from my_class where id=2);

-- 视图：单表+多表数据源
create view my_v1 as 
select * from my_student;

create view my_v2 as 
select * from my_class;

create view my_v3 as 
select * from my_student as s 
left join my_class as c 
on s.c_id=c.id; -- id重复

create view my_v3 as 
select s.*,c.c_name,c.room from my_student as s 
left join my_class as c 
on s.c_id=c.id;

-- 查看视图创建语句
show create view my_v3\G

-- 视图使用
select * from my_v1;
select * from my_v2;
select * from my_v3;

-- 修改视图
alter view my_v1 as
select id,name,age,sex,height,c_id from my_student;

create view my_v4 as 
select * from my_student;

-- 删除视图
drop view my_v4;

-- 多表视图插入数据
insert into my_v3 values(null,'bc20190008','张三丰','男',150,180,1,'Python1712','A204');

-- 将学生表的学号字段设置成不允许为空
alter table my_student modify number char(10) not null unique;

-- 单表视图插入数据：视图不包含所有不允许为空的字段
insert into my_v1 values(null,'张三丰',150,'男',180,1);

-- 单表视图插入数据
insert into my_v2 values(2,'Python0711','B201');

-- 多表视图删除数据
delete from my_v3 where id=1;

-- 单表视图删除数据
delete from my_v2 where id=4;

-- 多表视图更新数据
update my_v3 set c_id=3 where id=5;

-- 获取所有班级中最高的一个学生
create view my_v5 as 
select * from my_student order by height desc;

select * from my_v5 group by c_id;

-- 指定算法为临时表
create algorithm=temptable view my_v6 as 
select * from my_student order by height desc;

select * from my_v6 group by c_id;

-- 单表视图更新数据
update my_v1 set c_id=3 where id=5;

-- 创建一个账户表
create table my_account(
id int primary key auto_increment,
number char(16) not null unique comment '账户',
name varchar(20) not null,
money decimal(10,2) default 0.0 comment '账户余额'
);

-- 插入数据
insert into my_account values(null,'0000000000000001','张三',1000),
(null,'0000000000000002','李四',2000);

-- 张三转账1000元给李四
update my_account set money=money-1000 where id=1;

-- 事务安全
-- 开启事务
start transaction;
-- 事务操作：1、李四账户减少
update my_account set money=money-1000 where id=2;
-- 事务操作：2、张三账户增加
update my_account set money=money+1000 where id=1;
-- 提交事务
commit;

-- 回滚点操作
-- 开启事务
start transaction;

-- 事务处理1：张三发工资了，加钱
update my_account set money=money+10000 where id=1;

-- 设置回滚点
savepoint sp1;

-- 银行扣税
update my_account set money=money-10000*0.05 where id=2; -- 错误

-- 回滚到回滚点
rollback to sp1;

-- 继续操作
update my_account set money=money-10000*0.05 where id=1;

-- 查看结果
select * from my_account;

-- 提交结果
commit;

-- 显示系统变量'autocommit'（模糊查询）
show variables like 'autocommit';

-- 关闭事务自动提交
set autocommit=0;

-- 锁机制
start transaction;
update my_account set money=money+500 where name='张三';

update my_account set money=money+1000 where id=2;


















select g_new.cate_name,g.name,g.price 
from (select cate_name,max(price) as max_price from goods group by cate_name) as g_new 
left join goods as g 
on g_new.cate_name=g.cate_name 
and g_new.max_price=g.price 
order by g_new.cate_name;

insert into goods values(0,'东哥牌电脑','笔记本','老王','4999',default,default); 

insert into goods_cates (name) values select cate_name from goods group by cate_name;

insert into goods (name,cate_name,brand_name,price)
values('LaserJet Pro P1606dn 黑白激光打印机', 12, 4,'1849');

insert into goods (name,cate_id,brand_name,price)
values('LaserJet Pro P1606dn 黑白激光打印机', 12, 4,'1849');

alter table goods  
change brand_name brand_id int unsigned not null;

change master to master_host='192.168.164.2', master_user='slave', master_password='slave',master_log_file='flashing-bin.000001', master_log_pos=590;



create table customers(
    id int unsigned primary key auto_increment,
    name varchar(50) not null,
	address varchar(150) not null,
    tel varchar(50) not null,
	passwd varchar(50) not null
);

create table orders(
    id int unsigned primary key auto_increment,
    order_date_time datetime not null,
    customer_id int unsigned not null
);

create table order_detail(
    id int unsigned primary key auto_increment,
    order_id int unsigned not null,
    good_id int unsigned not null,
    quantity int unsigned not null comment '数量'
);

create table carts(
    id int unsigned primary key auto_increment,
    customer_id int unsigned not null
);

create table cart_detail(
    id int unsigned primary key auto_increment,
    cart_id int unsigned not null,
    good_id int unsigned not null,
    quantity int unsigned not null comment '数量',
    price decimal(10,2) not null comment '价格'
);

insert into carts values(0,2);

insert into cart_detail values(0,1,22,1,4999.000);

select * from carts as c,cart_detail as d where c.customer_id=2 and d.good_id=22;

-- 给商品表增加图片字段
alter table goods add img varchar(200);

-- 给商品表的图片字段插入数据
update goods set img="img/1.jpg" where id=1;
update goods set img="img/2.jpg" where id=2;
update goods set img="img/3.jpg" where id=3;
update goods set img="img/4.jpg" where id=4;
update goods set img="img/5.jpg" where id=5;
update goods set img="img/6.jpg" where id=6;
update goods set img="img/7.jpg" where id=7;
update goods set img="img/8.jpg" where id=8;
update goods set img="img/9.jpg" where id=9;
update goods set img="img/10.jpg" where id=10;
update goods set img="img/11.jpg" where id=11;
update goods set img="img/12.jpg" where id=12;
update goods set img="img/13.jpg" where id=13;
update goods set img="img/14.jpg" where id=14;
update goods set img="img/15.jpg" where id=15;
update goods set img="img/16.jpg" where id=16;
update goods set img="img/17.jpg" where id=17;
update goods set img="img/18.jpg" where id=18;
update goods set img="img/19.jpg" where id=19;
update goods set img="img/20.jpg" where id=20;
update goods set img="img/21.jpg" where id=21;
update goods set img="img/22.jpg" where id=22;

-- 修改商品表的图片字段不允许为空
alter table goods modify img varchar(200) not null;

-- 查询用户编号=2的购物车信息
select g.img,g.name,d.price,d.quantity from carts as c,cart_detail as d,goods as g where c.customer_id=2 and c.id=d.cart_id and d.good_id=g.id;

-- 给用户表增加邮箱字段
alter table customers add email varchar(100);

-- 修改用户表的地址电话字段允许为空
alter table customers modify address varchar(150) default NULL;
alter table customers modify tel varchar(50) default NULL;


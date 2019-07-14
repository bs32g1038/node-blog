#!/bin/bash
# 备份mongo数据
#获取当前系统时间
DATE=`date +%Y-%m-%d`
#DAYS=120代表删除120天前的备份，即只保留近120天的备份
DAYS=120
#备份全部数据库
docker-compose exec db sh -c 'exec mongodump -d blog --archive' > /www/data/mongo-backup/blog.archive
#压缩为.tar.gz格式
tar -zcvf /www/data/mongo-backup/$DATE.tar.gz /www/data/mongo-backup/
#删除120天前的备份文件
find /www/data/mongo-backup/ -mtime +$DAYS -delete
exit
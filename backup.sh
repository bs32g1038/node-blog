#!/bin/bash
# 备份mongo数据
#获取当前系统时间
DATE=`date +%Y_%m_%d`
#DAYS=120代表删除120天前的备份，即只保留近120天的备份
DAYS=120
#备份全部数据库
docker-compose exec db sh -c 'exec mongodump -d <blog> --archive' > /data/mongodb-backup
#压缩为.tar.gz格式
tar -zcvf /www/data/mongodb-backup/$DATE.tar.gz /www/data/mongodb-backup
#删除120天前的备份文件
find /www/data/mongodb-backup -mtime +$DAYS -delete
exit
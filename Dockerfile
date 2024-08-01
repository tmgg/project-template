# 阶段1 前端构建
FROM node:16-alpine as web

WORKDIR /temp

# 缓存包

ADD web/package.json .
RUN npm install


# 正式打包
ADD web/ ./
RUN npm run build

# 阶段2 打jar包
FROM maven:3-openjdk-8 as java

# 缓存jar包
WORKDIR /temp
ADD pom.xml ./pom.xml
ADD src/main/java/io/tmgg/BootApplication.java ./src/main/java/io/tmgg/BootApplication.java

RUN mvn  package -q -DskipTests=true  &&  rm -rf *

# 正式打包
ADD . .
COPY --from=web /temp/dist/ src/main/resources/static/

# -U 触发SNAPSHOT下载
RUN mvn clean  package -q -U -DskipTests=true &&  mv target/app.jar /home/app.jar &&   rm -rf *

# 阶段3 运行环境, 减少镜像大小
FROM openjdk:8-alpine

# 安装字体 （如果使用服务端字体渲染服务，如流程引擎的图片渲染）
#RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && apk add --update ttf-dejavu fontconfig && rm -rf /var/cache/apk/*
#ADD asserts/fonts/ /usr/share/fonts/chinese/
#ADD asserts/fonts/ /$JAVA_HOME/jre/lib/fonts/

# 复制安装包
COPY --from=java /home/app.jar /home/app.jar

EXPOSE 80


ENTRYPOINT java \
                # 随机数
                -Djava.security.egd=file:/dev/./urandom \
                # 时区
                -Duser.timezone=Asia/Shanghai \
                -jar /home/app.jar \
                --spring.profiles.active=prod

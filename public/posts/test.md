## 提示信息
使用`AMD 7950X`初次构建`LibreOffice`大约需要 25 分钟

`/cygdrive/c/build`即`Windows`文件管理器 `C`盘的`build`文件夹

需要关掉杀毒或添加白名单，否则会误报并且删文件而造成失败

## 编译环境
- 系统：`Windows 11 64 位`
- CPU：`AMD 7950X`
- Visual Studio 2022

## 需要安装的依赖
- Visual Studio 2022 或 2019
- JAVA
- Cygwin 和其他依赖
- Python3（可选，用于构建 VS 的解决方案项目文件）

## 步骤
### Visual Studio 2022
安装`VS 2022`，参考[官网文档](https://wiki.documentfoundation.org/Development/BuildingOnWindows)勾选相关依赖（或者使用 [Visual Studio 2022 Build Tools](https://visualstudio.microsoft.com/zh-hans/downloads/))

或者使用`VS 2019`相应的依赖

### Python 3（可选）
在应用商店搜索并安装

### JAVA
下载安装 [OpenJDK 17.0.5 LTS](https://aka.ms/download-jdk/microsoft-jdk-17.0.5-windows-x64.msi)（或者是大于 V9 版本的 JAVA JDK）

### 安装 Cygwin 和其他依赖
或者使用 [lode](https://wiki.documentfoundation.org/Development/lode) 简化下列安装

1. 下载 [Cygwin](https://cygwin.com/setup-x86.exe)
2. 切换到下载文件目录，使用`cmd`执行下面的命令安装`Cygwin`
```cmd
setup-x86_64.exe -P autoconf -P automake -P bison -P cabextract -P doxygen -P flex -P gcc-g++ ^
                -P gettext-devel -P git -P gnupg -P gperf -P make -P mintty ^
                -P nasm -P openssh -P openssl -P patch -P perl -P python -P python3 ^
                -P pkg-config -P rsync -P unzip -P vim -P wget -P zip -P perl-Archive-Zip ^
                -P perl-Font-TTF -P perl-IO-String
```
3. 打开`Cygwin64 Terminal`
4. 安装`GUN Make`
```bash
mkdir -p /opt/lo/bin
cd /opt/lo/bin
wget https://dev-www.libreoffice.org/bin/cygwin/make-4.2.1-msvc.exe
cp make-4.2.1-msvc.exe make
chmod +x make
```
5.  安装`ant`和`junit`（也可以使用更高版本，需要自行修改命令）
```bash
mkdir -p /cygdrive/c/sources
  cd /cygdrive/c/sources
  wget https://archive.apache.org/dist/ant/binaries/apache-ant-1.9.5-bin.tar.bz2
  tar -xjvf apache-ant-1.9.5-bin.tar.bz2
  wget http://downloads.sourceforge.net/project/junit/junit/4.10/junit-4.10.jar
```
6. 下载 [LibreOffice 7.5.0.1](https://git.libreofficechina.org/core/snapshot/core-libreoffice-7.5.0.1.tar.gz)源码并解压到`/cygdrive/c/build`（如果放到其他目录，下面的路径也需要跟着修改）

```base
mkdir -p /cygdrive/c/build && tar -zxf core-libreoffice-7.5.0.1.tar.gz -C /cygdrive/c/build
```

### 编译
使用`Cygwin64 Terminal`，切换到`/cygdrive/c/build`目录（或者其他有 LibreOffice 源码的目录）

### 配置构建文件
运行以下代码
```bash
/cygdrive/c/build/libreoffice-7.5.0.1/autogen.sh --enable-debug --with-external-tar=/cygdrive/c/sources/lo-externalsrc --with-junit=/cygdrive/c/sources/junit-4.10.jar --with-ant-home=/cygdrive/c/sources/apache-ant-1.9.5 --enable-pch --disable-ccache --with-visual-studio=2022 --disable-online-update --with-jdk-home='/cygdrive/c/Program Files/Microsoft/jdk-17.0.5.8-hotspot'
```

过程中需要下载一些文件，可能速度较慢

其中`--enable-debug`是生成调试用的符号文件

需要注意的是使用`--with-visual-studio`和`-with-jdk-home`指定`VS`和`JAVA JDK`目录

其他参数可以通过 `--help`参数查询

### 进行构建
执行`/opt/lo/bin/make gb_COLOR=1 2>&1 | tee build.log`

如果报错：
```
/usr/bin/sh: C:/build/libreoffice-7.5.0.1/sources.ver: No such file or directory
Makefile:258: *** Error while retrieving $lo_sources_ver from C:/build/libreoffice-7.5.0.1/sources.ver.  Stop.
```

说明缺少`sources.ver`文件，在相应位置创建一个纯文本文件，内容为`lo_sources_ver=7.5.0.1`（如果是其他版本，修改为相应的版本）

`2>&1 | tee build.log`的意思是将错误消息（stderr）和正常消息（stdout）存储到`build.log`文件里

成功后生成的文件在`instdir/program/soffice.exe`

### 构建 VS 解决方案项目文件（可选）
需要安装`Python 3`

运行`/opt/lo/bin/make vs-ide-integration`

成功后在`/cygdrive/c/build`生成`LibreOffice.sln`文件

#### 调试步骤
1. 启动生成的 soffice.exe 程序
2. 使用 Visual Studio 打开源码目录（或`LibreOffice.sln`文件）
3. 在`objstor`文件的`DoLoad`函数添加断点（574 行）
4. 打开菜单栏的**调试**菜单项里面的**附加到进程**（英文版为：Debug ▸ Attach to Process），搜索选择`soffice.bin`。
5. 确认`soffice.bin`的符号已经加载（检查方式：菜单栏的**调试**菜单项里面的**窗口**里面的**模块**，快捷键为`Ctrl + Alt + U`）
6. 打开一个文档，看看是否停在了断点上

## 参考地址
- [官网 build 文档](https://wiki.documentfoundation.org/Development/BuildingOnWindows)
- [windows 编译 libreoffice 环境搭建](https://bbs.libreofficechina.org/forum.php?mod=viewthread&tid=2876)
- [LibreOffice 源码下载](https://www.libreofficechina.org/source-code/)
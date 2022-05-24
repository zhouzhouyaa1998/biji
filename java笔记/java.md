# java

- 后端实现步骤：先启动 nginx.exe(双击)先在 ideal 码代码，在登录市场平台，然后在后台管理业务管理进行配置，在去我的商机-业务规则-选择业务方发——设置节点属性、规则属性。然后在流程设计。
- 方法名首个单词字母小写，其次单词字母大写。
- &&:与 ||:或者
- 判断为空或者为空字符串
  - `str == null;`取地址来比较
  - `"".equals（str）；`用值来比较
  - 正确的写法是 if（str1==null||str1.equals（""））{ //所以在判断字符串是否为空时，先判断是不是对象，如果是，再判断是不是空字符串 }
- 判断一个字符串是否为空，首先就要确保他不是 null,然后再判断他的长度。

  - String str = xxx;
  - if（str != null && str.length（） != 0） { }

- @RequestMapping 和@GetMapping 的区别

  - 在 spring4.3 之后，提供了@GetMapping 注解方便了开发。@RequestMapping 可以指定请求方式，get（查询请求）,post（插入请求）,put（修改请求）,delete（删除请求）。按照规范是这样使用的。@GetMapping 等价于@RequestMapping 的 get 请求方法。

- @ApiOperation：用在请求的方法上，说明方法的用途、作用，使用@ApiOperation 注解用来描述我们写的接口
  - value="说明方法的用途、作用"
  - notes="方法的备注说明
  - @ApiOperation("商机生成商机生命周期表单")

```js
@ApiImplicitParams：用在请求的方法上，表示一组参数说明

         @ApiImplicitParam：用在@ApiImplicitParams注解中，指定一个请求参数的各个方面

name：参数名

value：参数的汉字说明、解释

required：参数是否必须传，默认false

paramType：参数放在哪个地方，查询参数类型，这里有几种形式：

header --> 请求参数的获取：@RequestHeader，参数在request headers 里边提交

query --> 请求参数的获取：@RequestParam，直接跟参数，完成自动映射赋值

path（用于restful接口）--> 请求参数的获取：@PathVariable，以地址的形式提交数据

body（不常用）--> 以流的形式提交 仅支持POST

form（不常用）--> 以form表单的形式提交 仅支持POST

dataType：参数类型，默认String，其它值dataType="Integer"

defaultValue：参数的默认值
原文链接：https://blog.csdn.net/weixin_44299027/article/details/104495194
例子：
@ApiImplicitParams(@ApiImplicitParam(name = "reviewId", value = "参数1", dataType = "String", paramType = "query", required = true))
```

- 日志打印是 java 代码开发中不可缺少的重要一步。日志可以排查问题，可以搜集数据。
  `log.info("createOpportunityLifecycle:"+projectId);`

```js
@RequestParam 使用须知
使用@RequestParam注解将请求参数绑定至方法参数
即
你可以使用@RequestParam注解将请求参数绑定到你控制器的方法参数
@RequestParam 有三个属性：
（1）value：请求参数名（必须配置）
（2）required：是否必需，默认为 true，即 请求中必须包含该参数，如果没有包含，将会抛出异常（可选配置）
（3）defaultValue：默认值，如果设置了该值，required 将自动设为 false，无论你是否配置了required，配置了什么值，都是 false（可选配置）
具体配置方法：
（1）配置一个属性
@RequestParam("") 或 @RequestParam(value="")
（2）配置多个属性
@RequestParam(value="", required=true, defaultValue="")


如果请求参数中的userId是纯数字，那么使用@RequestParam时，可以根据自己的需求将方法参数类型设置为Long、Integer、String，他将自动进行类型转换。
public ResponseResult<String> createOpportunityLifecycle(@RequestParam(value = "projectId", required = true) String projectId){}
```

- 在 HashMap 的底层存在着⼀个名字为 table 的 Entry 数组，在实例化 HashMap 的时候，会输⼊两个参数，⼀个是 int initCapacity（初始化
  数组⼤⼩，默认值是 16），⼀个是 float loadFactor（负载因⼦，默认值 0.75）

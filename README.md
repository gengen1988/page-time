Page Time
=======

追踪页面区域停留时间

用法:

第一步，引入依赖

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.slim.js">
</script>
<script src="http://page-time.k8s.vilsale.com/tracking.js"></script>
```

第二步，在要追踪的标签上加入 class

```html
<div class="tracker area-1">
  <p>本脚本可以追踪这句话停留在浏览器上的时长</p>
</div>
```

第三步，启动追踪

```html
<script>
tracking('http://page-time.k8s.vilsale.com/')
</script>
```

第四步，查看效果

> 待补充

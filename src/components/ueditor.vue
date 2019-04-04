<template>
  <div>
    <el-select ref="select" v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <script id="editor" type="text/plain" ></script>
  </div>
</template>

<style lang="">
  #editor{
    width: 500px;
    height: 200px;
  }
</style>

<script>
import '../../static/ueditor/ueditor.config.js';
import '../../static/ueditor/ueditor.all.js';
import '../../static/ueditor/lang/zh-cn/zh-cn.js';

export default {
  name: 'Ueditor',
  data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
  },
  created () {
    let vm = this;
    console.log(window);
    let editor = UE.getEditor('editor', {
      toolbars: [[
          'fullscreen', 'source', '|', 'undo', 'redo', '|',
          'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
          'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
          'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
          'directionalityltr', 'directionalityrtl', 'indent', '|',
          'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
          'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
          'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
          'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
          'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
          'print', 'preview', 'searchreplace', 'drafts', 'help'
      ]]
    });
    editor.addListener("ready", function () {
        function HTMLDecode(text) { 
            var temp = document.createElement("div"); 
            temp.innerHTML = text; 
            var output = temp.innerText || temp.textContent; 
            temp = null; 
            return output; 
        } 
        let html = '<p>&lt;p&gt;&lt;img src=&quot;http://demo-dx.geostar.com.cn:17082/fileServer/ueditor/jsp/upload/image/20190320/1553062091001040291.png&quot; title=&quot;&quot; alt=&quot;QQ图片20190319175033.png&quot;/&gt;&lt;/p&gt;</p>';
        html = HTMLDecode(html);
        editor.setContent(html);
    });
    editor.addListener("click",function(){
        vm.$refs.select.blur();
    })
  }
}
</script>

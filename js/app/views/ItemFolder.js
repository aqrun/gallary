/**
 * 文件夹视图
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'EJS',
  'domReady!'
], function($, _, Backbone, EJS){
  window.gallary = window.gallary || {};

  return Backbone.View.extend({
    tagName: "div",
    className: "item ui-widget-content ui-selectee",
    templateId: "itemTemplateFol",
    initialize: function(){
      _.bindAll(this,"rightClick","clickSelected");
      this.listenTo(this.model, "change", this.render);
    },
    events: {
      "click": "clickFunc",
      "mouseup .folder": "rightClick"
    },
    clickFunc: function(e){
      this.clickSelected(e);
    },
    //右键点击事件
    rightClick: function(e){
      //this.clickSelected(e);
      if(e.which == 3){
        this.clickSelected(e);
        gallary.rightMenu.folderShow(e);
      }
    },
    //添加选中状态class
    clickSelected: function(e){
      $("#J_SelectAll")[0].checked = false;//取消全选
      if(!gallary.ctrl){
        gallary.selectedItems.singleAdd(this.model);//向已选择集合添加当前
        gallary.itemCollection.unSelect();  //取消数据集合中所有项的选中状态
      }else{
        gallary.selectedItems.add(this.model);
      }
      this.model.select();   //改变当前项模型数据
    },
    render:function(){
      var self = this;
      var html = new EJS({element:self.templateId}).render(this.model.toJSON());
      this.$el.html(html);
      if(this.model.get("selected")){
        this.$el.addClass("ui-selected");
      }else{
        this.$el.removeClass("ui-selected");
      }
      return this;
    }
  });
});
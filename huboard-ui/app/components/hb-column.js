import Ember from "ember";

var ColumnComponent = Ember.Component.extend({
  board: Ember.inject.service(),
  sortable: Ember.inject.service(),
  classNames: ["column"],

  issues: function(){
    var column = this.get("column");
    var issues = this.get("board.combinedIssues");
    return issues.filter(function(i){
      return i.column.index === column.index;
    }).sort(this.sortStrategy);
  }.property("board.model.combinedIssues.@each.{columnIndex,order}"),

  appendToSortable: function(){
    this.get("sortable.columns").pushObject(this);
    this.get("sortable").append(this);
  }.on("didInsertElement"),

  sortStrategy: function(a,b){
    return a._data.order - b._data.order;
  }
});

export default ColumnComponent;

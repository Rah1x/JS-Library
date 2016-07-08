var x={
run1:function(){
alert('a');
},

run2:function(){
this.run1();
}
};

x.run2();
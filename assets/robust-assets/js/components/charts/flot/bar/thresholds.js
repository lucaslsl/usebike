$(window).on("load",function(){function a(a){$.plot("#thresholds",[{data:b,color:"#37bc9b",threshold:{below:a,color:"#da4453"},lines:{steps:!0}}],{grid:{borderWidth:1,borderColor:"#e9e9e9",color:"#999",minBorderMargin:20,labelMargin:10,margin:{top:8,bottom:20,left:20}}})}for(var b=[],c=0;c<=60;c+=1)b.push([c,parseInt(30*Math.random()-10)]);a(0)});
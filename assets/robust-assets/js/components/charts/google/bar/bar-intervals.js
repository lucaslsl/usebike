function drawBarIntervals(){var a=new google.visualization.DataTable;a.addColumn("number","x"),a.addColumn("number","values"),a.addColumn({id:"i0",type:"number",role:"interval"}),a.addColumn({id:"i1",type:"number",role:"interval"}),a.addColumn({id:"i2",type:"number",role:"interval"}),a.addColumn({id:"i2",type:"number",role:"interval"}),a.addColumn({id:"i2",type:"number",role:"interval"}),a.addColumn({id:"i2",type:"number",role:"interval"}),a.addRows([[1,100,90,110,85,96,104,120],[2,120,95,130,90,113,124,140],[3,130,105,140,100,117,133,139],[4,90,85,95,85,88,92,95],[5,70,74,63,67,69,70,72],[6,30,39,22,21,28,34,40],[7,80,77,83,70,77,85,90],[8,100,90,110,85,95,102,110]]);var b={curveType:"function",series:[{color:"#f4a911"}],intervals:{style:"bars"},height:400,fontSize:12,chartArea:{left:"5%",width:"90%",height:350},vAxis:{gridlines:{color:"#e9e9e9",count:5},minValue:0},hAxis:{gridlines:{color:"#e9e9e9",count:5},minValue:.5,maxValue:8.5},legend:{position:"top",alignment:"center",textStyle:{fontSize:12}}},c=new google.visualization.LineChart(document.getElementById("bar-intervals"));c.draw(a,b)}google.load("visualization","1.0",{packages:["corechart"]}),google.setOnLoadCallback(drawBarIntervals),$(function(){function a(){drawBarIntervals()}$(window).on("resize",a),$(".menu-toggle").on("click",a)});
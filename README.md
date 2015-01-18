[![Build Status](https://travis-ci.org/robertoladd/crononode.svg)](https://travis-ci.org/robertoladd/crononode)

# crononode v0.3.0
Crononode is a node.js module that allows you to measure the average time that it takes for a specific section of your code to run.

Crononode will print to console timing statistics of your defined code sections.

##Usage

Initialize module with a new instance:
```node
crononode = new Crononode(5);

```

By default crononode will print statistics every 5 seconds, to change this interval pass the desired value in seconds as the first parameter. Use cero to disable periodic logging.

Define as many code sections as you want using start and end methods. Set a unique name for each section:

```node
crononode.start('loop-inspection');
  
for(var i=0;i<10;i++){
    the_array[i]=[];
  
    for(var j=0;j<d2;j++){
        the_array[i][j]=i*j;
    }
}
    
crononode.end('loop-inspection');

```


##Example code
```node
var Crononode = require("./crononode");

crononode = new Crononode(5);



function make2DArray(d1, d2){
    var the_array = [];
    
    crononode.start('fill-array');
    
    for(var i=0;i<d1;i++){
        the_array[i]=[];
        
        for(var j=0;j<d2;j++){
            the_array[i][j]=i*j;
        }
    }
    
    crononode.end('fill-array');
    
    crononode.start('fill-string');
    
    var the_string ='';
    for(i in the_array){
        the_string += "\n";
        for(j in the_array[i]){
            the_string += the_array[i][j]+"\t";
        }
    }
    
    crononode.end('fill-string');
    
    return the_string;

}



var wait = 1000;

for(var d=0;d<100;d++){
    setTimeout(function(d){
        console.log(make2DArray(d, d));
    }, wait, d);
    
    wait +=1000;
}

```

/**
 *
 * @source: https://github.com/robertoladd/crononode
 *
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 * Copyright (C) 2015 Roberto Ladd
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */


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
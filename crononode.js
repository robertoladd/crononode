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


function Crononode(stats_period){

        /**
        * Object - containing the current code time inspections data
        */
       
	this.inspections = {};
        
        /**
        * Integer - The default number of seconds between every stats log. 
        */
        
        this.stats_period = 5;
        
        if(typeof stats_period === 'number') this.stats_period = stats_period;
        
        /**
         * Interger - Stats interval ID
         */
        
        this.stats_interval_id = false;
        
        /**
         * Initiate periodic log stats
         */
        
        this.periodicStats();
        
}


/**
* Starts a new code timing inspection
*
* @param  {String} html
* @return {String}
*/

Crononode.prototype.start = function(ref_name){
	if(typeof stats_period == 'undefined') stats_period = this.stats_period;
        if(typeof ref_name !== 'string') throw new Error('A reference name string must be defined for every inspection');
        
        //Create the new inspection
        if(typeof this.inspections[ref_name] == 'undefined'){
            this.inspections[ref_name] = {};
            this.inspections[ref_name]['interval_spent_time'] = 0;//time spent within current interval
            this.inspections[ref_name]['interval_iterations'] = 0;//number of code section excecutions within the current interval
            this.inspections[ref_name]['interval_avg_spent_time'] = 0;//the average spent time within the current interval
            this.inspections[ref_name]['total_spent_time'] = 0;//the total spent time
            this.inspections[ref_name]['total_iterations'] = 0;//the total code section excecutions
            this.inspections[ref_name]['total_avg_spent_time'] = 0;//the total average spent time
        }
        
        this.inspections[ref_name]['previous_start'] = (new Date).getTime();
        
        return true;
}

/**
* Ends a timing inspection code section
*
* @param  {String} html
* @return {String}
*/

Crononode.prototype.end = function(ref_name){
        if(typeof ref_name !== 'string') throw new Error('A reference name string must be defined for every inspection');
        
        //Create the new inspection
        if(typeof this.inspections[ref_name] !== 'object'){
            throw new Error('Attempting to end a non started ref_name ('+ref_name+') inspection.');
        }
        
        //calculate current iteration value
        var current_iteration_time = (new Date).getTime() - this.inspections[ref_name]['previous_start'];
        
        //measure inspection values
        this.inspections[ref_name]['interval_spent_time']+=current_iteration_time;
        this.inspections[ref_name]['interval_iterations']++;
        this.inspections[ref_name]['total_spent_time']+=current_iteration_time;
        this.inspections[ref_name]['total_iterations']++;
        this.inspections[ref_name]['total_avg_spent_time'] =  
            (this.inspections[ref_name]['total_spent_time'] / this.inspections[ref_name]['total_iterations'])+'ms';
        
        return current_iteration_time;
}


/**
* Log stats periodically
*
* @return {Integer}
*/

Crononode.prototype.periodicStats = function(){
        var crono_instance = this;
        this.stats_interval_id = setInterval(function(crono_instance){
            
            for(inspection in crono_instance.inspections){
                crono_instance.inspections[inspection]['interval_avg_spent_time'] = 
                    (crono_instance.inspections[inspection]['interval_spent_time'] / crono_instance.inspections[inspection]['interval_iterations'])+'ms';
                console.log(inspection+' inspection stats:');
                for(stat in crono_instance.inspections[inspection]){
                    console.log("\t "+stat+": "+crono_instance.inspections[inspection][stat]);
                }
                //reset data for periodic stats
                crono_instance.inspections[inspection]['interval_avg_spent_time']=0;
                crono_instance.inspections[inspection]['interval_spent_time']=0;
                crono_instance.inspections[inspection]['interval_iterations']=0;
            }
            
        }, (this.stats_period * 1000), crono_instance);
}


/**
* Clear periodical Log stats
* 
*/

Crononode.prototype.clearPeriodicStats = function(){
        if(!this.stats_interval_id) throw new Error('Attempt to clear a non existent Interval');
        clearInterval(this.stats_interval_id);
}


module.exports = Crononode;
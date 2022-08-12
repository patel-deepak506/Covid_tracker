'use strict'

// select elements 
const selectState = document.getElementById('state');
const tested = document.getElementById('tested');
const confirmed = document.getElementById('confirmed');
const recovered = document.getElementById('recovered');
const allStateslist = document.querySelectorAll('.form-check-input');
const logoutBtn = document.getElementById('logoutBtn');
var totalState = (allStateslist.length)+1

// // logout Button 
logoutBtn.addEventListener('click' , function(e) {
    console.log("fkjldalk");
    sessionStorage.removeItem('login')
})


// make list of active , confirmed and recovred
let activelist =[];
let confirmedlist = [];
let recoveredlist = [];
const allStateName = ["SS", "AN","AP", "AR","AS","BR","CH","CT","DL","DN","GA","GJ","HP","HR","JH","JK","KA","KL",
                  "LD","MH","ML","MN","MP","MZ","NL","OR","PB","PY","RJ","SK","TG","TN","TR","UP","UK","WB" ]

// sum of all active , confirmed and recovred
let sumActive = 408326;
let sumConfirmed = 31141976;
let sumRecovred = 30297939;

// fetch data in Api By fetch methord
fetch("https://api.covid19india.org/state_district_wise.json").then(res=>{return res.json()})
.then(allData=>{
    let count = 0;
    let allStActive = 0;
    let allStConfirom = 0;
    let allStRecovered = 0;
    for (let index in allData) {
        // console.log(index);
        count++
       let district ;
        for (let state in allData[index]) {
            district=state
            break  
        }
        let activeData = 0;
        let confirmedData = 0;
        let recoveredData = 0;
        for (let distic in allData[index][district]) {
            let disticData = allData[index][district][distic];
                activeData += disticData.active;
                confirmedData += disticData.confirmed;
                recoveredData += disticData.recovered;
        } 
        // send dictic data in list
        activelist.push(activeData);
        confirmedlist.push(confirmedData);
        recoveredlist.push(recoveredData);

        // add all district data
        allStActive += activeData;
        allStConfirom += confirmedData;
        allStRecovered += recoveredData;
    }
 
// set data on fronts
  selectState.innerHTML= count;
  tested.innerHTML= allStActive;
  confirmed.innerHTML= allStConfirom;
  recovered.innerHTML= allStRecovered;

// Graphical Representation
  var options = {
    series: [{
    name: 'Active Case',
    data:  activelist //[44, 55, 41, 37, 22, 43, 21]
  }, {
    name: 'Confirmed Case',
    data:  confirmedlist //[53, 32, 33, 52, 13, 43, 32]
  }, {
    name: 'Tested Case',
    data: recoveredlist //[12, 17, 11, 9, 15, 11, 20]
  }],
    chart: {
    type: 'bar',
    height: 900,
    stacked: true,
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  stroke: {
    width: 1,
    colors: ['#fff']
  },
  title: {
    text: 'Covid 19 Tracker'
  },
  xaxis: {
    categories:allStateName, //[2008, 2020, 2010, 2011, 2012, 2013, 2014],
    labels: {
      formatter: function (val) {
        return val + ""
      }
    }
  },
  yaxis: {
    title: {
      text: undefined
    },
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + ""
      }
    }
  },
  fill: {
    opacity: 1
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    offsetX: 40
  }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
})

// set Data on browser 
for(let index=0 ; index<allStateslist.length ; index++){
    
    allStateslist[index].addEventListener('click' , function(){
        if(allStateslist[index].checked){
            totalState += 1;
            selectState.innerHTML = totalState ;
            
            //Active  Case 
            tested.innerHTML = sumActive + activelist[index+1];
            sumActive += activelist[index+1] ;
            // Confirmed Case
            confirmed.innerHTML = sumConfirmed + confirmedlist[index+1];
            sumConfirmed += confirmedlist[index+1] ;
            //Recover Case 
            recovered.innerHTML = sumRecovred + recoveredlist[index+1];
            sumRecovred += recoveredlist[index+1] ;
        }else{
            totalState -= 1 ;
            selectState.innerHTML = totalState ;

            // Active Case
            tested.innerHTML = sumActive - activelist[index+1];
            sumActive -= activelist[index+1] ;
            confirmedlist
            //Confirmed Case
            confirmed.innerHTML = sumConfirmed - confirmedlist[index+1];
            sumConfirmed -= confirmedlist[index+1] ;
            //Recover Case
            recovered.innerHTML = sumRecovred - recoveredlist[index+1];
            sumRecovred -= recoveredlist[index+1] ;
        }
    })
}


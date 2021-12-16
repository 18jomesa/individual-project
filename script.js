//const chartjs = require('chart.js');
let returncount = 0;
const supersector = {
"00": "Total nonfarm",
"05": "Total private",
"06": "Goods-producing",
"07": "Service-providing",
"08": "Private service-providing",
"10": "Mining and logging",
"20": "Construction",
"30": "Manufacturing",
"31": "Durable Goods",
"32": "Nondurable Goods",
"40": "Trade, transportation and utilities",
"41": "Wholesale trade",
"42": "Retail Trade",
"43": "Transportaion and warehousing",
"44": "Utilities",
"50": "Information",
"55": "Financial activities",
"60": "Professional and business services",
"65": "Education and health services",
"70": "Leisure and hospitality",
"80": "Other services",
"90": "Government",
}

// These are colors from chart.js utils
let Supersector_Keys = Object.keys(supersector);
    const CHART_COLORS = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)',
      brown: 'rgb(165,42,42)',
      tan: 'rgb(210,180,140)',
      lightgray: 'rgb(211,211,211)',
      pink: 'rgb(255,192,203)',
      lavender: 'rgb(230,230,250)',
      darkblue: 'rgb(0,0,139)',
      lightgreen: 'rgb(144,238,144)',
      coral: 'rgb(255,127,80)',
      crimson: 'rgb(220,20,60)',
      darkred: 'rgb(139,0,0)',
      orangered: 'rgb(255,69,0)',
      darkgreen: 'rgb(0,100,0)',
      lightblue: 'rgb(173,216,230)',
      plum: 'rgb(221,160,221)',
      hotpink: 'rgb(255,105,180)',

    };
//    console.dir(CHART_COLORS);
let CHART_COLORS_Keys = Object.keys(CHART_COLORS)
    const CHART_COLORS_50_Percent = {
      red: 'rgba(255, 99, 132, 0.5)',
      orange: 'rgba(255, 159, 64, 0.5)',
      yellow: 'rgba(255, 205, 86, 0.5)',
      green: 'rgba(75, 192, 192, 0.5)',
      blue: 'rgba(54, 162, 235, 0.5)',
      purple: 'rgba(153, 102, 255, 0.5)',
      grey: 'rgba(201, 203, 207, 0.5)',
      brown: 'rgb(165, 42, 42, 0.5)',
      tan: 'rgb(210, 180, 140, 0.5)',
      lightgray: 'rgb(211, 211, 211, 0.5)',
      pink: 'rgb(255, 192, 203, 0.5)',
      lavender: 'rgb(230, 230,250, 0.5)',
      darkblue: 'rgb(0, 0, 139, 0.5)',
      lightgreen: 'rgb(144, 238, 144, 0.5)',
      coral: 'rgb(255, 127, 80, 0.5)',
      crimson: 'rgb(220, 20, 60, 0.5)',
      darkred: 'rgb(139, 0, 0, 0.5)',
      orangered: 'rgb(255, 69, 0, 0.5)',
      darkgreen: 'rgb(0, 100, 0, 0.5)',
      lightblue: 'rgb(173, 216, 230, 0.5)',
      plum: 'rgb(221,160, 221, 0.5)',
      hotpink: 'rgb(255, 105, 180, 0.5)',

    };
//    console.log(CHART_COLORS_50_Percent);
//    end utils

let CHART_COLORS_50_Percent_Keys= Object.keys(CHART_COLORS_50_Percent)
    const data = {
      labels: [],
      datasets: []
    };
  //  console.dir(data);

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Number of Employees in Thousands'
          }
        }
      }
    };
//    console.log(config);
function responseReceivedHandler() {
    if (this.status == 200){
      console.log(this.response);
      let sectorline= {
        label: "",
        data:[],
        borderColor: "",
        backgroundColor:"",
        hidden:true
      }

    let dataArray= this.response.Results.series[0].data;
    let seriesID= this.response.Results.series[0].seriesID

      sectorline.label= (supersector[seriesID.substring(3,5)])
      sectorline.borderColor= (CHART_COLORS[CHART_COLORS_Keys[returncount]])
      sectorline.backgroundColor=(CHART_COLORS_50_Percent[CHART_COLORS_50_Percent_Keys[returncount]])


    for (let i = dataArray.length - 1; i >= 0; i--){
        sectorline.data.push(dataArray[i].value)
        if (returncount==0){
                  data.labels.push(dataArray[i].periodName + " " + dataArray[i].year)
      }
    }

    data.datasets.push(sectorline)
    returncount++

       if (returncount == Supersector_Keys.length){
          const myChart = new Chart(
          document.getElementById('myChart'),
          config);
       }
       } else{
        console.log("error");
      }
    }


for (let i=0; i < Supersector_Keys.length; i++){

  let xhr = new XMLHttpRequest();

  xhr.addEventListener("load", responseReceivedHandler);

  xhr.responseType="json";

  let starting= "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU";

  let key= "";

  let ending= "00000001?registrationkey=" + key;

  xhr.open("GET", starting+ Supersector_Keys[i] + ending)

  xhr.send();

}

//    console.dir(myChart);

//    console.log("Ending"

# Kenya-Covid-Stats Dashboard
https://kenyacovid19.herokuapp.com

Lets first go through what I’ll be using to build this.Ill use bootsrap for fast and easy styling and design
Chart js for the chart.it provides open soirce html charts.It has quite amazing charts with diferent variations.ill have the lnk in the description so chaeck it out.
Materialize css.its also a bootsrap framework but ill use it for this pulsating icons and coloring of the three cards
Count up js for animatitong this numerical data

# HTML PART 1

so we have our container,give it a border solid green.I do this to identify any errors in the layoout but ill remove it once its satisying.So inside the container,we have h1 Covid 19 Stats.Below it a row to display flex with border red.then the dateupdate with margin-left 35px.another row for the chart and poster.Finally the footer

<div class="container" style="border:solid green">
<h1>Kenya Covid 19 Stats</h1>

<div class="row d-flex" style="border: solid red;">

</div>

<h3 id="dateUpadte" style="margin-left: 35px;">
</h3>
<div class="row d-flex" style="border: solid brown;">

</div>


</div>
<footer>DevNgecu &copy; 2020.All Rights Reserved | Privacy Policy</footer>



-----------------------------------------------------------------------

<div class="container">
    <h1>Kenya Covid 19 Stats</h1>
    
    <div class="row d-flex bd-highlight">
        <div class="col s12 m6 l4 p-2 flex-fill bd-highlight">
           
          <div class="card yellow accent-4 " style="border-bottom: solid white 10px;">
            <div class="card-content white-text" >
              <span class="card-title">Confirmed Cases</span>
              <p id="confirmedValue" class="Value">0 </p>
            </div>
            <div class="card-action">
                <a class="btn-floating pulse  green lighten-5"> </a> live
              
            </div>
          </div>
        </div>

        <div class="col s12 m6 l4 p-2 flex-fill bd-highlight">
            <div class="card light-green accent-4" style="border-bottom: solid white 10px;">
              <div class="card-content white-text">
                <span class="card-title">Recovered</span>
               <p id="recoveredValue">0</p>
              </div>
              <div class="card-action">
                <a class="btn-floating pulse"><i class="fab fa-creative-commons-sampling-plus"></i> </a>
              </div>
            </div>
          </div>

          <div class="col s12 m6 l4 p-2 flex-fill bd-highlight">
            <div class="card red accent-4" style="border-bottom: solid white 10px;">
              <div class="card-content white-text">
                <span class="card-title">Deaths</span>
               <p id="deathsValue">0</p> 
              </div>
              <div class="card-action">
                <a class="btn-floating pulse"><i class="fas fa-viruses"></i> </a>
              </div>
            </div>
          </div>
      </div>
      <h3 id="dateUpdate" style="margin-left: 35px;"></h3>

      <style>
        
         #mapid{
          width: 600px;
          margin: 10px 10px;
          height: 400px;
          background-image:url('https://ewscripps.brightspotcdn.com/dims4/default/55e59a6/2147483647/strip/true/crop/1280x720+0+0/resize/1280x720!/quality/90/?url=https%3A%2F%2Fewscripps.brightspotcdn.com%2F9b%2F1c%2Fd6365aa54b5687a3cb1386a180db%2Fupdate-coronavirus-colorado-live-blog-covid19.png') ;
          background-size: cover;
          border-radius: 50px;
        }
       
        footer{
          position: fixed;
          bottom: 0;
          width: 100vw;
          text-align: center;
        }
       
      </style>
    
    <div class="row d-flex bd-highlight" >
        
        <div class="col s6 m6 l4 p-2 flex-fill bd-highlight" id="chart">
          <canvas id="myChart"></canvas>
        </div>
        
        <div class="col s6 m6 l4 p-2 flex-fill bd-highlight" id="mapid"> </div>
      </div>
      
    </div>
          
      <footer>DevNgecu &copy; 2020.All Rights Reserved | Privacy Policy</footer>

    ------------------------------------------------------------------

So what I just did.in my three columns, I added a card with border bottoms of 10px white.I find white ryhming and universal for our colouring.content of title ,value and the pulse icon.For the other row.the send div to have a background image that covers to fill well

# JavaScript

The fetch(url) returns a Promise object. It allows attaching “listener” to it using .then(…) that can respond to result value (response to the request). The .then(…) returns again Promise object that will give result forward.
So lets fetch our api endpoint
fetch('https://covid19.mathdro.id/api/countries/KE')
take in the response by attaching a .then listener.Lets first console to confirm we get back the response from the url
fetch('https://covid19.mathdro.id/api/countries/KE')
.then(response =>{
console.log(response)
})

Its all good returning a 200 status indicating success response to our request.if any errors were to occur it should return a 404 status.Lets try that out
We will now take the reponse,read it and return a promise that resolves with with the result of parsing the body text as JSON,then pass in the data to console log it
fetch('https://covid19.mathdro.id/api/countries/KE')
.then(response =>{
return response.json()
})
.then(data =>{
console.log(data)
})
incaase of any error we can also console it with the .catch method
.catch(err => {
console.log(err)
})

Lets now fill the divs with requirerd data from the url.
For the Last update , we will create a date object and pass in the the date atrribute from our url data.Theb capture the div id dateupdate,this one and assign the object date to the its innerHTML context.but we will stringfy for easy readability.
var d = new Date(data.lastUpdate);
var dateUpdate = document.querySelector('#dateUpdate');
dateUpdate.innerHTML = "Last Update : " + d.toDateString();

For the cards we will now use the count up js for animation.so create a new CountUP object and pass the element id that you want the counter to run, follow by the start,stop value and andimation duration..Then start rhe count up.
var confirmed = new CountUp("confirmedValue", 0,data.confirmed.value, 0, 2.5);
confirmed.start();

Ill fast track for the rest of divs.So that we can jump into the chart.
For our chart we will apply it in a canvas as indicated from the html,assining it to a variable ctx
The.getContext() method returns a drawing context on the canvas,
var ctx = document.getElementById('myChart').getContext('2d');
we will then repaeat the fetching process,so ill fast track again
inside out function,will create a chart object passing the canvas element and the chart property children with is of json type.
new Chart(ctx, { }
So the chart is of type bar with data of labels,dataset which is an array
type: 'bar',
data: {
labels: ['],
datasets: [{}]
},

next if our chart options :responsive,aspect ratio of height and width,and the axes scales
options: {
responsive:,
aspectRatio:,
scales: {
yAxes: [{

}
}],
xAxes: [{
}
}]
}
}

Lets now roll back on the data.Starting off are the labels which on hover indicates which bar it represents.It is just and array of the three datas:Confrimed Cases', 'Reocovered Cases', 'Deaths
labels: ['Confrimed Cases', 'Reocovered Cases', 'Deaths'],

For out dataset we will label is covid 19.You can have multiple data to display.This toggles witch data to display to the data, just like that.
label: 'Covid 19',
next is our data which is also an array from the url values.
data: [data.confirmed.value, data.recovered.value, data.deaths.value],
Moving on is our background,border colours and borderwidth for our bars
backgroundColor: [
'rgba(255, 99, 132, 0.2)',
'rgba(54, 162, 235, 0.2)',
'rgba(255, 206, 86, 0.2)'
],
borderColor: [
'#ffd600',
'rgba(54, 162, 235, 1)',
'rgba(255, 206, 86, 1)',
],
borderWidth: 1

Now for  our chart options,it should be responsive,having aspect raion of 1
responsive:true,
aspectRatio:1,

The scales should be ticks with white color and the y-axis to begin at 0
scales: {
yAxes: [{
ticks: {
beginAtZero: true,
fontColor: "white",
}
}],
xAxes: [{
ticks: {
fontColor: "white",
}
}]
}

There you have a complete simple webpage,fully responsive and smart.In my next video ill be uploading it to the cloud using heroku for the world to be ablr to access it.

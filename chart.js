
var ctx = document.getElementById('myChart').getContext('2d');
 
fetch('https://covid19.mathdro.id/api/countries/KE')
// Replace ./data.json with your JSON feed
.then(response => {
return response.json()
})
.then(data => {
    console.log(data.confirmed.value)
// Work with JSON data here
var myChart = new Chart(ctx, {
    
    type: 'bar',
    data: {
        labels: ['Confrimed', 'Deaths', 'Recovered'],
        datasets: [{
            label: 'Covid 19',
            data: [data.confirmed.value, data.recovered.value, data.deaths.value],
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
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

var confirmed = new CountUp("confirmedValue", 0,data.confirmed.value, 0, 2.5);
confirmed.start();

var recovered = new CountUp("recoveredValue", 0,data.recovered.value, 0, 2.5);
recovered.start();

var deaths = new CountUp("deathsValue", 0,data.deaths.value, 0, 2.5);
deaths.start();

})


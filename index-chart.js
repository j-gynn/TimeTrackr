//PLUGIN MODIFIED FROM CHART.JS
//REQUIRES CHART.JS TO FUNCTION

// Creates the animation for the load (source unknown)
Chart.defaults.RoundedDoughnut = Chart.helpers.clone(Chart.defaults.doughnut);
Chart.controllers.RoundedDoughnut = Chart.controllers.doughnut.extend({
    draw: function (ease) {
        var ctx = this.chart.ctx;
        var easingDecimal = ease || 1;
        var arcs = this.getMeta().data;
        Chart.helpers.each(arcs, function (arc, i) {
            arc.transition(easingDecimal).draw();

            var pArc = arcs[i === 0 ? arcs.length - 1 : i - 1];
            var pColor = pArc._view.backgroundColor;

            var vm = arc._view;
            var radius = (vm.outerRadius + vm.innerRadius) / 2;
            var thickness = (vm.outerRadius - vm.innerRadius) / 2;
            var startAngle = Math.PI - vm.startAngle - Math.PI / 2;
            var angle = Math.PI - vm.endAngle - Math.PI / 2;

            ctx.save();
            ctx.translate(vm.x, vm.y);

            ctx.fillStyle = i === 0 ? vm.backgroundColor : pColor;
            ctx.beginPath();
            ctx.arc(radius * Math.sin(startAngle), radius * Math.cos(startAngle), thickness, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = vm.backgroundColor;
            ctx.beginPath();
            ctx.arc(radius * Math.sin(angle), radius * Math.cos(angle), thickness, 0, 2 * Math.PI);
            ctx.fill();

            ctx.restore();
        });
    }
});

var pieChart;
var pieData = {
    labels: [
    ],
    datasets: [
        {
            data: [],
            borderWidth: 0,
            backgroundColor: [
                "#4D9366",
                "#52B788",
                "#4E8878",
                "#6697A3",
                "#87B8DB",
                "#BADEFC",
                "#A4B6CB",
                "#2A2D34"
            ],
            hoverBackgroundColor: [
                "#5DA376",
                "#62C798",
                "#5E9888",
                "#76A7B3",
                "#97C8EB",
                "#CAEEFF",
                "#B4C6DB",
                "#3A3D44"
            ]
        }
    ]
}

// generating the chart
function generateChart() {
    var ctx = document.getElementById("pieChart");
    pieChart = new Chart(ctx, {
        type: 'pie',
        options: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 10,
                    fontStyle: 'italic',
                    fontColor: '#2A2D34',
                    usePointStyle: true,
                }
            },
            //animation: {
            //    onComplete: function (animation) {
            //        alert(animation);
            //    }
            //}
        },
        data: pieData,
    });
}

//populating the data
function updatePieData(timeframe) {
    let dataSource = new Object;
    switch (timeframe) {
        case true:
            dataSource = todayData;
            break;
        case false:
            dataSource = allData[userID].data;
    }

    let cumulativeData = [
        ["Games", 0],
        ["Movies/TV", 0],
        ["Social Media", 0],
        ["Reading", 0],
        ["Exercise", 0],
        ["Art/Music", 0],
        ["Hobby", 0],
        ["Other", 0]

    ]

    //sorts all the time into its categories
    try {
        for (i = 0; i < Object.keys(dataSource).length; i++) {
            switch (dataSource[i].Application) {
                case "Games":
                    cumulativeData[0][1] += dataSource[i].PlayMins;
                    break;
                case "Movies/TV":
                    cumulativeData[1][1] += dataSource[i].PlayMins;
                    break;
                case "Social Media":
                    cumulativeData[2][1] += dataSource[i].PlayMins;
                    break;
                case "Reading":
                    cumulativeData[3][1] += dataSource[i].PlayMins;
                    break;
                case "Exercise":
                    cumulativeData[4][1] += dataSource[i].PlayMins;
                    break;
                case "Art/Music":
                    cumulativeData[5][1] += dataSource[i].PlayMins;
                    break;
                case "Hobby":
                    cumulativeData[6][1] += dataSource[i].PlayMins;
                    break;
                case "Other":
                    cumulativeData[7][1] += dataSource[i].PlayMins;
                    break;
            }
        }
    }
    catch {
    }
    

    //sorts the data, longest time first
    let sortedByTime = cumulativeData.sort((a, b) => b[1] - a[1]);

    pieData.labels.length = 0;


    //if the datasets are empty
    if (sortedByTime[0][1] == 0) {
        pieData.labels.length = 0;
        pieData.datasets[0].data.length = 0;

        document.getElementById("noPieData").style.display = "block";
    } else {
        for (i = 0; i < 8; i++) {
            pieData.labels[i] = sortedByTime[i][0];
            pieData.datasets[0].data[i] = sortedByTime[i][1];
            document.getElementById("noPieData").style.display = "none";
        }
    }

    updateChart();
}

function updateChart() {

    pieChart.data = pieData;
    pieChart.update();
}

function toggleTimeframe() {
    updatePieData(document.getElementById("timeDisplay").checked);
}
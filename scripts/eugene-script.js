function add() {
    let tracking = `<div class="track">
    <button class="close" onclick=deletetracking()>X</button>
    <label for="companyid">Company ID</label>
    <input type="text" id="companyid" class="companyid">

    <button type="submit" class="search" onclick=search()>Search</button><br>
    <label for="queueid">Queue ID</label>
    <select name="queueid" id="queueid" class="queueid">
        <option value="1">hello</option>
    </select>

    <label for="hide">Hide inactive</label>
    <input type="checkbox" name="hide" id="hide">
</div>`
    document.getElementById("add").insertAdjacentHTML("beforebegin", tracking)
    console.log("Add new tracking")
}

function search() {
    var companyid = $(".companyid").val();
    console.log(companyid);
    var numberofQueue = []
    $.ajax({
        url: `http://localhost:8080/company/queue?company_id=${companyid}`,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            var $dropdown = $(".queueid");
            $dropdown.empty()
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].queue_id);
                numberofQueue.push(data[i].queue_id)
                $dropdown.append(`<option value=${numberofQueue[i]}>${numberofQueue[i]}</option>`);
            }
            var ctx = document.getElementById('myChart');
                    var myLineChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: numberofQueue,
                            datasets: [{
                                label: '# of Customers in Queue${will be added}',
                                data: [12, 19, 3, 5, 2, 3],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1,
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
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
            alert("Function got error");
        }
    })
}

function deletetracking() {
    $(".close").click(function () {
        console.log("yeet")
        $(".track").remove()
    })
}
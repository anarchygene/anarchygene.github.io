var j = 0
add = () => {
    let tracking = `<div class="track${j}">
                        <button class="close${j}" onclick=deletetracking(${j})>X</button>
                        <label for="companyid">Company ID</label>
                        <input type="text" id="companyid" class="companyid${j}">

                        <button type="submit" class="search${j}" onclick=searchqueue(${j})>Search</button><br>
                        <label for="queueid">Queue ID</label>
                        <select name="queueid" id="queueid" class="queueid${j}">
                            <option value="1">hello</option>
                        </select>

                        <label for="hide">Hide inactive</label>
                        <input type="checkbox" name="hide" id="hide">
                        <canvas id="myChart" width="400" height="400"></canvas>
                    </div>`
    document.getElementById("add").insertAdjacentHTML("beforebegin", tracking)
    console.log(`Add new tracking ${j}`)
    j++;
}

searchqueue = (id) =>{
    for (let i = 0; i < j; i++) {
        if (i == id) {
            var companyid = $(`.companyid${id}`).val();
            console.log(companyid);
            var numberofQueue = []
            $.ajax({
                url: `http://localhost:8080/company/queue?company_id=${companyid}`,
                type: 'GET',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                success: function (data, textStatus, xhr) {
                    var $dropdown = $(`.queueid${id}`);
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
    }
}

deletetracking = (id) => {
    for (let i = 0; i < j; i++) {
        if (i == id) {
            console.log(`Removed tracking ${id}`)
            $(`.track${id}`).remove()
        }
    }
}

check = () => {
    console.log(`Total number of tracks ${document.querySelectorAll('[class*="track"]').length}`);
}
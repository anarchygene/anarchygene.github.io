var j = 0

//add new tracking
add = () => {
    let tracking = `<div class="track" id="track${j}">
                        <button class="close" id="close${j}" onclick=deletetracking(${j})>X</button>
                        <label for="companyid">Company ID</label>
                        <input type="text" id="companyid${j}" class="companyid">
                        <div id="loader" class="lds-dual-ring hidden overlay"></div>
                        <button type="submit" class="search" id="search${j}" onclick=searchqueue(${j})>Search</button><br>
                        <label for="queueid">Queue ID</label>
                        <select name="queueid" id="queueid${j}" class="queueid">
                        </select>

                        <label for="hide">Hide inactive</label>
                        <input type="checkbox" name="hide" id="hide${j}" checked>
                        <canvas id="myChart" width="400" height="400"></canvas>
                    </div>`
    document.getElementById("addtrack").insertAdjacentHTML("beforebegin", tracking)
    console.log(`Add new tracking ${j}`)
    j++;
}

//get queue
searchqueue = (id) =>{
    for (let i = 0; i < j; i++) { 
        if (i == id) {
            var companyid = $(`#companyid${id}`).val();
            console.log(companyid);
            var numberofQueue = []
            $.ajax({
                url: "http://localhost:8080/company/queue",
                data: {"company_id":companyid},
                type: 'GET',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                beforeSend: function () { // Before we send the request, remove the .hidden class from the spinner and default to inline-block.
                    $('#loader').removeClass('hidden')
                },
                success: function (data, textStatus, xhr) {
                    //companyid not found
                    if (data.length == 0){
                        alert("Company ID not found")
                    }
                    else{
                        var $dropdown = $(`#queueid${id}`);
                        $dropdown.empty()
                        $('#loader').addClass('hidden')
                        for (let i = 0; i < data.length; i++) {
                            console.log(data[i].queue_id);
                            numberofQueue.push(data[i].queue_id)
                            //deactivate inactive queues
                            if ($(`#hide${id}`).prop('checked')) {
                                if (data[i].is_active == 1) {
                                    $dropdown.append(`<option value=${numberofQueue[i]}>${numberofQueue[i]}</option>`);
                                }
                                else {
                                    continue
                                }
                                console.log("check")
                            }
                            else {
                                if (data[i].is_active == 1) {
                                    $dropdown.append(`<option value=${numberofQueue[i]}>${numberofQueue[i]}</option>`);
                                }
                                else {
                                    $dropdown.append(`<option value=${numberofQueue[i]}>${numberofQueue[i]} - inactive</option>`);
                                }
                                console.log("no")
                            }
                        }

                        //graph
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
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    switch(xhr.status){
                        case 400: alert("Invalid Company ID"); console.log('Invalid Company ID entered'); break;
                        case 500: alert(xhr.responseJSON.error); console.log(xhr.responseJSON.error); break;
                        default: alert("Error"); console.log('Error in Operation');
                    }
                }
            })
        }
    }
}

//delete tracking
deletetracking = (id) => {
    for (let i = 0; i < j; i++) {
        if (i == id) {
            console.log(`Removed tracking ${id}`)
            $(`#track${id}`).remove()
        }
    }
}

//check total active tracking
check = () => {
    console.log(`Total number of tracks ${document.querySelectorAll('[class="track"]').length}`);
}
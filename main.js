let API_KEY = 'PJyPXUePYzdgvLkbRw52';
let xLabels = [];
let yPrices = [];


function init() {
    fetchAPI();
    document.getElementById('showSection').classList.add('dnone');
    document.getElementById('canvasBox').classList.add('dnone');
}


async function fetchAPI() {
    let today = new Date();
    today.setDate(new Date().getDate() - 1);
    let startDate = today.toISOString().split('T')[0];
    let endDate = today.toISOString().split('T')[0];
    let url = (`https://www.quandl.com/api/v3/datasets/BITFINEX/BTCUSD?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`);
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let placeholder = document.getElementById('placeholder');
    placeholder.innerHTML = responseAsJson['dataset']['data'][0][3];
}


async function fetchBitcoinCourse() {
    if (document.getElementById('startInp').value == 0) {
        document.getElementById('getDateButton').disabled = true
        alert('Select "start date" & "end date"');
        location.reload();
    }
    showDates();
    let url = (`https://www.quandl.com/api/v3/datasets/BITFINEX/BTCUSD?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`);
    let response = await fetch(url);
    let responseAsJson = await response.json();
    showDailyPrice(responseAsJson);
}


function showDailyPrice(responseAsJson) {
    let bitcoinPrices = responseAsJson['dataset']['data'];
    console.log('dayrange', bitcoinPrices);
    pushDia(bitcoinPrices);
    let newPlaceholder = document.getElementById('newPlaceholder');
    newPlaceholder.innerHTML = '';
    newPlaceholder.innerHTML += `
        <tr>
            <th>Date</th>
            <th>Price</th>
        </tr>
    `;
    for (let index = 0; index < bitcoinPrices.length; index++) {
        let bitcoinPrice = bitcoinPrices[index];
        let date = new Date(bitcoinPrice[0]);
        date = date.toLocaleDateString();
        newPlaceholder.innerHTML += `
            <tr>
                <td>${date}</td>
                <td>${bitcoinPrice[3]} $</td>
            </tr>
        `;
    }
    showDailyPrice2();
}


function showDailyPrice2(){
    document.getElementById('showSection').classList.remove('dnone');
    document.getElementById('canvasBox').classList.remove('dnone');
    document.getElementById('newDate').innerHTML = ``;
    document.getElementById('newDate').innerHTML = /*html*/`
    <a class="newresearch" href="index.html">New Research</a>
    `;
    document.getElementById('newDate').classList.add('newresearch2');
}


function pushDia(bitcoinPrices) {
    for (let index = bitcoinPrices.length - 1; index >= 0; index--) {
        const bitcoinPrice = bitcoinPrices[index];
        xLabels.push(bitcoinPrice[0]);
        yPrices.push(bitcoinPrice[3]);
    }
    showChart();
}


function showDates() {
    startDate();
    endDate();
}


function startDate() {
    return startDate = document.getElementById('startInp').value;
}


function endDate() {
    return endDate = document.getElementById('endInp').value;
}


function showChart() {
    let canvas = document.getElementById('myChart');
    let ctx = canvas.getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xLabels,
            datasets: [{
                label: 'DAILY PRICE IN US-DOLLAR',
                data: yPrices,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
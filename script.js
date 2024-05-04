
const apiUrl='https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'

function fetchDataThen(){
    fetch(apiUrl)
    .then(response=>response.json())
    .then(data=>renderTable(data));
}

async function fetchDataAsync(){
    const response=await fetch(apiUrl);
    const data=await response.json();
    renderTable(data);
}

function renderTable(data){
//const tableBody=document.getElementById('tableBody');
 tableBody.innerHTML="";



    data.forEach(item=>{
        const row=document.createElement('tr');
        row.innerHTML=`
        <td><img src="${item.image}">${item.name} </td>
        <td>${item.id} </td>
        <td><img src="${item.image}" style="width:30px";height:30px;"></td>
        <td>${item.symbol}</td>
        <td>${item.current_price}</td>
        <td>${item.total_volume}</td>
        <td>${item.market_cap}</td>
        <td>${item.price_change_percentage_24h}</td>`;
      tableBody.appendChild(row);
    });
};



function searchData(){
    const input=document.getElementById('searchInput').value.toLowerCase();
    const rows=document.querySelectorAll('#tableBody tr');
    rows.forEach(row =>{
        const found=Array.from(row.children).some(cell=>cell.textContent.toLowerCase().includes(input));
        row.style.display=found?'':'none';
    });
}

function sortData(key){
    const table=document.getElementById('cryptoTable');
    const rows=Array.from(table.querySelectorAll('tBody tr'));

    rows.sort((a,b)=>{
        const aValue=parseFloat(a.children[key=='market_cap'? 6:7].textContent.replace(/[$,]/g,''));

        const bValue=parseFloat(b.children[key=='market_cap'? 6:7].textContent.replace(/[$,]/g,''));

        return key==='market_cap'?bValue-aValue:aValue-bValue;
    });

    rows.forEach(row=>table.querySelector('tbody').appendChild(row));
}
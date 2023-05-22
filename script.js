const URL = "https://api.thingspeak.com/channels/2156931/feeds.json?results=10";
async function makeAPIcall(){
    var moist = [];
    var pH = [];
    let http = new XMLHttpRequest();
    http.open('get',URL,true);
    http.send();
    http.onload = function(){
        let feed = JSON.parse(this.responseText);
        for(i=0;i<10;i++){
            moist.push(parseInt(feed['feeds'][i]['field1']));
            pH.push(parseFloat(feed['feeds'][i]['field2'].replace(/(\r\n|\n|\r)/gm, '')));
        }
        let table = document.getElementById('table');
        let s = `
            <table>
                <thead>
                    <th>
                        Id
                    </th>
                    <th>
                        moisture
                    </th>
                    <th>
                        pH Value
                    </th>
                </thead>
                <tbody>
        `;
        for(i = 0; i<10; i++){
            s += `
                <tr>
                    <td>
                        ${i+1}
                    </td>
                    <td>
                        ${moist[i]}
                    </td>
                    <td>
                        ${pH[i]}
                    </td>
                </tr>
            `;
        }
        s+=`
                </tbody>
            </table>
        `;     
        table.innerHTML = s;
    }
}
var myVar = setInterval(makeAPIcall(), 15000);
var idVenFor = "R01135";
var idNorKr = "R01535";
function httpGet()
{
    var theUrl = "https://www.cbr.ru/scripts/XML_daily.asp";
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            //получаем в результате успешного запроса тело страницы html, парсим его и дальше разбираем на то, что нам нужно
            //находим нужные нам поля по классу элемента, они статичны и на разных продуктах одни и те же
            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(xmlhttp.responseText, 'text/html');
            console.log(htmlDoc);

            var venForValue = parseFloat(htmlDoc.getElementById(idVenFor).lastChild.textContent.replace(',','.')).toFixed(3);
            var venForNominal = parseFloat(htmlDoc.getElementById(idVenFor).getElementsByTagName("Nominal")[0].textContent.replace(',','.')).toFixed(3);

            var norKrValue = parseFloat(htmlDoc.getElementById(idNorKr).lastChild.textContent.replace(',','.')).toFixed(3);
            var norKrNominal = parseFloat(htmlDoc.getElementById(idNorKr).getElementsByTagName("Nominal")[0].textContent.replace(',','.')).toFixed(3);

            var venForInput = parseFloat(document.getElementById("linkText").value.replace(',','.')).toFixed(3);
            if(isNaN(venForInput)) {
                alert("Input value must be a number!");
            }else {
                var rubValue = (venForValue / venForNominal) * venForInput;
                var norKrResult = (rubValue / (norKrValue / norKrNominal)).toFixed(3);
                console.log(venForValue);
                console.log(venForNominal);
                console.log(norKrValue);
                console.log(norKrNominal);
                console.log(rubValue);
                console.log(norKrResult);

                document.getElementById("result").textContent = "The result of norvegian krons is - " + norKrResult;
            }
            return xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", theUrl, false );
    xmlhttp.send();
}

//##############################################################################
//Gwt
Gwt = new Object ();
//End Gwt
//###############################################################################
//###########################################################################
//Gwt::Core
Gwt.Core = {
    PARAM_TYPE_JSON: 0,
    PARAM_TYPE_FILE: 1,
    REQUEST_METHOD_GET : "GET",
    REQUEST_METHOD_POST : "POST"
};

Gwt.Core.Contrib = new Object ();
Gwt.Core.Contrib.Protocol = window.location.protocol;
Gwt.Core.Contrib.HostName = window.location.hostname;
Gwt.Core.Contrib.Port = window.location.port;
Gwt.Core.Contrib.Host = Gwt.Core.Contrib.Protocol + "//"+Gwt.Core.Contrib.HostName+":"+Gwt.Core.Contrib.Port+"/";
Gwt.Core.Contrib.Backend = Gwt.Core.Contrib.Host + "backend/";
Gwt.Core.Contrib.Frontend = Gwt.Core.Contrib.Host + "frontend/";
Gwt.Core.Contrib.Share = /*Gwt.Core.Contrib.Host*/ "../share/";
Gwt.Core.Contrib.Images = Gwt.Core.Contrib.Share + "images/system/";

Gwt.Core.Contrib._ActiveApp = null;

Gwt.Core.Math = {};
Gwt.Core.Math.Round = function (value, decimals) 
{
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
};

Gwt.Core.Contrib.COUNTRIES_ISO =  [
    {"Text":  "Afghanistan",  "Value": "AF"},
    {"Text":  "Albania",  "Value": "AL"},
    {"Text":  "Algeria",  "Value": "DZ"},
    {"Text":  "American Samoa",  "Value": "AS"},
    {"Text":  "Andorra",  "Value": "AD"},
    {"Text":  "Angola",  "Value": "AO"},
    {"Text":  "Anguilla",  "Value": "AI"},
    {"Text":  "Antarctica",  "Value": "AQ"},
    {"Text":  "Antigua and Barbuda",  "Value": "AG"},
    {"Text":  "Argentina",  "Value": "AR"},
    {"Text":  "Armenia",  "Value": "AM"},
    {"Text":  "Aruba",  "Value": "AW"},
    {"Text":  "Australia",  "Value": "AU"},
    {"Text":  "Austria",  "Value": "AT"},
    {"Text":  "Azerbaijan",  "Value": "AZ"},
    {"Text":  "Bahamas",  "Value": "BS"},
    {"Text":  "Bahrain",  "Value": "BH"},
    {"Text":  "Bangladesh",  "Value": "BD"},
    {"Text":  "Barbados",  "Value": "BB"},
    {"Text":  "Belarus",  "Value": "BY"},
    {"Text":  "Belgium",  "Value": "BE"},
    {"Text":  "Belize",  "Value": "BZ"},
    {"Text":  "Benin",  "Value": "BJ"},
    {"Text":  "Bermuda",  "Value": "BM"},
    {"Text":  "Bhutan",  "Value": "BT"},
    {"Text":  "Bolivia",  "Value": "BO"},
    {"Text":  "Bonaire",  "Value": "BQ"},
    {"Text":  "Bosnia and Herzegovina",  "Value": "BA"},
    {"Text":  "Botswana",  "Value": "BW"},
    {"Text":  "Bouvet Island",  "Value": "BV"},
    {"Text":  "Brazil",  "Value": "BR"},
    {"Text":  "British Indian Ocean Territory",  "Value": "IO"},
    {"Text":  "Brunei Darussalam",  "Value": "BN"},
    {"Text":  "Bulgaria",  "Value": "BG"},
    {"Text":  "Burkina Faso",  "Value": "BF"},
    {"Text":  "Burundi",  "Value": "BI"},
    {"Text":  "Cambodia",  "Value": "KH"},
    {"Text":  "Cameroon",  "Value": "CM"},
    {"Text":  "Canada",  "Value": "CA"},
    {"Text":  "Cape Verde",  "Value": "CV"},
    {"Text":  "Cayman Islands",  "Value": "KY"},
    {"Text":  "Central African Republic",  "Value": "CF"},
    {"Text":  "Chad",  "Value": "TD"},
    {"Text":  "Chile",  "Value": "CL"},
    {"Text":  "China",  "Value": "CN"},
    {"Text":  "Christmas Island",  "Value": "CX"},
    {"Text":  "Cocos (Keeling) Islands",  "Value": "CC"},
    {"Text":  "Colombia",  "Value": "CO"},
    {"Text":  "Comoros",  "Value": "KM"},
    {"Text":  "Congo",  "Value": "CG"},
    {"Text":  "Democratic Republic of the Congo",  "Value": "CD"},
    {"Text":  "Cook Islands",  "Value": "CK"},
    {"Text":  "Costa Rica",  "Value": "CR"},
    {"Text":  "Croatia",  "Value": "HR"},
    {"Text":  "Cuba",  "Value": "CU"},
    {"Text":  "Curasao",  "Value": "CW"},
    {"Text":  "Cyprus",  "Value": "CY"},
    {"Text":  "Czech Republic",  "Value": "CZ"},
    {"Text":  "Cate d'Ivoire",  "Value": "CI"},
    {"Text":  "Denmark",  "Value": "DK"},
    {"Text":  "Djibouti",  "Value": "DJ"},
    {"Text":  "Dominica",  "Value": "DM"},
    {"Text":  "Dominican Republic",  "Value": "DO"},
    {"Text":  "Ecuador",  "Value": "EC"},
    {"Text":  "Egypt",  "Value": "EG"},
    {"Text":  "El Salvador",  "Value": "SV"},
    {"Text":  "Equatorial Guinea",  "Value": "GQ"},
    {"Text":  "Eritrea",  "Value": "ER"},
    {"Text":  "Estonia",  "Value": "EE"},
    {"Text":  "Ethiopia",  "Value": "ET"},
    {"Text":  "Falkland Islands (Malvinas)",  "Value": "FK"},
    {"Text":  "Faroe Islands",  "Value": "FO"},
    {"Text":  "Fiji",  "Value": "FJ"},
    {"Text":  "Finland",  "Value": "FI"},
    {"Text":  "France",  "Value": "FR"},
    {"Text":  "French Guiana",  "Value": "GF"},
    {"Text":  "French Polynesia",  "Value": "PF"},
    {"Text":  "French Southern Territories",  "Value": "TF"},
    {"Text":  "Gabon",  "Value": "GA"},
    {"Text":  "Gambia",  "Value": "GM"},
    {"Text":  "Georgia",  "Value": "GE"},
    {"Text":  "Germany",  "Value": "DE"},
    {"Text":  "Ghana",  "Value": "GH"},
    {"Text":  "Gibraltar",  "Value": "GI"},
    {"Text":  "Greece",  "Value": "GR"},
    {"Text":  "Greenland",  "Value": "GL"},
    {"Text":  "Grenada",  "Value": "GD"},
    {"Text":  "Guadeloupe",  "Value": "GP"},
    {"Text":  "Guam",  "Value": "GU"},
    {"Text":  "Guatemala",  "Value": "GT"},
    {"Text":  "Guernsey",  "Value": "GG"},
    {"Text":  "Guinea",  "Value": "GN"},
    {"Text":  "Guinea-Bissau",  "Value": "GW"},
    {"Text":  "Guyana",  "Value": "GY"},
    {"Text":  "Haiti",  "Value": "HT"},
    {"Text":  "Heard Island and McDonald Mcdonald Islands",  "Value": "HM"},
    {"Text":  "Holy See (Vatican City State)",  "Value": "VA"},
    {"Text":  "Honduras",  "Value": "HN"},
    {"Text":  "Hong Kong",  "Value": "HK"},
    {"Text":  "Hungary",  "Value": "HU"},
    {"Text":  "Iceland",  "Value": "IS"},
    {"Text":  "India",  "Value": "IN"},
    {"Text":  "Indonesia",  "Value": "ID"},
    {"Text":  "Iran, Islamic Republic of",  "Value": "IR"},
    {"Text":  "Iraq",  "Value": "IQ"},
    {"Text":  "Ireland",  "Value": "IE"},
    {"Text":  "Isle of Man",  "Value": "IM"},
    {"Text":  "Israel",  "Value": "IL"},
    {"Text":  "Italy",  "Value": "IT"},
    {"Text":  "Jamaica",  "Value": "JM"},
    {"Text":  "Japan",  "Value": "JP"},
    {"Text":  "Jersey",  "Value": "JE"},
    {"Text":  "Jordan",  "Value": "JO"},
    {"Text":  "Kazakhstan",  "Value": "KZ"},
    {"Text":  "Kenya",  "Value": "KE"},
    {"Text":  "Kiribati",  "Value": "KI"},
    {"Text":  "Korea, Democratic People's Republic of",  "Value": "KP"},
    {"Text":  "Korea, Republic of",  "Value": "KR"},
    {"Text":  "Kuwait",  "Value": "KW"},
    {"Text":  "Kyrgyzstan",  "Value": "KG"},
    {"Text":  "Lao People's Democratic Republic",  "Value": "LA"},
    {"Text":  "Latvia",  "Value": "LV"},
    {"Text":  "Lebanon",  "Value": "LB"},
    {"Text":  "Lesotho",  "Value": "LS"},
    {"Text":  "Liberia",  "Value": "LR"},
    {"Text":  "Libya",  "Value": "LY"},
    {"Text":  "Liechtenstein",  "Value": "LI"},
    {"Text":  "Lithuania",  "Value": "LT"},
    {"Text":  "Luxembourg",  "Value": "LU"},
    {"Text":  "Macao",  "Value": "MO"},
    {"Text":  "Macedonia, the Former Yugoslav Republic of",  "Value": "MK"},
    {"Text":  "Madagascar",  "Value": "MG"},
    {"Text":  "Malawi",  "Value": "MW"},
    {"Text":  "Malaysia",  "Value": "MY"},
    {"Text":  "Maldives",  "Value": "MV"},
    {"Text":  "Mali",  "Value": "ML"},
    {"Text":  "Malta",  "Value": "MT"},
    {"Text":  "Marshall Islands",  "Value": "MH"},
    {"Text":  "Martinique",  "Value": "MQ"},
    {"Text":  "Mauritania",  "Value": "MR"},
    {"Text":  "Mauritius",  "Value": "MU"},
    {"Text":  "Mayotte",  "Value": "YT"},
    {"Text":  "Mexico",  "Value": "MX"},
    {"Text":  "Micronesia, Federated States of",  "Value": "FM"},
    {"Text":  "Moldova, Republic of",  "Value": "MD"},
    {"Text":  "Monaco",  "Value": "MC"},
    {"Text":  "Mongolia",  "Value": "MN"},
    {"Text":  "Montenegro",  "Value": "ME"},
    {"Text":  "Montserrat",  "Value": "MS"},
    {"Text":  "Morocco",  "Value": "MA"},
    {"Text":  "Mozambique",  "Value": "MZ"},
    {"Text":  "Myanmar",  "Value": "MN"},
    {"Text":  "Namibia",  "Value": "NA"},
    {"Text":  "Nauru",  "Value": "NR"},
    {"Text":  "Nepal",  "Value": "NP"},
    {"Text":  "Netherlands",  "Value": "NL"},
    {"Text":  "New Caledonia",  "Value": "NC"},
    {"Text":  "New Zealand",  "Value": "NZ"},
    {"Text":  "Nicaragua",  "Value": "NI"},
    {"Text":  "Niger",  "Value": "NE"},
    {"Text":  "Nigeria",  "Value": "NG"},
    {"Text":  "Niue",  "Value": "NU"},
    {"Text":  "Norfolk Island",  "Value": "NF"},
    {"Text":  "Northern Mariana Islands",  "Value": "NP"},
    {"Text":  "Norway",  "Value": "NO"},
    {"Text":  "Oman",  "Value": "OM"},
    {"Text":  "Pakistan",  "Value": "PK"},
    {"Text":  "Palau",  "Value": "PW"},
    {"Text":  "Palestine, State of",  "Value": "PS"},
    {"Text":  "Panama",  "Value": "PA"},
    {"Text":  "Papua New Guinea",  "Value": "PG"},
    {"Text":  "Paraguay",  "Value": "PY"},
    {"Text":  "Peru",  "Value": "PE"},
    {"Text":  "Philippines",  "Value": "PH"},
    {"Text":  "Pitcairn",  "Value": "PN"},
    {"Text":  "Poland",  "Value": "PL"},
    {"Text":  "Portugal",  "Value": "PT"},
    {"Text":  "Puerto Rico",  "Value": "PR"},
    {"Text":  "Qatar",  "Value": "QR"},
    {"Text":  "Romania",  "Value": "RO"},
    {"Text":  "Russian Federation",  "Value": "RU"},
    {"Text":  "Rwanda",  "Value": "RW"},
    {"Text":  "Reunion",  "Value": "RE"},
    {"Text":  "Saint Barthelemy",  "Value": "BL"},
    {"Text":  "Saint Helena",  "Value": "SH"},
    {"Text":  "Saint Kitts and Nevis",  "Value": "KN"},
    {"Text":  "Saint Lucia",  "Value": "LC"},
    {"Text":  "Saint Martin (French part)",  "Value": "MF"},
    {"Text":  "Saint Pierre and Miquelon",  "Value": "PM"},
    {"Text":  "Saint Vincent and the Grenadines",  "Value": "VC"},
    {"Text":  "Samoa",  "Value": "WS"},
    {"Text":  "San Marino",  "Value": "SM"},
    {"Text":  "Sao Tome and Principe",  "Value": "ST"},
    {"Text":  "Saudi Arabia",  "Value": "SA"},
    {"Text":  "Senegal",  "Value": "SN"},
    {"Text":  "Serbia",  "Value": "RS"},
    {"Text":  "Seychelles",  "Value": "SC"},
    {"Text":  "Sierra Leone",  "Value": "SL"},
    {"Text":  "Singapore",  "Value": "SG"},
    {"Text":  "Sint Maarten (Dutch part)",  "Value": "SX"},
    {"Text":  "Slovakia",  "Value": "SK"},
    {"Text":  "Slovenia",  "Value": "SI"},
    {"Text":  "Solomon Islands",  "Value": "SB"},
    {"Text":  "Somalia",  "Value": "SO"},
    {"Text":  "South Africa",  "Value": "ZA"},
    {"Text":  "South Georgia and the South Sandwich Islands",  "Value": "GS"},
    {"Text":  "South Sudan",  "Value": "SS"},
    {"Text":  "Spain",  "Value": "ES"},
    {"Text":  "Sri Lanka",  "Value": "LK"},
    {"Text":  "Sudan",  "Value": "SD"},
    {"Text":  "Suriname",  "Value": "SR"},
    {"Text":  "Svalbard and Jan Mayen",  "Value": "SJ"},
    {"Text":  "Swaziland",  "Value": "SZ"},
    {"Text":  "Sweden",  "Value": "SE"},
    {"Text":  "Switzerland",  "Value": "CH"},
    {"Text":  "Syrian Arab Republic",  "Value": "SY"},
    {"Text":  "Taiwan, Province of China",  "Value": "TW"},
    {"Text":  "Tajikistan",  "Value": "TJ"},
    {"Text":  "United Republic of Tanzania",  "Value": "TZ"},
    {"Text":  "Thailand",  "Value": "TH"},
    {"Text":  "Timor-Leste",  "Value": "TL"},
    {"Text":  "Togo",  "Value": "TG"},
    {"Text":  "Tokelau",  "Value": "TK"},
    {"Text":  "Tonga",  "Value": "TO"},
    {"Text":  "Trinidad and Tobago",  "Value": "TT"},
    {"Text":  "Tunisia",  "Value": "TN"},
    {"Text":  "Turkey",  "Value": "TR"},
    {"Text":  "Turkmenistan",  "Value": "TM"},
    {"Text":  "Turks and Caicos Islands",  "Value": "TC"},
    {"Text":  "Tuvalu",  "Value": "TV"},
    {"Text":  "Uganda",  "Value": "UG"},
    {"Text":  "Ukraine",  "Value": "UA"},
    {"Text":  "United Arab Emirates",  "Value": "AE"},
    {"Text":  "United Kingdom",  "Value": "GB"},
    {"Text":  "United States",  "Value": "US"},
    {"Text":  "United States Minor Outlying Islands",  "Value": "UM"},
    {"Text":  "Uruguay",  "Value": "UY"},
    {"Text":  "Uzbekistan",  "Value": "UZ"},
    {"Text":  "Vanuatu",  "Value": "VU"},
    {"Text":  "Venezuela",  "Value": "VE"},
    {"Text":  "Viet Nam",  "Value": "VN"},
    {"Text":  "British Virgin Islands",  "Value": "VG"},
    {"Text":  "US Virgin Islands",  "Value": "VI"},
    {"Text":  "Wallis and Futuna",  "Value": "WF"},
    {"Text":  "Western Sahara",  "Value": "EH"},
    {"Text":  "Yemen",  "Value": "YE"},
    {"Text":  "Zambia",  "Value": "ZM"},
    {"Text":  "Zimbabwe",  "Value": "ZW"},
    {"Text":  "Aland Islands",  "Value": "AX"}
];

Gwt.Core.Contrib.UNIDADES = [
    '',
    'UN ',
    'DOS ',
    'TRES ',
    'CUATRO ',
    'CINCO ',
    'SEIS ',
    'SIETE ',
    'OCHO ',
    'NUEVE ',
    'DIEZ ',
    'ONCE ',
    'DOCE ',
    'TRECE ',
    'CATORCE ',
    'QUINCE ',
    'DIECISEIS ',
    'DIECISIETE ',
    'DIECIOCHO ',
    'DIECINUEVE ',
    'VEINTE '
];

Gwt.Core.Contrib.DECENAS = [
    'VENTI',
    'TREINTA ',
    'CUARENTA ',
    'CINCUENTA ',
    'SESENTA ',
    'SETENTA ',
    'OCHENTA ',
    'NOVENTA ',
    'CIEN '
];

Gwt.Core.Contrib.CENTENAS = [
    'CIENTO ',
    'DOSCIENTOS ',
    'TRESCIENTOS ',
    'CUATROCIENTOS ',
    'QUINIENTOS ',
    'SEISCIENTOS ',
    'SETECIENTOS ',
    'OCHOCIENTOS ',
    'NOVECIENTOS '
];
 
Gwt.Core.Contrib.NumberToHumanReadable = function (number)
{
    //Converts a number into string representation
    
    var converted = "";
 
    if (!(0 < number < 999999999))
    {
        return "No es posible convertir el numero a letras";
    }
 
    var number_str = zfill(number, 9);
    var millones = number_str.substr(0,3);
    var miles = number_str.substr(3, 3);
    var cientos = number_str.substr(6, number_str.length);
 
    if(millones)
    {
        if(millones === "001")
        {
            converted += "UN MILLON ";
        }
        else if(Number(millones) > 0)
        {
            converted += "%sMILLONES ".replace ("%s", Gwt.Core.Contrib.__convertNumber(millones));
        }
    }
 
    if(miles)
    {
        if(miles === "001")
        {
            converted += "MIL ";
        }
        else if(Number(miles) > 0)
        {
            converted += "%sMIL ".replace ("%s", Gwt.Core.Contrib.__convertNumber(miles));
        }
    }
 
    if(cientos)
    {
        if(cientos === "001")
        {       
            converted += "UN ";
        }
        else if(Number (cientos) > 0)
        {
            converted += "%s".replace("%s", Gwt.Core.Contrib.__convertNumber(cientos));
        }
    }
 
    return converted;
};
 
Gwt.Core.Contrib.__convertNumber = function (n)
{
    
    //Max length must be 3 digits

    var output = "";
 
    if(n === "100")
    {
        output = "CIEN ";
    }
    else if(n[0] !== '0')
    {
        output = Gwt.Core.Contrib.CENTENAS[Number(n[0])-1];
    }
 
    var k = Number(n.substr(1, n.length));
    if(k <= 20)
    {
        output += Gwt.Core.Contrib.UNIDADES[k];
    }
    else
    {
        if((k > 30) & (n[2] !== '0'))
        {
            output += "%s0Y %s1".replace ("%s0", Gwt.Core.Contrib.DECENAS[Number(n[1])-2]).replace ("%s1", Gwt.Core.Contrib.UNIDADES[Number(n[2])]);
        }
        else
        {
            output += "%s0%s1".replace("%s0", Gwt.Core.Contrib.DECENAS[Number(n[1])-2]).replace ("%s1", Gwt.Core.Contrib.UNIDADES[Number(n[2])]);
        }
    }
    
    return output;
};

Gwt.Core.Contrib.ClosePrint = function () {
  document.body.removeChild(this.__container__);
};

Gwt.Core.Contrib.Print = function () {
  this.contentWindow.__container__ = this;
  this.contentWindow.onbeforeunload = Gwt.Core.Contrib.ClosePrint;
  this.contentWindow.onafterprint = Gwt.Core.Contrib.ClosePrint;
  this.contentWindow.focus(); // Required for IE
  this.contentWindow.print();
};

Gwt.Core.Contrib.LoadDocument = function (sURL) 
{
  var oHiddFrame = document.createElement("iframe");
  oHiddFrame.onload = Gwt.Core.Contrib.Print;
  oHiddFrame.style.visibility = "hidden";
  oHiddFrame.src = sURL;
  document.body.appendChild(oHiddFrame);
  return oHiddFrame;
};

Gwt.Core.Contrib.GetSessionId = function ()
{
    var Cookies = document.cookie.split(";");
    for (var i = 0; i < Cookies.length; i++)
    {
        var Tmp = Cookies[i].split("=");
        if (Tmp[0]==="SessionId")
        {
            return Tmp[1];
        }
    }
    return null;
};

Gwt.Core.Contrib.SetActiveApp = function (App)
{
    this._ActiveApp = App;
};

Gwt.Core.Contrib.CloseActiveApp = function ()
{
    this._ActiveApp.close ();
};

Gwt.Core.Contrib.RemoveActiveApp = function ()
{
    this._ActiveApp = null;
};

function zfill (num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
//End Gwt::Core::Contrib
//###########################################################################
//###################################################################################################
//Gwt::Core::Request
Gwt.Core.Request = function (Url, Func, Params, Method)
{
    this.XHR = new XMLHttpRequest ();			
    this.Url = Url;
    this.Func = Func;
    this.Params = Params;
    this.Method = Method || Gwt.Core.REQUEST_METHOD_POST;
    
    this.XHR.onreadystatechange = this.Ready.bind(this);
    this.XHR.overrideMimeType("application/json");
    var SessionId = Gwt.Core.Contrib.GetSessionId ();
    if (this.Method===Gwt.Core.REQUEST_METHOD_POST)
    {
        this.XHR.open ("POST", this.Url, true);
        if (SessionId !== null)
        {
            this.XHR.setRequestHeader("SessionId",  SessionId);
        }
        this.Send ();
    }
    else
    {
        this.XHR.open ("GET", this.Url, true);
        if (SessionId !== null)
        {
            this.XHR.setRequestHeader("SessionId",  SessionId);
        }
        this.XHR.send ();
    }
};

Gwt.Core.Request.prototype._Request = function ()
{
    this.XHR = null;
    this.Url = null;
    this.Func = null;
    this.Params = null;
};

Gwt.Core.Request.prototype.Send = function ()
{
    var option = 0;
    for (var i = 0; i < this.Params.length; i++)
    {
        if (this.Params[i].Type === Gwt.Core.PARAM_TYPE_FILE)
        {
            option = 1;
            break;
        }
    }
    if (option === 0)
    {
        this.SendApplicationXWWWFormUrlEncoded ();
    }
    else
    {
        this.SendMultipartFormData ();
    }
};

Gwt.Core.Request.prototype.SendMultipartFormData =  function ()
{
    var Boundary = "---------------------------" + Date.now().toString(16);
    this.XHR.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + Boundary);
	
    var Multipart = [];
    var ContentDisposition = "";
    
    for (var i = 0; i < this.Params.length; i++)
    {
        Multipart.push ("\r\n--"+Boundary+"\r\n");
        if (this.Params[i].Type === Gwt.Core.PARAM_TYPE_JSON)
        {        
            ContentDisposition = "Content-Disposition: form-data; name=\""+this.Params[i].GetName () + "\"\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n";
            Multipart.push (ContentDisposition);
            Multipart.push (unescape(encodeURIComponent(JSON.stringify(this.Params[i].GetData ()))));
        }
        else
        {
            ContentDisposition = "Content-Disposition: form-data; name=\""+this.Params[i].GetName ()+"\"; filename=\""+ this.Params[i].GetData ().FileName + "\"\r\nContent-Type: " + this.Params[i].GetData ().Type + "\r\n\r\n";
            Multipart.push (ContentDisposition);
            Multipart.push (atob (this.Params[i].GetData ().Data));
        }
    }
    
    Multipart.push ("\r\n--"+Boundary+"--");
    
    var RawData = Multipart.join ("");
    
    this.XHR.setRequestHeader("Content-Length", RawData.length);
	
    var NBytes = RawData.length, Uint8Data = new Uint8Array(NBytes);
    for (var i = 0; i < NBytes; i++)
    {
        Uint8Data[i] = RawData.charCodeAt(i) & 0xff;
    }
    
    this.XHR.send (Uint8Data);
};

Gwt.Core.Request.prototype.SendApplicationXWWWFormUrlEncoded = function ()
{
    this.XHR.setRequestHeader("Content-Type", "application\/x-www-form-urlencoded");
    
    var RawData = this.Params[0].GetName ()+"="+JSON.stringify (this.Params[0].GetData());
    
    this.XHR.send (RawData);
};

Gwt.Core.Request.prototype.Ready = function ()
{
    if (this.XHR.readyState === 4 && this.XHR.status === 200)
    {
        this.Func(JSON.parse(this.XHR.response));
    }
};
//End of Gwt::Core::Request
//##########################################################
//###################################################################################################
//Gwt::Core::Param
Gwt.Core.Parameter = function (Type, Name, Data)
{
    this.Type = Type === Gwt.Core.PARAM_TYPE_JSON ? Type : Gwt.Core.PARAM_TYPE_FILE;
    this.Name = Name;
    this.Data = Data;
}

Gwt.Core.Parameter.prototype._Parameter = function ()
{
    this.Type = null;
    this.Name = null;
    this.Data = null;
}

Gwt.Core.Parameter.prototype.GetType = function ()
{
    return this.Type;
}

Gwt.Core.Parameter.prototype.GetName = function ()
{
    return this.Name;
}

Gwt.Core.Parameter.prototype.GetData = function ()
{
    return this.Data;
}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Gwt.Core.SqlStatement = function (Stm, Callback)
{
    this.XHR = new XMLHttpRequest ();
    this.XHR.open ("POST", "/backend/statement/", true);
    this.XHR.onreadystatechange = this.Ready.bind(this);
    this.XHR.overrideMimeType("application/json");
    this.Callback = Callback;
    var SessionId = Gwt.Core.Contrib.GetSessionId ();
    if (SessionId !== null)
    {
        this.XHR.setRequestHeader("SessionId",  SessionId);
    }
    this.XHR.setRequestHeader("Content-Type", "application\/x-www-form-urlencoded");
    this.XHR.send ("Params="+JSON.stringify({"Statement": Stm.ToString().replace(/=/g, encodeURIComponent("="))}));
};

Gwt.Core.SqlStatement.prototype.Ready = function ()
{
    if (this.XHR.readyState === 4 && this.XHR.status === 200)
    {
        this.Callback (JSON.parse(this.XHR.response));
    }
};



Gwt.Core.SqlQuery = function (Query, Callback)
{
    this.XHR = new XMLHttpRequest ();
    this.XHR.open ("POST", "/backend/query/", true);
    this.XHR.onreadystatechange = this.Ready.bind(this);
    this.XHR.overrideMimeType("application/json");
    this.Callback = Callback;
    var SessionId = Gwt.Core.Contrib.GetSessionId ();
    if (SessionId !== null)
    {
        this.XHR.setRequestHeader("SessionId",  SessionId);
    }
    this.XHR.setRequestHeader("Content-Type", "application\/x-www-form-urlencoded");
    this.XHR.send ("Params="+JSON.stringify({"Query": Query.replace(/=/g, encodeURIComponent("="))}));
};

Gwt.Core.SqlQuery.prototype.Ready = function ()
{
    if (this.XHR.readyState === 4 && this.XHR.status === 200)
    {
        this.Callback (JSON.parse(this.XHR.response));
    }
};


Gwt.Core.PrepareStatement = function (Stm)
{
    this.Stm = Stm;
};

Gwt.Core.PrepareStatement.prototype.SetString = function (Value)
{
    if (Value==="")
    {
        this.Stm = this.Stm.replace ("?", "'{0}'".replace("{0}", Value));
    }
    else
    {
        this.Stm = this.Stm.replace ("?", "NULL");
    }
};

Gwt.Core.PrepareStatement.prototype.SetNumber = function (Value)
{
    if (Value==="")
    {
        this.Stm = this.Stm.replace ("?", "{0}".replace("{0}", Value));
    }
    else
    {
        this.Stm = this.Stm.replace ("?", "NULL");
    }
};

Gwt.Core.PrepareStatement.prototype.ToString = function (Value)
{
    return this.Stm;
};//#####################################################################################################
//Gwt::Gui
//environments constants
Gwt.Gui =
{
    WIN_POS_CENTER: "WIN_POS_CENTER",
    WIN_POS_LEFT: "WIN_POS_LEFT",
    WIN_POS_TOP: "WIN_POS_TOP",
    WIN_POS_RIGHT: "WIN_POS_RIGHT",
    WIN_POS_BOTTOM: "WIN_POS_BOTTOM",
    ALIGN_CENTER: "ALIGN_CENTER",
    ALIGN_LEFT: "ALIGN_LEFT",
    ALIGN_TOP: "ALIGN_TOP",
    ALIGN_RIGHT: "ALIGN_RIGHT",
    ALIGN_BOTTOM: "ALIGN_BOTTOM",
    SCREEN_DEVICE_WIDTH: window.innerWidth,
    SCREEN_DEVICE_HEIGHT: window.innerHeight,
    SCREEN_DEVICE_PIXEL_RATIO: window.devicePixelRatio,
    SCREEN_DEVICE_ORIENTATION: window.innerWidth > window.innerHeight ? "landscape" : "portrait",
    SCREEN_DEVICE_ASPECT_RATIO:  (window.innerWidth > window.innerHeight ? window.innerWidth/window.innerHeight : window.innerHeight/window.innerWidth).toString().substring(0,4),
    MENU_QUIT_APP: 0,
    AUTO_VALUE: "auto",
    READ_ARRAY_BUFFER: 0,
    READ_BINARY_STRING: 1,
    READ_URL: 2,
    READ_TEXT: 3
};

Gwt.Gui.Event =
{
    Window :
    {
        //window events
        AfterPrint: "afterprint",
        BeforePrint: "beforeprint",
        BeforeUnload: "beforeunload",
        Error: "error",
        HashChange: "hashchange",
        Load: "load",
        Message: "message",
        Offline: "offline",
        Online: "online",
        PageHide: "pagehide",
        PageShow: "pageshow",
        PopState: "popstate",
        Resize: "resize",
        Storage: "storage",
        Unload: "unload"
    },
	
    Form:
    {
        //form events
        Blur: "blur",
        Change: "change",
        ContextMenu: "contextmenu",
        Focus: "focus",
        Input: "input",
        Invalid: "invalid",
        Reset: "reset",
        Search: "search",
        Select: "select",
        Submit: "submit"
    },
	
    Mouse:
    {
        //mouse events
        Click: "click",
        DBClick: "dbclick",
        Drag: "drag",
        DragEnd: "dragend",
        DragEnter: "dragenter",
        DragLeave: "dragleave",
        DragOver: "dragover",
        DragStart: "dragstart",
        Drop: "drop",
        MouseDown: "mousedown",
        MouseMove: "mousemove",
        MouseOut: "mouseout",
        MouseOver: "mouseover",
        MouseUp: "mouseup",
        Scroll: "scroll",
        Wheel: "wheel"
    },
	
    Keyboard:
    {
        //keyboard events
        KeyUp: "keyup",
        KeyPress: "keypress",
        KeyDown: "keydown",
        KeyCodes: {Enter: 13, Ctrl: 17, Alt: 18, AtlGr: 225, Shift: 16, Up: 38, Down: 40, Left: 37, Right: 39, Tap: 9, Insert: 45, Home: 36, Del: 46, End: 35, Repag: 33, Avpag: 34, Meta: 91}
    },
	
    Clipboard:
    {
        //clipboard events
        Copy: "copy",
        Cut: "cut",
        Paste: "paste"
    },
	
    Media:
    {
        //media events
        Abort: "abort",
        CanPlay: "canplay",
        CanPlayThtough: "canplaythrough",
        CueChange: "cuechange",
        DurationChange: "durationchange",
        Emptied: "emptied",
        Ended: "ended",
        Error: "error",
        LoadedData: "loadeddata",
        LoadedMetadata: "loadedmetadata",
        LoadStart: "loadstart",
        Pause: "pause",
        Play: "play",
        Playing: "playing",
        Progress: "progress",
        RateChange: "ratechange",
        Seeked: "seeked",
        Seeking: "seeking",
        Stalled: "stalled",
        Suspend: "suspend",
        TimeUpdate: "timeupdate",
        VolumeChange: "volumechange",
        Waiting: "waiting"
    },
	
    Misc:
    {
        //misc events
        Error: "error",
        Show: "show",
        Toggle: "toggle"
    },
        
    FileReader:
    {
        Abort: "abort",
        Error: "error",
        Load: "load",
        LoadStart: "loadstart",
        LoadEnd: "loadend",
        Progress: "progress"
    }
	
};

Gwt.Gui.Contrib = new Object ();

Gwt.Gui.Contrib.Color = function (Arg1, Arg2, Arg3, Arg4)
{
	this.Red = null;
	this.Green = null;
	this.Blue = null;
	this.Alpha = null;
	
	if (typeof Arg1 !== "number")
	{
		var key = Object.keys (Gwt.Gui.Contrib.Colors);
		for (var i=0; i<key.length; i++)
		{
			
			if (Arg1 === Gwt.Gui.Contrib.Colors[key[i]])
			{
				this.Red = Arg1[0];
				this.Green = Arg1[1];
				this.Blue = Arg1[2];
				this.Alpha = Arg1[3];
			}
		}
	}
	else 
	{
		this.Red = Arg1;
		this.Green = Arg2;
		this.Blue = Arg3;
		this.Alpha = Arg4;
	}
};

Gwt.Gui.Contrib.Color.prototype.ToString = function ()
{
	return "rgba("+this.Red+","+this.Green+","+this.Blue+","+this.Alpha+")";
};

Gwt.Gui.Contrib.Color.prototype.SetRed = function (Arg1)
{
	this.Red = Arg1;
};

Gwt.Gui.Contrib.Color.prototype.SetGreen = function (Arg1)
{
	this.Green = Arg1;
};

Gwt.Gui.Contrib.Color.prototype.SetBlue = function (Arg1)
{
	this.Blue = Arg1;
};

Gwt.Gui.Contrib.Color.prototype.SetAlpha = function (Arg1)
{
	this.Alpha = Arg1;
};

Gwt.Gui.Contrib.Colors =
{
	AliceBlue: [240,248,255,1],
	AntiqueWhite: [250,235,215,1],
	Aqua: [0,255,255,1],
	AquaMarine: [127,255,212,1],
	Azure : [240,255,255,1],
	Beige: [245,245,220,1],
	Black: [0,0,0,1],
	Blue: [0,0,255,1],
	BlueViolet: [138,43,226,1],
	Brown: [165,42,42,1],
	BurlyWood: [222,184,135,1],
	CadetBlue: [95,158,160,1],
	Chartreuse: [127,255,0,1],
	Chocolate: [210,105,30,1],
	Coral: [255,127,80,1],
	CornFlowerBlue: [100,149,237,1],
	CornSilk: [255,248,220,1],
	Crimson: [220,20,60,1],
	DarkBlue: [0,0,139,1],
	DarkCyan: [0,139,139,1],
	DarkGrey: [169,169,169,1],
	DarkGreen: [0,100,0,1],
	DarkOliveGreen: [85,107,47,1],
	DarkOrchid: [153,50,204,1],
	DarkRed: [139,0,0,1],
	DarkSeaGreen: [143,188,143,1],
	DarkSlateBlue: [72,61,139,1],
	DarkSlateGray : [47,79,79,1],
	DarkTurquoise: [0,206,209,1],
	DeepPink: [255,20,147,1],
	DeepSkyBlue: [0,191,255,1],
	DodgerBlue: [30,144,255,1],
	Fuchsia: [255,0,255,1],
	Gainsboro: [220,220,220,1],
	GhostWhite: [248,248,255,1],
	Gold: [255,215,0,1],
	GoldenRod: [218,165,32,1],
	Green: [0,128,0,1],
	Grey: [128,128,128,1],
	GreenYellow: [173,255,47,1],
	HotPink: [255,105,180,1],
	IndianRed: [205,92,92,1],
	Khaki: [240,230,140,1],
	Lavender: [230,230,250,1],
	LavenderBlush: [255,240,245,1],
	LawnGreen: [124,252,0,1],
	LemonChiffon: [255,250,205,1],
	LightBlue: [173,216,230,1],
	LighCoral: [240,128,128,1],
	LighCyan: [224,255,255,1],
	LighGoldenRodYellow: [250,210,210,1],
	LighGrey: [211,211,211,1],
	LighPink: [255,182,193,1],
	LighSalmon: [255,160,122,1],
	LighSeaGreen: [32,178,170,1],
	LighSkyBlue: [135,206,250,1],
	LighSlateGrey: [119,136,153,1],
	LighSteelBlue: [176,196,222,1],
	LighYellow: [255,255,224,1],
	Lime: [0,255,0,1],
	LimeGreen: [50,205,50,1],
	Linen: [250,240,230,1],
	Magenta: [255,0,255,1],
	Maroon: [128,0,0,1],
	MediumAquaMarine: [102,205,170,1],
	MediumBlue: [0,0,205,1],
	MediumOrchid: [186,85,211,1],
	MediumPurple: [147,112,219,1],
	MediumSeaGreen: [60,179,113,1],
	MediumSlateBlue: [123,104,238,1],
	MediumSpringGreen: [0,250,154,1],
	MediumTurquoise: [72,209,204,1],
	MediumVioletRed: [199,21,133,1],
	MidnightBlue: [25,25,112,1],
	MintCream: [245,255,250,1],
	MistyRose: [255,225,228,1],
	Moccasin: [255,228,181,1],
	Navy: [0,0,128,1],
	OliveDrab: [107,142,35,1],
	Orange: [255,165,0,1],
	OrangeRed: [255,69,0,1],
	PaleGoldenRod: [232,232,170,1],
	PaleGreen: [152,251,152,1],
	PeachPuff: [255,218,185,1],
	Peru: [205,133,63,1],
	Pink: [255,192,203,1],
	Plum: [221,160,221,1],
	PowderBlue: [176,224,230,1],
	Purple: [128,0,128,1],
	RebeccaPurple: [102,51,153,1],
	Red : [255,0,0,1],
	RosyBrown: [188,143,143,1],
	RoyalBlue: [65,105,225,1],
	Salmon: [250,128,114,1],
	SeaGreen: [46,139,87,1],
	Sienna: [160,82,45,1],
	Silver: [192,192,192,1],
	SkyBlue: [135,206,235,1],
	SlateBlue: [106,90,205,1],
	SlateGrey: [112,128,144,1],
	Snow: [255,250,250,1],
	SpringGreen: [0,255,127,1],
	SteelBlue: [70,130,180,1],
	Tan: [210,180,140,1],
	Teal: [0,128,128,1],
	Thistle: [216,191,216,1],
	Tomato: [255,99,71,1],
	Transparent : [0,0,0,0],
	Violet: [238,130,238,1],
	Wheat: [245,222,179,1],
	White : [255,255,255,1],
	WhiteSmoke: [245,245,245,1],
	Yellow: [255,255,0,1],
	YellowGreen: [154,205,50,1]
};

//Gwt Border Styles
Gwt.Gui.Contrib.BorderStyle =
{
	None: "none",
	Hidden: "hidden",
	Dotted: "dotted",
	Dashed: "dashed",
	Solid: "solid",
	Double: "double",
	Groove: "groove",
	Ridge: "ridge",
	Inset: "inset",
	Outset: "outset",
	Initial: "initial",
	Inherit: "inherit"
};

//Gwt position type
Gwt.Gui.Contrib.PositionType =
{
	Static: "statci",
	Relative: "relative",
	Fixed: "fixed",
	Absolute: "absolute"
};

//Gwt Display
Gwt.Gui.Contrib.Display =
{
	Inline: "inline",
	Block: "block",
	Flex: "flex",
	InlineBlock: "inline-block",
	InlineFlex: "inline-flex",
	InlineTable: "inline-table",
	ListItem: "list-item",
	RunIn: "run-in",
	Table: "table",
	TableCaption: "table-caption",
	TableColumnGroup: "table-column-group",
	TableHeaderGroup: "table-header-group",
	TableFooterGroup: "table-footer-group",
	TableRowGroup: "table-row-group",
	TableCell: "table-cell",
	TableColumn: "table-column",
	TableRow: "table-row",
	None: "none",
	Initial: "initial",
	Inherit: "inherit"
};

//Gwt Overflow
Gwt.Gui.Contrib.Overflow =
{
	Visible: "visible",
	Hidden: "hidden",
	Scroll: "scroll",
	Auto: "auto",
	Initial: "initial",
	Inherit: "inherit"
};

//Gwt Valign
Gwt.Gui.Contrib.Valign =
{
	Baseline: "baseline",
	Length: "length",
	Percent: "%",
	Sub: "sub",
	Supper: "supper",
	Top: "top",
	TextTop: "text-top",
	Middle: "middle",
	Bottom: "bottom",
	TextBottom: "text-bottom",
	Initial: "initial",
	Inherit: "inherit"
};

//Gwt Cursor
Gwt.Gui.Contrib.Cursor =
{
	Alias: "alias",
	AllScroll: "all-scroll",
	Auto: "auto",
	Cell: "cell",
	ContextMenu: "context-menu",
	ColResize: "col-resize",
	Copy: "copy",
	Crosshair: "crosshair",
	Default: "default",
	EResize: "e-resize",
	EWResize: "ew-resize",
	Grab: "grab",
	Grabbing: "grabbing",
	Help: "help",
	Move: "move",
	NResize: "n-resize",
	NEResize: "ne-resize",
	NESwResize: "nesw-resize",
	NSResize: "ns-resize",
	NWResize: "nw-resize",
	NWSEResize: "nwse-resize",
	NoDrop: "no-drop",
	None: "none",
	NotAllowed: "not-allowed",
	Pointer: "pointer",
	Progress: "progress",
	RowResize: "row-resize",
	SResize: "s-resize",
	SEResize: "se-resize",
	SWResize: "sw-resize",
	Text: "text",
	URL: "url",
	VerticalText: "vertical-text",
	WResize: "w-resize",
	Wait: "wait",
	ZoomIn: "zoom-in",
	ZoomOut: "zoom-out",
	Initial: "initial",
	Inherit: "inherit"
};

//Gwt Font Weight
Gwt.Gui.Contrib.FontWeight =
{
	Normal: "normal",
	Bold: "bold",
	Bolder: "bolder",
	Lighter: "lighter",
	Initial: "initial",
	Inherit: "inherit"
};

// Gwt User Select
Gwt.Gui.Contrib.UserSelect =
{
	None: "none",
	Text: "text",
	All: "all"
};

//Gwt Text Alignment
Gwt.Gui.Contrib.TextAlign =
{
	Left: "left",
	Right: "right",
	Center: "center",
	Justify: "justify",
	Initial: "initial",
	Inherit: "inherit"
};

//Gwt Backgroud Attachment
Gwt.Gui.Contrib.BackgroundAttachment =
{
	Scroll: "scroll",
	Fixed: "fixed",
	Local: "local",
	Initial: "initial",
	Inherit: "inherit"
};

//Gwt Background Clip
Gwt.Gui.Contrib.BackgroundClip =
{
	BorderBox: "border-box",
	PaddingBox: "padding-box",
	ContentBox: "content-box",
	Initial: "initial",
	Inherit: "inherit"
};

//Gwt Background Repeat
Gwt.Gui.Contrib.BackgroundRepeat =
{
	Repeat: "repeat",
	RepeatX: "repeat-x",
	RepeatY: "repeat-y",
	NoRepeat: "no-repeat",
	Initial: "initial",
	Inherit: "inherit"
};

//Gwt Background Size
Gwt.Gui.Contrib.BackgroundSize =
{
	Auto: "auto",
	Length: "length",
	Cover: "cover",
	Contain: "contain",
	Initial: "initial",
	Inherit: "inherit"
};

//Gwt Background Position
Gwt.Gui.Contrib.BackgroundPosition =
{
	Left: "left",
	Right: "right",
	Top: "top",
	Bottom: "bottom",
	Center: "center"
};

// Gwt OutLine
Gwt.Gui.Contrib.OutLine =
{
	Dotted: "dotted",
	Dashed: "dashed",
	Solid: "solid",
	Double: "double",
	Groove: "groove",
	Ridge: "ridge",
	Inset: "inset",
	Outset: "outset",
	None: "none",
	Hidden: "hidden"
};
//###########################################################################################################

//##################################################################################################
//Class Gwt::Gui::Frame
Gwt.Gui.Frame = function ()
{
    //instance props
    this.BackgroundAttachment = null;
    this.BackgroundClip = null;
    this.BackgroundColor = null;
    this.BackgroundImage = null;
    this.BackgroundOrigin = null;
    this.BackgroundPositionX = null;
    this.BackgroundPositionY = null;
    this.BackgroundRepeatX = null;
    this.BackgroundRepeatY = null;
    this.BackgroundSizeHeight = null;
    this.BackgroundSizeWidth = null;
    this.Border = null;
    this.BorderLeft = null;
    this.BorderTop = null;
    this.BorderRight = null;
    this.BorderBottom = null;
    this.BorderRadius = null;
    this.BorderStyle = null;
    this.BoxShadowH = null;
    this.BoxShadowV = null;
    this.BoxShadowBlur = null;
    this.BoxShadowSize = null;
    this.BoxShadowColor = null;
    this.Color = null;
    this.Cursor = null;
    this.Display = null;
    this.Expand = null;
    this.FontFamily = null;
    this.FontSize = null;
    this.FontWeight = null;
    this.Height = null;
    this.Html = null;
    this.Margin = null;
    this.MarginBottom = null;
    this.MarginLeft = null;
    this.MarginRight = null;
    this.MarginTop = null;
    this.MaxHeight = null;
    this.MaxWidth = null;
    this.MinHeight = null;
    this.MinWidth = null;
    this.Overflow = null;
    this.Opacity = null;
    this.OutLine = null;
    this.Padding = null;
    this.PaddingBottom = null;
    this.PaddingLeft = null;
    this.PaddingRight = null;
    this.PaddingTop = null;
    this.PositionLeft = null;
    this.PositionTop = null;
    this.PositionType = null;
    this.TabIndex = null;
    this.TextShadowBlur = null;
    this.TextShadowColor = null;
    this.TextShadowOffsx = null;
    this.TextShadowOffsy = null;
    this.UserSelect = null;
    this.Valign = null;
    this.Visibility = null;
    this.Width = null;
    this.ZIndex = null;
    this.ClassName = null;
    this.Parent = null;
    this.Childs = null;

    //init
    this.SetHtml ("div");
    this.SetClassName ("Gwt_Gui_Frame");
    this.SetExpand(false);
    this.SetBorder (0);
    this.SetBorderStyle (Gwt.Gui.Contrib.BorderStyle.Solid);
    this.SetPosition (0, 0);
    this.SetMargin (0);
    this.Childs = [];
}

Gwt.Gui.Frame.prototype._Frame = function ()
{
    if (this.GetHtml().parentNode !== null && this.GetHtml().parentNode !== undefined)
    {
        try
        {
            this.GetHtml().parentNode.removeChild (this.GetHtml ());
        }
        catch (e)
        {
            console.log("agui");
            console.log(e.message);
        }
    }
    
    this.BackgroundAttachment = null;
    this.BackgroundClip = null;
    this.BackgroundColor = null;
    this.BackgroundImage = null;
    this.BackgroundOrigin = null;
    this.BackgroundPositionX = null;
    this.BackgroundPositionY = null;
    this.BackgroundRepeatX = null;
    this.BackgroundRepeatY = null;
    this.BackgroundSizeHeight = null;
    this.BackgroundSizeWidth = null;
    this.Border = null;
    this.BorderRadius = null;
    this.BorderStyle = null;
    this.Color = null;
    this.Cursor = null;
    this.Display = null;
    this.Expand = null;
    this.FontFamily = null;
    this.FontSize = null;
    this.FontWeight = null;
    this.Height = null;
    this.Html = null;
    this.Margin = null;
    this.MarginBottom = null;
    this.MarginLeft = null;
    this.MarginRight = null;
    this.MarginTop = null;
    this.MaxHeight = null;
    this.MaxWidth = null;
    this.Overflow = null;
    this.Opacity = null;
    this.OutLine = null;
    this.Padding = null;
    this.PaddingBottom = null;
    this.PaddingLeft = null;
    this.PaddingRight = null;
    this.PaddingTop = null;
    this.PositionLeft = null;
    this.PositionTop = null;
    this.PositionType = null;
    this.TabIndex = null;
    this.TextShadowBlur = null;
    this.TextShadowColor = null;
    this.TextShadowOffsx = null;
    this.TextShadowOffsy = null;
    this.UserSelect = null;
    this.Valign = null;
    this.Visibility = null;
    this.Width = null;
    this.ZIndex = null;
    this.ClassName = null;
    this.Parent = null;
    this.Childs = null;
}

Gwt.Gui.Frame.prototype.Add = function (Element)
{
    this.Childs.push(Element);
    this.GetHtml ().appendChild (Element.Html);
}

Gwt.Gui.Frame.prototype.Remove = function (Element)
{
    var elements = this.GetChilds();
    for (var i = 0; i < elements.length; i++)
    {
        var tmp = elements[i];
        if (tmp === Element)
        {
            this.GetHtml().removeChild (Element.GetHtml ());
            elements.splice (i,1);
        }
    }
}

Gwt.Gui.Frame.prototype.GetChilds = function ()
{
	return this.Childs;
}

Gwt.Gui.Frame.prototype.AddEvent = function (Event, Callback)
{
    this.Html.addEventListener (Event, Callback, true);
}

Gwt.Gui.Frame.prototype.RemoveEvent = function (Event, Callback)
{
    this.Html.removeEventListener (Event, Callback, true);
}
Gwt.Gui.Frame.prototype.SetHtml = function (Element)
{
    if (typeof (Element) === "string")
    {
        this.Html = document.createElement (Element);
    }
    else 
    {
        this.Html = Element;
    }
    this.InitStyle ();
}
Gwt.Gui.Frame.prototype.SetTabIndex = function (TabIndex)
{
    this.TabIndex = TabIndex;
    this.Html.tabIndex = this.TabIndex;
}

Gwt.Gui.Frame.prototype.SetSize = function (Width, Height)
{
    this.SetWidth(Width);
    this.SetHeight(Height);
}

Gwt.Gui.Frame.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.SetMaxWidth (this.Width);
    this.SetMinWidth (this.Width);
    this.Html.style.width = this.Width+"px";
}

Gwt.Gui.Frame.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.SetMaxHeight (this.Height);
    this.SetMinHeight (this.Height);
    this.Html.style.height = this.Height+"px";
}

Gwt.Gui.Frame.prototype.GetWidth = function ()
{
    return this.Width;
}

Gwt.Gui.Frame.prototype.GetHeight = function ()
{
    return this.Height;
}

Gwt.Gui.Frame.prototype.GetHtml = function ()
{
    return this.Html;
}

Gwt.Gui.Frame.prototype.SetPosition = function (Left, Top)
{
    var width_add = Gwt.Gui.SCREEN_DEVICE_WIDTH * 0.05;
    var height_add = Gwt.Gui.SCREEN_DEVICE_HEIGHT * 0.05;
	
    this.PositionTop = Top;
    this.PositionLeft = Left;
	
    if (this.PositionLeft === Gwt.Gui.WIN_POS_CENTER && this.PositionTop === undefined)
    {
        var left_ = ((Gwt.Gui.SCREEN_DEVICE_WIDTH - this.GetWidth ())/2);
        var top_ = ((Gwt.Gui.SCREEN_DEVICE_HEIGHT - this.GetHeight ())/2);
    }
    else if (this.PositionLeft !== undefined && this.PositionTop !== undefined)
    {
        switch (this.PositionLeft)
        {
            case Gwt.Gui.WIN_POS_LEFT:
                var left_ = 0;
                break;
            
            case Gwt.Gui.WIN_POS_CENTER:
                var left_ = ((Gwt.Gui.SCREEN_DEVICE_WIDTH - this.GetWidth ())/2);
                break;
			
            case Gwt.Gui.WIN_POS_RIGHT:
                var left_ = ((Gwt.Gui.SCREEN_DEVICE_WIDTH - this.GetWidth ())-2);
                break;
				
            default:
                var left_ = this.PositionLeft;
        }
		
        switch (this.PositionTop)
        {
            case Gwt.Gui.WIN_POS_TOP:
                var top_ = 0;
                break;
				
            case Gwt.Gui.WIN_POS_CENTER:
                var top_ = ((Gwt.Gui.SCREEN_DEVICE_HEIGHT - this.GetHeight ())/2);
                break;
				
            case Gwt.Gui.WIN_POS_BOTTOM:
                var top_ = ((Gwt.Gui.SCREEN_DEVICE_HEIGHT - this.GetHeight ())-2);
                break;
				
            default:
                var top_ = this.PositionTop;
        }
    }
    else
    {
        top_ = 0;
        left_ = 0;
    }
	
    this.PositionTop = top_ ;
    this.PositionLeft = left_;
	
    this.Html.style.top = this.PositionTop;
    this.Html.style.left = this.PositionLeft;
}

Gwt.Gui.Frame.prototype.GetPositionLeft = function ()
{
    return this.PositionLeft;
}

Gwt.Gui.Frame.prototype.GetPositionTop = function ()
{
    return this.PositionTop;
}

Gwt.Gui.Frame.prototype.SetFocus = function ()
{
    this.Html.focus ();
}

Gwt.Gui.Frame.prototype.SetBackgroundAttachment = function (Attachment)
{
    this.BackgroundAttachment = Attachment;
    this.Html.style.backgroundAttachment = this.BackgroundAttachment;
}

Gwt.Gui.Frame.prototype.SetBackgroundClip = function (Clip)
{
    this.BackgroundClip = Clip;
    this.Html.style.backgroundClip = this.BackgroundClip;
}

Gwt.Gui.Frame.prototype.SetBackgroundColor = function (Color)
{
    this.BackgroundColor = Color;
    this.Html.style.backgroundColor = this.BackgroundColor.ToString ();
}

Gwt.Gui.Frame.prototype.SetBackgroundImage = function (Image)
{
    this.BackgroundImage = Image;
    this.Html.style.backgroundImage = "url("+this.BackgroundImage+")";
}

Gwt.Gui.Frame.prototype.SetBackgroundOrigin = function (Origin)
{
    this.BackgroundOrigin = Origin;
    this.Html.style.backgroundOrigin = this.BackgroundOrigin;
}

Gwt.Gui.Frame.prototype.SetBackgroundPosition = function (X, Y)
{
    this.BackgroundPositionX = X;
    this.BackgroundPositionY = Y;
    this.Html.style.backgroundPosition = ""+this.BackgroundPositionX+" "+this.BackgroundPositionY+"";
}

Gwt.Gui.Frame.prototype.SetBackgroundRepeat = function (X, Y)
{
    this.BackgroundRepeatX = X;
    this.BackgroundRepeatY = Y;
    this.Html.style.backgroundRepeatX = this.BackgroundRepeatX;
    this.Html.style.backgroundRepeatY = this.BackgroundRepeatY;
}

Gwt.Gui.Frame.prototype.SetBackgroundSize = function (Width, Height)
{
    this.BackgroundSizeWidth = Width;
    this.BackgroundSizeHeight = Height;
    if (typeof this.BackgroundSizeWidth === "string")
    {
        this.Html.style.backgroundSize = this.BackgroundSizeWidth;
    }
    else
    {
        this.Html.style.backgroundSize = this.BackgroundSizeWidth+"px "+this.BackgroundSizeHeight+"px";
    }
}

Gwt.Gui.Frame.prototype.SetBorder = function (Border)
{
    this.Border = Border;
    this.SetBorderLeft (this.Border);
    this.SetBorderTop (this.Border);
    this.SetBorderRight (this.Border);
    this.SetBorderBottom (this.Border);
}

Gwt.Gui.Frame.prototype.SetBorderLeft = function (BorderLeft)
{
    this.BorderLeft = BorderLeft;
    this.Html.style.borderLeftWidth = this.BorderLeft+"px";
}

Gwt.Gui.Frame.prototype.SetBorderTop = function (BorderTop)
{
    this.BorderTop = BorderTop;
    this.Html.style.borderTopWidth = this.BorderTop+"px";
}

Gwt.Gui.Frame.prototype.SetBorderRight = function (BorderRight)
{
    this.BorderRight = BorderRight;
    this.Html.style.borderRightWidth = this.BorderRight+"px";
}

Gwt.Gui.Frame.prototype.SetBorderBottom = function (BorderBottom)
{
    this.BorderBottom = BorderBottom;
    this.Html.style.borderBottomWidth = this.BorderBottom+"px";
}

Gwt.Gui.Frame.prototype.GetBorder = function ()
{
    return this.Border;
}

Gwt.Gui.Frame.prototype.GetBorderLeft = function ()
{
    return this.BorderLeft;
}

Gwt.Gui.Frame.prototype.GetBorderTop = function ()
{
    return this.BorderTop;
}

Gwt.Gui.Frame.prototype.GetBorderRight = function ()
{
    return this.BorderRight;
}

Gwt.Gui.Frame.prototype.GetBorderBottom = function ()
{
    return this.BorderBottom;
}

Gwt.Gui.Frame.prototype.SetBorderStyle = function (Style)
{
    this.BorderStyle = Style;
    this.Html.style.borderStyle = this.BorderStyle;
}

Gwt.Gui.Frame.prototype.SetBorderRadius = function (Radius)
{
    this.BorderRadius = Radius;
    this.Html.style.borderRadius= this.BorderRadius+"px";
}

Gwt.Gui.Frame.prototype.SetBorderColor = function (Color)
{	
    this.Html.style.borderColor = Color.ToString ();
}

Gwt.Gui.Frame.prototype.SetBoxShadow = function (H, V, Blur, Size, Color)
{
    this.BoxShadowH = H;
    this.BoxShadowV = V;
    this.BoxShadowBlur = Blur;
    this.BoxShadowSize = Size;
    this.BoxShadowColor = Color;
    this.Html.style.boxShadow = this.BoxShadowH+"px "+this.BoxShadowV+"px "+this.BoxShadowBlur+"px "+this.BoxShadowSize+"px "+this.BoxShadowColor.ToString ();
}

Gwt.Gui.Frame.prototype.SetClassName = function (ClassName)
{
    this.ClassName = ClassName;
    this.Html.className = this.ClassName;
}

Gwt.Gui.Frame.prototype.GetClassName = function ()
{
    return this.ClassName;
}

Gwt.Gui.Frame.prototype.SetParent = function (Parent)
{
    this.Parent = Parent;
}

Gwt.Gui.Frame.prototype.GetParent = function ()
{
    return this.Parent;
}

Gwt.Gui.Frame.prototype.SetColor = function (Color)
{
    this.Color = Color
    this.Html.style.color = this.Color.ToString ();
}

Gwt.Gui.Frame.prototype.SetCursor = function (Cursor)
{
    this.Cursor = Cursor;
    this.Html.style.cursor = this.Cursor;
}

Gwt.Gui.Frame.prototype.SetDisplay = function (Display)
{
    var TypeDisplays = Object.keys(Gwt.Gui.Contrib.Display);
    for (var i = 0; i < TypeDisplays.length; i++)
    {
        if (Display === Gwt.Gui.Contrib.Display[TypeDisplays[i]])
        {
            this.Display = Display;
            this.Html.style.display = this.Display;
            return;
        }
    }
    
    throw TypeError("Invalid Display Value");
}

Gwt.Gui.Frame.prototype.GetDisplay = function ()
{
    return this.Display;
}

Gwt.Gui.Frame.prototype.SetFontFamily = function (FontFamily)
{
    this.FontFamily = FontFamily;
    this.Html.style.fontFamily = this.FontFamily;
}

Gwt.Gui.Frame.prototype.SetFontSize = function (FontSize)
{
    this.FontSize = FontSize;
    this.Html.style.fontSize = this.FontSize+"pt";
}

Gwt.Gui.Frame.prototype.GetFontSize = function ()
{
    return this.FontSize;
}

Gwt.Gui.Frame.prototype.SetFontWeight = function (FontWeight)
{
    this.FontWeight = FontWeight;
    this.Html.style.fontWeight = this.FontWeight;
}

Gwt.Gui.Frame.prototype.InitStyle = function ()
{
    this.SetMaxHeight (Gwt.Gui.SCREEN_DEVICE_HEIGHT);
    this.SetMaxWidth (Gwt.Gui.SCREEN_DEVICE_WIDTH);
    this.SetMinHeight (0);
    this.SetMinWidth (0);
    this.SetPositionType (Gwt.Gui.Contrib.PositionType.Relative);
    this.SetDisplay (Gwt.Gui.Contrib.Display.Block);
    this.SetOverflow (Gwt.Gui.Contrib.Overflow.Hidden);
    this.SetPadding (0);
    this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Transparent));
    this.SetBorder (0);
    this.SetColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure));
}

Gwt.Gui.Frame.prototype.SetMaxHeight = function (MaxHeght)
{
    this.MaxHeight = MaxHeght;
    this.Html.style.maxHeight = this.MaxHeight+"px";
}

Gwt.Gui.Frame.prototype.SetMaxWidth = function (MaxWidth)
{
    this.MaxWidth = MaxWidth;
    this.Html.style.maxWidth = this.MaxWidth+"px";
}

Gwt.Gui.Frame.prototype.SetMinHeight = function (MinHeight)
{
    this.MinHeight = MinHeight;
    this.Html.style.minHeight = this.MinHeight+"px";
}

Gwt.Gui.Frame.prototype.SetMinWidth = function (MinWidth)
{
    this.MinWidth = MinWidth;
    this.Html.style.minWidth = this.MinWidth+"px";
}

Gwt.Gui.Frame.prototype.SetMargin = function (Margin)
{
    this.Margin = Margin;
    this.Html.style.margin = this.Margin+"px";
}

Gwt.Gui.Frame.prototype.GetMargin = function (Margin)
{
    return this.Margin;
}

Gwt.Gui.Frame.prototype.SetMarginTop = function (MarginTop)
{
    this.MarginTop = MarginTop;
    this.Html.style.marginTop = this.MarginTop+"px";
}

Gwt.Gui.Frame.prototype.GetMarginTop = function (Margin)
{
    return this.MarginTop;
}

Gwt.Gui.Frame.prototype.SetMarginBottom = function (MarginBottom)
{
    this.MarginBottom = MarginBottom;
    this.Html.style.marginBottom = this.MarginBottom+"px";
}

Gwt.Gui.Frame.prototype.GetMarginBottom = function (Margin)
{
    return this.MarginBottom;
}

Gwt.Gui.Frame.prototype.SetMarginLeft = function (MarginLeft)
{
    this.MarginLeft = MarginLeft;
    this.Html.style.marginLeft = this.MarginLeft+"px";
}

Gwt.Gui.Frame.prototype.GetMarginLeft = function (Margin)
{
    return this.MarginLeft;
}

Gwt.Gui.Frame.prototype.SetMarginRight = function (MarginRigth)
{
    this.MarginRight = MarginRigth;
    this.Html.style.marginRight = this.MarginRight+"px";
}

Gwt.Gui.Frame.prototype.GetMarginRight = function (Margin)
{
    return this.MarginRight;
}

Gwt.Gui.Frame.prototype.SetPadding = function (Padding)
{
    this.Padding = Padding;
    this.Html.style.padding = this.Padding+"px";
}

Gwt.Gui.Frame.prototype.SetPaddingTop = function (PaddingTop)
{
    this.PaddingTop = PaddingTop;
    this.Html.style.paddingTop = this.PaddingTop+"px";
}

Gwt.Gui.Frame.prototype.GetPaddingTop = function ()
{
    return this.PaddingTop;
}

Gwt.Gui.Frame.prototype.SetPaddingBottom = function (PaddingBottom)
{
    this.PaddingBottom = PaddingBottom;
    this.Html.style.paddingBottom = this.PaddingBottom+"px";
}

Gwt.Gui.Frame.prototype.GetPaddingBottom = function ()
{
    return this.PaddingBottom;
}

Gwt.Gui.Frame.prototype.SetPaddingLeft = function (PaddingLeft)
{
    this.PaddingLeft = PaddingLeft;
    this.Html.style.paddingLeft = this.PaddingLeft+"px";
}

Gwt.Gui.Frame.prototype.SetPaddingRight = function (PaddingRight)
{
    this.PaddingRight = PaddingRight;
    this.Html.style.paddingRight = this.PaddingRight+"px";
}

Gwt.Gui.Frame.prototype.SetPositionType = function (PositionType)
{
    this.PositionType = PositionType;
    this.Html.style.position = this.PositionType;
}

Gwt.Gui.Frame.prototype.SetOverflow = function (Overflow)
{
    this.Overflow = Overflow;
    this.Html.style.overflow = this.Overflow;
}

Gwt.Gui.Frame.prototype.SetOpacity = function (Opacity)
{
    this.Opacity = Opacity;
    this.Html.style.opacity = this.Opacity;
}

Gwt.Gui.Frame.prototype.SetTextShadow = function (Offsx, Offsy, Blur, Color)
{
    this.TextShadowOffsx = Offsx;
    this.TextShadowOffsy = Offsy;
    this.TextShadowBlur = Blur;
    this.TextShadowColor = Color;
    this.Html.style.textShadow = this.TextShadowOffsx+"px "+this.TextShadowOffsy+"px "+this.TextShadowBlur+"px "+this.TextShadowColor.ToString ();
}

Gwt.Gui.Frame.prototype.SetZIndex = function (ZIndex)
{
    this.ZIndex = ZIndex;
    this.Html.style.zIndex = this.ZIndex;
}


Gwt.Gui.Frame.prototype.SetSelectable = function (UserSelect)
{
    this.UserSelect = UserSelect;
    this.Html.style.userSelect = this.UserSelect;
}

Gwt.Gui.Frame.prototype.SetValign = function (Valign)
{
    this.Valign = Valign;
    this.Html.style.verticalAlign = this.Valign;
}

Gwt.Gui.Frame.prototype.SetVisibility = function (Value)
{
    this.Visibility = Value;
    this.Html.style.visibility = this.Visibility;
}

Gwt.Gui.Frame.prototype.SetExpand = function (Expand)
{
    this.Expand = Expand;
}

Gwt.Gui.Frame.prototype.GetExpand = function ()
{
    return this.Expand;
}

Gwt.Gui.Frame.prototype.SetOutLine = function (OutLine)
{
    this.OutLine = OutLine;
    this.Html.style.outline = this.OutLine;
}

Gwt.Gui.Frame.prototype.GetOutLine = function ()
{
    return this.OutLine;
}

Gwt.Gui.Frame.prototype.SetHExpand = function (value)
{
    if (typeof(value) !== "boolean")
    {
        throw TypeError("Invalid Boolean Value");
    }
    else
    {
        this.HExpand = value;
    }
}
//Ends Gwt::Gui::Frame Class


//Class Gwt::Gui::Window
Gwt.Gui.Window = function (Title)
{
    Gwt.Gui.Frame.call (this);
    
    //instance props
    this.TitleBar_ = new Gwt.Gui.HBox (0);
    this.Title_ = new Gwt.Gui.StaticText(Title || "Default Window Title");
    this.Menu_ = new Gwt.Gui.Menu ();
    this.Body_ = new Gwt.Gui.Frame ();
    this.Container_ = new Gwt.Gui.Frame ();
    this.BorderSpacing_ = 0;
    this.HaveTitleBar_ = true;
    this.Layout_;
    
    //init
    this.SetClassName ("Gwt_Gui_Window");
    this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (25,25,25,0.3));
    this.SetBackgroundSize (Gwt.Gui.Contrib.BackgroundSize.Cover);
    this.SetBoxShadow (0, 0, 10, 2, new Gwt.Gui.Contrib.Color (102,205,102,0.3));
    var Color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.White);
    Color.SetAlpha (0.5);
    this.SetBorderColor (Color);
    this.SetBorderStyle (Gwt.Gui.Contrib.BorderStyle.Solid);
    this.SetBorder (1);
    this.SetBorderRadius (5);
    this.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
    this.SetSize (256, 256);
    this.SetDisplay (Gwt.Gui.Contrib.Display.Block);
    var Left = (Math.random () * Gwt.Gui.SCREEN_DEVICE_WIDTH)-this.GetWidth ();
    var Top = (Math.random () * Gwt.Gui.SCREEN_DEVICE_HEIGHT)-this.GetHeight ();
    if (Left < 0) Left=0;
    if (Top < 0) Top=0;
    this.SetPosition (Left, top);
    
    this.TitleBar_.SetSize (this.GetWidth(), 32);
    this.TitleBar_.SetBackgroundColor (new Gwt.Gui.Contrib.Color (50, 50, 50, 0.9));
    this.TitleBar_.SetBackgroundSize (Gwt.Gui.Contrib.BackgroundSize.Cover);
    this.TitleBar_.SetAlignment (Gwt.Gui.ALIGN_CENTER);
    this.RootAdd (this.TitleBar_);
    
    this.Title_.SetTextAlignment (Gwt.Gui.Contrib.TextAlign.Center);
    this.Title_.SetExpand (false);
    this.Title_.SetSize (this.TitleBar_.GetWidth(), 20);
    
    this.TitleBar_.Add (this.Title_);
    this.Menu_.MenuBtn.SetDisplay (Gwt.Gui.Contrib.Display.None);
    this.TitleBar_.Add (this.Menu_.MenuBtn);

    this.Body_.SetSize (this.GetWidth(), this.GetHeight () - 32);
    this.RootAdd (this.Body_);
    
    this.Menu_.ContainerMenu.SetZIndex (1000);
    this.Menu_.ContainerMenu.SetWidth (this.GetWidth ());
    this.Body_.Add (this.Menu_.ContainerMenu);
    
    this.Container_.SetSize (this.Body_.GetWidth(), this.Body_.GetHeight ());
    this.Body_.Add (this.Container_);
}

Gwt.Gui.Window.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Window.prototype.constructor = Gwt.Gui.Window;

Gwt.Gui.Window.prototype._Window = function ()
{
    this.Menu_._Menu ();
    this.Title_._StaticText();
    this.TitleBar_._HBox();
    this.Container_._Frame ();
    this.Body_._Frame ();
    this._Frame ();
    
    this.Menu_ = null;
    this.Title_ = null;
    this.TitleBar_ = null;
    this.Container_ = null;
    this.Body_ = null;
    this.BorderSpacing_ = null;
}

Gwt.Gui.Window.prototype.RootAdd = function (Element)
{
    this.GetChilds().push (Element);
    this.GetHtml ().appendChild (Element.Html);
}

Gwt.Gui.Window.prototype.Add = function (Element)
{
    this.Container_.Add (Element);
}

Gwt.Gui.Window.prototype.SetBorderSpacing = function (Border)
{
    this.BorderSpacing_ = (Border===undefined) ? this.BorderSpacing_ : Border * 2;
    this.Container_.SetWidth (this.Body_.GetWidth () - this.BorderSpacing_);
    this.Container_.SetHeight (this.Body_.GetHeight () - this.BorderSpacing_);
    var left = (this.Body_.GetWidth () - this.Container_.GetWidth ())/2;
    var top = ((this.Body_.GetHeight () - this.Container_.GetHeight ())/2);
    this.Container_.SetPosition (left, top);
}

Gwt.Gui.Window.prototype.Open = function ()
{
    desktop.show (this);
}

Gwt.Gui.Window.prototype.Close = function ()
{
    this._App ();
    this._Window ();
}

Gwt.Gui.Window.prototype._App = function ()
{
    
}

Gwt.Gui.Window.prototype.SetSize = function (Width, Height)
{
    this.SetWidth (Width);
    this.SetHeight (Height);
}

Gwt.Gui.Window.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.SetMaxWidth (this.Width);
    this.SetMinWidth (this.Width);
    this.Html.style.width = this.Width+"px";
    
    this.TitleBar_.SetWidth (this.GetWidth ());
    
    if (this.Menu_ !== null)
    {
       this.Title_.SetWidth (this.TitleBar_.GetWidth() - 29);
    }
    else
    {
        this.Title_.SetWidth (this.TitleBar_.GetWidth());
    }
    this.Body_.SetWidth (this.GetWidth());
    this.SetBorderSpacing (this.BorderSpacing_);
}

Gwt.Gui.Window.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.SetMaxHeight (this.Height);
    this.SetMinHeight (this.Height);
    this.Html.style.height = this.Height+"px";
    
    this.HaveTitleBar_ ? this.Body_.SetHeight (this.GetHeight () - 32) : this.Body_.SetHeight (this.GetHeight ()) ;
    
    this.SetBorderSpacing (this.BorderSpacing_);
}

Gwt.Gui.Window.prototype.GetAvailableWidth = function ()
{
    return this.Container_.GetWidth ();
}

Gwt.Gui.Window.prototype.GetAvailableHeight = function ()
{
    return this.Container_.GetHeight ();
}

Gwt.Gui.Window.prototype.EnableMenu = function ()
{
    this.Menu_.MenuBtn.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
    this.Title_.SetSize ((this.TitleBar_.GetWidth() - 29), 32);
    
    this.Menu_.ContainerMenu.SetWidth (this.GetWidth ());
}

Gwt.Gui.Window.prototype.DisableMenu = function ()
{
    this.Menu_.ContainerMenu.SetDisplay (Gwt.Gui.Contrib.Display.None);
    this.Menu_.MenuBtn.SetDisplay (Gwt.Gui.Contrib.Display.None);
    this.Title_.SetWidth (this.TitleBar_.GetWidth());
}

Gwt.Gui.Window.prototype.EnableTitleBar = function ()
{
    this.HaveTitleBar = true;
    this.TitleBar_.SetDisplay (Gwt.Gui.Contrib.Display.Block);
    this.SetHeight(this.GetHeight ());
}

Gwt.Gui.Window.prototype.DisableTitleBar = function ()
{
    this.HaveTitleBar_ = false;
    this.TitleBar_.SetDisplay (Gwt.Gui.Contrib.Display.None);
    this.SetHeight (this.GetHeight ());
}

Gwt.Gui.Window.prototype.AddMenuItem = function (Image, Text, Callback, Flag)
{
    var tmp = new Gwt.Gui.MenuItem (Image, Text, Callback);
    if (Flag === Gwt.Gui.MENU_QUIT_APP)
    {
        tmp.SetMarginTop (48);
    }
    this.Menu_.AddItem (tmp);
}

Gwt.Gui.Window.prototype.SetLayout = function (Layout)
{
    if (Layout instanceof Gwt.Gui.HBox || Layout instanceof Gwt.Gui.VBox)
    {
        this.Layout_ = Layout;
        this.Layout_.SetSize (this.Container_.GetWidth (), this.Container_.GetHeight());
        this.Container_.Add (Layout);
    }
    else
    {
        console.log ("Error: Window laout is not Box");
    }
}
//Ends Gwt::Gui::Window
//##################################################################################################
//Class Gwt::Gui::Dialog
Gwt.Gui.Dialog = function (Parent)
{
    Gwt.Gui.Frame.call (this);

    //instance props
    this.DialogBox = new Gwt.Gui.Frame ();
    this.IsOpen = false;
    
    //init
    this.SetClassName ("Gwt_Gui_Dialog");
    this.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
    this.SetParent (Parent);
    this.AddEvent (Gwt.Gui.Event.Mouse.Click, this.Close.bind (this));
    
    this.SetSize (Gwt.Gui.SCREEN_DEVICE_WIDTH, Gwt.Gui.SCREEN_DEVICE_HEIGHT);
    this.SetPosition (Gwt.Gui.WIN_POS_TOP, Gwt.Gui.WIN_POS_LEFT);
    var color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Grey);
    color.SetAlpha (0.25);
    this.SetBackgroundColor (color);
    this.SetZIndex (900000);
    
    this.DialogBox.SetSize (256, 256);
    this.DialogBox.SetBackgroundColor (new Gwt.Gui.Contrib.Color (50, 50, 50, 0.9));
    var colorBorde = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    colorBorde.SetAlpha (0.33);
    this.DialogBox.SetBorderColor (colorBorde);
    this.DialogBox.SetBorder (1);
    this.DialogBox.SetBorderRadius (5);
    this.DialogBox.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.DialogBox.SetZIndex (1000000);
    
    this.RootAdd (this.DialogBox);
}

Gwt.Gui.Dialog.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Dialog.prototype.constructor = Gwt.Gui.Dialog;

Gwt.Gui.Dialog.prototype._Dialog = function ()
{
    if (this.DialogBox !== null)
    {
        this.DialogBox._Frame ();
    }
    
    this.DialogBox = null;
    
    if(this.GetHtml () !== null)
    {
        this._Frame ();
    }
}

Gwt.Gui.Dialog.prototype.Open = function ()
{
    desktop.show (this);
}

Gwt.Gui.Dialog.prototype.Close = function ()
{
    this._Dialog ();
}

Gwt.Gui.Dialog.prototype.RootAdd = function (Element)
{
    this.Childs.push(Element);
    this.GetHtml ().appendChild (Element.Html);
}

Gwt.Gui.Dialog.prototype.Add = function (Element)
{
    this.DialogBox.Add (Element);
}

//Ends Gwt::Gui::Dialog
//##################################################################################################


//##################################################################################################
//Class Gwt::Gui::Button
Gwt.Gui.Button = function (Image, Text)
{
    Gwt.Gui.Frame.call (this);

    //instance props
    this.Image = new Gwt.Gui.Image (Image);
    this.Text = new Gwt.Gui.StaticText (Text);
    
    //init
    this.SetClassName ("Gwt_Gui_Button");
    this.SetExpand (false);
    this.SetBorder (1);
    this.SetBorderStyle (Gwt.Gui.Contrib.BorderStyle.Solid);
    var color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    color.SetAlpha (0.3);
    this.SetBorderColor (color);
    this.SetBorderRadius (2);
    this.SetMargin (0);
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseMove, this.MouseMove.bind(this));
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseDown, this.MouseDown.bind(this));
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseUp, this.MouseMove.bind(this));
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseOut, this.MouseOut.bind(this));
	
    this.Image.SetSize (18, 18);
    this.Image.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
    this.Image.SetMarginRight (5);
    this.Image.SetMarginLeft (5);
    this.Image.SetMarginTop (2);
    this.Image.SetValign (Gwt.Gui.Contrib.Valign.Top);
    
    this.Text.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
    this.Text.SetValign (Gwt.Gui.Contrib.Valign.Top);
    this.SetSize (this.Image.GetWidth()+this.Text.GetWidth(), 24);
	
    this.Add (this.Image);
    this.Add (this.Text);
}

Gwt.Gui.Button.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Button.prototype.constructor = Gwt.Gui.Button;

Gwt.Gui.Button.prototype._Button = function ()
{
    this.Image._Image ();
    this.Image = null;
    
    this.Text._StaticText ();
    this.Text = null;
    
    this._Frame ();
}

Gwt.Gui.Button.prototype.MouseMove = function ()
{
    this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (25,25,25,0.1));
}

Gwt.Gui.Button.prototype.MouseDown = function ()
{
    this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (25,25,25,0.2));
}

Gwt.Gui.Button.prototype.MouseOut = function ()
{
    this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Transparent));
}

Gwt.Gui.Button.prototype.SetText = function (Text)
{
    //console.log (this.Image);
    this.Text.SetText (Text);
    this.Text.SetWidth (this.GetWidth ()*0.7);
}

Gwt.Gui.Button.prototype.SetImage = function (Src)
{
    this.Image.SetImage (Src);
}

Gwt.Gui.Button.prototype.SetFontSize = function (FontSize)
{
    this.Text.SetFontSize (FontSize);
    this.SetSize (this.Image.GetWidth()+this.Text.GetWidth(), 24);
}

//Ends Gwt::Gui::Button
//##################################################################################################
//##############################################################################################
//Class Gwt::Gui::Entry
Gwt.Gui.Entry  = function (Placeholder)
{
	Gwt.Gui.Frame.call (this);
        this.Format = "Text";
        
        //init
	this.SetHtml ("input");
	this.Html.setAttribute ("type", "text");
	this.SetClassName ("Gwt_Gui_Entry");
	this.SetExpand (true);
        this.SetHeight (24);
        this.SetValign (Gwt.Gui.Contrib.Valign.Sub);
	this.SetPadding (0);
	this.SetBorderRadius(5);
	this.SetPlaceholder (Placeholder || "Entry text");
	this.SetFontSize (11);
}

Gwt.Gui.Entry.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Entry.prototype.constructor = Gwt.Gui.Entry;

Gwt.Gui.Entry.prototype._Entry = function ()
{
    this._Frame ();
}

Gwt.Gui.Entry.prototype.SetPlaceholder = function (Text)
{
    this.Html.placeholder = Text;
};

Gwt.Gui.Entry.prototype.ChangeToPassword = function ()
{
    this.Html.type = "password";
};

Gwt.Gui.Entry.prototype.ChangeToText = function ()
{
    this.Html.type = "text";
};

Gwt.Gui.Entry.prototype.GetText = function ()
{
    if (this.Format === "Text")
    {
        return this.Html.value;
    }
    else
    {
        return this.Html.value.replace("$", "").split(".").join("");
    }
};

Gwt.Gui.Entry.prototype.SetText = function (Text)
{
    this.Html.value = Text;
};

Gwt.Gui.Entry.prototype.SetMaxLength = function (MaxLength)
{	
    this.Html.maxLength = MaxLength;
};

Gwt.Gui.Entry.prototype.Reset = function ()
{
    this.SetText ("");
};

Gwt.Gui.Entry.prototype.ChangeToMonetary = function ()
{
    this.SetMaxLength(12);
    this.AddEvent (Gwt.Gui.Event.Keyboard.KeyUp, this.MonetaryFormat.bind (this));
    this.Format = "Monetary";
}

Gwt.Gui.Entry.prototype.MonetaryFormat = function ()
{
    var Prefix = "$";
    var OriginalStr = this.GetText();
    var Result = "";
    
    if(OriginalStr.length === 0)
    {
        this.SetText ("");
    }
    else if(OriginalStr.length > 0 && OriginalStr.length <= 3)
    {
        Result = Prefix+OriginalStr;
        this.SetText (Result);
        this.SetCaretPosition (Result.length);
    }
    
    else if(OriginalStr.length === 4)
    {
        Result = Prefix+OriginalStr[0]+"."+OriginalStr.substr(1,OriginalStr.length-1);
        this.SetText (Result);
        this.SetCaretPosition (Result.length);
    }
    
    else if(OriginalStr.length === 5)
    {
        Result = Prefix+OriginalStr.substr(0,2)+"."+OriginalStr.substr(2,OriginalStr.length-1);
        this.SetText (Result);
        this.SetCaretPosition (Result.length);
    }
    else if(OriginalStr.length === 6)
    {
        Result = Prefix+OriginalStr.substr(0,3)+"."+OriginalStr.substr(3,OriginalStr.length-1);
        this.SetText (Result);
        this.SetCaretPosition (Result.length);
    }
    else if(OriginalStr.length === 7)
    {
        Result = Prefix+OriginalStr[0]+"."+OriginalStr.substr(1,3)+"."+OriginalStr.substr(4,OriginalStr.length-1);
        this.SetText (Result);
        this.SetCaretPosition (Result.length);
    }
    else if(OriginalStr.length === 8)
    {
        Result = Prefix+OriginalStr.substr(0,2)+"."+OriginalStr.substr(2,3)+"."+OriginalStr.substr(5,OriginalStr.length-1);
        this.SetText (Result);
        this.SetCaretPosition (Result.length);
    }
    else if(OriginalStr.length === 9)
    {
        Result = Prefix+OriginalStr.substr(0,3)+"."+OriginalStr.substr(3,3)+"."+OriginalStr.substr(6,OriginalStr.length-1);
        this.SetText (Result);
        this.SetCaretPosition (Result.length);
    }
}

Gwt.Gui.Entry.prototype.SetCaretPosition = function (Position)
{
    if (this.GetHtml().setSelectionRange)
    {
        this.GetHtml().focus();
        this.GetHtml().setSelectionRange(Position, Position);
    }
    else if (this.GetHtml().createTextRange)
    {
        var range = this.GetHtml().createTextRange();
        range.collapse(true);
        range.moveEnd('character', Position);
        range.moveStart('character', Position);
        range.select();
    }
}

//Ends Gwt::Gui::Entry
//##################################################################################################
//##############################################################################################
//Class Gwt::Gui::File
Gwt.Gui.File  = function (Callback)
{
    Gwt.Gui.Frame.call (this);

    //instance props
    this.Input = new Gwt.Gui.Frame();
    this.Reader = new FileReader ();
    this.CallBack = Callback;
    this.ReadType = null;
    this.DataArrayBuffer = null
    this.DataBinayString = null;
    this.DataUrl = null;
    this.DataText = null;
    this.DataSize = null;
    this.FileName = null;
    this.MimeType = null;
    this.Data = null;
    
    //init
    this.SetSize (24, 24);
    this.SetClassName ("Gwt_Gui_File");
    this.SetBackgroundImage (Gwt.Core.Contrib.Images+"appbar.paperclip.rotated.svg");
    this.SetBackgroundSize (this.GetWidth(), this.GetHeight());
    this.SetZIndex (1000);
    this.SetReadType (Gwt.Gui.READ_ARRAY_BUFFER);
    
    this.Input.SetHtml ("input");
    this.Input.Html.setAttribute ("type", "file");
    this.Input.Html.removeAttribute ("multiple");
    this.Input.SetOpacity (0);
    this.Input.SetZIndex (1001);
    this.Input.AddEvent (Gwt.Gui.Event.Form.Change, this.UpdateInfo.bind (this));
    this.Add (this.Input);
    
    this.Reader.addEventListener(Gwt.Gui.Event.FileReader.Load, this.Load.bind (this))    
}

Gwt.Gui.File.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.File.prototype.constructor = Gwt.Gui.File;

Gwt.Gui.File.prototype._File = function ()
{
    this.Input._Frame ();
    
    this.Input = null;
    this.Reader = null;
    this.ReadType = null;
    this.DataArrayBuffer = null
    this.DataBinayString = null;
    this.DataUrl = null;
    this.DataText = null;
    this.DataSize = null;
    this.FileName = null;
    this.MimeType = null;
    this.Data = null;
    this.CallBack = null;
    
    this._Frame ();
}

Gwt.Gui.File.prototype.SetSize = function (Width, Height)
{
    this.SetWidth(Width);
    this.SetHeight(Height);
    this.SetBackgroundSize (this.GetWidth(), this.GetHeight());
  
    this.Input.SetSize (this.GetWidth(), this.GetHeight());
}

Gwt.Gui.File.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.SetMaxWidth (this.Width);
    this.SetMinWidth (this.Width);
    this.GetHtml ().style.width = this.Width+"px";
    this.SetBackgroundSize (this.GetWidth(), this.GetHeight());
    
    this.Input.SetWidth (this.GetWidth ());
}

Gwt.Gui.File.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.SetMaxHeight (this.Height);
    this.SetMinHeight (this.Height);
    this.GetHtml ().style.height = this.Height+"px";
    this.SetBackgroundSize (this.GetWidth(), this.GetHeight());
    
    this.Input.SetHeight (this.GetHeight ());
}

Gwt.Gui.File.prototype.UpdateInfo = function ()
{
    this.Data = this.Input.Html.files[0];
    this.DataSize = this.Data.size;
    this.FileName = this.Data.name;
    this.MimeType = this.Data.type;
    
    this.Read ();
}

Gwt.Gui.File.prototype.GetData = function ()
{
    return this.Data;
}

Gwt.Gui.File.prototype.GetDataSize = function ()
{
    return this.DataSize;
}

Gwt.Gui.File.prototype.GetFileName = function ()
{
    return this.FileName;
}

Gwt.Gui.File.prototype.GetMimeType = function ()
{
    return this.MimeType;
}

Gwt.Gui.File.prototype.Reset = function ()
{
    this.Data = null;
    this.DataSize = null;
    this.FileName = null;
    this.MimeType = null;
    this.DataArrayBuffer = null
    this.DataBinayString = null;
    this.DataUrl = null;
    this.DataText = null;
    
}

Gwt.Gui.File.prototype.AddEvent = function (Event, Callback)
{
    this.Input.AddEvent (Event, Callback);
}

Gwt.Gui.File.prototype.Read = function () 
{
    switch (this.ReadType)
    {
        case Gwt.Gui.READ_ARRAY_BUFFER:
            this.Reader.readAsArrayBuffer(this.GetData());
            break;
        
        case Gwt.Gui.READ_BINARY_STRING:
            this.Reader.readAsBinaryString(this.GetData());
            break;
            
        case Gwt.Gui.READ_URL:
            this.Reader.readAsDataURL(this.GetData());
            break;
            
        case Gwt.Gui.READ_TEXT:
            this.Reader.readAsText(this.GetData());
            break;
            
        default:
            console.log ("File read type unset");
            break;
    }
}

Gwt.Gui.File.prototype.Load = function ()
{
    this.CallBack (this.FileName, this.MimeType, this.DataSize, this.Reader.result);
}

Gwt.Gui.File.prototype.SetReadType = function (Type)
{
    this.ReadType = Type;
}

Gwt.Gui.File.prototype.SetCallbackRead = function (Callback)
{
    this.CallBack = Callback;
}
//Ends Gwt::Gui::File
//###########################################################################################################
//##############################################################################################
//Class Gwt::Gui::Text
Gwt.Gui.Text  = function (Placeholder)
{
    Gwt.Gui.Frame.call (this);
        
    this.SetHtml ("textarea");
    this.SetClassName ("Gwt_Gui_Text");
    this.SetExpand (true);
    this.SetPadding (0);
    this.SetBorderRadius(5);
    this.SetPlaceholder (Placeholder || "Text Multiline");
    this.SetFontSize (11);
    this.SetHeight (80);
    this.SetAlign ();
    this.SetMaxLength (185);
}

Gwt.Gui.Text.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Text.prototype.constructor = Gwt.Gui.Text;

Gwt.Gui.Text.prototype._Text = function ()
{
    this._Frame ();
}

Gwt.Gui.Text.prototype.SetPlaceholder = function (Text)
{
	this.Html.placeholder = Text;
}

Gwt.Gui.Text.prototype.ChangeToPassword = function ()
{
	this.Html.type = "password";
}

Gwt.Gui.Text.prototype.ChangeToText = function ()
{
	this.Html.type = "text";
}

Gwt.Gui.Text.prototype.GetText = function ()
{
	return this.Html.value;
}

Gwt.Gui.Text.prototype.SetText = function (Text)
{
	this.Html.value = Text;
}

Gwt.Gui.Text.prototype.SetMaxLength = function (Value)
{	
	this.Html.maxLength = Value;
}

Gwt.Gui.Text.prototype.Reset = function ()
{
	this.SetText ("");
}

Gwt.Gui.Text.prototype.SetAlign = function (Value)
{
    switch (Value)
    {
        case Gwt.Gui.ALIGN_LEFT:
            this.align = Gwt.Gui.ALIGN_LEFT;
            this.Html.style.textAlign = Gwt.Gui.Contrib.TextAlign.Left;
            break;
        
        case Gwt.Gui.ALIGN_CENTER:
            this.align = Gwt.Gui.ALIGN_CENTER;
            this.Html.style.textAlign = Gwt.Gui.Contrib.TextAlign.Center;
            break;
        
        case Gwt.Gui.ALIGN_RIGHT:
            this.align = Gwt.Gui.ALIGN_RIGHT;
            this.Html.style.textAlign = Gwt.Gui.Contrib.TextAlign.Right;
            break;
        
        default:
            this.Html.style.textAlign = Gwt.Gui.Contrib.TextAlign.Justify;
            break;
    }
}
//Ends Gwt::Gui::Text
//##################################################################################################


//Class Gwt::Gui::HBox
Gwt.Gui.HBox = function (Margin)
{
    Gwt.Gui.Frame.call (this);

    //instance props
    this.MarginElements = typeof(Margin) === "undefined" ? 12 : Margin;
    this.Alignment = null;
	
    this.SetClassName ("Gwt_Gui_HBox");
    this.SetDisplay (Gwt.Gui.Contrib.Display.Block);
    this.SetAlignment (Gwt.Gui.ALIGN_CENTER);
}

Gwt.Gui.HBox.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.HBox.prototype.constructor = Gwt.Gui.HBox

Gwt.Gui.HBox.prototype._HBox = function ()
{
        this.MarginElements = null;
        this.Alignment = null;
        
        this._Frame ();
}

Gwt.Gui.HBox.prototype.GetMarginElements = function ()
{
	return this.MarginElements;
}

Gwt.Gui.HBox.prototype.Add = function (Element)
{
    this.GetChilds ().push (Element);
    this.GetHtml ().appendChild (Element.GetHtml ());
        
    if (Element instanceof Gwt.Gui.VBox)
    {
        var vboxs = [];
        var Others = [];
        for (var i = 0; i < this.GetChilds ().length; i++)
        {
            if (this.GetChilds ()[i] instanceof Gwt.Gui.VBox)
            {
                vboxs.push (this.GetChilds ()[i]);
            }
            else
            {
                Others.push (this.GetChilds ()[i]);
            }
        }
        
        var SpaceOcuped = 0;
        for (var k = 0; k < Others.length; k++)
        {
            SpaceOcuped += Others[k].GetWidth()+Others[k].GetMarginRight();
        }
        
        for (var j = 0; j < vboxs.length; j++)
        {
            vboxs[j].SetWidth ((this.GetWidth () - SpaceOcuped) / vboxs.length);
            vboxs[j].SetHeight (this.GetHeight ());
        }
    }
    else
    {
        Element.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
		
        if (Element.GetHtml () === this.GetHtml ().firstChild)
        {
            if (Element.GetMarginLeft () === null)
            {
                Element.SetMarginLeft (0);
            }
        }
        
        else if (Element.GetHtml () === this.GetHtml ().lastChild)
        {
            if (Element.GetMarginLeft () === null)
            {
                Element.SetMarginLeft (this.GetMarginElements ());
            }
        }
        
        if (Element.GetExpand ()) Element.SetHeight (this.GetHeight () - (Element.GetBorderTop () + Element.GetBorderBottom ()));
        
        if (!Element.GetExpand ())
        {
            switch (this.GetAlignment ())
            {
                case Gwt.Gui.ALIGN_TOP:
                    Element.SetMarginTop (0);
                    break;
		   
                case Gwt.Gui.ALIGN_CENTER:
                    Element.SetMarginTop ((this.GetHeight () - Element.GetHeight ())/2);
                    break;
		
                case Gwt.Gui.ALIGN_BOTTOM:
                    Element.SetMarginTop (this.GetHeight () - (Element.GetHeight () + Element.GetBorder()*2));
                    break;
		
                default:
                    throw TypeError("Invalid HBox Alignment Value");
                    break;
            }
        }       
    }
}

Gwt.Gui.HBox.prototype.SetAlignment = function(Alignment)
{
    switch(Alignment)
    {
	case Gwt.Gui.ALIGN_CENTER:
	    this.Alignment = Gwt.Gui.ALIGN_CENTER;
	    break;
	
	case Gwt.Gui.ALIGN_TOP:
	    this.Alignment = Gwt.Gui.ALIGN_TOP;
	    break;
	
	case Gwt.Gui.ALIGN_BOTTOM:
	    this.Alignment = Gwt.Gui.ALIGN_BOTTOM;
	    break;
	
	default:
	    throw TypeError("Invalid HBox Alignment Value");
	    break;
    }
}

Gwt.Gui.HBox.prototype.GetAlignment = function()
{
	return this.Alignment;
}

Gwt.Gui.HBox.prototype.SetSize = function (Width, Height)
{
    this.SetWidth(Width);
    this.SetHeight(Height);
}

Gwt.Gui.HBox.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.SetMaxWidth (this.Width);
    this.SetMinWidth (this.Width);
    this.Html.style.width = this.Width+"px";
    
    var elements = this.GetChilds ();
    var vboxs = [];
    var others = [];
    
    for (var i = 0; i < elements.length; i++)
    {
        var tmp = elements[i];
        if (tmp instanceof Gwt.Gui.VBox)
        {
            vboxs.push (tmp);
        }
        else
        {
            others.push (tmp);
        }
    }
    
    var SpaceOcuped = 0;
    for (var k = 0; k < others.length; k++)
    {
        var tmp = others[k];
        SpaceOcuped += tmp.GetWidth ()+tmp.GetMarginLeft();
    }
            
    for (var j = 0; j < vboxs.length; j++)
    {
        var tmp = vboxs[j];
        tmp.SetWidth (((this.GetWidth () - SpaceOcuped) / vboxs.length));
    }
}

Gwt.Gui.HBox.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.SetMaxHeight (this.Height);
    this.SetMinHeight (this.Height);
    this.Html.style.height = this.Height+"px";
    
    var elements = this.GetChilds ();
    for (var i = 0; i < elements.length; i++)
    {
        var tmp = elements[i];
        
        if (tmp.GetExpand ()) tmp.SetHeight (this.GetHeight () - (tmp.GetBorderTop () + tmp.GetBorderBottom ()));
		
        if (!tmp.GetExpand ())
        {
            switch (this.GetAlignment ())
            {
                case Gwt.Gui.ALIGN_TOP:
                    tmp.SetMarginTop (0);
                    break;
                        
                case Gwt.Gui.ALIGN_CENTER:
                    tmp.SetMarginTop ((this.GetHeight () - tmp.GetHeight ())/2);
                    break;
                        
                case Gwt.Gui.ALIGN_RIGHT:
                    tmp.SetMarginTop (this.GetHeight() - (tmp.GetHeight () + (tmp.GetBorderTop () + tmp.GetBorderBottom ())));
                    break;
                        
                default:
                    throw TypeError("Invalid HBox Alignment Value");
                    break;
            }
        }
    }
}
//Ends Gwt::Gui::HBox
//##################################################################################################
//########################################################################################
//Class Gwt::Gui::Image
Gwt.Gui.Image = function (Image)
{
    Gwt.Gui.Frame.call (this);
    
    //init
    this.SetHtml ("img");
    this.SetClassName ("Gwt_Gui_Image");
    this.SetCursor (Gwt.Gui.Contrib.Cursor.Default);
    this.SetImage (Image || Gwt.Core.Contrib.Images+"default_image.svg");
    this.SetSelectable ("none");
    this.SetValign(Gwt.Gui.Contrib.Valign.Top);
}

Gwt.Gui.Image.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Image.prototype.constructor = Gwt.Gui.Image;

Gwt.Gui.Image.prototype._Image = function ()
{
	this._Frame ();
}

Gwt.Gui.Image.prototype.SetImage = function (Image)
{
    this.GetHtml ().src = Image;
}

Gwt.Gui.Image.prototype.GetSrc = function ()
{
    return this.GetHtml ().src;
}

Gwt.Gui.Image.prototype.SetRounded = function ()
{
    this.SetBorderRadius (this.GetWidth () / 2);
}
//Ends Gwt::Gui::Image
//##################################################################################################
//########################################################################################
//Class Gwt::Gui::Croppie
Gwt.Gui.Croppie = function (Format, Width, Height)
{
    Gwt.Gui.Frame.call (this);
 
    //instance props
    this.Vanilla = new Croppie (this.GetHtml());
    this.BtnFinish = new Gwt.Gui.Button(Gwt.Core.Contrib.Images + "appbar.cabinet.out.svg", "Guardar");
    this.Image = null;
    this.FileFormat = Format || "png";
    this.FileWidth = Width || 240;
    this.FileHeight = Height || 240;
    this.Callback = null;
    
    //init
    this.SetSize (512, 512);
    this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (50, 50, 50, 0.9));
    this.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
    this.SetPosition (0, 0);
    this.Disable ();
            
    this.Vanilla.options.viewport.width = this.GetWidth()/2;
    this.Vanilla.options.viewport.height = this.GetWidth()/2;
    this.Vanilla.options.boundary.width = this.GetWidth();
    this.Vanilla.options.boundary.height = (this.GetHeight() - 86);
    this.Vanilla.options.showZoomer = true;
    this.Vanilla.options.enableOrientation = false;
    
    this.BtnFinish.SetWidth (90);
    this.BtnFinish.SetMarginLeft (12);
    this.BtnFinish.AddEvent (Gwt.Gui.Event.Mouse.Click, this.Result.bind(this));
    
    this.Add (this.BtnFinish);
}

Gwt.Gui.Croppie.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Croppie.prototype.constructor = Gwt.Gui.Croppie;

Gwt.Gui.Croppie.prototype._Croppie = function ()
{
    this.BtnFinish._Button();
    this.BtnFinish = null;
    
    this.Vanilla = null;
    this.Image = null;
    this.FileFormat = null;
    this.FileWidth = null;
    this.FileHeight = null;
    this.Callback = null
    
    this._Frame ();
}

Gwt.Gui.Croppie.prototype.SetImage = function (Image)
{
    this.Image = Image;
    this.Vanilla.bind({url: this.Image});
}

Gwt.Gui.Croppie.prototype.SetSize = function (Width, Height)
{
    this.SetWidth(Width);
    this.SetHeight(Height);
    
    this.Vanilla.elements.boundary.style.width = this.GetWidth ();
    this.Vanilla.elements.boundary.style.height = (this.GetHeight() - 86);
    
    this.Vanilla.elements.viewport.style.width = this.GetWidth()/2;
    this.Vanilla.elements.viewport.style.height = this.GetWidth()/2;
}

Gwt.Gui.Croppie.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.SetMaxWidth (this.Width);
    this.SetMinWidth (this.Width);
    this.GetHtml ().style.width = this.Width+"px";
    
    this.Vanilla.elements.boundary.style.width = this.GetWidth ();
    this.Vanilla.elements.viewport.style.width = this.GetWidth()/2;
}

Gwt.Gui.Croppie.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.SetMaxHeight (this.Height);
    this.SetMinHeight (this.Height);
    this.GetHtml ().style.height = this.Height+"px";
    
    this.Vanilla.elements.boundary.style.height = (this.GetHeight() - 86);
    this.Vanilla.elements.viewport.style.height = this.GetWidth()/2;
}

Gwt.Gui.Croppie.prototype.Result = function ()
{
    this.Vanilla.result({type: 'base64', size: {width: this.FileWidth, height: this.FileHeight},  format: this.FileFormat, quality: 0.666, circle: false}).then(this.Upload.bind(this));
    this.Disable();
}

Gwt.Gui.Croppie.prototype.Upload = function (blob)
{
    this.Callback (blob);
}

Gwt.Gui.Croppie.prototype.Enable = function ()
{
    this.SetDisplay (Gwt.Gui.Contrib.Display.Block);
}

Gwt.Gui.Croppie.prototype.Disable = function ()
{
    this.SetDisplay (Gwt.Gui.Contrib.Display.None);
}

Gwt.Gui.Croppie.prototype.SetCallbackResult = function (Callback)
{
    this.Callback = Callback;
}
//Ends Gwt::Gui::Croppie
//##################################################################################################
//########################################################################################
//Class Gwt::Gui::Avatar
Gwt.Gui.Avatar = function (Name, Format, Width, Height)
{
    Gwt.Gui.Frame.call (this);
    
    //instance props
    this.File = new Gwt.Gui.File (this.SetImage.bind(this));
    this.Image = new Gwt.Gui.Image (Gwt.Core.Contrib.Images+"appbar.camera.switch.invert.svg");
    this.Name = Name;
    this.FileName_ = null;
    this.FileWidth = Width ||  240;
    this.FileHeight = Height || 240;
    this.Type = Format === "jpg" ? "jpeg" : Format === "png" ? Format : "png" ;
    this.Editor =  new Gwt.Gui.Croppie (this.Type, this.FileWidth, this.FileHeight);
    
    //init
    this.SetClassName ("Gwt_Gui_Avatar");
    this.SetSize (96, 96);
    this.SetRounded ();
    
    this.File.SetSize (96, 96);
    this.File.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
    this.File.SetPosition (0, 0);
    this.File.SetOpacity (0);
    this.File.SetReadType (Gwt.Gui.READ_URL);
    this.File.SetCallbackRead (this.ChangeImage.bind(this));
    this.Add (this.File);

    this.Image.SetSize (96, 96);
    this.Add (this.Image);

    this.Editor.SetCallbackResult (this.SetImage.bind (this));
}

Gwt.Gui.Avatar.prototype = new Gwt.Gui.Image ();
Gwt.Gui.Avatar.prototype.constructor = Gwt.Gui.Avatar;

Gwt.Gui.Avatar.prototype._Avatar = function ()
{  
    this.Image._Image ();
    this.File._File ();
    this.Editor._Croppie ();
    
    this.Name = null;
    this.Image = null;
    this.File = null;
    this.Editor = null;
    this.FileName = null;
    this.Type = null;
    
    this._Frame ();
};

Gwt.Gui.Avatar.prototype.SetImage = function (Image)
{
    this.Image.SetImage (Image);
};

Gwt.Gui.Avatar.prototype.ChangeImage = function (FileName, MimeType, FileSize, Image)
{  
    var Ext = ["jpg", "jpeg", "bmp", "gif", "pcx", "png", "tga", "tiff", "wmp"];
    for (var i = 0; i < Ext.length; i++)
    {
        if (FileName.endsWith (Ext[i]))
        {
            this.FileName = FileName.replace (Ext[i], this.Type);
            break;
        }
    }

    this.Editor.SetImage (Image);
    this.Editor.Enable ();
};   
        
Gwt.Gui.Avatar.prototype.SetSizeEditor = function (Width, Height)
{
    this.Editor.SetSize (Width, Height);
};

Gwt.Gui.Avatar.prototype.GetEditor = function ()
{
    return this.Editor;
};

Gwt.Gui.Avatar.prototype.GetData = function ()
{
    return {FileName: this.FileName, Type: this.Type, Data: this.Image.GetSrc().replace(/^[^,]+,/, '')};
};

Gwt.Gui.Avatar.prototype.GetText = function ()
{
    return this.Name;
};

Gwt.Gui.Avatar.prototype.Reset = function ()
{
    this.Image.SetImage (Gwt.Core.Contrib.Images+"appbar.camera.switch.invert.svg");
};
//Ends Gwt::Gui::Avatar
//##################################################################################################
//##################################################################################################
//Class Gwt::Gui::MenuItem
Gwt.Gui.MenuItem = function (Image, Text, Callback)
{
    Gwt.Gui.Frame.call (this);
    
    //instance props
    this.Layout = new Gwt.Gui.HBox (5);
    this.Image = new Gwt.Gui.Image (Image);
    this.Text = new Gwt.Gui.StaticText (Text);
    this.Callback = Callback;
    
    //init
    this.SetSize (128, 25);
    
    this.Layout.SetSize (this.GetWidth (), this.GetHeight());
    this.Layout.SetAlignment (Gwt.Gui.ALIGN_CENTER);
    this.Add (this.Layout);

    this.Image.SetSize (18, 18);
    this.Image.SetMarginLeft (5);
    this.Layout.Add (this.Image);
    
    this.Text.SetExpand (false);
    this.Text.SetSize (this.GetWidth() - 34, 20);
    this.Layout.Add (this.Text);

    this.AddEvent (Gwt.Gui.Event.Mouse.Click, this.Callback);
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseOver, this.MouseHover.bind(this));
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseOut, this.MouseOut.bind(this));
}

Gwt.Gui.MenuItem.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.MenuItem.prototype.constructor = Gwt.Gui.MenuItem;

Gwt.Gui.MenuItem.prototype._MenuItem = function ()
{
    this.Image._Image ();
    this.Image = null;
    
    this.Text._StaticText ();
    this.Text = null;
    
    this.Layout._HBox ();
    this.Layout = null;
    
    this.Callback = null;
    
    this._Frame();
}

Gwt.Gui.MenuItem.prototype.MouseHover = function ()
{    
    var Color0 = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    Color0.SetAlpha (0.2);
    this.SetBackgroundColor(Color0);
}

Gwt.Gui.MenuItem.prototype.MouseOut = function ()
{
    var Color0 = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Transparent);
    this.SetBackgroundColor(Color0);
}
//Ends Gwt::Gui::MenuItem
//##################################################################################################

//##################################################################################################
//Class Gwt::Gui::Menu
Gwt.Gui.Menu = function ()
{   
    //instance props
    this.MenuBtn = new Gwt.Gui.Image (Gwt.Core.Contrib.Images + "appbar.list.svg");
    this.ContainerMenu = new Gwt.Gui.VBox (0);
    this.Items = [];
    
    //init
    this.MenuBtn.SetSize (24, 24);
    this.MenuBtn.AddEvent (Gwt.Gui.Event.Mouse.Click, this.Toggle.bind (this));
    
    this.ContainerMenu.SetSize (128, 128);
    this.ContainerMenu.SetBorderRadius (2);
    this.ContainerMenu.SetBackgroundColor (new Gwt.Gui.Contrib.Color (50, 50, 50, 0.9));
    this.ContainerMenu.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
    this.ContainerMenu.SetDisplay (Gwt.Gui.Contrib.Display.None);
    this.ContainerMenu.AddEvent (Gwt.Gui.Event.Mouse.Click, this.Toggle.bind (this));
}

Gwt.Gui.Menu.prototype._Menu = function ()
{
    for (var i = 0; i < this.Items.length; i++)
    {
        this.Items[i]._MenuItem();
        this.Items[i] = null;
    }
    
    this.Items = null;
    
    this.MenuBtn._Image ();
    this.MenuBtn = null;
    
    this.ContainerMenu._VBox ();
    this.ContainerMenu = null;
}

Gwt.Gui.Menu.prototype.Toggle = function ()
{
    if (this.ContainerMenu.GetDisplay () === Gwt.Gui.Contrib.Display.None)
    {
        this.ContainerMenu.SetDisplay (Gwt.Gui.Contrib.Display.Block);
    }
    else
    {
        this.ContainerMenu.SetDisplay (Gwt.Gui.Contrib.Display.None);
    }
}

Gwt.Gui.Menu.prototype.AddItem = function (Item)
{
    this.Items.push (Item);
    this.ContainerMenu.SetHeight ((this.Items.length * 25) + 50);
    this.Items[this.Items.length - 1].SetWidth (this.ContainerMenu.GetWidth ());
    this.ContainerMenu.Add (this.Items[this.Items.length - 1]);
}
//Ends Gwt::Gui::Menu
//##################################################################################################

//#########################################################################################################################################
//# class Gwt::Gui::SelectBoxItem
Gwt.Gui.SelectBoxItem = function (Text, Value)
{
    Gwt.Gui.Frame.call (this);
    
    //instance props
    this.Text = new Gwt.Gui.StaticText (Text);
    this.Value = Value;
    
    //init
    this.SetClassName ("Gwt_Gui_SelectBoxItem");
    this.SetHeight (24);
    var background_color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    background_color.SetAlpha (0);
    this.SetBorderColor (background_color);
    this.SetBorder (0);
    this.SetBackgroundColor (background_color);
    this.SetBorderStyle (Gwt.Gui.Contrib.BorderStyle.Solid);
    this.SetBorderRadius (0);
	
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseOver, this.MouseOver.bind (this));
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseOut, this.MouseOut.bind (this));
	
    this.Add (this.Text);
}

Gwt.Gui.SelectBoxItem.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.SelectBoxItem.prototype.constructor = Gwt.Gui.SelectBoxItem;

Gwt.Gui.SelectBoxItem.prototype._SelectBoxItem = function ()
{
    this.Text = null;
    this.Value = null;
	
    this._Frame ();
}

Gwt.Gui.SelectBoxItem.prototype.GetValue = function ()
{
    return this.Value;
}

Gwt.Gui.SelectBoxItem.prototype.GetText = function ()
{
    return this.Text.GetText();
}

Gwt.Gui.SelectBoxItem.prototype.MouseOver = function (event)
{
    var background_color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    background_color.SetAlpha (0.25);
    this.SetBackgroundColor (background_color);
}

Gwt.Gui.SelectBoxItem.prototype.MouseOut = function (event)
{
    var background_color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    background_color.SetAlpha (0);
    this.SetBackgroundColor (background_color);
}

Gwt.Gui.SelectBoxItem.prototype.Reset = function ()
{
    var background_color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    background_color.SetAlpha (0);
    this.SetBackgroundColor (background_color);
}
//Ends Gwt::Gui::SelectBoxItem
//###################################################################################################################################
//# class Gwt::Gui::SelectDialogBox
//###################################################################################################
Gwt.Gui.SelectBoxDialog = function ()
{
    Gwt.Gui.Dialog.call (this);
    
    //instance props
    this.LayoutDialog = new Gwt.Gui.VBox (0);
    this.Container = new Gwt.Gui.VBox (3);
    this.items = null;

    //init
    this.SetClassName ("Gwt_Gui_Select_dialog_box");
    
    this.LayoutDialog.SetSize (this.DialogBox.GetWidth ()*0.95, this.DialogBox.GetHeight ()*0.95);
    var top = (this.DialogBox.GetHeight()-this.LayoutDialog.GetHeight())/2;
    var left = (this.DialogBox.GetWidth()-this.LayoutDialog.GetWidth())/2;
    this.LayoutDialog.SetPosition (top, left);
      
    this.Container.AddEvent (Gwt.Gui.Event.Mouse.Wheel, this.EventScroll.bind(this));
    this.Container.SetSize (this.LayoutDialog.GetWidth (), 0);
    
    this.DialogBox.Add (this.LayoutDialog);
    this.LayoutDialog.Add (this.Container);
}

Gwt.Gui.SelectBoxDialog.prototype = new Gwt.Gui.Dialog ();
Gwt.Gui.SelectBoxDialog.prototype.constructor = Gwt.Gui.SelectBoxDialog;

Gwt.Gui.SelectBoxDialog.prototype._SelectBoxDialog = function ()
{
    this.LayoutDialog._VBox();
    this.Container._VBox();
    
    this.Container = null;
    this.LayoutDialog = null;
    this.items = null;
    
    this._Dialog ();
}

Gwt.Gui.SelectBoxDialog.prototype.AddItem = function (item)
{
	item.SetWidth (this.Container.GetWidth ());
        this.Container.SetHeight (this.Container.GetHeight () + item.GetHeight () + this.Container.GetMarginElements());
        this.Container.Add (item);
        this.items++;
}

Gwt.Gui.SelectBoxDialog.prototype.EventScroll = function (event)
{
    var deltaY = event.deltaY;
	
    var posTop = this.Container.GetPositionTop();
    var posLeft = this.Container.GetPositionLeft();
    
    var isScroll = this.Container.GetHeight () > this.LayoutDialog.GetHeight ();
    var itemsPlus = this.items-9;
    
    var maxScroll = 0;
    
    if (itemsPlus > 0)
    {
        maxScroll = -27*itemsPlus;
    }
	
    if (deltaY < 0 && isScroll && posTop < 0)
    {
        posTop += 27;
    }
    else if (deltaY > 0 && isScroll && posTop > maxScroll)
    {
	posTop -= 27;
    }
    else
    {
        posTop = posTop;
    }
	
    this.Container.SetPosition (posLeft, posTop);
}
//Ends Gwt::Gui::SelectBoxDialog
//##################################################################################################
//###################################################################################################
//# class Gwt::Gui::SelectBox
Gwt.Gui.SelectBox = function (Placeholder, options)
{
    Gwt.Gui.Frame.call (this);
    
    //instance props
    this.Placeholder = Placeholder;
    this.StaticText = new Gwt.Gui.StaticText (this.Placeholder);
    this.Options = [];
    this.Text=null;
    this.Value=null;
    this.SelectDialogBox = null;
    
    //init
    this.SetClassName ("Gwt_Gui_Select_Box");
    this.SetExpand (true);
    this.AddEvent (Gwt.Gui.Event.Mouse.Click, this.ShowDialog.bind(this));
    this.AddEvent (Gwt.Gui.Event.Keyboard.KeyPress, this.ShowDialog.bind(this));

    this.Add (this.StaticText);
	
    options = [{"Text": this.Placeholder, "Value": ""}].concat(options);
    for (var i = 0; i < options.length; i++)
    {
        if (i === 0)
        {
            this.Options [i] = new Gwt.Gui.SelectBoxItem (this.Placeholder, "");
        }
        else
        {
            this.Options [i] = new Gwt.Gui.SelectBoxItem (options[i].Text, options[i].Value);
        }
	this.Options [i].AddEvent (Gwt.Gui.Event.Mouse.Click, this.SetValueListener.bind(this, Event, options[i].Text, options[i].Value));
    }
    
    this.SetValue("");
}


Gwt.Gui.SelectBox.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.SelectBox.prototype.constructor = Gwt.Gui.SelectBox;

Gwt.Gui.SelectBox.prototype._SelectBox = function ()
{
    this.StaticText._StaticText ();
    
    for (var i=0; i < this.Options.length; i++)
    {
        this.Options[i]._SelectBoxItem ();
        this.Options[i] = null;
    }
    
    if(this.SelectDialogBox !== null && this.SelectDialogBox !== undefined)
    {
        this.SelectDialogBox._SelectBoxDialog ();
    }
   
    this.StaticText = null;
    this.Placeholder = null;
    this.Options = null;
    this.SelectDialogBox = null;
    
    this._Frame ();
}

Gwt.Gui.SelectBox.prototype.ShowDialog = function (event)
{
    //event.stopPropagation ();
    if (event.type === Gwt.Gui.Event.Keyboard.KeyPress || event.type === Gwt.Gui.Event.Mouse.Click)
    {
        if (event.keyCode === Gwt.Gui.Event.Keyboard.KeyCodes.Enter)
	{
            this.SelectDialogBox = new Gwt.Gui.SelectBoxDialog ();
            for (var i = 0; i < this.Options.length; i++)
            {
                this.Options [i].Reset();
                this.SelectDialogBox.AddItem (this.Options [i]);
            }
            this.SelectDialogBox.Open ();
        }
        else if (event.type === Gwt.Gui.Event.Mouse.Click)
        {
            this.SelectDialogBox = new Gwt.Gui.SelectBoxDialog ();
            for (var i = 0; i < this.Options.length; i++)
            {
                this.Options [i].Reset();
                this.SelectDialogBox.AddItem (this.Options [i]);
            }
            this.SelectDialogBox.Open ();
        }
    }
}

Gwt.Gui.SelectBox.prototype.SetValueListener = function (Event, Text, Value)
{
    for (var i = 0; i < this.Options.length; i++)
    {
	if(this.Options [i].GetValue () === Value)
	{
            this.Options [i].SetBackgroundImage (Gwt.Core.Contrib.Images + "check_item.svg");
            this.Options [i].SetBackgroundRepeat (Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);
            this.Options [i].SetBackgroundPosition (Gwt.Gui.Contrib.BackgroundPosition.Right, Gwt.Gui.Contrib.BackgroundPosition.Center);
            
            this.Text = Text;
            this.StaticText.SetText (this.Text);
            this.Value=Value;
	}
	else
	{
            this.Options [i].SetBackgroundImage ("");
	}
    }
}

Gwt.Gui.SelectBox.prototype.SetValue = function (value)
{
    for (var i = 0; i < this.Options.length; i++)
    {
	if(this.Options [i].GetValue () === value)
	{
            this.Options [i].SetBackgroundImage (Gwt.Core.Contrib.Images+"check_item.svg");
            this.Options [i].SetBackgroundRepeat (Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);
            this.Options [i].SetBackgroundPosition (Gwt.Gui.Contrib.BackgroundPosition.Right, Gwt.Gui.Contrib.BackgroundPosition.Center);

            this.Text = this.Options[i].GetText();
            this.StaticText.SetText (this.Text);
            this.Value=this.Options[i].GetValue();
	}
	else
	{
            this.Options [i].SetBackgroundImage ("");
	}
    }
}

Gwt.Gui.SelectBox.prototype.GetText = function ()
{
    return this.Value;
}

Gwt.Gui.SelectBox.prototype.SetText = function (value)
{
    for (var i = 0; i < this.Options.length; i++)
    {
	if(this.Options [i].GetValue () === value)
	{
            this.Options [i].SetBackgroundImage (Gwt.Core.Contrib.Images+"check_item.svg");
            this.Options [i].SetBackgroundRepeat (Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);
            this.Options [i].SetBackgroundPosition (Gwt.Gui.Contrib.BackgroundPosition.Right, Gwt.Gui.Contrib.BackgroundPosition.Center);

            this.Text = this.Options[i].GetText();
            this.StaticText.SetText (this.Text);
            this.Value=this.Options[i].GetValue();
	}
	else
	{
            this.Options [i].SetBackgroundImage ("");
	}
    }
}
//Ends Gwt::Gui::Selectbox
//##################################################################################################


//################################################################################################
//Class Gwt::Gui::Static_Text
Gwt.Gui.StaticText = function (Text)
{
    Gwt.Gui.Frame.call (this);
    
    //instance props
    this.Text = Text || "Default Text";

    //init
    this.SetHtml ("p");
    this.SetClassName ("Gwt_Gui_Static_Text");
    this.SetText (this.Text);
    this.SetExpand (true);
    this.SetFontSize (11);
    this.SetHeight (24);
    //this.SetPaddingTop (2);
    this.SetColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure));
    //this.SetTextShadow (0, 0, 1, new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.DarkSlateGray));
    this.SetCursor (Gwt.Gui.Contrib.Cursor.Default);
    this.SetSelectable (Gwt.Gui.Contrib.UserSelect.None);
    this.SetOverflow (Gwt.Gui.Contrib.Overflow.Hidden);
}

Gwt.Gui.StaticText.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.StaticText.prototype.constructor = Gwt.Gui.StaticText;

Gwt.Gui.StaticText.prototype._StaticText = function ()
{
	this._Frame ();
}

Gwt.Gui.StaticText.prototype.SetText = function (Text)
{
	this.Text = Text;
	this.Html.textContent = this.Text;
}

Gwt.Gui.StaticText.prototype.TextAlign = function (Value)
{
	if (Value === Gwt.Gui.Contrib.TextAlign.Left || Value === Gwt.Gui.Contrib.TextAlign.Center || Value === Gwt.Gui.Contrib.TextAlign.Right || Value === Gwt.Gui.Contrib.TextAlign.Justify)
	{
		this.Html.style.textAlign = Value;
	}
	else
	{
		throw TypeError("Invalid Text Alignment Value");
	}
}

Gwt.Gui.StaticText.prototype.SetTextAlignment = function (Value)
{
	if (Value === Gwt.Gui.Contrib.TextAlign.Left || Value === Gwt.Gui.Contrib.TextAlign.Center || Value === Gwt.Gui.Contrib.TextAlign.Right || Value === Gwt.Gui.Contrib.TextAlign.Justify)
	{
		this.Html.style.textAlign = Value;
	}
	else
	{
		throw TypeError("Invalid Text Alignment Value");
	}
}

Gwt.Gui.StaticText.prototype.GetText = function ()
{
	return this.Text;
}

Gwt.Gui.StaticText.prototype.GetLength = function()
{
    return this.Text.length;
}

Gwt.Gui.StaticText.prototype.Reset = function ()
{
	this.SetText ("Default Text");
}

Gwt.Gui.StaticText.prototype.SetFontSize = function (FontSize)
{
    this.FontSize = FontSize;
    this.Html.style.fontSize = this.FontSize+"pt";
    //this.SetHeight (this.FontSize/1.5 + 24);
}
//Ends Gwt::Gui::Static_Text
//##################################################################################################
//###############################################################################################################################################
//Class Gwt::Gui::VBox
Gwt.Gui.VBox = function (Margin)
{
    Gwt.Gui.Frame.call (this);

    //instance props
    this.MarginElements = typeof(Margin) === "undefined" ? 12 : Margin;
    this.Alignment = null;

    //init
    this.SetClassName ("Gwt_Gui_VBox");
    this.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
    this.SetAlignment (Gwt.Gui.ALIGN_LEFT);
}

Gwt.Gui.VBox.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.VBox.prototype.constructor = Gwt.Gui.VBox;

Gwt.Gui.VBox.prototype._VBox = function ()
{
    this.MarginElements = null;
    this.Alignment = null;
	
    this._Frame ();
}

Gwt.Gui.VBox.prototype.GetMarginElements = function ()
{
	return this.MarginElements;
}

Gwt.Gui.VBox.prototype.Add = function (Element)
{
    this.GetChilds ().push (Element);
    this.GetHtml ().appendChild (Element.GetHtml ());
    
    if (!(Element instanceof Gwt.Gui.HBox))
    {
        Element.SetDisplay (Gwt.Gui.Contrib.Display.Block);
		
        if (Element.GetHtml () === this.GetHtml ().firstChild)
        {
            if (Element.GetMarginTop () === null)
            {
                Element.SetMarginTop (0);
            }
        }
        
        else if (Element.GetHtml () === this.GetHtml ().lastChild)
        {
            if (Element.GetMarginTop () === null)
            {
                Element.SetMarginTop (this.GetMarginElements ());
            }
        }
		
        if (Element.GetExpand ()) Element.SetWidth (this.GetWidth () - (Element.GetBorderLeft () + Element.GetBorderRight ()));
		
        if (!Element.GetExpand ())
        {
            switch (this.GetAlignment ())
            {
                case Gwt.Gui.ALIGN_LEFT:
                    Element.SetMarginLeft (0);
                    break;
		   
                case Gwt.Gui.ALIGN_CENTER:
                    Element.SetMarginLeft ((this.GetWidth() - Element.GetWidth())/2);
                    break;
		
                case Gwt.Gui.ALIGN_RIGHT:
                    Element.SetMarginLeft (this.GetWidth() - (Element.GetWidth() + Element.GetBorder()*2));
                    break;
		
                default:
                    throw TypeError("Invalid VBox Alignment Value");
                    break;
            }
        }
    }
    
    var HBoxs = [];
    var Others = [];
    for (var i = 0; i < this.GetChilds ().length; i++)
    {
        if (this.GetChilds ()[i] instanceof Gwt.Gui.HBox)
        {
            HBoxs.push (this.GetChilds ()[i]);
        }
        else
        {
            Others.push (this.GetChilds ()[i]);
        }
    }
	
    var SpaceOcuped = 0;
    for (var k = 0; k < Others.length; k++)
    {
        SpaceOcuped += Others[k].GetHeight()+Others[k].GetMarginBottom()+Others[k].GetMarginTop()+Others[k].GetPaddingTop()+Others[k].GetPaddingBottom()+(Others[k].GetBorder()*2);
    }
            
    for (var j = 0; j < HBoxs.length; j++)
    {
        HBoxs[j].SetHeight (((this.GetHeight () - SpaceOcuped) / HBoxs.length));
        HBoxs[j].SetWidth (this.GetWidth ());
    }

}

Gwt.Gui.VBox.prototype.SetAlignment = function(Alignment)
{
    switch(Alignment)
    {
	case Gwt.Gui.ALIGN_CENTER:
	    this.Alignment = Gwt.Gui.ALIGN_CENTER;
	    break;
	
	case Gwt.Gui.ALIGN_LEFT:
	    this.Alignment = Gwt.Gui.ALIGN_LEFT;
	    break;
	
	case Gwt.Gui.ALIGN_RIGHT:
	    this.Alignment = Gwt.Gui.ALIGN_RIGHT;
	    break;
	
	default:
	    throw TypeError("Invalid VBox Alignment Value");
	    break;
    }
}

Gwt.Gui.VBox.prototype.GetAlignment = function()
{
	return this.Alignment;
}

Gwt.Gui.VBox.prototype.SetSize = function (Width, Height)
{
    this.SetWidth(Width);
    this.SetHeight(Height);
}

Gwt.Gui.VBox.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.SetMaxWidth (this.Width);
    this.SetMinWidth (this.Width);
    this.Html.style.width = this.Width+"px";
    
    var elements = this.GetChilds ();
    
    for (var i = 0; i < elements.length; i++)
    {
        var tmp = elements[i];
        
        if (tmp.GetExpand ()) tmp.SetWidth (this.GetWidth () - (tmp.GetBorderLeft () + tmp.GetBorderRight ()));
		
        if (!tmp.GetExpand ())
        {
            switch (this.GetAlignment ())
            {
                case Gwt.Gui.ALIGN_LEFT:
                    tmp.SetMarginLeft (0);
                    break;
                        
                case Gwt.Gui.ALIGN_CENTER:
                    tmp.SetMarginLeft ((this.GetWidth() - tmp.GetWidth())/2);
                    break;
                        
                case Gwt.Gui.ALIGN_RIGHT:
                    tmp.SetMarginLeft (this.GetWidth() - (tmp.GetWidth() + (tmp.GetBorderLeft () + tmp.GetBorderRight ())));
                    break;
                        
                default:
                    throw TypeError("Invalid VBox Alignment Value");
                    break;
            }
        }
    }
}

Gwt.Gui.VBox.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.SetMaxHeight (this.Height);
    this.SetMinHeight (this.Height);
    this.Html.style.height = this.Height+"px";
    
    var elements = this.GetChilds ();
    var hboxs = [];
    var others = [];
    
    for (var i = 0; i < elements.length; i++)
    {
        var tmp = elements[i];
        if (tmp instanceof Gwt.Gui.HBox)
        {
            hboxs.push (tmp);
        }
        else
        {
            others.push (tmp);
        }
    }
    
    var SpaceOcuped = 0;
    for (var k = 0; k < others.length; k++)
    {
        var tmp = others[k];
        SpaceOcuped += tmp.GetHeight();
    }
            
    for (var j = 0; j < hboxs.length; j++)
    {
        var tmp = hboxs[j];
        tmp.SetHeight (((this.GetHeight () - SpaceOcuped) / hboxs.length));
    }
}
//Ends Gwt::Gui::VBox
//##################################################################################################

//####################################################################################################
//Class Gwt::Gui::Slider
Gwt.Gui.Slider = function (Slots)
{
    Gwt.Gui.Frame.call (this);
    
    //instance props
    this.Slots = new Array (typeof(Slots) === "undefined"? 1 : Slots);
    this.Panel = new Gwt.Gui.Frame ();
    this.ArrowLeft = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"appbar.arrow.left.svg", "");
    this.ArrowRight = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"appbar.arrow.right.svg", "");
    this.Viewer = new Gwt.Gui.Frame ();
    this.Slide = new Gwt.Gui.HBox ();
    
    //init
    this.SetClassName ("Gwt_Gui_Slider");

    this.ArrowLeft.SetWidth (28);
    this.ArrowLeft.AddEvent (Gwt.Gui.Event.Mouse.Click, this.SlideRight.bind (this));
    
    this.ArrowRight.SetWidth (28);
    this.ArrowRight.AddEvent (Gwt.Gui.Event.Mouse.Click, this.SlideLeft.bind (this));

    this._Add (this.Viewer);
    this._Add (this.Panel);
}

Gwt.Gui.Slider.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Slider.prototype.constructor = Gwt.Gui.Slider;

Gwt.Gui.Slider.prototype._Slider = function ()
{
    this.Slots = null;
    this.Panel = null;
    this.ArrowLeft = null;
    this.ArrowRight = null;
    this.Viewer = null;
    this.Slide = null;
    
    this._Frame ();
}

Gwt.Gui.Slider.prototype.GetSlots = function ()
{
    return this.Slots;
}

Gwt.Gui.Slider.prototype._Add = function (Widget)
{
    Widget.Parent = this;
    this.Add (Widget);
}

Gwt.Gui.Slider.prototype.Setup = function ()
{
    this.Panel.SetSize (this.GetWidth (), 28);
    this.Viewer.SetSize (this.GetWidth (), (this.GetHeight () - 28));
    
    var Hbox = new Gwt.Gui.HBox (0);
    var Col1 = new Gwt.Gui.VBox (0);
    var Col2 = new Gwt.Gui.VBox (0);
    
    Hbox.SetSize (this.Panel.GetWidth(), 28);
    Col1.SetHeight (28);
    Col2.SetHeight (28);
    Col2.SetAlignment (Gwt.Gui.ALIGN_RIGHT);
    
    Hbox.Add (Col1);
    Hbox.Add (Col2);
    
    this.Panel.Add (Hbox);
    Col1.Add (this.ArrowLeft);
    Col2.Add (this.ArrowRight);
    
    this.Slide.SetSize (this.Viewer.GetWidth ()*this.GetSlots ().length, this.Viewer.GetHeight ());
 
    this.Viewer.Add (this.Slide);
    
    for (var i=0; i < this.GetSlots ().length; i++)
    {
       var Tmp = new Gwt.Gui.VBox ();
       this.GetSlots ()[i] = Tmp;
    }
    
    for (var i=0; i < this.GetSlots ().length; i++)
    {
       this.Slide.Add (this.GetSlots ()[i]);
    }
}

Gwt.Gui.Slider.prototype.SlideLeft = function ()
{
     if (-this.Slide.GetPositionLeft () < (this.GetSlots ().length-1)*this.Viewer.GetWidth() )
     {
        this.Slide.SetPosition (this.Slide.GetPositionLeft () - this.Viewer.GetWidth (), 0);
     }
}

Gwt.Gui.Slider.prototype.SlideRight = function ()
{
     if (this.Slide.GetPositionLeft() < 0 && this.Slide.GetPositionLeft () < (this.GetSlots ().length-1)*this.Viewer.GetWidth())
     {
        this.Slide.SetPosition (this.Slide.GetPositionLeft () + this.Viewer.GetWidth (), 0);
     }
}

Gwt.Gui.Slider.prototype.AddSlotWidget = function (Slot, Widget)
{
    this.GetSlots ()[Slot].Add (Widget);
}

//Ends Gwt::Gui::Slider
//##################################################################################################

//##################################################################################################
//Class Gwt::Gui::Desktop
Gwt.Gui.Clock = function ()
{
    Gwt.Gui.Frame.call (this);
	
    this.resource = new XMLHttpRequest ();
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.seconds_bar = null;
    this.minutes_bar = null;
    this.hours_bar = null;
    this.center = null;
    this.seconds_interval = null;
    
    this.SetClassName ("Gwt_Gui_Clock");
    this.SetSize (200, 200);

    this.resource.open ("GET", Gwt.Core.Contrib.Images+"clock.svg", true);
    this.resource.overrideMimeType("image/svg+xml");
    this.resource.onreadystatechange = this.Ready.bind(this);
    this.resource.send ("");
}

Gwt.Gui.Clock.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Clock.prototype.constructor = Gwt.Gui.Clock;

Gwt.Gui.Clock.prototype._Clock = function ()
{
    window.clearInterval (this.seconds_interval);
    
    this.resource = null;
    this.seconds = null;
    this.minutes = null;
    this.hours = null;
    this.seconds_bar = null;
    this.minutes_bar = null;
    this.hours_bar = null;
    this.center = null;
    this.seconds_interval = null;
    
    this._Frame ();
}

Gwt.Gui.Clock.prototype.Ready = function ()
{
	if (this.resource.readyState == 4 && this.resource.status == 200)
	{
		this.Html.appendChild (this.resource.responseXML.documentElement);
		var date = new Date ();
		this.seconds = date.getSeconds ();
		this.minutes = date.getMinutes ();
		this.hours = date.getHours ();
	
		this.seconds_bar = this.Html.firstChild.getElementById("seconds");
		this.minutes_bar = this.Html.firstChild.getElementById("minutes");
		this.hours_bar = this.Html.firstChild.getElementById("hours");
	
		this.center = {'x': this.Html.firstChild.getAttribute ("width")/2, 'y': this.Html.firstChild.getAttribute ("height")/2};
	
		this.seconds_bar.setAttribute ("transform", "rotate("+(this.seconds*6)+", "+this.center.x+", "+this.center.y+")");
		this.seconds_interval = setInterval (this.UpdateSeconds.bind(this), 1000);
	
		this.minutes_bar.setAttribute ("transform", "rotate("+(this.minutes*6)+", "+this.center.x+", "+this.center.y+")");
	
		this.hours_bar.setAttribute ("transform", "rotate("+(this.hours*30)+", "+this.center.x+", "+this.center.y+")");
	}
}

Gwt.Gui.Clock.prototype.UpdateSeconds = function ()
{
	this.seconds += 1;
	this.seconds_bar.setAttribute ("transform", "rotate("+(this.seconds*6)+", "+this.center.x+", "+this.center.y+")");
	
	if(this.seconds === 60)
	{
		this.seconds = 0;
		this.UpdateMinutes ();
	}
}

Gwt.Gui.Clock.prototype.UpdateMinutes = function ()
{
	this.minutes += 1;
	this.minutes_bar.setAttribute ("transform", "rotate("+(this.minutes*6)+", "+this.center.x+", "+this.center.y+")");
	
	if (this.minutes === 60)
	{
		this.minutes = 0;
		this.UpdateHours ();
	}
}

Gwt.Gui.Clock.prototype.UpdateHours = function ()
{
	this.hours += 1;	
	this.hours_bar.setAttribute ("transform", "rotate("+(this.hours*30)+", "+this.center.x+", "+this.center.y+")");
	
	if (this.hours === 24)
	{
		this.hours = 0;
	}
}
//Ends Gwt::Gui::Clock
//##################################################################################################
//##################################################################################################
//Class Gwt::Gui::Button_on_off
Gwt.Gui.ButtonOnOff = function ()
{
    Gwt.Gui.Frame.call (this);
    
    //instance props
    this.Canvas = new Gwt.Graphic.Svg.Canvas ();
    this.Circle = new Gwt.Graphic.Svg.Circle ();
    
    //init
    this.SetClassName ("Gwt_Gui_Button_on_off");
    this.SetSize (48,24);
    this.SetBorder(1);
    this.SetOutLine (Gwt.Gui.Contrib.OutLine.None);
    var colorborder = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    colorborder.SetAlpha (0.5);
    this.SetBorderColor(colorborder);
    var colorbackground = new Gwt.Gui.Contrib.Color (25,25,25);
    colorbackground.SetAlpha (0.25);
    this.SetBackgroundColor(colorbackground);
    this.SetBorderStyle(Gwt.Gui.Contrib.BorderStyle.Solid);
    this.SetBorderRadius(24);
	
    this.Canvas.SetSize (24, 24);
    this.Canvas.SetViewBox (0, 0, this.Canvas.GetWidth(), this.Canvas.GetHeight());
    this.Add (this.Canvas);

    this.Circle.SetFill ("Azure");
    this.Circle.SetCx (12);
    this.Circle.SetCy (12);
    this.Canvas.Add (this.Circle);
}

Gwt.Gui.ButtonOnOff.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.ButtonOnOff.prototype.constructor = Gwt.Gui.ButtonOnOff;

Gwt.Gui.ButtonOnOff.prototype._ButtonOnOff = function ()
{
    this.Canvas._Canvas ();
    this.Circle._Circle ();
    
    this.Canvas = null;
    this.Circle = null;
    
    this._Frame ();
}

Gwt.Gui.ButtonOnOff.prototype.SetOn = function ()
{
    this.Canvas.SetPosition (24,0);
    var colorbackground = new Gwt.Gui.Contrib.Color (0,102,255);
    colorbackground.SetAlpha (0.3);
    this.SetBackgroundColor(colorbackground);
}

Gwt.Gui.ButtonOnOff.prototype.SetOff = function ()
{
    this.Canvas.SetPosition (0,0);
    var colorbackground = new Gwt.Gui.Contrib.Color (25,25,25);
    colorbackground.SetAlpha (0.25);
    this.SetBackgroundColor(colorbackground);
}
//Ends Gwt::Gui::ButtonOnOff
//##################################################################################################
//##############################################################################################
//Class Gwt::Gui::IconControl
Gwt.Gui.IconControl = function (Icon, Control)
{
    Gwt.Gui.Frame.call (this);
    
    //instance props
    this.Icon = new Gwt.Gui.Image(Icon || Gwt.Core.Contrib.Images+"appbar.notification.star.svg");
    this.Control = Control || new Gwt.Gui.StaticText ("Text Default");

    //init
    this.SetClassName ("Gwt_Gui_Icon_Control");
    this.SetHeight (24);
    this.SetExpand (true);    

    this.Icon.SetSize(22, 22);
    this.Icon.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
    this.Icon.SetMarginRight (5);
    this.Icon.SetValign (Gwt.Gui.Contrib.Valign.Top);
    this.Add (this.Icon);

    this.Control.SetWidth (this.GetWidth () - (this.Icon.GetWidth () + this.Icon.GetMarginRight ()));
    this.Control.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
    this.Add (this.Control);
}

Gwt.Gui.IconControl.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.IconControl.prototype.constructor = Gwt.Gui.IconControl;

Gwt.Gui.IconControl.prototype._IconControl = function ()
{
    this.Icon._Image ();
    
    this.Icon = null;
    this.Control = null;
    
    this._Frame ();
}

Gwt.Gui.IconControl.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.SetMaxWidth (this.Width);
    this.SetMinWidth (this.Width);
    this.Html.style.width = this.Width+"px";
    
    this.Icon.SetWidth (22);
    this.Control.SetWidth (this.GetWidth () - (this.Icon.GetWidth () + this.Icon.GetMarginRight ()));
}

Gwt.Gui.IconControl.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.SetMaxHeight (this.Height);
    this.SetMinHeight (this.Height);
    this.Html.style.height = this.Height+"px";
    
    this.Icon.SetHeight (22);
    this.Control.SetHeight (24);
}

Gwt.Gui.IconControl.prototype.SetTabIndex = function (TabIndex)
{
    this.Control.SetTabIndex (TabIndex);
}
//Ends Gwt::Gui::IconEntry
//##################################################################################################
//########################################################################################
//Class Gwt::Gui::IconDesktop
Gwt.Gui.IconDesktop = function (Image, Text, App)
{
    Gwt.Gui.Frame.call (this);
        
    this.Layout = new Gwt.Gui.VBox (0);
    this.Image = new Gwt.Gui.Image (Image);
    this.Text = new Gwt.Gui.StaticText (Text);
    this.App = App;
	
    this.SetSize (96, 96);
    this.SetBorderRadius (3);
    this.SetBorderStyle (Gwt.Gui.Contrib.BorderStyle.Solid);
    
    this.Layout.SetSize (this.GetWidth (), this.GetHeight());
    this.Layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
    this.Add (this.Layout);

    this.Image.SetSize (64, 64);
    this.Image.SetMarginTop (3);
    this.Image.SetMarginBottom (6);
    this.Layout.Add (this.Image);
    
    this.Text.SetSize (this.Layout.GetWidth(), 32);
    this.Text.SetFontSize (10);
    this.Text.SetTextAlignment (Gwt.Gui.Contrib.TextAlign.Center);
    this.Layout.Add (this.Text);

    this.AddEvent (Gwt.Gui.Event.Mouse.Click, this.LaunchApp.bind(this));
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseOver, this.MouseHover.bind(this));
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseOut, this.MouseOut.bind(this));
}

Gwt.Gui.IconDesktop.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.IconDesktop.prototype.constructor = Gwt.Gui.IconDesktop;

Gwt.Gui.IconDesktop.prototype._IconDesktop = function ()
{
    this._Frame ();
}

Gwt.Gui.IconDesktop.prototype.MouseHover = function ()
{
    var Color0 = new Gwt.Gui.Contrib.Color (25,25,25,0.25);
    this.SetBackgroundColor(Color0);
}

Gwt.Gui.IconDesktop.prototype.MouseOut = function ()
{
    var Color0 = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Transparent);
    this.SetBackgroundColor(Color0);
}

Gwt.Gui.IconDesktop.prototype.LaunchApp = function ()
{
    window.gcontrol.close ();
    window.eval(this.App).open();
}
//Ends Gwt::Gui::IconDesktop
//##################################################################################################
//##############################################################################################
//Class Gwt::Gui::IconEntry
Gwt.Gui.IconEntry = function (Icon, Placeholder)
{
    Gwt.Gui.IconControl.call (this, Icon, new Gwt.Gui.Entry(Placeholder));
    
    //init
    this.SetClassName ("Gwt_Gui_Icon_Entry");
}

Gwt.Gui.IconEntry.prototype = new Gwt.Gui.IconControl ();
Gwt.Gui.IconEntry.prototype.constructor = Gwt.Gui.IconEntry;

Gwt.Gui.IconEntry.prototype._IconEntry = function ()
{
    this.Control._Entry ();
    this._IconControl ();
}

Gwt.Gui.IconEntry.prototype.SetMaxLength = function (MaxLength)
{	
    this.Control.SetMaxLength (MaxLength);
}

Gwt.Gui.IconEntry.prototype.GetText = function ()
{
    return this.Control.GetText ();
}

Gwt.Gui.IconEntry.prototype.SetText = function (Text)
{
    return this.Control.SetText (Text);
}

Gwt.Gui.IconEntry.prototype.ChangeToPassword = function ()
{
    this.Control.ChangeToPassword ();
}

Gwt.Gui.IconEntry.prototype.ChangeToText = function ()
{
    this.Control.ChangeToText ();
}
//Ends Gwt::Gui::IconEntry
//##################################################################################################
//##############################################################################################
//Class Gwt::Gui::IconSelectBox
Gwt.Gui.IconSelectBox = function (Icon, Placeholder, Options)
{
    Gwt.Gui.IconControl.call (this, Icon, new Gwt.Gui.SelectBox(Placeholder, Options));
    
    //init
    this.SetClassName ("Gwt_Gui_Icon_Select_Box");
}

Gwt.Gui.IconSelectBox.prototype = new Gwt.Gui.IconControl ();
Gwt.Gui.IconSelectBox.prototype.constructor = Gwt.Gui.IconSelectBox;

Gwt.Gui.IconSelectBox.prototype._IconSelectBox = function ()
{
    this.Control._SelectBox ();
    this._IconControl ();
}

Gwt.Gui.IconSelectBox.prototype.GetText = function ()
{
    return this.Control.GetText ();
}

Gwt.Gui.IconSelectBox.prototype.SetText = function (Text)
{
    this.Control.SetText (Text);
}
//Ends Gwt::Gui::IconSelectBox
//##################################################################################################
//########################################################################################
//Class Gwt::Gui::Image
Gwt.Gui.Date = function (placeholder)
{
    Gwt.Gui.Frame.call (this);
    
    //instance props
    this.year = null;
    this.month = null;
    this.day = null;
    this.container = new Gwt.Gui.HBox (0);
    
    
    //init
    this.SetClassName ("Gwt_Gui_Date");
    this.SetSize (190, 24);

    this.container.SetSize (160,24);
    this.Add (this.container);
    
    var y = new Date().getFullYear();
    var range = (y-150);
    var years_items = [];
    for (var i=y; i>=range; i--)
    {
        years_items.push ({"Text": i, "Value": i});
    }
    this.year = new Gwt.Gui.SelectBox ("Año", years_items);
    this.year.SetWidth (64);
        
    var months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    var months_items = [];
    for (var i=1; i<=12; i++)
    {
        months_items.push ({"Text": months[i-1], "Value": i});
    }
    this.month = new Gwt.Gui.SelectBox ("Mes", months_items);
    this.month.SetWidth (48);
    
    var days_items = [];
    for (var i=1; i<=31; i++)
    {
        if (i<10)
        {
            days_items.push ({"Text": "0".concat(i), "Value": i});
        }
        else
        {
            days_items.push ({"Text": String(i), "Value": i});
        }
    }
    
    this.day = new Gwt.Gui.SelectBox ("Día", days_items);
    this.day.SetWidth (48);
    
    this.container.Add (this.year);
    this.container.Add (this.month);
    this.container.Add (this.day);
}

Gwt.Gui.Date.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Date.prototype.constructor = Gwt.Gui.Date;

Gwt.Gui.Date.prototype._Date = function (placeholder)
{
    this.year._SelectBox ();
    this.month._SelectBox ();
    this.day._SelectBox ();
    
    this.year = null;
    this.mont = null;
    this.day = null;
    
    this._Frame ();
}

Gwt.Gui.Date.prototype.GetText = function ()
{
    return "%Y-%M-%D".replace ("%Y", this.year.GetText ()).replace ("%M", this.month.GetText ()).replace ("%D", this.day.GetText ());
}

Gwt.Gui.Date.prototype.SetDate = function (year, month, day)
{
    if (typeof(year) === "string")
    {
        try{
            var string_date = year.split ("-");
            this.year.SetText (Number(string_date[0]));
            this.month.SetText (Number(string_date[1]));
            this.day.SetText (Number(string_date[2]));
            
        }
        catch (e)
        {
            console.log ("No se puede convertir la fecha de string a date");   
        }
    }
    else if (typeof(year)==="number", typeof(month)==="number", typeof(day)==="number")
    {
        
        this.year.SetText (year);
        this.month.SetText (month);
        this.day.SetText (day);
        
    }
}

Gwt.Gui.Date.prototype.Reset = function ()
{
    this.year.Reset ();	    
    this.month.Reset ();
    this.day.Reset ();
}

Gwt.Gui.Date.prototype.Now = function ()
{
	var d = new Date ();
	this.SetDate (d.getFullYear(), d.getMonth()+1, d.getDate());
}

Gwt.Gui.Date.prototype.GetString = function ()
{
	return this.year.GetText ()+"-"+this.month.GetText ()+"-"+this.day.GetText ();
}
//Ends Gwt::Gui::Image
//##################################################################################################


//##################################################################################################
//Class Gwt::Gui::KnobThreeLevels
Gwt.Gui.KnobThreeLevels = function ()
{
    Gwt.Gui.Frame.call (this);

    this.Resource = new XMLHttpRequest ();
    this.Graphic = new Gwt.Gui.Frame ();
    this.Knob = new Gwt.Gui.Frame ();;
    this.Level = 0;
    this.Events = [];
    
    this.SetClassName ("Gwt_Gui_Knob_Three_Levels");
    this.SetSize (200, 200);
    
    this.Resource.open ("GET", Gwt.Core.Contrib.Images + "knob.three.levels.svg", true);
    this.Resource.overrideMimeType ("image/svg+xml");
    this.Resource.onreadystatechange = this.Loaded.bind(this);
    this.Resource.send ("");
}

Gwt.Gui.KnobThreeLevels.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.KnobThreeLevels.prototype.constructor = Gwt.Gui.KnobThreeLevels;

Gwt.Gui.KnobThreeLevels.prototype._KnobThreeLevels = function ()
{
    this.Knob._Frame ();
    this.Graphic._Frame ();
    
    this.Resource = null;
    this.Knob = null;
    this.Level = null;
    this.Events = null;
    
    this._Frame ();
}

Gwt.Gui.KnobThreeLevels.prototype.Loaded = function ()
{
    if (this.Resource.readyState == 4 && this.Resource.status == 200)
    {
        this.Graphic.SetHtml (this.Resource.responseXML.documentElement);        
        this.Knob.SetHtml (this.GetElement ("Knob"));
        for (var i = 0; i < this.Events.length; i++)
        {
            this.Knob.AddEvent (this.Events[i].Event, this.Events[i].Callback);
        }
        this.Graphic.SetSize (200, 200);
        this.Add (this.Graphic);
    }
}

Gwt.Gui.KnobThreeLevels.prototype.SetOff = function ()
{
    this.Level = 0;
    this.SetRotation(0);
}

Gwt.Gui.KnobThreeLevels.prototype.SetOne = function ()
{
    this.Level = 1;
    this.SetRotation(315);
}

Gwt.Gui.KnobThreeLevels.prototype.SetTwo = function ()
{
    this.Level = 2;
    this.SetRotation(270);
}

Gwt.Gui.KnobThreeLevels.prototype.SetThree = function ()
{
    this.Level = 3;
    this.SetRotation(225);
}

Gwt.Gui.KnobThreeLevels.prototype.GetLevel = function ()
{
    return this.Level;
}

Gwt.Gui.KnobThreeLevels.prototype.GetElement = function (Id)
{
    return this.Graphic.GetHtml ().getElementById (Id);
}

Gwt.Gui.KnobThreeLevels.prototype.SetRotation = function (Angle)
{
    var Center = {'X': this.Graphic.GetHtml().getAttribute("width")/2, 'Y': this.Graphic.GetHtml().getAttribute("height")/2};
    var str = "rotate(%angle, %x, %y)".replace("%angle", Angle).replace ("%x", Center.X).replace ("%y", Center.Y);
    this.Knob.GetHtml().setAttribute ("transform", str);
}

Gwt.Gui.KnobThreeLevels.prototype.AddEvent = function (Event, Callback)
{
    this.Events.push({"Event": Event, "Callback": Callback});    
}
//#####################################################################################################
//Class Gwt::Gui::KnobThreeLevels End
//Gwt::Graphic
//###########################################################################################################
Gwt.Graphic = new Object ();

//###########################################################################################################
//End Gwt::Graphic::Svg
//Gwt::Graphic::Svg
//###########################################################################################################
//environments constants
Gwt.Graphic.Svg = new Object ();
Gwt.Graphic.Svg.Contrib = new Object ();

Gwt.Graphic.Svg.Contrib.AspectRatio =
{
    XMinYMin : "xMimYMin",
    XMidYMid : "xMidYMid",
    XMaxYMax : "xMaxYMax",
    XMinYMid : "xMinYMid",
    XMidYMin : "xMidYMin",
    XMidYMax : "xMidYMax",
    XMaxYMid : "xMaxYMid",
    XMinYMax : "xMinYMax",
    XMaxYMin : "xMaxYMin",
}

Gwt.Graphic.Svg.Contrib.ZoomAndPan =
{
    Magnify : "magnify",
    Disable : "disable",
}

Gwt.Graphic.Svg.Contrib.StrokeLineCap =
{
    Butt : "butt",
    Round : "round",
    Square : "square",
}
//###########################################################################################################
//Gwt::Graphic::Conf

//##################################################################################################
//Class Gwt::Graphics::Svg::Graphic
Gwt.Graphic.Svg.Graphic = function ()
{
    //instance props
    this.Html = null;
    this.Width = null;
    this.Height = null;
    this.Fill = null;
    this.FillOpacity = null;
    this.Stroke = null;
    this.StrokeOpacity = null;
    this.StrokeWidth = null;
    this.StrokeLineCap = null;
    this.StrokeDashArray = null;
    
    //init
    this.SetHtml ("svg");
    this.SetWidth (100);
    this.SetHeight (100);
}

Gwt.Graphic.Svg.Graphic.prototype._Graphic = function ()
{
    this.Html = null;
    this.Width = null;
    this.Height = null;
    this.Fill = null;
    this.FillOpacity = null;
    this.Stroke = null;
    this.StrokeOpacity = null;
    this.StrokeWidth = null;
    this.StrokeLineCap = null;
    this.StrokeDashArray = null;
}

Gwt.Graphic.Svg.Graphic.prototype.Add = function (element)
{
    this.Html.appendChild (element.Html);
}

Gwt.Graphic.Svg.Graphic.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.Html.setAttribute ("width", this.Width+"px");
}

Gwt.Graphic.Svg.Graphic.prototype.GetWidth = function ()
{
    return this.Width;
}

Gwt.Graphic.Svg.Graphic.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.Html.setAttribute ("height", this.Height+"px");
}

Gwt.Graphic.Svg.Graphic.prototype.GetHeight = function ()
{
    return this.Height;
}

Gwt.Graphic.Svg.Graphic.prototype.SetSize = function (Width, Height)
{
    this.SetWidth (Width);
    this.SetHeight (Height);
}

Gwt.Graphic.Svg.Graphic.prototype.SetFill = function (Fill)
{
    this.Fill = Fill;
    this.Html.setAttribute ("fill", this.Fill);
}

Gwt.Graphic.Svg.Graphic.prototype.SetFillOpacity = function (FillOpacity)
{
    this.FillOpacity = FillOpacity;
    this.Html.setAttribute ("fill-opacity", this.FillOpacity);
}

Gwt.Graphic.Svg.Graphic.prototype.SetStroke = function (Stroke)
{
    this.Stroke = Stroke;
    this.Html.setAttribute ("stroke", this.Stroke);
}

Gwt.Graphic.Svg.Graphic.prototype.SetStrokeOpacity = function (StrokeOpacity)
{
    this.StrokeOpacity = StrokeOpacity;
    this.Html.setAttribute ("stroke-opacity", this.StrokeOpacity);
}

Gwt.Graphic.Svg.Graphic.prototype.SetStrokeWidth = function (StrokeWidth)
{
    this.StrokeWidth = StrokeWidth;
    this.Html.setAttribute ("stroke-width", this.StrokeWidth+"px");
}

Gwt.Graphic.Svg.Graphic.prototype.SetStrokeLineCap = function (StrokeLineCap)
{
    this.StrokeLineCap = StrokeLineCap;
    this.Html.setAttribute ("stroke-linecap", this.StrokeLineCap);
}

Gwt.Graphic.Svg.Graphic.prototype.SetStrokeDashArray = function (StrokeDashArray)
{
    this.StrokeDashArray = StrokeDashArray;
    this.Html.setAttribute ("stroke-dasharray", this.StrokeDashArray);
}

Gwt.Graphic.Svg.Graphic.prototype.SetHtml = function (Html)
{
    this.Html = document.createElementNS ("http://www.w3.org/2000/svg", Html);
}
//##################################################################################################
//End Gwt::Graphic::Svg::Graphic

//##################################################################################################
//Class Gwt::Graphics::Svg::Canvas
Gwt.Graphic.Svg.Canvas = function ()
{
    Gwt.Gui.Frame.call (this);
    
    this.Html = document.createElementNS ("http://www.w3.org/2000/svg", "svg");
    this.X = null;
    this.Y = null;
    this.ViewBoxMinX = null;
    this.ViewBoxMinY = null;
    this.ViewBoxWidth = null;
    this.ViewBoxHeight = null;
    this.PreserveAspectRatio = null;
    this.ZoomAndPan = null;
    this.Xmlns = null;
    this.XmlnsXlink = null;
    this.XmlSpace = null;
    
    //init
    this.SetX (0);
    this.SetY (0);
    this.SetWidth (100);
    this.SetHeight (100);
    this.SetViewBox (0, 0, this.GetWidth(), this.GetHeight());
    this.SetPreserveAspectRatio (Gwt.Graphic.Svg.Contrib.AspectRatio.XMaxYMax);
    this.SetZoomAndPan (Gwt.Graphic.Svg.Contrib.ZoomAndPan.Disable);
    this.SetXmlns ("http://www.w3.org/2000/svg", "http://www.w3.org/1999/xlink", "preserve");
    this.SetPositionType (Gwt.Gui.Contrib.PositionType.Relative);
}

Gwt.Graphic.Svg.Canvas.prototype = new Gwt.Gui.Frame ();
Gwt.Graphic.Svg.Canvas.prototype.constructor = Gwt.Graphic.Svg.Canvas;

Gwt.Graphic.Svg.Canvas.prototype._Canvas = function ()
{
    this.X = null;
    this.Y = null;
    this.ViewBoxMinX = null;
    this.ViewBoxMinY = null;
    this.ViewBoxWidth = null;
    this.ViewBoxHeight = null;
    this.PreserveAspectRatio = null;
    this.ZoomAndPan = null;
    this.Xmlns = null;
    this.XmlnsXlink = null;
    this.XmlSpace = null;
    
    this._Frame ();
}

Gwt.Graphic.Svg.Canvas.prototype.SetX = function (X)
{
    this.X = X;
    this.Html.setAttribute ("x", this.X+"px");
}

Gwt.Graphic.Svg.Canvas.prototype.GetX = function ()
{
    return this.X;
}

Gwt.Graphic.Svg.Canvas.prototype.SetY = function (Y)
{
    this.Y = Y;
    this.Html.setAttribute ("Y", this.Y+"px");
}

Gwt.Graphic.Svg.Canvas.prototype.GetY = function ()
{
    return this.Y;
}

Gwt.Graphic.Svg.Canvas.prototype.SetViewBox = function (Minx, Miny, Width, Height)
{
    this.ViewBoxMinX = Minx;
    this.ViewBoxMinY = Miny;
    this.ViewBoxWidth = Width;
    this.ViewBoxHeight = Height;
    
    this.Html.setAttribute ("viewBox", this.ViewBoxMinX+", "+this.ViewBoxMinX+", "+this.ViewBoxWidth+", "+this.ViewBoxHeight);
}

Gwt.Graphic.Svg.Canvas.prototype.SetPreserveAspectRatio = function (AspectRatio)
{
    this.PreserveAspectRatio = AspectRatio;
    
    this.Html.setAttribute ("preserveAspectRatio", this.PreserveAspectRatio);
}

Gwt.Graphic.Svg.Canvas.prototype.SetZoomAndPan = function (ZoomAndPan)
{
    this.ZoomAndPan = ZoomAndPan;
    
    this.Html.setAttribute ("zoomAndPan", this.ZoomAndPan);
}

Gwt.Graphic.Svg.Canvas.prototype.SetXmlns = function (Xmlns, XmlnsXlink, XmlSpace)
{
    this.Xmlns  = Xmlns;
    this.XmlnsXlink = XmlnsXlink;
    this.XmlSpace = XmlSpace;
    
    this.Html.setAttribute ("xmlns", this.Xmlns);
    this.Html.setAttribute ("xmlns:xlink", this.XmlnsXlink);
    this.Html.setAttribute ("xml:space", this.XmlSpace);
}
//Ends Gwt::Graphic::Svg::Canvas 
//##################################################################################################

//##################################################################################################
//Class Gwt::Graphics::Svg::Rect
Gwt.Graphic.Svg.Rect = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);
    
    //instance props
    this.X = null;
    this.Y = null;
    this.Rx = null;
    this.Ry = null;
    
    //init
    this.SetHtml ("rect");
    this.SetX (0);
    this.SetY (0);
    this.SetSize (100, 100);
}

Gwt.Graphic.Svg.Rect.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Rect.prototype.constructor = Gwt.Graphic.Svg.Rect;

Gwt.Graphic.Svg.Rect.prototype._Rect = function ()
{
    this.X = null;
    this.Y = null;
    this.Rx = null;
    this.Ry = null;
    
    this._Graphic ();
}

Gwt.Graphic.Svg.Rect.prototype.SetX = function (X)
{
    this.X = X;
    this.Html.setAttribute ("x", this.X+"px");
}

Gwt.Graphic.Svg.Rect.prototype.GetX = function ()
{
    return this.X;
}

Gwt.Graphic.Svg.Rect.prototype.SetY = function (Y)
{
    this.Y = Y;
    this.Html.setAttribute ("Y", this.Y+"px");
}

Gwt.Graphic.Svg.Rect.prototype.GetY = function ()
{
    return this.Y;
}

Gwt.Graphic.Svg.Rect.prototype.SetRx = function (Rx)
{
    this.Rx = Rx;
    this.Html.setAttribute ("rx", this.Rx+"px");
}

Gwt.Graphic.Svg.Rect.prototype.GetRx = function ()
{
    return this.Rx;
}

Gwt.Graphic.Svg.Rect.prototype.SetRy = function (Ry)
{
    this.Ry = Ry;
    this.Html.setAttribute ("ry", this.Ry+"px");
}

Gwt.Graphic.Svg.Rect.prototype.GetRy = function ()
{
    return this.Ry;
}
//##########################################################################################################
//Gwt::Graphic::Svg::Rect

//##################################################################################################
//Class Gwt::Graphics::Circle
Gwt.Graphic.Svg.Circle = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);

    //instance props
    this.Cx = null;
    this.Cy = null;
    this.R = null;
 
    this.SetHtml ("circle");
    this.SetCx (0);
    this.SetCy (0);
    this.SetR (10);
}

Gwt.Graphic.Svg.Circle.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Circle.prototype.constructor = Gwt.Graphic.Svg.Circle;

Gwt.Graphic.Svg.Circle.prototype._Circle = function ()
{
    this.Cx = null;
    this.Cy = null;
    this.R = null;
    
    this._Graphic ();
}

Gwt.Graphic.Svg.Circle.prototype.SetCx = function (Cx)
{
    this.Cx = Cx;
    this.Html.setAttribute ("cx", this.Cx+"px");
}

Gwt.Graphic.Svg.Circle.prototype.GetCx = function ()
{
    return this.Cx;
}

Gwt.Graphic.Svg.Circle.prototype.SetCy = function (Cy)
{
    this.Cy = Cy;
    this.Html.setAttribute ("cy", this.Cy+"px");
}

Gwt.Graphic.Svg.Circle.prototype.GetCy = function ()
{
    return this.Cy;
}

Gwt.Graphic.Svg.Circle.prototype.SetR = function (R)
{
    this.R = R;
    this.Html.setAttribute ("r", this.R+"px");
}

Gwt.Graphic.Svg.Circle.prototype.GetR = function ()
{
    return this.R;
}
//##########################################################################################################
//Gwt::Graphic::Svg::Circle

//##################################################################################################
//Class Gwt::Graphics::Svg::Ellipse
Gwt.Graphic.Svg.Ellipse = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);

    //instance props
    this.Cx = null;
    this.Cy = null;
    this.Rx = null;
    this.Ry = null;
 
    //init
    this.SetHtml ("ellipse");
    this.SetCx (0);
    this.SetCy (0);
    this.SetRx (0);
    this.SetRy (0);
}

Gwt.Graphic.Svg.Ellipse.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Ellipse.prototype.constructor = Gwt.Graphic.Svg.Ellipse;

Gwt.Graphic.Svg.Ellipse.prototype.SetCx = function (Cx)
{
    this.Cx = Cx;
    this.Html.setAttribute ("cx", this.Cx+"px");
}

Gwt.Graphic.Svg.Ellipse.prototype.GetCx = function ()
{
    return this.Cx;
}

Gwt.Graphic.Svg.Ellipse.prototype.SetCy = function (Cy)
{
    this.Cy = Cy;
    this.Html.setAttribute ("cy", this.Cy+"px");
}

Gwt.Graphic.Svg.Ellipse.prototype.GetCy = function ()
{
    return this.Cy;
}

Gwt.Graphic.Svg.Ellipse.prototype.SetRx = function (Rx)
{
    this.Rx = Rx;
    this.Html.setAttribute ("rx", this.Rx+"px");
}

Gwt.Graphic.Svg.Ellipse.prototype.GetRx = function ()
{
    return this.Rx;
}

Gwt.Graphic.Svg.Ellipse.prototype.SetRy = function (Ry)
{
    this.Ry = Ry;
    this.Html.setAttribute ("ry", this.Ry+"px");
}

Gwt.Graphic.Svg.Ellipse.prototype.GetRy = function ()
{
    return this.Ry;
}
//##########################################################################################################
//Gwt::Graphic::Svg::Ellipse

//##################################################################################################
//Class Gwt::Graphics::Line
Gwt.Graphic.Svg.Line = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);
    
    //instance props
    this.X1 = null;
    this.Y1 = null;
    this.X2 = null;
    this.Y2 = null;
 
    //init
    this.SetHtml ("line");
    this.SetP1 (0, 0);
    this.SetP2 (10, 10);
}

Gwt.Graphic.Svg.Line.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Line.prototype.constructor = Gwt.Graphic.Svg.Line;

Gwt.Graphic.Svg.Line.prototype.SetX1 = function (X1)
{
    this.X1 = X1;
    this.Html.setAttribute ("x1", this.X1+"px");
}

Gwt.Graphic.Svg.Line.prototype.GetX1 = function ()
{
    return this.X1;
}

Gwt.Graphic.Svg.Line.prototype.SetY1 = function (Y1)
{
    this.Y1 = Y1;
    this.Html.setAttribute ("y1", this.Y1+"px");
}

Gwt.Graphic.Svg.Line.prototype.GetY1 = function ()
{
    return this.Y1;
}

Gwt.Graphic.Svg.Line.prototype.SetX2 = function (X2)
{
    this.X2 = X2;
    this.Html.setAttribute ("x2", this.X2+"px");
}

Gwt.Graphic.Svg.Line.prototype.GetX2 = function ()
{
    return this.X2;
}

Gwt.Graphic.Svg.Line.prototype.SetY2 = function (Y2)
{
    this.Y2 = Y2;
    this.Html.setAttribute ("y2", this.Y2+"px");
}

Gwt.Graphic.Svg.Line.prototype.GetY2 = function ()
{
    return this.Y2;
}

Gwt.Graphic.Svg.Line.prototype.SetP1 = function (P1X, P1Y)
{
    this.SetX1 (P1X);
    this.SetY1 (P1Y);
}

Gwt.Graphic.Svg.Line.prototype.SetP2 = function (P2X, P2Y)
{
    this.SetX2 (P2X);
    this.SetY2 (P2Y);
}
//##########################################################################################################
//Gwt::Graphic::Svg::Line

//##################################################################################################
//Class Gwt::Graphics::Svg::Polygon
Gwt.Graphic.Svg.Polygon = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);

    this.Points = null;
    this.FillRule = null;
 
    this.SetHtml ("polygon");
}

Gwt.Graphic.Svg.Polygon.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Polygon.prototype.constructor = Gwt.Graphic.Svg.Polygon;

Gwt.Graphic.Svg.Polygon.prototype.SetPoints = function (Points)
{
    this.Points = Points;
    this.Html.setAttribute ("points", this.Points);
}

Gwt.Graphic.Svg.Polygon.prototype.GetPoints = function ()
{
    return this.Points;
}

Gwt.Graphic.Svg.Polygon.prototype.SetFillRule = function (FillRule)
{
    this.FillRule = FillRule;
    this.Html.setAttribute ("fill-rule", this.FillRule);
}
//##########################################################################################################
//Gwt::Graphic::Svg::Polygon

//##################################################################################################
//Class Gwt::Graphics::Svg::Polyline
Gwt.Graphic.Svg.Polyline = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);

    //instace props
    this.Points = null;
 
    //init
    this.SetHtml ("polyline");
}

Gwt.Graphic.Svg.Polyline.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Polyline.prototype.constructor = Gwt.Graphic.Svg.Polyline;

Gwt.Graphic.Svg.Polyline.prototype.SetPoints = function (Points)
{
    this.Points = Points;
    this.Html.setAttribute ("points", this.Points);
}

Gwt.Graphic.Svg.Polyline.prototype.GetPoints = function ()
{
    return this.Points;
}
//##########################################################################################################
//Gwt::Graphic::Svg::Polyline

//##################################################################################################
//Class Gwt::Graphics::Svg::Path
Gwt.Graphic.Svg.Path = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);

    this.D = null;
    this.M = null;
    this.L = null;
    this.H = null;
    this.V = null;
    this.C = null;
    this.S = null;
    this.Q = null;
    this.T = null;
    this.A = null;
    this.Z = null;
 
    this.SetHtml ("path");
}

Gwt.Graphic.Svg.Path.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Path.prototype.constructor = Gwt.Graphic.Svg.Path;

Gwt.Graphic.Svg.Path.prototype.SetD = function (D)
{
    this.D = D;
    this.Html.setAttribute ("d", this.D);
}

Gwt.Graphic.Svg.Path.prototype.GetD = function ()
{
    return this.D;
}

Gwt.Graphic.Svg.Path.prototype.SetM = function (M)
{
    this.M = "M"+M;
}

Gwt.Graphic.Svg.Path.prototype.GetM = function ()
{
    return this.M;
}

Gwt.Graphic.Svg.Path.prototype.SetL = function (L)
{
    this.L = "L"+L;
}

Gwt.Graphic.Svg.Path.prototype.GetL = function ()
{
    return this.L;
}

Gwt.Graphic.Svg.Path.prototype.SetH = function (H)
{
    this.H = "H"+H;
}

Gwt.Graphic.Svg.Path.prototype.GetH = function ()
{
    return this.H;
}

Gwt.Graphic.Svg.Path.prototype.SetV = function (V)
{
    this.V = "V"+V;
}

Gwt.Graphic.Svg.Path.prototype.GetV = function ()
{
    return this.V;
}

Gwt.Graphic.Svg.Path.prototype.SetC = function (C)
{
    this.C = "C"+C;
}

Gwt.Graphic.Svg.Path.prototype.GetC = function ()
{
    return this.C;
}

Gwt.Graphic.Svg.Path.prototype.SetS = function (S)
{
    this.S = "S"+S;
}

Gwt.Graphic.Svg.Path.prototype.GetS = function ()
{
    return this.S;
}

Gwt.Graphic.Svg.Path.prototype.SetQ = function (Q)
{
    this.Q = "Q"+Q;
}

Gwt.Graphic.Svg.Path.prototype.GetQ = function ()
{
    return this.Q;
}

Gwt.Graphic.Svg.Path.prototype.SetT = function (T)
{
    this.T = "T"+T;
}

Gwt.Graphic.Svg.Path.prototype.GetT = function ()
{
    return this.T;
}

Gwt.Graphic.Svg.Path.prototype.SetA = function (A)
{
    this.A = "A"+A;
}

Gwt.Graphic.Svg.Path.prototype.GetA = function ()
{
    return this.A;
}

Gwt.Graphic.Svg.Path.prototype.SetZ = function ()
{
    this.Z = "Z";
}

Gwt.Graphic.Svg.Path.prototype.UnsetZ = function ()
{
    this.A = "";
}

Gwt.Graphic.Svg.Path.prototype.GetZ = function ()
{
    return this.Z;
}
//##########################################################################################################
//Gwt::Graphic::Svg::Path

//##################################################################################################
//Class Gwt::Graphics::Arc
Gwt.Graphic.Svg.Arc = function ()
{
    Gwt.Graphic.Svg.Path.call (this);

    //instance props
    this.X1 = null;
    this.Y1 = null;
    this.X2 = null;
    this.Y2 = null;
    this.CenterX = null;
    this.CenterY = null;
    this.Radius = null;
    
    //init
    this.SetHtml ("path");
}

Gwt.Graphic.Svg.Arc.prototype = new Gwt.Graphic.Svg.Path ();
Gwt.Graphic.Svg.Arc.prototype.constructor = Gwt.Graphic.Svg.Arc;

Gwt.Graphic.Svg.Arc.prototype.PolarToCartesian = function (centerX, centerY, angleInDegrees)
{
    var angleInRadians = (angleInDegrees-90) * (Math.PI / 180.0);

    return {
        x: (centerX + (this.Radius * Math.cos(angleInRadians))),
        y: (centerY + (this.Radius * Math.sin(angleInRadians)))
    };
}

Gwt.Graphic.Svg.Arc.prototype.DescribeArc = function (X, Y, Radius, StartAngle, EndAngle)
{
    this.CenterX = X;
    this.CenterY = Y;
    this.Radius = Radius;
    
    var start = this.PolarToCartesian(X, Y, EndAngle);
    this.X1 = start.x;
    this.Y1 = start.y;
    
    var end = this.PolarToCartesian(X, Y, StartAngle);
    this.X2 = end.x;
    this.Y2 = end.y;

    var arcSweep = EndAngle - StartAngle <= 180 ? "0" : "1";
    
    this.SetM ([this.X1, this.Y1].join (" "));
    this.SetA ([this.Radius, this.Radius, 0, arcSweep, 0, this.X2, this.Y2].join (" "));
    this.SetL ([this.CenterX, this.CenterY].join (" "));
    this.SetZ ();
    this.SetD ([this.GetM (), this.GetA (), this.GetL (), this.GetZ()]. join (" "));
}
//##########################################################################################################
//Gwt::Graphic::Svg::Arc


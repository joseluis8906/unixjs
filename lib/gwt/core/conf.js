//###########################################################################
//Gwt::Core
Gwt.Core = {};

Gwt.Core.SiteName = "Unixjs.com";

Gwt.Core.Gwdm = function ()
{
    window.desktop.open();
    window.login.open ();
    //domotictrl.open();
    
    var Rpc = new Gwt.Core.Rpc("/session/");
    Rpc.Send ({Method: "Renew"}, function (Res){
        if (Res.Result === 1)
        {
            login.close ();
            gpanel.open ();
            gcontrol.open ();
            
            RenewSession = setInterval (Gwt.Core.RenewSession, 50000);
            TerminateSession = setTimeout (Gwt.Core.TerminateSession, 60000 * 2);
        
            window.addEventListener ("mousemove", function (){if (TerminateSession !== undefined) {clearTimeout (TerminateSession); TerminateSession = setTimeout (Gwt.Core.TerminateSession, 60000 * 2); }});
            window.addEventListener ("keypress", function (){if (TerminateSession !== undefined) {clearTimeout (TerminateSession); TerminateSession = setTimeout (Gwt.Core.TerminateSession, 60000 * 2); }});
            
            console.log ("iniciated");
        }
    });
};

Gwt.Core.Contrib = new Object ();
Gwt.Core.Contrib.Protocol = window.location.protocol;
Gwt.Core.Contrib.HostName = window.location.hostname;
Gwt.Core.Contrib.Port = window.location.port;
Gwt.Core.Contrib.Host = Gwt.Core.Contrib.Protocol + "//"+Gwt.Core.Contrib.HostName+":"+Gwt.Core.Contrib.Port+"/";
Gwt.Core.Contrib.Share = /*Gwt.Core.Contrib.Host*/ "/";
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
 
    var number_str = Gwt.Core.Contrib.ZFill(number, 9);
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

Gwt.Core.Contrib.ClosePrint = function ()
{
    console.log ("close print");
    document.body.removeChild(this.__container__);
    Gwt.Core.Gwdm ();
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

Gwt.Core.Contrib.ZFill = function (num, size) 
{
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
};


Gwt.Core.Contrib.TextToMonetary = function (Text)
{
    var Prefix = "$";
    var OriginalStr = Text.replace (/\D/g, "");
    var Result = "";
    
    if(OriginalStr.length === 0)
    {
        Result="";
    }
    else if(OriginalStr.length > 0 && OriginalStr.length <= 3)
    {
        Result = Prefix+OriginalStr;
    }
    
    else if(OriginalStr.length === 4)
    {
        Result = Prefix+OriginalStr[0]+"."+OriginalStr.substr(1,OriginalStr.length-1);
    }
    
    else if(OriginalStr.length === 5)
    {
        Result = Prefix+OriginalStr.substr(0,2)+"."+OriginalStr.substr(2,OriginalStr.length-1);
    }
    else if(OriginalStr.length === 6)
    {
        Result = Prefix+OriginalStr.substr(0,3)+"."+OriginalStr.substr(3,OriginalStr.length-1);
    }
    else if(OriginalStr.length === 7)
    {
        Result = Prefix+OriginalStr[0]+"."+OriginalStr.substr(1,3)+"."+OriginalStr.substr(4,OriginalStr.length-1);
    }
    else if(OriginalStr.length === 8)
    {
        Result = Prefix+OriginalStr.substr(0,2)+"."+OriginalStr.substr(2,3)+"."+OriginalStr.substr(5,OriginalStr.length-1);
    }
    else if(OriginalStr.length === 9)
    {
        Result = Prefix+OriginalStr.substr(0,3)+"."+OriginalStr.substr(3,3)+"."+OriginalStr.substr(6,OriginalStr.length-1);
    }
    
    return Result;
};


Gwt.Core.Contrib.MonetaryToText = function (Text)
{
    return Text.replace("$", "").split(".").join("");
};

Gwt.Core.Contrib.UrlVars = function ()
{
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
};

Gwt.Core.Contrib.RandomInt = function (min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

Gwt.Core.Contrib.DaysInMonth = function (month, year) 
{
    return new Date(year, month, 0).getDate();
};

//End Gwt::Core::Contrib
//###########################################################################

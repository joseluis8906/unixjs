window.addEventListener ("load", function () {Gwdm();});

function Gwdm ()
{
    desktop.open();
    //domotictrl.open();
    login.open ();
    
    if (Gwt.Core.Contrib.GetSessionId () !== null)
    {
        start_session ();
    }
    
}



//trasladar estas funciones a gwt
function start_session ()
{
    login.close ();
    gpanel.open ();
    gcontrol.open ();
    
    SessionRenueve = setInterval (window.renueve_session, 60000);
    
    SessionEnv = setTimeout (window.terminate_session, 60000 * 5);
    
    window.addEventListener ("mousemove", function (){if (SessionEnv !== undefined) {clearTimeout (SessionEnv); SessionEnv = setTimeout (window.terminate_session, 60000 * 5); }});
    window.addEventListener ("keypress", function (){if (SessionEnv !== undefined) {clearTimeout (SessionEnv); SessionEnv = setTimeout (window.terminate_session, 60000 * 5); }});
    
    renueve_session ();
}



function terminate_session ()
{
    
    Gwt.Core.Contrib.CloseActiveApp ();
    gpanel.close ();
    block.open ();
    
    clearTimeout(SessionEnv);
    SessionEnv = undefined;
    
    clearInterval (SessionRenueve);
    SessionRenueve = undefined;

    new Gwt.Core.Request ("/backend/auth/terminatesession/", function (){}, null, Gwt.Core.REQUEST_METHOD_GET);    
}



function renueve_session ()
{
    if (Gwt.Core.Contrib.GetSessionId () !== null)
    {
        new Gwt.Core.Request ("/backend/auth/renuevesession/", function (){}, null, Gwt.Core.REQUEST_METHOD_GET);
    }
}



function unlock_session ()
{
    block.close ();
    login.open ();
}


/*
function LoadApp (App) 
{
    var TagScript = document.createElement('script');
    TagScript.type = 'text/javascript';
    TagScript.async = true;
    TagScript.src = "/frontend/bin/"+App+".min.js";
    var Head = document.head;
    
    var Insert = true;
    
    for (var i = 0; i < Head.childNodes.length; i++)
    {
        if (Head.childNodes[i].src === TagScript.src)
        {
            Insert = false;
        }
    }
    
    if (Insert === true)
    {
        Head.appendChild(TagScript);
    }
}
*/
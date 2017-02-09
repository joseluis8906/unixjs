window.addEventListener ("load", function () {Gwdm();});

function Gwdm ()
{
    desktop.open();
    login.open ();
    
    if (sessionStorage.hasOwnProperty ("Session") && sessionStorage.getItem ("Session") === "Active")
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
	
    sessionStorage.setItem ("Session", "Active");
    
    SessionRenueve = setInterval (window.renueve_session, 60000);
    
    SessionEnv = setTimeout (window.terminate_session, 60000 * 5);
    
    window.addEventListener ("mousemove", function (){if (SessionEnv !== undefined) {clearTimeout (SessionEnv); SessionEnv = setTimeout (window.terminate_session, 60000 * 5); }});
    window.addEventListener ("keypress", function (){if (SessionEnv !== undefined) {clearTimeout (SessionEnv); SessionEnv = setTimeout (window.terminate_session, 60000 * 5); }});
    
    renueve_session ();
}



function terminate_session ()
{
    gcontrol.close ();
    gpanel.close ();
    block.open ();
    
    sessionStorage.removeItem ("Session");
    sessionStorage.clear ();
    
    clearTimeout(SessionEnv);
    SessionEnv = undefined;
    
    clearInterval (SessionRenueve);
    SessionRenueve = undefined;

    new Gwt.Core.Request ("/backend/auth/terminatesession/", function (){}, null, Gwt.Core.REQUEST_METHOD_GET);    
}



function renueve_session ()
{
    new Gwt.Core.Request ("/backend/auth/renuevesession/", function (){}, null, Gwt.Core.REQUEST_METHOD_GET);
}



function unlock_session ()
{
    block.close ();
    login.open ();
}


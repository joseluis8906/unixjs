window.addEventListener ("load", function () {InitRc();});

function InitRc ()
{
    desktop.open();
    login.open ();
    if (sessionStorage.hasOwnProperty ("Session"))
    {
        switch (sessionStorage.getItem ("Session"))
        {
            case "Inactive":
                block_session ();
                break;
				
            case "Active":
                start_session ();
        }
    }
}



function start_session ()
{
    login.close ();
    gcontrol.open ();
	
    sessionStorage.setItem ("Session", "Active");
    
    SessionRenueve = setInterval (window.renueve_session, 60000 * 0.4);
    
    SessionEnv = setTimeout (window.terminate_session, 60000);
}



function terminate_session ()
{
    sessionStorage.setItem ("Session", "Inactive");
    
    gcontrol.close ();
    block.open ();
    
    sessionStorage.clear ();
    
    new Gwt.Core.Request ("/backend/auth/terminatesession/", function (){}, null, Gwt.Core.REQUEST_METHOD_GET);
    
    clearTimeout(SessionEnv);
    SessionEnv = undefined;
    
    clearInterval (SessionRenueve);
    SessionRenueve = undefined;
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



//###########################################################################
//Gwt::Core
Gwt.Core = {
    REQUEST_TYPE_MULTIPART: 0,
    REQUEST_TYPE_XWWW: 1
};

Gwt.Core.Contrib = new Object ();
Gwt.Core.Contrib.Protocol = window.location.protocol;
Gwt.Core.Contrib.HostName = window.location.hostname;
Gwt.Core.Contrib.Port = window.location.port;
Gwt.Core.Contrib.Host = Gwt.Core.Contrib.Protocol+"//"+Gwt.Core.Contrib.HostName+":"+Gwt.Core.Contrib.Port+"/";
Gwt.Core.Contrib.Backend = Gwt.Core.Contrib.Host+"backend/";
Gwt.Core.Contrib.Frontend = Gwt.Core.Contrib.Host+"frontend/";
Gwt.Core.Contrib.Share = Gwt.Core.Contrib.Host+"share/";
Gwt.Core.Contrib.Images = Gwt.Core.Contrib.Share+"images/";

Gwt.Core.Math = {};
Gwt.Core.Math.Round = function (value, decimals) 
{
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
//End Gwt::Core::Contrib
//###########################################################################

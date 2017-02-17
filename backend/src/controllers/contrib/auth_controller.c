/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

#include "auth_controller.h"
#include "../../models/contrib/auth_user_model.h"
#include "../../redis.h"

int AuthControllerLogin (struct HttpRequest *Req)
{
    char *Data = NULL;
      
    if (VerifyRequest (Req, &Data, FORM_JSON) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }
    
    char UserName[64];
    char Password[256];

    struct FuncResult Ret = GetJsonString (Data, "UserName", UserName);
    
    if (Ret.Result == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, Ret.Result, Ret.Msg);
        return (KORE_RESULT_OK);
    }
    
    Ret = GetJsonString (Data, "Password", Password);
    
    if (Ret.Result == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, Ret.Result, Ret.Msg);
        return (KORE_RESULT_OK);
    }
    
    struct AuthUserModelArray Users = NewAuthUserModelArray();
    
    
    Ret = AuthUserModelSelect (&Users, UserName);
    
    if (Ret.Result == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, Ret.Result, Ret.Msg);
        return (KORE_RESULT_OK);
    }
    
    if(Users.Length == 0)
    {
        HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, "User not registered");
        return (KORE_RESULT_OK);
    }
    
    if (CheckPassword(Password, Users.At[0].Password) == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, "Password Incorrect");
        return (KORE_RESULT_OK);
    }
    
    
    if (AuthControllerStartSession (Req, UserName) == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, "Error Starting Session");
        return (KORE_RESULT_OK);
    }
            
    HttpResponseJsonMsg(Req, KORE_RESULT_OK, "Login success");
    
    return (KORE_RESULT_OK);
}



int AuthControllerStartSession (struct HttpRequest *Req, const char *UserName)
{    
    char SessionId[64];
    char SessionIdCrypt[64];
    sprintf (SessionId, "_%d_%s_", (int)time(NULL), UserName);
    
    GenerateSessionId (SessionId, SessionIdCrypt);
    
    char Tmp[256];
    sprintf (Tmp, "HMSET SessionId:%s UserName %s", SessionIdCrypt, UserName);
    
    char Result[256];
    
    if (RedisCommandStr (Tmp, Result) == KORE_RESULT_ERROR)
    {
        return KORE_RESULT_ERROR;
    }
    
    if (strcmp (Result, "OK") != 0)
    {
        return KORE_RESULT_ERROR;
    }
    
    sprintf (Tmp, "SessionId=%s; path=/; max-age=300", SessionIdCrypt);
    
    HttpResponseHeader (Req, "set-cookie", Tmp);
    
    return KORE_RESULT_OK;
}



int AuthControllerRenueveSession (struct HttpRequest *Req)
{    
    char *SessionId;
    
    if(HttpRequestHeader(Req, "SessionId", &SessionId) == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, "Renueve Session Failed");
        return KORE_RESULT_OK;
    }
       
    char Tmp[256];
    sprintf (Tmp, "SessionId=%s; path=/; max-age=300", SessionId);
    
    HttpResponseHeader (Req, "set-cookie", Tmp);
    
    HttpResponseJsonMsg(Req, KORE_RESULT_OK, "Renueve Session success");

    return KORE_RESULT_OK;
}



int AuthControllerTerminateSession (struct http_request *Req)
{        
    char *SessionId;
    
    if(HttpRequestHeader(Req, "SessionId", &SessionId) == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, "Terminate Session Failed");
        return KORE_RESULT_OK;
    }
    
    char Tmp[256];
    sprintf (Tmp, "DEL SessionId:%s", SessionId);
    int64_t  Result;
    RedisCommandInt (Tmp, &Result);
    
    if (Result == 0)
    {
        HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, "Terminate Session Failed");
        return KORE_RESULT_OK;
    }
    
    sprintf (Tmp, "SessionId=%s; path=/; max-age=1", SessionId);
    
    HttpResponseHeader (Req, "set-cookie", Tmp);
    HttpResponseJsonMsg(Req, KORE_RESULT_OK, "Terminate Session Success");
    
    return KORE_RESULT_OK;
}



int AuthControllerVerifySession (struct HttpRequest *Req)
{          
    char *SessionId;
    
    if(HttpRequestHeader(Req, "SessionId", &SessionId) == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, "Invalid Session");
        return KORE_RESULT_ERROR;
    }
    
    return KORE_RESULT_OK;
}



int AuthControllerGetUserInfo (struct HttpRequest *Req, char *UserName)
{
    char *SessionId;
    
    if(HttpRequestHeader(Req, "SessionId", &SessionId) == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, "Invalid Session");
        return KORE_RESULT_ERROR;
    }
    
    char Tmp[256];
    sprintf (Tmp, "HGET SessionId:%s UserName", SessionId);
    
    char Result[256];
    
    if (RedisCommandStr (Tmp, Result) == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, "Redis Error Command");
        return KORE_RESULT_ERROR;
    }
    
    strcpy (UserName, Result);
    
    return KORE_RESULT_OK;
}



int GenerateSessionId (const char *PseudoId, char *SessionId)
{
    char Dict[] = "0X1P2QV4cCUdeAfgMhijEklmnS5OpZ@qrKsWt9vIw7by6zBu-DF3H.x8JaL_NRoTYG";
    int DictLen = strlen (Dict);
    int i = 0;
    int Len = strlen (PseudoId);
    char *Pch;
    int Index;
    
    for (i = 0; i < Len; i++)
    {
        Pch = strrchr(Dict, PseudoId[i]);
        Index = Pch-Dict;
        Index += 13;
        
        if (Index > (DictLen - 1))
        {
            Index -= DictLen;
        }
        
        SessionId[i] = Dict[Index];
    }
    
    SessionId[Len] = '\0';
    
    return KORE_RESULT_OK;
}
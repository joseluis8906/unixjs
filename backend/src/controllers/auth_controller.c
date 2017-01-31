/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

#include "auth_controller.h"
#include "../models/contrib/auth_user_model.h"

int AuthControllerLogin (struct HttpRequest *Req)
{
    char *Data = NULL;
      
    if (VerifyRequest (Req, &Data, FORM_JSON) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }
    
    char UserName[64];
    char Password[256];

    struct FuncResult Ret = GetJsonValue (Data, "UserName", UserName);
    
    if (Ret.Result == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, Ret.Result, Ret.Msg);
        return (KORE_RESULT_OK);
    }
    
    Ret = GetJsonValue (Data, "Password", Password);
    
    if (Ret.Result == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, Ret.Result, Ret.Msg);
        return (KORE_RESULT_OK);
    }
    
    struct AuthUserModelArray Users = NewAuthUserModelArray();
    
    
    Ret = AuthUserModelSelect (UserName, &Users);
    
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
    kore_log (LOG_INFO, "StartSession Called");
    
    redisContext *Ctx = redisConnect (REDIS_IP, REDIS_PORT);
    
    if (Ctx == NULL || Ctx->err)
    {
        if (Ctx)
        {
            kore_log (LOG_INFO, "Redis error: %s\n", Ctx->errstr);
            redisFree (Ctx);
        }
        else
        {
            kore_log (LOG_INFO, "Redis can't allocate redis context\n");
        }
        return KORE_RESULT_ERROR;
    }

    redisReply *Reply = redisCommand (Ctx, "AUTH %s", "K3J9 8LMN 02F3 B3LW");
    if (strcmp(Reply->str, "OK") != 0)
    {
        kore_log (LOG_INFO, "Redis Password Error\n");
        return KORE_RESULT_ERROR;
    }
    
    char SessionId[64];
    char SessionIdCrypt[64];
    sprintf (SessionId, "_%d_%s_", (int)time(NULL), UserName);
    
    GenerateSessionId (SessionId, SessionIdCrypt);
    
    Reply = redisCommand (Ctx, "HMSET SessionId:%s UserName %s", SessionIdCrypt, UserName);
    if (strcmp(Reply->str, "OK") != 0)
    {
        kore_log (LOG_INFO, "Imposible create session");
        return KORE_RESULT_ERROR;
    }

    redisFree (Ctx);
     
    char Tmp[256];
    sprintf (Tmp, "SessionId=%s; path=/; max-age=60"/* Secure; HttpOnly"*/, SessionIdCrypt);
    
    HttpResponseHeader (Req, "set-cookie", Tmp);
    
    return KORE_RESULT_OK;
}



int AuthControllerRenueveSession (struct HttpRequest *Req)
{    
    char *SessionId;
    
    if(HttpRequestHeader(Req, "SessionId", &SessionId) == KORE_RESULT_ERROR)
    {
        kore_log (LOG_INFO, "Error renueve");
        HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, "Renueve Session Failed");
        return KORE_RESULT_OK;
    }
       
    char Tmp[256];
    sprintf (Tmp, "SessionId=%s; path=/; max-age=60"/* Secure; HttpOnly"*/, SessionId);
    
    HttpResponseHeader (Req, "set-cookie", Tmp);
    
    HttpResponseJsonMsg(Req, KORE_RESULT_OK, "Renueve Session success");

    return KORE_RESULT_OK;
}



int AuthControllerTerminateSession (struct http_request *Req)
{        
    redisContext *Ctx = redisConnect (REDIS_IP, REDIS_PORT);
    
    if (Ctx == NULL || Ctx->err)
    {
        if (Ctx)
        {
            kore_log (LOG_INFO, "Redis error: %s\n", Ctx->errstr);
            redisFree (Ctx);
        }
        else
        {
            kore_log (LOG_INFO, "Redis can't allocate redis context\n");
        }
        return KORE_RESULT_ERROR;
    }

    redisReply *Reply = redisCommand (Ctx, "AUTH %s", "K3J9 8LMN 02F3 B3LW");
    
    if (strcmp(Reply->str, "OK") != 0)
    {
        kore_log (LOG_INFO, "Redis Password Error\n");
        return KORE_RESULT_ERROR;
    }
    
    char *SessionId;
    
    if(HttpRequestHeader(Req, "SessionId", &SessionId) == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, "Terminate Session Failed");
        return KORE_RESULT_OK;
    }
    
    Reply = redisCommand (Ctx, "DEL SessionId:%s", SessionId);
    if (Reply->integer == 0)
    {
        kore_log (LOG_INFO, "Redis Error Deleting Session\n");
        return KORE_RESULT_OK;
    }
    
    redisFree (Ctx);
    
    char Tmp[256];
    sprintf (Tmp, "SessionId=%s; path=/; max-age=1"/* Secure; HttpOnly"*/, SessionId);
    
    HttpResponseHeader (Req, "set-cookie", Tmp);
    HttpResponseJsonMsg(Req, KORE_RESULT_OK, "Terminate Session Success");
    
    kore_log (LOG_INFO, "TerminateSession Called");
    return KORE_RESULT_OK;
}



int AuthControllerVerifySession (struct http_request *Req)
{    
    kore_log (LOG_INFO, "AuthVerifiSession called");
      
    char *SessionId;
    
    if(HttpRequestHeader(Req, "SessionId", &SessionId) == KORE_RESULT_ERROR)
    {
        return KORE_RESULT_ERROR;
    }
    
    kore_log (LOG_INFO, "Session is: %s", SessionId);
    
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
#include <kore/kore.h>
#include <kore/http.h>
#include <json-c/json.h>
#include "contrib.h"
#include "defines.h"
#include <openssl/sha.h>
#include <math.h>
#include <time.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

//encrypt password
const char *EncryptPassword (const char *Password_)
{
    char *p = NULL;
    
    if (strlen(Password_) != 4)
    {
        return p;
    }
    
    time_t seconds;
    time (&seconds);	
    srand ((unsigned int) seconds);
	
    char *alpha = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    int index = rand () % 62;
	
    char character[1];
    character[0] = alpha[index];
	
    unsigned char hash[SHA256_DIGEST_LENGTH];

    const unsigned char *p_character = NULL;
    p_character = (const unsigned char*)character;    
    
    SHA256 (p_character, strlen(character), hash);
	
    char digest_random[SHA256_DIGEST_LENGTH*2];
	
    for (int i = 0; i < SHA256_DIGEST_LENGTH; i++)
    {
        sprintf (digest_random + (i*2), "%02x",(int)hash[i]);
    }
    
    char salt[16];
    snprintf (salt, sizeof(salt)+1, digest_random);
    
    salt[3] = character[0];
    char password[5];
    strcpy (password, Password_);
    password[4] = character[0];
    
    const unsigned char *p_password = (const unsigned char*)password;
    SHA256 (p_password, strlen(password), hash);
    
    char digest_password[SHA256_DIGEST_LENGTH*2];

    for (int i = 0; i < SHA256_DIGEST_LENGTH; i++)
    {
        sprintf (digest_password + (i*2), "%02x",(int)hash[i]);
    }
    
    char password_salt[128];
    strcpy (password_salt, "sha256$");
    strcat (password_salt, salt);
    strcat (password_salt, "$");
    strcat (password_salt, digest_password);
    
    p = password_salt;
    return p;
}



int CheckPassword (const char *Password_)
{
    return 0;
}



int VerifyRequest (struct HttpRequest *Req, char **Data, int Type)
{
    const char *Msg = NULL;
    JsonObject *JsonMsg = NULL;
    
    JsonMsg = JsonObjectNewObject ();
    
    if (Req->method != HTTP_METHOD_POST)
    {
        JsonObjectObjectAdd (JsonMsg, "Result", JsonObjectNewInt (KORE_RESULT_ERROR));
        JsonObjectObjectAdd (JsonMsg, "Message", JsonObjectNewString ("method is not post"));
        Msg = JsonObjectToJsonString (JsonMsg);
        HttpResponse (Req, 200, Msg,  strlen(Msg));
        
        JsonObjectPut (JsonMsg);
        return (KORE_RESULT_ERROR);
    }
    
    if (Type == XWWW)
    {
        HttpPopulatePost (Req);
    }
    else
    {
        HttpPopulateMultipartForm (Req);
    }
    
    if (http_argument_get_string (Req, "Data", Data) == KORE_RESULT_ERROR)
    {
        JsonObjectObjectAdd (JsonMsg, "Result", JsonObjectNewInt (KORE_RESULT_ERROR));
        JsonObjectObjectAdd (JsonMsg, "Message", JsonObjectNewString ("parameter data not found"));
        Msg = JsonObjectToJsonString(JsonMsg);
        HttpResponse (Req, 200, Msg,  strlen(Msg));
        
        JsonObjectPut (JsonMsg);
        return (KORE_RESULT_ERROR);
    }
    
    JsonObjectPut (JsonMsg);
    return (KORE_RESULT_OK);
}



int HttpResponseJsonMsg (struct HttpRequest *Req, int Result, const char *Msg)
{
    const char *Resp = NULL;
    JsonObject *JsonMsg = NULL;
    JsonMsg  = JsonObjectNewObject ();
    
    JsonObjectObjectAdd (JsonMsg, "result", JsonObjectNewInt (Result));
    JsonObjectObjectAdd (JsonMsg, "data", JsonObjectNewString (Msg));
    Resp = JsonObjectToJsonString(JsonMsg);
    HttpResponse (Req, 200, Resp, strlen(Resp));
    
    JsonObjectPut (JsonMsg);
    JsonMsg = NULL;
    
    return KORE_RESULT_OK;
}


int HttpResponseJsonArray (struct HttpRequest *Req, int Result, JsonObject *Array)
{
    const char *Resp = NULL;
    JsonObject *JsonMsg = NULL;
    JsonMsg  = JsonObjectNewObject ();
    
    JsonObjectObjectAdd (JsonMsg, "result", JsonObjectNewInt (Result));
    JsonObjectObjectAdd (JsonMsg, "data", Array);
    Resp = JsonObjectToJsonString (JsonMsg);
    HttpResponse (Req, 200, Resp, strlen(Resp));
    
    JsonObjectPut (JsonMsg);
    JsonMsg = NULL;
    
    return KORE_RESULT_OK;
}

float MmToPx (float mm)
{
    float px = (1 * mm) / 0.352777778f;
    return px;
}

float PxToMm (float px)
{
    float mm = (0.352777778f * px) / 1.0f;
    return mm;
}

//sql state
struct SQLState NewSQLState (int Result, const char *Msg)
{
    struct SQLState State;
    State.Result = Result;
    State.Msg = Msg;
    
    return State;
}

//v_params_enable
int ParamsEnabled (struct HttpRequest *Req, char *Param)
{
	if (1)
	{
		return (KORE_RESULT_OK);
	}

	return (KORE_RESULT_ERROR);
}

int SessionValidate (struct HttpRequest *Req, char *Data)
{
	kore_log(LOG_NOTICE, "v_session_validate: %s", Data);

	if (strcmp(Data, "test123") == 0)
	{
		return (KORE_RESULT_OK);
	}

	return (KORE_RESULT_ERROR);
}
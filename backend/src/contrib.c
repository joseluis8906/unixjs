#include "contrib.h"

//encrypt
int PasswordEncrypt (const char *Src, char *Dest)
{
    time_t Seconds;
    time (&Seconds);	
    srand ((unsigned int) Seconds);
	
    char Alpha[] = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    int Index = rand () % 62;
	
    char Character[]="abcdefgh";
    Character[0] = Alpha[Index];
    
    unsigned char Hash[SHA256_DIGEST_LENGTH];

    SHA256 ((unsigned char*)Character, strlen (Character), Hash);
	
    char RandomDigest[(SHA256_DIGEST_LENGTH * 2) + 1];
    int i = 0;
    for (i = 0; i < SHA256_DIGEST_LENGTH; i++)
    {
        sprintf (RandomDigest + (i * 2), "%02x", (int)Hash[i]);
    }
    
    char Salt[17];
    snprintf (Salt, 17, RandomDigest);
    
    Salt[6] = Character[0];
    
    char SrcModified[64];
    strncpy (SrcModified, Src, 64);
    SrcModified[4] = Character[0];
    
    SHA256 ((unsigned char*)SrcModified, strlen (SrcModified), Hash);

    char DigestSrcModified[(SHA256_DIGEST_LENGTH * 2) + 1];
    
    for (i = 0; i < SHA256_DIGEST_LENGTH; i++)
    {
        sprintf (DigestSrcModified + (i * 2), "%02x", (int)Hash[i]);
    }

    strcpy (Dest, "sha256$");
    strcat (Dest, Salt);
    strcat (Dest, "$");
    strcat (Dest, DigestSrcModified);
    
    return (KORE_RESULT_OK);
}



int CheckPassword (const char *Original, const char *Crypted)
{
    char Character[]="abcdefgh";
    Character[0] = *(Crypted+13);
    
    unsigned char Hash[SHA256_DIGEST_LENGTH];

    SHA256 ((unsigned char*)Character, strlen (Character), Hash);
	
    char RandomDigest[(SHA256_DIGEST_LENGTH * 2) + 1];
    int i = 0;
    for (i = 0; i < SHA256_DIGEST_LENGTH; i++)
    {
        sprintf (RandomDigest + (i * 2), "%02x", (int)Hash[i]);
    }
    
    char Salt[17];
    snprintf (Salt, 17, RandomDigest);
    
    Salt[6] = Character[0];
    
    char SrcModified[64];
    strncpy (SrcModified, Original, 64);
    SrcModified[4] = Character[0];
     
    SHA256 ((unsigned char*)SrcModified, strlen (SrcModified), Hash);

    char DigestSrcModified[(SHA256_DIGEST_LENGTH * 2) + 1];
    
    for (i = 0; i < SHA256_DIGEST_LENGTH; i++)
    {
        sprintf (DigestSrcModified + (i * 2), "%02x", (int)Hash[i]);
    }
    
    char Result[88];
    
    strcpy (Result, "sha256$");
    strcat (Result, Salt);
    strcat (Result, "$");
    strcat (Result, DigestSrcModified);

    int Ret;
    if (strcmp (Result, Crypted) == 0)
    {
        Ret = KORE_RESULT_OK;
    }
    else
    {
        Ret = KORE_RESULT_ERROR;
    }
    
    return Ret;
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
    
    if (Type == FORM_JSON)
    {
        HttpPopulatePost (Req);
    }
    else
    {
        HttpPopulateMultipartForm (Req);
    }
    
    if (http_argument_get_string (Req, "Params", Data) == KORE_RESULT_ERROR)
    {
        JsonObjectObjectAdd (JsonMsg, "Result", JsonObjectNewInt (KORE_RESULT_ERROR));
        JsonObjectObjectAdd (JsonMsg, "Message", JsonObjectNewString ("Argument 'Params' not found"));
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
    
    JsonObjectObjectAdd (JsonMsg, "Result", JsonObjectNewInt (Result));
    JsonObjectObjectAdd (JsonMsg, "Data", JsonObjectNewString (Msg));
    Resp = JsonObjectToJsonString(JsonMsg);
    
    HttpResponseHeader (Req, "content-type", "text/html");
    HttpResponse (Req, 200, Resp, strlen(Resp));
    
    JsonObjectPut (JsonMsg);
    JsonMsg = NULL;
    
    return KORE_RESULT_OK;
}


int HttpResponseJsonObject (struct HttpRequest *Req, int Result, JsonObject *Object)
{
    const char *Resp = NULL;
    JsonObject *JsonMsg = NULL;
    JsonMsg  = JsonObjectNewObject ();
    
    JsonObjectObjectAdd (JsonMsg, "Result", JsonObjectNewInt (Result));
    JsonObjectObjectAdd (JsonMsg, "Data", Object);
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



//Func Result
struct FuncResult NewFuncResult (int Result, const char *Msg)
{
    struct FuncResult X;
    
    X.Result = Result;
    strcpy (X.Msg, Msg);
    
    return X;
}



//enable parameters
int ParamsEnabled (struct HttpRequest *Req, char *Param)
{
    if (1)
    {
	return (KORE_RESULT_OK);
    }

    return (KORE_RESULT_ERROR);
}



// Validate sessions
int SessionValidate (struct HttpRequest *Req, char *Data)
{
	kore_log(LOG_NOTICE, "v_session_validate: %s", Data);

	if (strcmp(Data, "test123") == 0)
	{
		return (KORE_RESULT_OK);
	}

	return (KORE_RESULT_ERROR);
}



int StringArrayPush (struct StringArray *Array, const char *String)
{
    if (Array->Length == LOW_ARRAY_SIZE)
    {
        return KORE_RESULT_ERROR;
    }
    strcpy (Array->At[Array->Length], String);
    Array->Length++;
    
    return KORE_RESULT_OK;
}



int Base64Encode(const char* Original, char* Encoded) //Encodes a string to base64
{
    BIO *bmem, *b64;
    BUF_MEM *bptr;

    b64 = BIO_new(BIO_f_base64());
    bmem = BIO_new(BIO_s_mem());
    b64 = BIO_push(b64, bmem);
    BIO_write(b64, Original, strlen(Original));
    BIO_flush(b64);
    BIO_get_mem_ptr(b64, &bptr);

    memcpy (Encoded, bptr->data, bptr->length-1);
    Encoded [bptr->length-1] = '\0';

    BIO_free_all(b64);

    return (KORE_RESULT_OK); //success
}



struct StringArray NewStringArray (void)
{
    struct StringArray X;
    X.Length = 0;
    
    return X;
}



struct FuncResult GetJsonString (const char *Json, const char *Key, char *Value)
{
    struct FuncResult Ret;
    
    JsonObject *Jobj = JsonTokenerParse (Json);
    
    JsonObjectObjectForeach (Jobj, K, V)
    {          
        if (strcmp (K, Key) == 0)
        {   
            strcpy (Value, JsonObjectGetString (V));
            JsonObjectPut (Jobj);
            
            Ret.Result = KORE_RESULT_OK;
            sprintf (Ret.Msg, "Key %s: Found ", Key);
            
            return Ret;
        }
    }
    
    JsonObjectPut (Jobj);
    
    Ret.Result = KORE_RESULT_ERROR;
    sprintf (Ret.Msg, "Key %s: Not Found", Key);
            
    return Ret;
}



struct FuncResult GetJsonInt (const char *Json, const char *Key, int *Value)
{
    struct FuncResult Ret;
    
    JsonObject *Jobj = JsonTokenerParse (Json);
    
    JsonObjectObjectForeach (Jobj, K, V)
    {          
        if (strcmp (K, Key) == 0)
        {   
            *Value = JsonObjectGetInt (V);
            JsonObjectPut (Jobj);
            
            Ret.Result = KORE_RESULT_OK;
            sprintf (Ret.Msg, "Key %s: Found ", Key);
            
            return Ret;
        }
    }
    
    JsonObjectPut (Jobj);
    
    Ret.Result = KORE_RESULT_ERROR;
    sprintf (Ret.Msg, "Key %s: Not Found", Key);
            
    return Ret;
}



struct FuncResult GetJsonInt64 (const char *Json, const char *Key, int64_t *Value)
{
    struct FuncResult Ret;
    
    JsonObject *Jobj = JsonTokenerParse (Json);
    
    JsonObjectObjectForeach (Jobj, K, V)
    {          
        if (strcmp (K, Key) == 0)
        {   
            *Value = JsonObjectGetInt64 (V);
            JsonObjectPut (Jobj);
            
            Ret.Result = KORE_RESULT_OK;
            sprintf (Ret.Msg, "Key %s: Found ", Key);
            
            return Ret;
        }
    }
    
    JsonObjectPut (Jobj);
    
    Ret.Result = KORE_RESULT_ERROR;
    sprintf (Ret.Msg, "Key %s: Not Found", Key);
            
    return Ret;
}



struct FuncResult GetJsonDouble (const char *Json, const char *Key, double *Value)
{
    struct FuncResult Ret;
    
    JsonObject *Jobj = JsonTokenerParse (Json);
    
    JsonObjectObjectForeach (Jobj, K, V)
    {          
        if (strcmp (K, Key) == 0)
        {   
            *Value = JsonObjectGetDouble (V);
            JsonObjectPut (Jobj);
            
            Ret.Result = KORE_RESULT_OK;
            sprintf (Ret.Msg, "Key %s: Found ", Key);
            
            return Ret;
        }
    }
    
    JsonObjectPut (Jobj);
    
    Ret.Result = KORE_RESULT_ERROR;
    sprintf (Ret.Msg, "Key %s: Not Found", Key);
            
    return Ret;
}
#include <kore/kore.h>
#include <kore/http.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/syslog.h>
#include <sys/stat.h>
#include <sys/time.h>
#include <fcntl.h>
#include <unistd.h>
#include <math.h>
#include <time.h>
#include <json-c/json.h>
#include <openssl/sha.h>
#include <openssl/hmac.h>
#include <openssl/evp.h>
#include <openssl/bio.h>
#include <openssl/buffer.h>
#include "defines.h"

#ifndef _CONTRIB_H_
#define _CONTRIB_H_

enum RequestType {
    FORM_JSON,
    FORM_MULTIPART
};

struct FuncResult
{
    int Result;
    char Msg[256];
};

struct StringArray 
{
    char At[LOW_ARRAY_SIZE][64];
    int Length;
};

int PasswordEncrypt (const char *Src, char *Dest);
int CheckPassword (const char *Original, const char *Crypted);
int VerifyRequest (struct HttpRequest *Req, char **Data, int Type);
int HttpResponseJsonMsg (struct HttpRequest *Req, int Result, const char *Msg);
int HttpResponseJsonArray (struct HttpRequest *Req, int Result, JsonObject *Array);
float MmToPx (float mm);
float PxToMm (float px);

struct FuncResult NewFuncResult (int Result, const char *Msg);

//function to validate params
int ParamsEnabled (struct HttpRequest *Req, char *Param);
int SessionValidate (struct HttpRequest *Req, char *Data);

//String array
struct StringArray NewStringArray (void);
int StringArrayPush (struct StringArray *Array, const char *String);

int Base64Encode (const char *Original, char *Encoded);

struct FuncResult GetJsonValue (const char *Json, const char *Key, char *Value);
#endif

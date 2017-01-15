#include <kore/kore.h>
#include <kore/http.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <math.h>
#include <time.h>
#include <json-c/json.h>
#include <openssl/sha.h>
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



int StringEncrypt (const char *, char *);
int CheckEncrypted (const char *, const char *);
int VerifyRequest (struct HttpRequest *, char **, int);
int HttpResponseJsonMsg (struct HttpRequest *, int, const char *);
int HttpResponseJsonArray (struct HttpRequest *, int, JsonObject *);
float MmToPx (float);
float PxToMm (float);

struct FuncResult NewFuncResult (int, const char *);

//function to validate params
int ParamsEnabled (struct HttpRequest *, char *);
int SessionValidate (struct HttpRequest *, char *);

struct FuncResult FindFile (struct HttpRequest *, const char *, struct HttpFile **);

struct FuncResult UploadFile (struct HttpFile *, char *, char *);

#endif

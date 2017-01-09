#include <kore/kore.h>
#include <kore/http.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <json-c/json.h>
#include "defines.h"

#ifndef _CONTRIB_H_
#define _CONTRIB_H_

enum RequestType {
    FORM_JSON,
    FORM_MULTIPART
};


struct SQLState
{
    int Result;
    const char *Msg;
};


const char *EncryptPassword (const char*);
int CheckPassword (const char*);
int VerifyRequest (struct HttpRequest*, char**, int);
int HttpResponseJsonMsg (struct HttpRequest*, int, const char*);
int HttpResponseJsonArray (struct HttpRequest*, int, JsonObject *);
float MmToPx (float);
float PxToMm (float);

struct SQLState NewSQLState (int, const char*);

//function to validate params
int ParamsEnabled (struct HttpRequest *, char *);
int SessionValidate (struct HttpRequest *, char *);
#endif

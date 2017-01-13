#include <kore/kore.h>
#include <kore/http.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>
#include <json-c/json.h>
#include "defines.h"

#ifndef _CONTRIB_H_
#define _CONTRIB_H_

enum RequestType {
    FORM_JSON,
    FORM_MULTIPART
};


struct SqlState
{
    int Result;
    const char *Msg;
};



int StringEncrypt (const char *, char *);
int CheckEncrypted (const char *);
int VerifyRequest (struct HttpRequest *, char **, int);
int HttpResponseJsonMsg (struct HttpRequest *, int, const char *);
int HttpResponseJsonArray (struct HttpRequest *, int, JsonObject *);
float MmToPx (float);
float PxToMm (float);

struct SqlState NewSQLState (int, const char *);

//function to validate params
int ParamsEnabled (struct HttpRequest *, char *);
int SessionValidate (struct HttpRequest *, char *);

int UploadFile (struct HttpRequest *, char *, char *);

#endif

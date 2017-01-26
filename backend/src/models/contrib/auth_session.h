#include "../../contrib.h"


#ifndef _AUTH_SESSION_H_
#define _AUTH_SESSION_H_

struct AuthSessionModel 
{
    int64_t Id;
    char Key[256];
    char Data[512];
    time_t ExpirateDate;
};

int LoginRequired (struct HttpRequest *Req);

#endif


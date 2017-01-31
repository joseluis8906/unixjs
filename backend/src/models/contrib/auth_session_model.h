/* 
 * File:   auth_session.h
 * Author: joseluis
 *
 * Created on January 27, 2017, 6:47 PM
 */
#include "../../contrib.h"

#ifndef _AUTH_SESSION_MODEL_H_
#define _AUTH_SESSION_MODEL_H_

struct AuthSessionModel {
    char UserId[256];
    char Data[512];
    time_t ExpireDate;
};

struct AuthSessionModel NewVoidAuthSessionModel (void);
struct AuthSessionModel NewAuthSessionModel (const char *UserId, const char *Data, const time_t ExpireDate);

struct FuncResult NewAuthSession (void);

#endif


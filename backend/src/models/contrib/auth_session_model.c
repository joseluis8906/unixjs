/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
#include "auth_session_model.h"

struct AuthSessionModel NewVoidAuthSessionModel (void)
{
    struct AuthSessionModel X;
    strcpy (X.UserId, "");
    strcpy (X.Data, "");
    time(&X.ExpireDate);
    X.ExpireDate + (time_t) 120;
    
    return X;
}






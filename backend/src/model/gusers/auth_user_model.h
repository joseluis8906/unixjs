#include "../../contrib.h"
#include "../database.h"

#ifndef _AUTH_USER_MODEL_H_
#define _AUTH_USER_MODEL_H_

//auth_user_model
struct AuthUserModel
{
    int64_t Id;
    char DocumentType[8];
    char DocumentNum[16];
    char Password[256];
    char Name[64];
    char LastName[64];
    char Phone[24];
    char Email[24];
    char Address[64];
};

struct AuthUserModelTuple 
{
    struct auth_user_model old_user;
    struct auth_user_model new_user;
};

struct AuthUserModel  NewAuthUserModel (char *, char *, char *, char *, char *, char *, char *, char *);
struct AuthUserModel  NewVoidAuthUserModel (void);
int  AuthUserModelToJson (struct AuthUserModel *, JsonObject *);
int  JsonToAuthUserModel (JsonObject *, struct AuthUserModel *);

//struct SqlState  AuthUserModelSelect (struct AuthUserModel[], int);
struct SqlState  AuthUserModelInsert (struct AuthUserModel[], int);
//struct SqlState  AuthUserModelUpdate (struct AuthUserModelTuple[], int);
//struct SqlState  AuthUserModelDelete (struct AuthUserModel[], int);

#endif
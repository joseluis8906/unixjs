#include "../../contrib.h"
#include "../database.h"

#ifndef _AUTH_USER_MODEL_H_
#define _AUTH_USER_MODEL_H_

//auth_user_model
struct AuthUserModel
{
    char DocumentType[8];
    char DocumentNum[16];
    char Password[256];
    char Name[64];
    char LastName[64];
    char Phone[24];
    char Email[24];
    char Address[64];
};

struct AuthUserModelArray
{
    struct AuthUserModel At[LowArraySize];
    int Length;
};

struct AuthUserModel  NewAuthUserModel (char *, char *, char *, char *, char *, char *, char *, char *);
struct AuthUserModel  NewVoidAuthUserModel (void);
struct AuthUserModelArray* NewAuthUserModelArray (void);
JsonObject* AuthUserModelsToJson (struct AuthUserModelArray *);
struct AuthUserModelArray* JsonToAuthUserModels (char *);

//struct SqlState  AuthUserModelSelect (struct AuthUserModel[], int);
struct SqlState  AuthUserModelInsert (struct AuthUserModel[], int);
//struct SqlState  AuthUserModelUpdate (struct AuthUserModelTuple[], int);
//struct SqlState  AuthUserModelDelete (struct AuthUserModel[], int);

#endif
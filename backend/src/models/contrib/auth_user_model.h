#include "../../contrib.h"
#include "../database.h"

#ifndef _AUTH_USER_MODEL_H_
#define _AUTH_USER_MODEL_H_

//auth_user_model
struct AuthUserModel
{
    char UserName[32];
    char Password[256];
    char DocumentType[8];
    char DocumentNum[16];
    char Country[64];
    char Name[64];
    char LastName[64];
    char Avatar[256];
    char Phone[24];
    char Email[24];
    char Address[64];
};

struct AuthUserModelArray
{
    struct AuthUserModel At[LOW_ARRAY_SIZE];
    int Length;
};

struct AuthUserModel NewAuthUserModel (char *UserName, char *Password, char *DocumentType, char *DocumentNum, char *Country, char *Avatar, char *Name, char *LastName, char *Phone, char *Email, char *Address);
struct AuthUserModel NewVoidAuthUserModel (void);
struct AuthUserModelArray NewAuthUserModelArray (void);
int AuthUserModelsToJson (struct AuthUserModelArray *, JsonObject *);
int JsonToAuthUserModels (char *, struct AuthUserModelArray *);

//struct SqlState  AuthUserModelSelect (struct AuthUserModel[], int);
struct FuncResult  AuthUserModelInsert (struct AuthUserModelArray *);
//struct SqlState  AuthUserModelUpdate (struct AuthUserModelTuple[], int);
//struct SqlState  AuthUserModelDelete (struct AuthUserModel[], int);

#endif
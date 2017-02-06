#include "../../contrib.h"
#include "../../database.h"
#include "media_model.h"

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
    struct MediaModel Avatar;
    char Phone[24];
    char Email[24];
    char Address[64];
};

struct AuthUserModelArray
{
    struct AuthUserModel At[LOW_ARRAY_SIZE];
    int Length;
};

struct AuthUserModel NewAuthUserModel (const char *UserName, const char *Password, const char *DocumentType, const char *DocumentNum, const char *Country,  const char *Name, const char *LastName, const struct MediaModel *Avatar, const char *Phone, const char *Email, char *Address);
struct AuthUserModel NewVoidAuthUserModel (void);

struct AuthUserModelArray NewAuthUserModelArray (void);
struct FuncResult AuthUserModelArrayPush (struct AuthUserModelArray *Array, const struct AuthUserModel *Element);

struct FuncResult AuthUserModelsToJson (const struct AuthUserModelArray *Models, JsonObject *Jsons);
struct FuncResult JsonToAuthUserModels (const char *Jsons, struct AuthUserModelArray *Models);

struct FuncResult  AuthUserModelInsert (const struct AuthUserModelArray *Models);
struct FuncResult  AuthUserModelSelect (struct AuthUserModelArray *Models, const char *UserName);
//struct SqlState  AuthUserModelUpdate (struct AuthUserModelTuple[], int);
//struct SqlState  AuthUserModelDelete (struct AuthUserModel[], int);

#endif
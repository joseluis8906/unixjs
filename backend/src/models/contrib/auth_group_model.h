#include "../../contrib.h"
#include "../../database.h"

#ifndef _AUTH_GROUP_MODEL_H_
#define _AUTH_GROUP_MODEL_H_

struct AuthGroupModel
{
    char Name[32];
};


struct AuthGroupModelArray 
{
    struct AuthGroupModel At[LOW_ARRAY_SIZE];
    int Length;    
};

struct AuthGroupModelArray NewAuthGroupModelArray (void);
struct FuncResult AuthGroupModelArrayPush (struct AuthGroupModelArray *Array, const struct AuthGroupModel *Element);

struct FuncResult AuthGroupModelsToJson (const struct AuthGroupModelArray *Models, JsonObject *Jsons);
struct FuncResult JsonToAuthGroupModels (const char *Jsons, struct AuthGroupModelArray *Models);

struct FuncResult AuthGroupModelInsert (const struct AuthGroupModelArray *Models);
//auth_group_model_t new_auth_group_model (char *);
//auth_group_model_t new_void_auth_group_model (void);
//json_object* auth_group_model_to_json (auth_group_model_t*);

#endif

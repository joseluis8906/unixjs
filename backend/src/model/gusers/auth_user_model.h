#include <json-c/json.h>
#include "../../contrib/contrib.h"

#ifndef _AUTH_USER_MODEL_
#define _AUTH_USER_MODEL_

//auth_user
struct auth_user_model
{
    int64_t id;
    char document[16];
    char document_type[8];
};

struct auth_user_model_tuple 
{
    struct auth_user_model old_user;
    struct auth_user_model new_user;
};

struct auth_user_model  new_auth_user_model (char*, char*);
struct auth_user_model  new_void_auth_user_model (void);
int  auth_user_model_to_json (struct auth_user_model*, json_object*);
int  json_to_auth_user_model (json_object*, struct auth_user_model*);

struct sql_state  auth_user_model_select (struct auth_user_model[], int);
struct sql_state  auth_user_model_insert (struct auth_user_model[], int);
struct sql_state  auth_user_model_update (struct auth_user_model_tuple[], int);
struct sql_state  auth_user_model_delete (struct auth_user_model[], int);

#endif

#include <json-c/json.h>
#include "../../contrib/contrib.h"

#ifndef _AUTH_PASSWORD_MODEL_
#define _AUTH_PASSWORD_MODEL_

//auth_password
struct auth_password_model
{
    int64_t id;
    int64_t auth_user_id;
    char password[256];
};

struct auth_password_model_tuple 
{
    struct auth_password_model old_password;
    struct auth_password_model new_password;
};

struct auth_password_model  new_auth_password_model (int64_t, char*);
struct auth_password_model  new_void_auth_password_model (void);
int  auth_password_model_to_json (struct auth_password_model*, json_object*);
int  json_to_auth_password_model (json_object*, struct auth_password_model*);

struct sql_state  auth_password_model_select (struct auth_password_model[], int);
struct sql_state  auth_password_model_insert (struct auth_password_model[], int);
struct sql_state  auth_password_model_update (struct auth_password_model_tuple[], int);
struct sql_state  auth_password_model_delete (struct auth_password_model[], int);

#endif

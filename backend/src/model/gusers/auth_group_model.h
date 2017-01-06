#include <json-c/json.h>

#ifndef _AUTH_GROUP_MODEL_
#define _AUTH_GROUP_MODEL_

typedef struct {
    char name[32];
} auth_group_model_t;


typedef struct {
    auth_group_model_t old_group;
    auth_group_model_t new_group;
} auth_group_update_t;

auth_group_model_t new_auth_group_model (char *);
auth_group_model_t new_void_auth_group_model (void);
json_object* auth_group_model_to_json (auth_group_model_t*);

#endif

/*
#include <string.h>
#include "auth_group_model.h"

auth_group_model_t  new_auth_group_model (char *name)
{
    auth_group_model_t x;
    strcpy (x.name, name);

    return x;
}



auth_group_model_t new_void_auth_group_model (void)
{
    auth_group_model_t x;
    strcpy (x.name, "");

    return x;
}



json_object*    auth_group_model_to_json (auth_group_model_t* group)
{
    json_object *jobj = NULL;
    jobj = json_object_new_object ();
                
    json_object_object_add (jobj, "name", json_object_new_string (group->name));
    
    return jobj;
}
*/
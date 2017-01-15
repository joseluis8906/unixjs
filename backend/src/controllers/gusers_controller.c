#include "gusers_controller.h"
#include "models/contrib/auth_user_model.h"

//gusers save
int GusersControllerSave (struct HttpRequest *Req)
{
    char *Data = NULL;
      
    if (VerifyRequest (Req, &Data, FORM_MULTIPART) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }
        
    struct AuthUserModelArray Users;
    
    JsonToAuthUserModels(Data, &Users);
    
    int i = 0;
    struct HttpFile *File;
    char FileName[32];
    
    for (i = 0; i < Users.Length; i++)
    {    
        struct FuncResult Ret = FindFile (Req, Users.At[i].Avatar, &File);
        
        if (Ret.Result == KORE_RESULT_OK)
        {
            strcpy (FileName, Users.At[i].DocumentType);
            strcat (FileName, "_");
            strcat (FileName, Users.At[i].DocumentNum);
            UploadFile (File, FileName, "images/profile/");
        }
    }
    
    char Res[16] = "Users Saved";
    
    HttpResponseJsonMsg (Req, KORE_RESULT_OK, Res);
    
    return (KORE_RESULT_OK);
}

/*
//user update
int gusers_controller_update (struct http_request *req)
{
    char *data = NULL;
      
    if (verify_request (req, &data) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }
    
    json_object *jobjs = NULL;
    jobjs = json_tokener_parse(data);
    int length = json_object_array_length (jobjs);
    struct auth_user_model_tuple updates[length];
        
    for (int i = 0; i < length; i++)
    {
        json_object *jobj = json_object_array_get_idx (jobjs, i);
        
        updates[i].old_user = new_void_auth_user_model ();
        updates[i].new_user = new_void_auth_user_model ();
        
        json_object_object_foreach (jobj, key, val)
        {
            if (strcmp (key, "document") == 0)
            {
                strcpy (updates[i].old_user.document, json_object_get_string (val));    
            }
            else if (strcmp (key, "document_type") == 0)
            {
                strcpy (updates[i].old_user.document_type, json_object_get_string (val));
            }
            else if (strcmp (key, "new_document") == 0)
            {
                strcpy (updates[i].new_user.document, json_object_get_string (val));
            }
            else if (strcmp (key, "new_document_type") == 0)
            {
                strcpy (updates[i].new_user.document_type, json_object_get_string (val));
            }
            else
            {
                json_object_put (jobj);
                jobj = NULL;
                
                http_response_json_msg (req, KORE_RESULT_ERROR, "error: verify keys document, document_type, new_document, new_document_type, new_password, and password length is 4");       
                return (KORE_RESULT_ERROR);
            }
        }

        json_object_put (jobj);
        jobj = NULL;
    }
    
    json_object_put (jobjs);
    jobjs = NULL;
   
    struct sql_state state = auth_user_model_update (updates, length);
    
    http_response_json_msg (req, state.result, state.msg);

    return (KORE_RESULT_OK);
}


//user delete
int gusers_controller_delete (struct http_request *req)
{    
    char *data = NULL;
      
    if (verify_request (req, &data) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }    
    
    json_object *jobjs = NULL;
    jobjs = json_tokener_parse(data);
    int length = json_object_array_length (jobjs);
    struct auth_user_model users[length];
    
    for (int i = 0; i < length; i++)
    {
        json_object *jobj = json_object_array_get_idx (jobjs, i);
        
        users[i] = new_void_auth_user_model ();
        
        json_object_object_foreach (jobj, key, val)
        {
            if (strcmp (key, "document") == 0)
            {
                 strcpy (users[i].document, json_object_get_string (val));
            }
            else if (strcmp (key, "document_type") == 0)
            {
                 strcpy (users[i].document_type, json_object_get_string (val));
            }
            else 
            {
                json_object_put (jobj);
                jobj = NULL;
                    
                http_response_json_msg (req, KORE_RESULT_ERROR, "error: verify keys document, document_type, new_document, new_document_type, new_password, and password length is 4");       
                return (KORE_RESULT_ERROR);
            }
        }
        
        json_object_put (jobj);
        jobj = NULL;
    }
    
    json_object_put (jobjs);
    jobjs = NULL;
    
    struct sql_state state = auth_user_model_delete (users, length);
    
    http_response_json_msg (req, state.result, state.msg);
    
    return (KORE_RESULT_OK);
}
*/
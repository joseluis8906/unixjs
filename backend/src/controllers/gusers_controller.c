#include "gusers_controller.h"
#include "models/contrib/auth_user_model.h"
#include "models/contrib/media_model.h"
#include "../upload_file.h"

//gusers save
int GusersControllerSave (struct HttpRequest *Req)
{
    char *Data = NULL;
      
    if (VerifyRequest (Req, &Data, FORM_MULTIPART) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }
    
    struct AuthUserModelArray Users; //Array de estructura usuario
    
    struct FuncResult Ret = JsonToAuthUserModels(Data, &Users); //Conversion de objetos json a structura usuario
    
    if (Ret.Result == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, Ret.Msg);
        return (KORE_RESULT_OK);
    }
    
    struct HttpFileArray Files = NewHttpFileArray(); //Array de structura HttpFile
    struct StringArray Names = NewStringArray();
    
    int i = 0;
    for (i = 0; i < Users.Length; i++)
    {
        StringArrayPush (&Names, Users.At[i].Avatar.Name);
    }
        
    Ret = FindFiles (Req, &Names, &Files); //Busqueda de archivos media
    
    if (Ret.Result == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, Ret.Msg);
        return (KORE_RESULT_OK);
    }
    
    for (i = 0; i < Users.Length; i++)
    {
        strcpy (Users.At[i].Avatar.Name, Users.At[i].UserName);
        
        Ret = GenerateMediaName (Users.At[i].Avatar.Name);
        
        if (Ret.Result == KORE_RESULT_OK)
        {
            UploadFile (Files.At[i], &(Users.At[i].Avatar), "images/profile/");        
        }
        else
        {
            HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, Ret.Msg);
            return (KORE_RESULT_OK);
        }
    }
    
    Ret = AuthUserModelInsert (&Users);
    
    if (Ret.Result == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, Ret.Msg);
        return (KORE_RESULT_OK);
    }
    
    HttpResponseJsonMsg (Req, KORE_RESULT_OK, "Success");
    
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
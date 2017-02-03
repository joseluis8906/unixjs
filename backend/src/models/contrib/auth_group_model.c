#include "auth_group_model.h"

struct AuthGroupModelArray NewAuthGroupModelArray (void)
{
    struct AuthGroupModelArray X;
    X.Length = 0;
    
    return X;
}



struct FuncResult AuthGroupModelArrayPush (struct AuthGroupModelArray *Array, const struct AuthGroupModel *Element)
{
    struct FuncResult Ret;
    
    if (Array->Length == LOW_ARRAY_SIZE)
    {
        Ret.Result = KORE_RESULT_ERROR;
        strcpy (Ret.Msg, "Array Length Max");
        return Ret;
    }
    
    memcpy (&(Array->At[Array->Length]), Element, sizeof(struct AuthGroupModel));
    Array->Length++;
    
    
    Ret.Result = KORE_RESULT_OK;
    strcpy (Ret.Msg, "");
    return Ret;
}


struct FuncResult AuthGroupModelsToJson (const struct AuthGroupModelArray *Models, JsonObject *Jsons)
{
    struct FuncResult Ret;
    
    JsonObject *Y = NULL;
    
    for (int i = 0; i < Models->Length; i++)
    {
        Y = JsonObjectNewObject ();
        
        JsonObjectObjectAdd (Y, "Name", JsonObjectNewString (Models->At[i].Name));
        
        JsonObjectArrayAdd (Jsons, JsonObjectGet (Y));
        
        JsonObjectPut (Y);
        Y = NULL;
    }

    Ret.Result = KORE_RESULT_OK;
    strcpy (Ret.Msg, "");
    return Ret;
}

struct FuncResult JsonToAuthGroupModels (const char *Jsons, struct AuthGroupModelArray *Models)
{
    struct FuncResult Ret;
    
    JsonObject *jobjs = NULL;
    jobjs = JsonTokenerParse (Jsons);
    int length = JsonObjectArrayLength (jobjs);

    Models->Length = length;
    
    for (int i = 0; i < Models->Length; i++)
    {
        json_object *jobj = NULL;
        jobj = json_object_array_get_idx (jobjs, i);
        
        JsonObjectObjectForeach (jobj, Key, Val)
        {          
            if (strcmp (Key, "Name") == 0)
            {   
                strcpy (Models->At[i].Name, JsonObjectGetString (Val));
            }
            else
            {
                json_object_put (jobj);
                jobj = NULL;
                
                json_object_put (jobjs);
                jobjs = NULL;
                
                
                Ret.Result = KORE_RESULT_ERROR;
                strcpy (Ret.Msg, "Key not found.");
               
                return Ret;
            }
            
        }

        json_object_put (jobj);
        jobj = NULL;        
    }
    
    json_object_put (jobjs);
    jobjs = NULL;
    
    Ret.Result = KORE_RESULT_OK;
    strcpy (Ret.Msg, "");
    
    return Ret;
}



struct FuncResult AuthGroupModelInsert (const struct AuthGroupModelArray *Models)
{
    struct FuncResult S;
    
    Connection_T Conn = DbGetConnection ();
        
    if (!Connection_ping (Conn))
    {   
        S.Result = KORE_RESULT_ERROR;
        strcpy (S.Msg,  "Error not database connection");
        return S;
    }        
    
    TRY
    {   
        Connection_beginTransaction (Conn);
        
        PreparedStatement_T Stm; 

        int i = 0;
        for (i = 0; i < Models->Length; i++)
        {
            Stm = Connection_prepareStatement (Conn, "INSERT INTO \"AuthGroup\"(\"Name\") VALUES(?);");
            PreparedStatement_setString (Stm, 1, Models->At[i].Name);
            PreparedStatement_execute (Stm);
        }
        
        Connection_commit (Conn);
        
        Connection_close (Conn);
    
        S.Result = KORE_RESULT_OK;
        strcpy (S.Msg, "Group inserted");
        
    }
    CATCH (SQLException)
    {    
        Connection_rollback (Conn);
        
        Connection_close (Conn);
        
        S.Result = KORE_RESULT_ERROR;
        strcpy (S.Msg, Exception_frame.message);
    }
    FINALLY
    {
    }
    END_TRY;
    
    return S;
}

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
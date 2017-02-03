/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

#include "app_role_model.h"

struct FuncResult AppRoleModelsToJson (const struct AppRoleModelArray *Models, JsonObject *Jsons)
{   
    struct FuncResult Ret;
    
    JsonObject *Y = NULL;
    
    int i = 0;
    for (i = 0; i < Models->Length; i++)
    {
        Y = JsonObjectNewObject ();
        
        JsonObjectObjectAdd (Y, "Image", JsonObjectNewString (Models->At[i].Image));
        JsonObjectObjectAdd (Y, "Label", JsonObjectNewString (Models->At[i].Label));
        JsonObjectObjectAdd (Y, "Name", JsonObjectNewString (Models->At[i].Name));
        
        JsonObjectArrayAdd (Jsons, JsonObjectGet (Y));
        JsonObjectPut (Y);
        Y = NULL;
    }
    
    Ret.Result = KORE_RESULT_OK;
    strcpy (Ret.Msg, "");
    
    return Ret;
}



struct FuncResult JsonToAppRoleModels (const char *Jsons, struct AppRoleModelArray *Models)
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
            if (strcmp (Key, "Image") == 0)
            {   
                strcpy (Models->At[i].Image, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "Label") == 0)
            {
                strcpy (Models->At[i].Label, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "Name") == 0)
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



struct AppRoleModelArray NewAppRoleModelArray (void)
{
    struct AppRoleModelArray X;
    X.Length = 0;
    
    return X;
}



struct FuncResult AppRoleModelArrayPush (struct AppRoleModelArray *Array, const struct AppRoleModel *Element)
{
    struct FuncResult Ret;
    
    if (Array->Length == LOW_ARRAY_SIZE)
    {
        Ret.Result = KORE_RESULT_ERROR;
        strcpy (Ret.Msg, "Array Length Max");
        return Ret;
    }
    
    memcpy (&(Array->At[Array->Length]), Element, sizeof(struct AppRoleModel));
    Array->Length++;
    
    Ret.Result = KORE_RESULT_OK;
    strcpy (Ret.Msg, "");
    return Ret;
}



struct FuncResult AppRoleModelSelect (struct AppRoleModelArray *Models, const char *UserName)
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
        ResultSet_T R = Connection_executeQuery (Conn, "SELECT \"Image\", \"Label\", \"Name\" FROM \"AppRoleAll\" WHERE \"User\"='%s';", UserName);
        
        struct AppRoleModel Tmp;
        
        while (ResultSet_next (R))
        {
            strcpy (Tmp.Image, ResultSet_getStringByName (R, "Image"));
            strcpy (Tmp.Label, ResultSet_getStringByName (R, "Label"));
            strcpy (Tmp.Name, ResultSet_getStringByName (R, "Name"));            
            
            AppRoleModelArrayPush (Models, &Tmp);
        }
        
        Connection_close (Conn);
        
        S.Result = KORE_RESULT_OK;
        strcpy (S.Msg,  "AppRoleModelSelect Success");
        
    }
    CATCH (SQLException)
    {
        Connection_close (Conn);
     
        S.Result = KORE_RESULT_ERROR;
        strcpy (S.Msg,  "AppRoleModelSelect Failed");
    }
    FINALLY
    {
    }
    END_TRY;
    
    return S;
}
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
#include "auth_user_group_model.h"

struct AuthUserGroupModelArray NewAuthUserGroupModelArray (void)
{
    struct AuthUserGroupModelArray X;
    X.Length = 0;
    
    return X;
}



struct FuncResult AuthUserGroupModelArrayPush (struct AuthUserGroupModelArray *Array, const struct AuthUserGroupModel *Element)
{
    struct FuncResult Ret;
    
    if (Array->Length == LOW_ARRAY_SIZE)
    {
        Ret.Result = KORE_RESULT_ERROR;
        strcpy (Ret.Msg, "Array Length Max");
        return Ret;
    }
    
    memcpy (&(Array->At[Array->Length]), Element, sizeof(struct AuthUserGroupModel));
    Array->Length++;
    
    Ret.Result = KORE_RESULT_OK;
    strcpy (Ret.Msg, "");
    return Ret;
}



struct FuncResult AuthUserGroupModelsToJson (const struct AuthUserGroupModelArray *Models, JsonObject *Jsons)
{
    JsonObject *Y = NULL;
    
    for (int i = 0; i < Models->Length; i++)
    {
        Y = JsonObjectNewObject ();
        
        JsonObjectObjectAdd (Y, "User", JsonObjectNewString (Models->At[i].User.UserName));
        JsonObjectObjectAdd (Y, "Group", JsonObjectNewString (Models->At[i].Group.Name));
        
        JsonObjectArrayAdd (Jsons, JsonObjectGet (Y));
        
        JsonObjectPut (Y);
        Y = NULL;
    }
    
    struct FuncResult Ret;
    Ret.Result = KORE_RESULT_OK;
    strcpy (Ret.Msg, "");
    
    return Ret;
}



struct FuncResult JsonToAuthUserGroupModels (const char *Jsons, struct AuthUserGroupModelArray *Models)
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
            if (strcmp (Key, "User") == 0)
            {   
                strcpy (Models->At[i].User.UserName, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "Group") == 0)
            {
                strcpy (Models->At[i].Group.Name, JsonObjectGetString (Val));
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



struct FuncResult  AuthUserGroupModelInsert (const struct AuthUserGroupModelArray *Models)
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
            
            Stm = Connection_prepareStatement (Conn, "INSERT INTO \"AuthUserGroup\"(\"UserId\", \"GroupId\") SELECT \"AuthUser\".\"Id\" AS \"UserId\", \"AuthGroup\".\"Id\" AS \"GroupId\" FROM \"AuthUser\" INNER JOIN \"AuthGroup\" ON \"AuthUser\".\"UserName\"=? AND \"AuthGroup\".\"Name\"=? LIMIT 1;");
            PreparedStatement_setString (Stm, 1, Models->At[i].User.UserName);
            PreparedStatement_setString (Stm, 2, Models->At[i].Group.Name);
            
            PreparedStatement_execute (Stm);
        }
        
        Connection_commit (Conn);
        
        Connection_close (Conn);
    
        S.Result = KORE_RESULT_OK;
        strcpy (S.Msg, "UsersGroups inserted");
        
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
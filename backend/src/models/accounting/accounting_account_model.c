/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

#include "accounting_account_model.h"

struct AccountingAccountModelArray NewAccountingAccountModelArray (void)
{
    struct AccountingAccountModelArray X;
    X.Length = 0;
    
    return X;
}



struct FuncResult AccountingAccountModelArrayPush (struct AccountingAccountModelArray *Array, const struct AccountingAccountModel *Element)
{
    struct FuncResult Ret;
    
    if (Array->Length == LOW_ARRAY_SIZE)
    {
        Ret.Result = KORE_RESULT_ERROR;
        strcpy (Ret.Msg, "Array Length Max");
        return Ret;
    }
    
    memcpy (&(Array->At[Array->Length]), Element, sizeof(struct AccountingAccountModel));
    Array->Length++;
    
    
    Ret.Result = KORE_RESULT_OK;
    strcpy (Ret.Msg, "");
    return Ret;
}



struct FuncResult AccountingAccountModelsToJson (const struct AccountingAccountModelArray *Models, JsonObject *Jsons)
{
    struct FuncResult Ret;
    
    JsonObject *Y = NULL;
    
    for (int i = 0; i < Models->Length; i++)
    {
        Y = JsonObjectNewObject ();
        
        JsonObjectObjectAdd (Y, "Code", JsonObjectNewString (Models->At[i].Code));
        JsonObjectObjectAdd (Y, "Name", JsonObjectNewString (Models->At[i].Name));
        
        JsonObjectArrayAdd (Jsons, JsonObjectGet (Y));
        
        JsonObjectPut (Y);
        Y = NULL;
    }

    Ret.Result = KORE_RESULT_OK;
    strcpy (Ret.Msg, "");
    return Ret;
}



struct FuncResult JsonToAccountingAccountModels (const char *Jsons, struct AccountingAccountModelArray *Models)
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
            if (strcmp (Key, "Code") == 0)
            {   
                strcpy (Models->At[i].Code, JsonObjectGetString (Val));
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



struct FuncResult AccountingAccountModelSelect (struct AccountingAccountModelArray *Models, const char *Code)
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
        ResultSet_T R = Connection_executeQuery (Conn, "SELECT \"Code\", \"Name\" FROM \"AccountingAccount\" WHERE \"Code\"='%s';", Code);
        
        struct AccountingAccountModel Tmp;
        
        while (ResultSet_next (R))
        {
            strcpy (Tmp.Code, ResultSet_getStringByName (R, "Code"));
            strcpy (Tmp.Name, ResultSet_getStringByName (R, "Name"));
            
            AccountingAccountModelArrayPush (Models, &Tmp);
        }
        
        Connection_close (Conn);
        
        S.Result = KORE_RESULT_OK;
        strcpy (S.Msg,  "AccountingAccountModelSelect Success");
        
    }
    CATCH (SQLException)
    {
        Connection_close (Conn);
     
        S.Result = KORE_RESULT_ERROR;
        strcpy (S.Msg,  "AccountingAccountModelSelect Failed");
    }
    FINALLY
    {
    }
    END_TRY;
    
    return S;
}



struct FuncResult AccountingAccountModelInsert (const struct AccountingAccountModelArray *Models)
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
            Stm = Connection_prepareStatement (Conn, "INSERT INTO \"AccountingAccount\"(\"Code\", \"Name\") VALUES(?, ?);");
            PreparedStatement_setString (Stm, 1, Models->At[i].Code);
            PreparedStatement_setString (Stm, 2, Models->At[i].Name);
            PreparedStatement_execute (Stm);
        }
        
        Connection_commit (Conn);
        
        Connection_close (Conn);
    
        S.Result = KORE_RESULT_OK;
        strcpy (S.Msg, "AccountingAccount inserted");
        
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
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

#include "accounting_disb_vou_model.h"

struct AccountingDisbVouModelArray NewAccountingDisbVouModelArray (void)
{
    struct AccountingDisbVouModelArray X;
    X.Length = 0;
    
    return X;
}



struct FuncResult AccountingDisbVouModelArrayPush (struct AccountingDisbVouModelArray *Array, const struct AccountingDisbVouModel *Element)
{
    struct FuncResult Ret;
    
    if (Array->Length == LOW_ARRAY_SIZE)
    {
        Ret.Result = KORE_RESULT_ERROR;
        strcpy (Ret.Msg, "Array Length Max");
        return Ret;
    }
    
    memcpy (&(Array->At[Array->Length]), Element, sizeof(struct AccountingDisbVouModel));
    Array->Length++;
    
    
    Ret.Result = KORE_RESULT_OK;
    strcpy (Ret.Msg, "");
    return Ret;
}




struct FuncResult AccountingDisbVouModelsToJson (const struct AccountingDisbVouModelArray *Models, JsonObject *Jsons)
{
    struct FuncResult Ret;
    
    JsonObject *Y = NULL;
    
    for (int i = 0; i < Models->Length; i++)
    {
        Y = JsonObjectNewObject ();
        
        JsonObjectObjectAdd (Y, "Number", JsonObjectNewInt64 (Models->At[i].Number));
        JsonObjectObjectAdd (Y, "Place", JsonObjectNewString (Models->At[i].Place));
        JsonObjectObjectAdd (Y, "Date", JsonObjectNewString (Models->At[i].Date));
        JsonObjectObjectAdd (Y, "Holder", JsonObjectNewString (Models->At[i].Holder));
        JsonObjectObjectAdd (Y, "Concept", JsonObjectNewString (Models->At[i].Concept));
        JsonObjectObjectAdd (Y, "Bank", JsonObjectNewString (Models->At[i].Bank));
        JsonObjectObjectAdd (Y, "Check", JsonObjectNewString (Models->At[i].Check));
        JsonObjectObjectAdd (Y, "CheckingAccount", JsonObjectNewString (Models->At[i].CheckingAccount));
        JsonObjectObjectAdd (Y, "Amount", JsonObjectNewInt64 (Models->At[i].Amount));
        
        JsonObject *R = NULL;
        R = JsonObjectNewArray ();
        JsonObject *Z = NULL;
        for (int j = 0; j < Models->At[i].Records.Length; j++)
        {
            Z = JsonObjectNewObject ();
            
            JsonObjectObjectAdd (Z, "Code", JsonObjectNewString (Models->At[i].Records.At[j].Account.Code));
            JsonObjectObjectAdd (Z, "Name", JsonObjectNewString (Models->At[i].Records.At[j].Account.Name));
            JsonObjectObjectAdd (Z, "Partial", JsonObjectNewInt64 (Models->At[i].Records.At[j].Partial));
            JsonObjectObjectAdd (Z, "Debit", JsonObjectNewInt64 (Models->At[i].Records.At[j].Debit));
            JsonObjectObjectAdd (Z, "Credit", JsonObjectNewInt64 (Models->At[i].Records.At[j].Credit));
            
            JsonObjectArrayAdd (R, JsonObjectGet (Z));
            JsonObjectPut (Z);
            Z = NULL;
        }
        
        JsonObjectObjectAdd (Y, "Records", R);
        JsonObjectArrayAdd (Jsons, JsonObjectGet (Y));        
        JsonObjectPut (R);
        JsonObjectPut (Y);
        R = NULL;
        Y = NULL;
    }

    Ret.Result = KORE_RESULT_OK;
    strcpy (Ret.Msg, "");
    return Ret;
}



struct FuncResult JsonToAccountingDisbVouModels (const char *Jsons, struct AccountingDisbVouModelArray *Models)
{
    struct FuncResult Ret;
    
    JsonObject *jobjs = NULL;
    jobjs = JsonTokenerParse (Jsons);
    int length = JsonObjectArrayLength (jobjs);

    Models->Length = length;
    
    for (int i = 0; i < Models->Length; i++)
    {
        JsonObject *jobj = NULL;
        jobj = JsonObjectArrayGetIdx (jobjs, i);
        
        JsonObjectObjectForeach (jobj, Key, Val)
        {          
            if (strcmp (Key, "Number") == 0)
            {   
                Models->At[i].Number = JsonObjectGetInt64 (Val);
            }
            else if (strcmp (Key, "Place") == 0)
            {   
                strcpy (Models->At[i].Place, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "Date") == 0)
            {   
                strcpy (Models->At[i].Date, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "Holder") == 0)
            {   
                strcpy (Models->At[i].Holder, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "Concept") == 0)
            {   
                strcpy (Models->At[i].Concept, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "Bank") == 0)
            {   
                strcpy (Models->At[i].Bank, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "Check") == 0)
            {   
                strcpy (Models->At[i].Check, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "CheckingAccount") == 0)
            {   
                strcpy (Models->At[i].CheckingAccount, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "Amount") == 0)
            {   
                Models->At[i].Amount = JsonObjectGetInt64 (Val);
            }
            else if (strcmp (Key, "Records") == 0)
            {   
                JsonObject *Records = NULL;
                Records = JsonTokenerParse (JsonObjectGetString (Val));
                Models->At[i].Records.Length = JsonObjectArrayLength (Records);
                
                for (int j=0; j < Models->At[i].Records.Length; j++)
                {
                    JsonObject *R = NULL;
                    R = JsonObjectArrayGetIdx (Records, j);
        
                    JsonObjectObjectForeach (R, RKey, RVal)
                    { 
                        if (strcmp (RKey, "Code") == 0)
                        {   
                            strcpy (Models->At[i].Records.At[j].Account.Code, JsonObjectGetString (RVal));
                        }
                        else if (strcmp (RKey, "Name") == 0)
                        {   
                            strcpy (Models->At[i].Records.At[j].Account.Name, JsonObjectGetString (RVal));
                        }
                        else if (strcmp (RKey, "Partial") == 0)
                        {   
                            Models->At[i].Records.At[j].Partial = JsonObjectGetInt64 (RVal);
                        }
                        else if (strcmp (RKey, "Debit") == 0)
                        {   
                            Models->At[i].Records.At[j].Debit = JsonObjectGetInt64 (RVal);
                        }
                        else if (strcmp (RKey, "Credit") == 0)
                        {   
                            Models->At[i].Records.At[j].Credit = JsonObjectGetInt64 (RVal);
                        }
                        else
                        {
                            JsonObjectPut (R);
                            R = NULL;
                
                            JsonObjectPut (Records);
                            Records = NULL;
                            
                            JsonObjectPut (jobj);
                            jobj = NULL;
                
                            JsonObjectPut (jobjs);
                            jobjs = NULL;
                
                            Ret.Result = KORE_RESULT_ERROR;
                            strcpy (Ret.Msg, "Key Record not found.");
               
                            return Ret;
                        }
                    }
                    
                    JsonObjectPut (R);
                    R = NULL;
                }
                
                JsonObjectPut (Records);
                Records = NULL;
            }
            else
            {
                JsonObjectPut (jobj);
                jobj = NULL;
                
                JsonObjectPut (jobjs);
                jobjs = NULL;
                
                Ret.Result = KORE_RESULT_ERROR;
                strcpy (Ret.Msg, "Key Cedeg not found.");
               
                return Ret;
            }
        }

        JsonObjectPut (jobj);
        jobj = NULL;        
    }
    
    JsonObjectPut (jobjs);
    jobjs = NULL;
    
    Ret.Result = KORE_RESULT_OK;
    strcpy (Ret.Msg, "");
    
    return Ret;
}


struct FuncResult AccountingDisbVouModelInsert (const struct AccountingDisbVouModelArray *Models)
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
        int j = 0;
        for (i = 0; i < Models->Length; i++)
        {
            Stm = Connection_prepareStatement (Conn, "WITH \"ins1\" AS (INSERT INTO \"AccountingDisbVou\"(\"Number\", \"Place\", \"Date\", \"Holder\", \"Concept\") VALUES(?, ?, ?, ?, ?) RETURNING \"Id\") INSERT INTO \"AccountingDisbVouBank\"(\"AccountingDisbVouId\", \"Bank\", \"Check\", \"CheckingAccount\", \"Amount\") SELECT \"Id\", ?, ?, ?, ? FROM \"ins1\";");
            PreparedStatement_setLLong (Stm, 1, Models->At[i].Number);
            PreparedStatement_setString (Stm, 2, Models->At[i].Place);
            PreparedStatement_setString (Stm, 3, Models->At[i].Date);
            PreparedStatement_setString (Stm, 4, Models->At[i].Holder);
            PreparedStatement_setString (Stm, 5, Models->At[i].Concept);
            PreparedStatement_setString (Stm, 6, Models->At[i].Bank);
            PreparedStatement_setString (Stm, 7, Models->At[i].Check);
            PreparedStatement_setString (Stm, 8, Models->At[i].CheckingAccount);
            PreparedStatement_setLLong (Stm, 9, Models->At[i].Amount);
            PreparedStatement_execute (Stm);
            
             for (j=0; j < Models->At[i].Records.Length; j++)
            {
                Stm = Connection_prepareStatement (Conn, "INSERT INTO \"AccountingDisbVouRecord\"(\"AccountingDisbVouId\", \"AccountingAccountId\", \"Partial\", \"Debit\", \"Credit\") SELECT \"AccountingDisbVou\".\"Id\", \"AccountingAccount\".\"Id\", ?, ?, ? FROM \"AccountingDisbVou\" INNER JOIN \"AccountingAccount\" ON \"AccountingDisbVou\".\"Number\"=? AND \"AccountingAccount\".\"Code\"=?;");
                PreparedStatement_setLLong (Stm, 1, Models->At[i].Records.At[j].Partial);
                PreparedStatement_setLLong (Stm, 2, Models->At[i].Records.At[j].Debit);
                PreparedStatement_setLLong (Stm, 3, Models->At[i].Records.At[j].Credit);
                PreparedStatement_setLLong (Stm, 4, Models->At[i].Number);
                PreparedStatement_setString(Stm, 5, Models->At[i].Records.At[j].Account.Code);
                PreparedStatement_execute (Stm);
            }
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
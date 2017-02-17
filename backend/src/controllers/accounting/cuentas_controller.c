/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

#include "cuentas_controller.h"
#include "../../models/accounting/accounting_account_model.h"

int CuentasControllerSelect (struct HttpRequest *Req)
{
    struct FuncResult Ret;
    char Code[16];
    
    char *Data = NULL;
    
    if (VerifyRequest (Req, &Data, FORM_JSON) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }
    
    Ret = GetJsonString (Data, "Code", Code);
    
    struct AccountingAccountModelArray Accounts = NewAccountingAccountModelArray ();
    
    Ret = AccountingAccountModelSelect (&Accounts, Code);

    if (Ret.Result == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, Ret.Result, Ret.Msg);
        return KORE_RESULT_OK;
    }
    
    JsonObject *Jobj = NULL;
    Jobj = JsonObjectNewArray ();
    
    Ret = AccountingAccountModelsToJson(&Accounts, Jobj);

    if (Ret.Result == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, Ret.Result, Ret.Msg);
        return KORE_RESULT_OK;
    }
    
    HttpResponseJsonObject (Req, KORE_RESULT_OK, Jobj);
    
    JsonObjectPut (Jobj);
    Jobj = NULL;
    
    return KORE_RESULT_OK;
}



int CuentasControllerSave (struct HttpRequest *Req)
{
    char *Data = NULL;
    
    if (VerifyRequest (Req, &Data, FORM_JSON) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }
        
    struct AccountingAccountModelArray Accounts;
    
    struct FuncResult Ret = JsonToAccountingAccountModels(Data, &Accounts);
    
    if (Ret.Result == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg (Req, KORE_RESULT_ERROR, Ret.Msg);
        return (KORE_RESULT_OK);
    }
    
    Ret = AccountingAccountModelInsert (&Accounts);
    
    if (Ret.Result == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, Ret.Msg);
        return (KORE_RESULT_OK);
    }
    
    HttpResponseJsonMsg (Req, KORE_RESULT_OK, "Success");
    
    return (KORE_RESULT_OK);
}
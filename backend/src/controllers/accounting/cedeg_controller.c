/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

#include "cedeg_controller.h"
#include "../../models/accounting/accounting_disb_vou_model.h"

int CedegControllerSave (struct HttpRequest *Req)
{
    char *Data = NULL;
    
    if (VerifyRequest (Req, &Data, FORM_JSON) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }
        
    struct AccountingDisbVouModelArray Cedegs;
    
    struct FuncResult Ret = JsonToAccountingDisbVouModels (Data, &Cedegs);
    
    if (Ret.Result == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg (Req, KORE_RESULT_ERROR, Ret.Msg);
        return (KORE_RESULT_OK);
    }
    
    Ret = AccountingDisbVouModelInsert (&Cedegs);
    
    if (Ret.Result == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, Ret.Msg);
        return (KORE_RESULT_OK);
    }
    
    HttpResponseJsonMsg (Req, KORE_RESULT_OK, "Success");
    
    return (KORE_RESULT_OK);
}
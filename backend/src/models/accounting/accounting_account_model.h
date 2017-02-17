/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * File:   accounting_account.h
 * Author: joseluis
 *
 * Created on February 15, 2017, 5:56 PM
 */
#include "../../contrib.h"
#include "../../database.h"

#ifndef _ACCOUNTING_ACCOUNT_MODEL_H_
#define _ACCOUNTING_ACCOUNT_MODEL_H_

struct AccountingAccountModel
{
    char Code[16];
    char Name[128];
};

struct AccountingAccountModelArray
{
    struct AccountingAccountModel At[LOW_ARRAY_SIZE];
    int Length;
};

struct AccountingAccountModelArray NewAccountingAccountModelArray (void);
struct FuncResult AccountingAccountModelArrayPush (struct AccountingAccountModelArray *Array, const struct AccountingAccountModel *Element);

struct FuncResult AccountingAccountModelsToJson (const struct AccountingAccountModelArray *Models, JsonObject *Jsons);
struct FuncResult JsonToAccountingAccountModels (const char *Jsons, struct AccountingAccountModelArray *Models);

struct FuncResult AccountingAccountModelSelect (struct AccountingAccountModelArray *Models, const char *Code);
struct FuncResult AccountingAccountModelInsert (const struct AccountingAccountModelArray *Models);

#endif /* ACCOUNTING_ACCOUNT_H */


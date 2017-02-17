/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * File:   accounting_disb_vou.h
 * Author: joseluis
 *
 * Created on February 15, 2017, 8:43 PM
 */
#include "../../contrib.h"
#include "../../database.h"
#include "accounting_account_model.h"

#ifndef _ACCOUNTING_DISB_VOU_MODEL_H_
#define _ACCOUNTING_DISB_VOU_MODEL_H_

struct AccountingDisbVouModel
{
    int64_t Number;
    char Place[32];
    char Date[16];
    char Holder[64];
    char Concept[256];
    char Bank[32];
    char Check[16];
    char CheckingAccount[32];
    int64_t Amount;
    struct {
        struct {
            struct AccountingAccountModel Account;
            int64_t Partial;
            int64_t Debit;
            int64_t Credit;
        } At[20];
        int Length;
    } Records;
};

struct AccountingDisbVouModelArray
{
    struct AccountingDisbVouModel At[LOW_ARRAY_SIZE];
    int Length;
};

struct AccountingDisbVouModelArray NewAccountingDisbVouModelArray (void);
struct FuncResult AccountingDisbVouModelArrayPush (struct AccountingDisbVouModelArray *Array, const struct AccountingDisbVouModel *Element);

struct FuncResult AccountingDisbVouModelsToJson (const struct AccountingDisbVouModelArray *Models, JsonObject *Jsons);
struct FuncResult JsonToAccountingDisbVouModels (const char *Jsons, struct AccountingDisbVouModelArray *Models);

struct FuncResult AccountingDisbVouModelInsert (const struct AccountingDisbVouModelArray *Models);
struct FuncResult AccountingDisbVouModelNextNumber (int64_t *Number);

#endif /* ACCOUNTING_DISB_VOU_H */


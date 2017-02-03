/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

#include "redis.h"

int RedisCommandStr (const char *Command, char *Result)
{
    redisContext *Ctx = NULL;
    
    if (Ctx == NULL)
    {
        Ctx = redisConnect (REDIS_IP, REDIS_PORT);
    }
    
    if (Ctx == NULL || Ctx->err)
    {
        if (Ctx)
        {
            kore_log (LOG_INFO, "Redis error: %s\n", Ctx->errstr);
            redisFree (Ctx);
        }
        else
        {
            kore_log (LOG_INFO, "Redis can't allocate redis context\n");
        }
        
        return KORE_RESULT_ERROR;
    }

    redisReply *Reply = redisCommand (Ctx, "AUTH %s", "K3J9 8LMN 02F3 B3LW");
    if (strcmp(Reply->str, "OK") != 0)
    {
        kore_log (LOG_INFO, "Redis Password Error\n");
        return KORE_RESULT_ERROR;
    }
    freeReplyObject (Reply);

    Reply = redisCommand (Ctx, Command);
    strcpy (Result, Reply->str);
    freeReplyObject (Reply);
    
    redisFree (Ctx);
    
    return KORE_RESULT_OK;
}


int RedisCommandInt (const char *Command, int64_t *Result)
{
    redisContext *Ctx = NULL;
    
    if (Ctx == NULL)
    {
        Ctx = redisConnect (REDIS_IP, REDIS_PORT);
    }
    
    if (Ctx == NULL || Ctx->err)
    {
        if (Ctx)
        {
            kore_log (LOG_INFO, "Redis error: %s\n", Ctx->errstr);
            redisFree (Ctx);
        }
        else
        {
            kore_log (LOG_INFO, "Redis can't allocate redis context\n");
        }
        
        return KORE_RESULT_ERROR;
    }

    redisReply *Reply = redisCommand (Ctx, "AUTH %s", "K3J9 8LMN 02F3 B3LW");
    if (strcmp(Reply->str, "OK") != 0)
    {
        kore_log (LOG_INFO, "Redis Password Error\n");
        return KORE_RESULT_ERROR;
    }
    freeReplyObject (Reply);
    
    Reply = redisCommand (Ctx, Command);
    *Result = Reply->integer;
    freeReplyObject (Reply);
    
    redisFree (Ctx);
    
    return KORE_RESULT_OK;
}
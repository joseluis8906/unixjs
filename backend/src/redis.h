/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * File:   redis.h
 * Author: joseluis
 *
 * Created on February 1, 2017, 8:54 AM
 */
#include <kore/kore.h>
#include <kore/http.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <hiredis/hiredis.h>
#include "defines.h"

#ifndef _REDIS_H_
#define _REDIS_H_

int RedisCommandStr (const char *Command, char *Result);
int RedisCommandInt (const char *Command, int64_t *Result);

#endif


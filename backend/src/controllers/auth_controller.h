/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * File:   auth_controller.h
 * Author: joseluis
 *
 * Created on January 27, 2017, 7:49 PM
 */

#include "../contrib.h"

#ifndef _AUTH_CONTROLLER_H_
#define _AUTH_CONTROLLER_H_

int AuthControllerLogin (struct HttpRequest *Req);
int AuthControllerLogout (struct HttpRequest *Req);

int AuthControllerVerifySession (struct HttpRequest *Req);
int AuthControllerGetUserInfo (struct HttpRequest *Req, char *UserName);

int AuthControllerStartSession (struct HttpRequest *Req, const char *UserName);
int AuthControllerRenueveSession (struct HttpRequest *Req);
int AuthControllerTerminateSession (struct HttpRequest *Req);

int GenerateSessionId (const char *PseudoId, char *SessionId);

#endif /* AUTH_CONTROLLER_H */


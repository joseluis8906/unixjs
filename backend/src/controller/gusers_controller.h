#include <kore/kore.h>
#include <kore/http.h>

#ifndef _GUSERS_CONTROLLER_
#define _GUSERS_CONTROLLER_

//users
//int auth_user_controller_select (struct http_request*);
int gusers_controller_insert (struct http_request*);
int gusers_controller_update (struct http_request*);
int gusers_controller_delete (struct http_request*);

#endif

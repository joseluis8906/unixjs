#include <kore/kore.h>
#include <kore/http.h>

#ifndef _AUTH_CONTROLLER_
#define _AUTH_CONTROLLER_
//function session management
int v_session_validate (struct http_request *, char *);
#endif

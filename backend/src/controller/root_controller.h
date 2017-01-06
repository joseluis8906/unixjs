#include <kore/kore.h>
#include <kore/http.h>
#include <string.h>

#ifndef _ROOT_CONTROLLER_
#define _ROOT_CONTROLLER_
//function to index site
int home (struct http_request *);

//test function
int test (struct http_request *);

//function to validate params
int v_params_enabled (struct http_request *, char *);

//groups
int group_select (struct http_request*);
int group_insert (struct http_request*);
int group_update (struct http_request*);
int group_delete (struct http_request*);

#endif

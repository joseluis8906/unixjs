#include <kore/kore.h>
#include <kore/http.h>
#include <string.h>
#include "../contrib/contrib.h";

#ifndef _ROOT_CONTROLLER_H_
#define _ROOT_CONTROLLER_H_
//function to index site
int Home (struct HttpRequest *);

//test function
int Test (struct HttpRequest *);


//groups
//int group_select (struct http_request*);
//int group_insert (struct http_request*);
//int group_update (struct http_request*);
//int group_delete (struct http_request*);

#endif

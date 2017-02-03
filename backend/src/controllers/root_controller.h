#include "../contrib.h"

#ifndef _ROOT_CONTROLLER_H_
#define _ROOT_CONTROLLER_H_
//function to index site
int Home (struct HttpRequest *Req);

//test function
int Test (struct HttpRequest *Req);


//approles
int AppRoles (struct HttpRequest *Req);


//groups
//int group_select (struct http_request*);
//int group_insert (struct http_request*);
//int group_update (struct http_request*);
//int group_delete (struct http_request*);

#endif

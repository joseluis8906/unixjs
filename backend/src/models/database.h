#include "../contrib.h"
#include <zdb/zdb.h>

#ifndef _DATABASE_H_
#define _DATABASE_H_

//function to open and close pools in database
int open_pool (void);
int close_pool (void);
Connection_T get_connection (void);

#endif

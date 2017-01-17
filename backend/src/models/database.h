#include "../contrib.h"
#include <zdb/zdb.h>

#ifndef _DATABASE_H_
#define _DATABASE_H_

//function to open and close pools in database
int DbOpenPool (void);
int DbClosePool (void);
Connection_T DbGetConnection (void);

#endif

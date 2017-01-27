#include <zdb/zdb.h>
#include <kore/kore.h>
#include <kore/http.h>

#ifndef _DATABASE_H_
#define _DATABASE_H_

//function to open and close pools in database
int DbOpenPool (void);
int DbClosePool (void);
Connection_T DbGetConnection (void);

#endif

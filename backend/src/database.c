#include "database.h"

static URL_T Url;
static ConnectionPool_T Pool;

//defined function to open and close pools
int DbOpenPool (void)
{
    if (Url == NULL)
    {
        Url = URL_new ("postgresql://localhost:5432/unixjs?user=unixjs&password=K3J9 8LMN 02F3 B3LW");
        Pool = ConnectionPool_new (Url);
        ConnectionPool_setReaper (Pool, 2);
        ConnectionPool_start (Pool);
    }
    else
    {
        kore_log (LOG_INFO, "url opened yet");
    }

    return 0;
}

int DbClosePool (void)
{
    if (Url != NULL)
    {
        int Conns =  ConnectionPool_reapConnections(Pool);
        kore_log (LOG_INFO, "Connections closed: %d", Conns);
        ConnectionPool_free (&Pool);
        URL_free (&Url);
    }
    else
    {
        kore_log (LOG_INFO, "Url not opened");
    }

    return 0;
}

Connection_T DbGetConnection ()
{
    Connection_T Conn;

    if (Url != NULL)
    {
        Conn = ConnectionPool_getConnection (Pool);
    }
    else 
    {
        if (!DbOpenPool ())
        {
            Conn = ConnectionPool_getConnection (Pool);
        }
        else
        {
            return NULL;
        }
    }
    
    return Conn;
}
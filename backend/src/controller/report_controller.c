/*
#include <kore/kore.h>
#include <kore/http.h>

#include "report_controller.h"
#include "../view/acounting/cedeg_view.h"

//session validate
int report_controller_cedeg (struct http_request *req)
{
    return accounting_cedeg_view_pdf (req);
}/*
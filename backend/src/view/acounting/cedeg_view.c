#include <kore/kore.h>
#include <kore/http.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <setjmp.h>

#include <hpdf.h>

#include "cedeg_view.h"
#include "../../contrib/contrib.h"

jmp_buf env;
void error_handler (HPDF_STATUS error_no, HPDF_STATUS detail_no, void *user_data);

void HPDF_Println (HPDF_Page page , char* line, float x, float y);
void HPDF_Draw_Rectangle_Stroke (HPDF_Page page, float x, float y, float width, float height);
void HPDF_Draw_Line (HPDF_Page page, float x1, float y1, float x2, float y2);

//report cedeg
int accounting_cedeg_view_pdf (struct http_request *req)
{
    HPDF_Doc pdf;
    HPDF_Page page;
    HPDF_Font font;
    HPDF_Font comic_regular;
    HPDF_Font comic_bold;
    HPDF_Font calibri;
    HPDF_Font calibri_bold;
    HPDF_Font times_bold;
    HPDF_Image logo;
    
    char txt_buf[256];
    
    float width = 215.9f;
    float height = 279.4f;
    
    pdf = HPDF_New (error_handler, NULL);
    
    HPDF_UseUTFEncodings (pdf);
    HPDF_SetCurrentEncoder (pdf, "UTF-8");
    
    if (!pdf)
    {
        kore_log (LOG_INFO, "%s", "Can't create pdf document.");
        return 1;
    }
    if (setjmp(env))
    {
        HPDF_Free (pdf);
        return 1;
    }	
    
    HPDF_SetInfoAttr (pdf, HPDF_INFO_TITLE, "0532");
    HPDF_SetCompressionMode (pdf, HPDF_COMP_ALL);
    
    comic_regular = HPDF_LoadTTFontFromFile (pdf, "./unix/usr/share/fonts/comic.ttf", HPDF_TRUE);
    comic_bold = HPDF_LoadTTFontFromFile (pdf, "./unix/usr/share/fonts/comicbd.ttf", HPDF_TRUE);
    calibri = HPDF_LoadTTFontFromFile (pdf, "./unix/usr/share/calibri.ttf", HPDF_TRUE);
    calibri_bold = HPDF_LoadTTFontFromFile (pdf, "./unix/usr/share/fonts/calibribd.ttf", HPDF_TRUE);
    times_bold = HPDF_LoadTTFontFromFile (pdf, "./unix/usr/share/fonts/timesbd.ttf", HPDF_TRUE);

    page = HPDF_AddPage (pdf);
    HPDF_Page_SetSize (page, HPDF_PAGE_SIZE_LETTER, HPDF_PAGE_PORTRAIT);
    
    logo = HPDF_LoadPngImageFromFile (pdf, "./unix/usr/share/images/logoCdi.png");
    HPDF_Page_DrawImage (page, logo, mm_to_px (6.0f), mm_to_px (height - 39.9f), mm_to_px (33.9), mm_to_px (33.9));
    
    font = HPDF_GetFont (pdf, calibri, "UTF-8");
    HPDF_Page_SetFontAndSize (page, font, 16);
    strcpy (txt_buf, "CENTRO DE DESARROLLO INFANTIL TEMPRANO");
    float tx = (px_to_mm (HPDF_Page_GetWidth (page) - HPDF_Page_TextWidth (page, txt_buf)) / 2.0f);
    HPDF_Println (page, txt_buf, tx, 6.0f);
    
    font = HPDF_GetFont (pdf, comic_bold, "UTF-8");
    HPDF_Page_SetFontAndSize (page, font, 16);
    strcpy (txt_buf, "\"CDI GOTITAS DE AMOR\"");
    tx = (px_to_mm (HPDF_Page_GetWidth (page) - HPDF_Page_TextWidth (page, txt_buf)) / 2.0f);
    HPDF_Println (page, txt_buf, tx, 13.0f);
    
    font = HPDF_GetFont (pdf, calibri_bold, "UTF-8");
    HPDF_Page_SetFontAndSize (page, font, 10);
    strcpy (txt_buf, "NIT: 800.203.530-6");
    tx = (px_to_mm (HPDF_Page_GetWidth (page) - HPDF_Page_TextWidth (page, txt_buf)) / 2.0f);
    HPDF_Println (page, txt_buf, tx, 20.0f);
    
    HPDF_Page_SetFontAndSize (page, font, 15);
    strcpy (txt_buf, "ASOCIACION DE HOGARES COMUNITARIOS GAMARRA TRADICIONAL");
    tx = (px_to_mm (HPDF_Page_GetWidth (page) - HPDF_Page_TextWidth (page, txt_buf)) / 1.4f);
    HPDF_Println (page, txt_buf, tx, 24.0f);
    
    strcpy (txt_buf, "Barrio Capulco Nuevo Cels: 321 4046231 - 314 5673911 Gamarra - Cesar");
    tx = (px_to_mm (HPDF_Page_GetWidth (page) - HPDF_Page_TextWidth (page, txt_buf)) / 1.4f);
    HPDF_Println (page, txt_buf, tx, 30.0f);
    
    font = HPDF_GetFont (pdf, comic_bold, "UTF-8");
    HPDF_Page_SetFontAndSize (page, font, 10);
    strcpy (txt_buf, "c.d.i.t.gotitasdeamor@hotmail.com");
    tx = (px_to_mm (HPDF_Page_GetWidth (page) - HPDF_Page_TextWidth (page, txt_buf)) / 2.0f);
    HPDF_Println (page, txt_buf, tx, 37.0f);
    
    font = HPDF_GetFont (pdf, calibri, "UTF-8");
    HPDF_Page_SetFontAndSize (page, font, 20);
    strcpy (txt_buf, "COMPROBANTE DE EGRESO");
    tx = (px_to_mm (HPDF_Page_GetWidth (page) - HPDF_Page_TextWidth (page, txt_buf)) / 2.0f);
    HPDF_Println (page, txt_buf, tx, 43.0f);
    
    font = HPDF_GetFont (pdf, calibri, "UTF-8");
    HPDF_Page_SetFontAndSize (page, font, 20);
    strcpy (txt_buf, "Nº");
    tx = 179.9f - (px_to_mm (HPDF_Page_TextWidth (page, txt_buf)) * 1.5f);
    HPDF_Println (page, txt_buf, tx, 43.0f);
    
    HPDF_Draw_Rectangle_Stroke (page, 179.9f, 44.0f, 30.0f, 8.0f);
    font = HPDF_GetFont (pdf, times_bold, "UTF-8");
    HPDF_Page_SetFontAndSize (page, font, 18);
    strcpy (txt_buf, "0532");
    tx = 179.9f + ((30.0f - px_to_mm (HPDF_Page_TextWidth (page, txt_buf))) / 2);
    HPDF_Page_SetRGBFill (page, 1, 0, 0);
    HPDF_Println (page, txt_buf, tx, 44.0f);
    HPDF_Page_SetRGBFill (page, 0, 0, 0);
    
    HPDF_Draw_Rectangle_Stroke (page, 6.0f, 52.0f, width - 12.0f, 31.0f);
    font = HPDF_GetFont (pdf, calibri, "UTF-8");
    HPDF_Page_SetFontAndSize (page, font, 11);
    HPDF_Println (page, "LUGAR Y FECHA:", 7.0f, 53.0f);
    HPDF_Draw_Line (page, 34.0f, 58.0f, width-9.0f, 58.0f);
    HPDF_Println (page, "A FAVOR DE:", 7.0f, 59.0f);
    HPDF_Draw_Line (page, 28.0f, 64.0f, width-9.0f, 64.0f);
    HPDF_Println (page, "LA SUMA DE:", 7.0f, 65.0f);
    HPDF_Draw_Line (page, 29.0f, 70.0f, width-9.0f, 70.0f);
    HPDF_Draw_Line (page, 6.0f, 76.0f, width-6.0f, 76.0f);
    HPDF_Println (page, "BANCO:", 7.0f, 77.0f);
    HPDF_Draw_Line (page, (width / 3), 76.0f, (width / 3), 83.0f);
    HPDF_Println (page, "N° DE CHEQUE:", (width / 3) + 1, 77.0f);
    HPDF_Draw_Line (page, (width / 3) * 2, 76.0f, (width / 3) * 2, 83.0f);
    HPDF_Println (page, "CTA CTE Nº:", ((width / 3) * 2) + 1, 77.0f);
    
    HPDF_Draw_Rectangle_Stroke (page, 6.0f, 85.0f, width - 12.0f, 134.0f);
    HPDF_Println (page, "CONCEPTO:", (width * 0.4f), 86.0f);
    HPDF_Draw_Line (page, (width / 4) * 3, 85.0f, (width / 4) * 3, 115.0f);
    HPDF_Println (page, "VALOR:", (width * 0.83f), 86.0f);
    HPDF_Draw_Line (page, 6.0f, 115.0f, (width - 6.0f), 115.0f);
    HPDF_Println (page, "CODIGOS CONTABLES", (width * 0.42f), 116.0f);
    HPDF_Draw_Line (page, 6.0f, 123.0f, (width - 6.0f), 123.0f);
    HPDF_Println (page, "CODIGO", 17.0f, 123.5f);
    HPDF_Draw_Line (page, 41.0f, 123.0f, 41.0f, 219.0f);
    HPDF_Println (page, "NOMBRE DE LA CUENTA", 60.0f, 123.5f);
    HPDF_Draw_Line (page, 112.0f, 123.0f, 112.0f, 219.0f);
    HPDF_Println (page, "PARCIAL", 122.0f, 123.5f);
    HPDF_Draw_Line (page, 145.0f, 123.0f, 145.0f, 219.0f);
    HPDF_Println (page, "DEBE", 157.0f, 123.5f);
    HPDF_Draw_Line (page, 177.0f, 123.0f, 177.0f, 219.0f);
    HPDF_Println (page, "HABER", 188.0f, 123.5f);
    HPDF_Draw_Line (page, 6.0f, 129.0f, (width - 6.0f), 129.0f);
    for (int i=0; i<=13; ++i)
    {
        HPDF_Draw_Line (page, 6.0f, (129.0f + ((i+1)*6.0f)), (width - 6.0f), (129.0f + ((i+1)*6.0f)));
    }
    
    HPDF_Draw_Rectangle_Stroke (page, 6.0f, 221.0f, width - 12.0f, 25.0f);
    HPDF_Println (page, "PAGUESE", 7.0f, 221.5f);
    HPDF_Draw_Line (page, 8.0f, 238.0f, (width * 0.45), 238.0f);
    HPDF_Draw_Line (page, (width * 0.55), 238.0f, (width - 8.0f), 238.0f);
    HPDF_Println (page, "REPRESENTANTE LEGAL", 33.0f, 238.0f);
    HPDF_Println (page, "TESORERO", (width * 0.72), 238.0f);
    
    HPDF_Draw_Rectangle_Stroke (page, 6.0f, 248.0f, width - 12.0f, 25.0f);
    HPDF_Println (page, "RECIBÍ", 7.0f, 249.5f);
    HPDF_Draw_Line (page, 6.0f, 266.0f, (width - 6.0f), 266.0f);
    HPDF_Println (page, "C.C", 7.0f, 266.5f);
    
    //save document
    HPDF_SaveToStream (pdf);
    
    struct kore_buf *b;
    u_int8_t *d;
    size_t len;
    
    b = kore_buf_alloc (HPDF_GetStreamSize (pdf));
        
    HPDF_ResetStream (pdf);
    
    for (;;) 
    {
        HPDF_BYTE buf[4096];
        HPDF_UINT32 siz = 4096;
        HPDF_STATUS ret = HPDF_ReadFromStream (pdf, buf, &siz);    
        if (!ret)
        {
            //kore_log (LOG_INFO, "status is %d", ret);
        }
        if (siz == 0)
        {
            break;
        }
        
        kore_buf_append (b, buf, siz);
    }
    
    HPDF_Free (pdf);
    
    d = kore_buf_release (b, &len);
    
    http_response_header (req, "content-type", "application/pdf");
    http_response (req, 200, d, len);
    return (KORE_RESULT_OK);
}

void HPDF_Println (HPDF_Page page, char* line, float x, float y)
{
    float page_width = px_to_mm (HPDF_Page_GetWidth (page));
    float page_height = px_to_mm (HPDF_Page_GetHeight (page));
    
    HPDF_Page_BeginText (page);
    HPDF_Page_TextOut (page, mm_to_px (x), mm_to_px (page_height - (y + px_to_mm (HPDF_Page_GetCurrentFontSize (page)))), line);
    HPDF_Page_EndText (page);
}

void HPDF_Draw_Rectangle_Stroke (HPDF_Page page, float x, float y, float width, float height)
{
    float page_width = px_to_mm (HPDF_Page_GetWidth (page));
    float page_height = px_to_mm (HPDF_Page_GetHeight (page));
    
    float rx = mm_to_px (x);
    float ry = mm_to_px (page_height - y);

    HPDF_Page_SetLineWidth (page, 1);
    HPDF_Page_SetRGBStroke (page, 0, 0, 0);
    HPDF_Page_Rectangle (page, rx, ry, mm_to_px (width), mm_to_px (-height));
    HPDF_Page_Stroke (page);
}

void HPDF_Draw_Line (HPDF_Page page, float x1, float y1, float x2, float y2)
{
    float page_width = px_to_mm (HPDF_Page_GetWidth (page));
    float page_height = px_to_mm (HPDF_Page_GetHeight (page));
    
    float ry1 = mm_to_px (page_height - y1);
    float ry2 = mm_to_px (page_height - y2);
    
    HPDF_Page_MoveTo (page, mm_to_px (x1), ry1);
    HPDF_Page_LineTo (page, mm_to_px (x2), ry2);
    HPDF_Page_Stroke (page);
}

//error handling
void error_handler (HPDF_STATUS error_no, HPDF_STATUS detail_no, void *user_data)
{
    printf ("ERROR: error_no=%04X, detail_no=%u\n", (HPDF_UINT)error_no, (HPDF_UINT)detail_no);
    longjmp (env, 1);
}

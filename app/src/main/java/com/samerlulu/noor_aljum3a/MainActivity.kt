/*

Noor Aljum3a App: Alkahf Sora Reading _ تطبيق نور الجمعة: لتلاوة سورة الكهف
Idea, Design and Devlopment are made by Samer F. Lulu - 2020 Ramadan 1441
his App is OPEN SOURCE and free to copy, modify and reuse but NOT TO BE USED IN ANY COMMERCIAL MEANS
for suggestions and commments please email at: s@SamerLulu.com  / Samer.Lulu@gmail.com

*/

package com.samerlulu.noor_aljum3a

import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*


class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        overridePendingTransition(R.anim.fadein, R.anim.fadeout)
        setContentView(R.layout.activity_main)

        wvMain.loadUrl("file:///android_asset/htmls/main.html")
        wvMain.settings.javaScriptEnabled = true //to enable java scripts
        wvMain.setBackgroundColor(Color.TRANSPARENT)

// For Future Development to communicate with webview using JavaScript Bridge
//        wvMain.addJavascriptInterface(JavaScriptInterface(), JAVASCRIPT_OBJ) //add interface to get comms with webview
//        wvMain.loadUrl(BASE_URL) //load the page

        val settings: WebSettings = wvMain.settings
        settings.domStorageEnabled = true //to enable local web storage
        settings.databaseEnabled = true //to enable local web storage

// For Future Development to communicate with webview using JavaScript Bridge
//
//        btnMain.setOnClickListener() {
//            wvMain.evaluateJavascript("javascript:" +" doThisFromKotlin('click');",null)
//        }
//
//        btnMain.setOnLongClickListener()  {
//            wvMain.loadUrl("javascript:doThisFromKotlin('long_click');");
//            true
//        }

    }

// For Future Development to communicate with webview using JavaScript Bridge
//
//    override fun onDestroy() {
//        wvMain.removeJavascriptInterface(JAVASCRIPT_OBJ)
//        super.onDestroy()
//    }
//
//    private inner class JavaScriptInterface
//    {
//        @android.webkit.JavascriptInterface
//        fun doThisFromJS(vAction:String)
//        {
//
//            btnMain.setBackgroundColor(Color.GRAY)
//            btnMain.textSize = 100F
//
//            when(vAction){
//                "JS_YES" -> btnMain.text = "yes"
//                "JS_NO" -> btnMain.text = "No"
//                "btn_v_on" -> btnMain.visibility = View.VISIBLE
//                "btn_v_off" -> btnMain.visibility = View.INVISIBLE
//                else -> {
//                    btnMain.text = "none"
//                }
//            }
//
//        }
//    }
//
//    companion object {
//        private const val JAVASCRIPT_OBJ = "javascript_obj"
//        private const val BASE_URL = "file:///android_asset/htmls/main.html"
//    }

}




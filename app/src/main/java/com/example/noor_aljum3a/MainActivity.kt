/*

Noor Aljum3a App: Alkahf Sora Reading _ تطبيق نور الجمعة: لتلاوة سورة الكهف
Idea, Design and Devlopment are made by Samer F. Lulu - 2020 Ramadan 1441
his App is OPEN SOURCE and free to copy, modify and reuse but NOT TO BE USED IN ANY COMMERCIAL MEANS
for suggestions and commments please email at: s@SamerLulu.com  / Samer.Lulu@gmail.com

*/

package com.example.noor_aljum3a

import android.os.Bundle
import android.webkit.WebSettings
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*


class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        wvMain.loadUrl("file:///android_asset/htmls/main.html")
        wvMain.settings.javaScriptEnabled = true //to enable java scripts

        val settings: WebSettings = wvMain.getSettings()
        settings.domStorageEnabled = true //to enable local web storage
        settings.databaseEnabled = true //to enable local web storage

    }

}


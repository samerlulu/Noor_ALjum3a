/*

Noor Aljum3a App: Alkahf Sora Reading _ تطبيق نور الجمعة: لتلاوة سورة الكهف
Idea, Design and Devlopment are made by Samer F. Lulu - 2020 Ramadan 1441
his App is OPEN SOURCE and free to copy, modify and reuse but NOT TO BE USED IN ANY COMMERCIAL MEANS
for suggestions and commments please email at: s@SamerLulu.com  / Samer.Lulu@gmail.com

*/

package com.samerlulu.noor_aljum3a

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler

class Launcher :AppCompatActivity()  {

    private lateinit var mHandler: Handler
    private lateinit var mRunnable: Runnable

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_launcher)
        
        mRunnable = Runnable {
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }

        mHandler = Handler()

        mHandler.postDelayed(mRunnable, 1000) // to display the logo for 1 second

    }

    override fun onStop() {
        super.onStop()
        mHandler.removeCallbacks(mRunnable)
    }
}

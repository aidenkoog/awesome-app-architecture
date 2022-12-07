package io.github.aidenkoog.style1.util;

import android.os.AsyncTask;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class LogWrite extends AsyncTask<String, Void, Boolean> {
    File file;
    String currentDateTimeString;
    String currentFileName;

    public LogWrite() {
    }

    @Override
    protected Boolean doInBackground(String... strings) {
        if (null == strings) return false;

        File root = android.os.Environment.getExternalStorageDirectory();
        currentDateTimeString = DateFormat.getDateTimeInstance().format(new Date());
        SimpleDateFormat dt1 = new SimpleDateFormat("yyyy_MM_dd_");
        currentFileName = dt1.format(new Date());

        File dir = new File(root.getAbsolutePath() + "/test/log");
        try {
            long dirSize = getFolderSize(dir);
            if (dirSize > 104857600) {
                deleteDir(dir.getPath());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (!dir.exists()) {
            dir.mkdirs();
        }

        file = new File(dir, currentFileName + "log.txt");
        try {
            BufferedWriter buf = new BufferedWriter(new FileWriter(file, true));
            buf.append(currentDateTimeString + " : " + strings[0]);
            buf.newLine();
            buf.close();
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

    public int deleteDir(String a_path) {
        File file = new File(a_path);
        if (file.exists()) {
            try {
                File[] childFileList = file.listFiles();

                for (File childFile : childFileList) {
                    if (childFile.isDirectory()) {
                        deleteDir(childFile.getAbsolutePath());
                    } else {
                        childFile.delete();
                    }
                }
            } catch (Exception e) {
            }

            return 1;
        } else {
            return 0;
        }
    }

    public static long getFolderSize(File dir) {
        if (dir.exists()) {
            long result = 0;
            File[] fileList = dir.listFiles();
            for (int i = 0; i < fileList.length; i++) {
                // Recursive call if it's a directory
                if (fileList[i].isDirectory()) {
                    result += getFolderSize(fileList[i]);
                } else {
                    // Sum the file size in bytes
                    result += fileList[i].length();
                }
            }
            return result; // return the file size
        }
        return 0;
    }
}

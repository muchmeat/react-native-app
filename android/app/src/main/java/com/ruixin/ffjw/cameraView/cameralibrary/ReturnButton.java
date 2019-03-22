package com.ruixin.ffjw.cameraView.cameralibrary;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.view.View;

/**
 * 向左箭头的退出按钮
 */
public class ReturnButton extends View {

    private int size;

    private int center_X;
    private int center_Y;
    private float strokeWidth;

    private Paint paint;
    Path path;

    public ReturnButton(Context context, int size) {
        this(context);
        this.size = size;
        center_X = size / 2;
        center_Y = size / 2;

        strokeWidth = size / 15f;

        paint = new Paint();
        paint.setAntiAlias(true);
        paint.setColor(Color.WHITE);
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(strokeWidth);

        path = new Path();
    }

    public ReturnButton(Context context) {
        super(context);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
//        setMeasuredDimension(size, size/2);
        setMeasuredDimension(size, size);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        //向下箭头
//        path.moveTo(strokeWidth, strokeWidth/2);
//        path.lineTo(center_X, center_Y - strokeWidth/2);
//        path.lineTo(size - strokeWidth, strokeWidth/2);
        //向左箭头 setMeasuredDimension(size, size/2); -> setMeasuredDimension(size, size);
        path.moveTo(center_X, strokeWidth / 2);
        path.lineTo(strokeWidth, center_Y - strokeWidth / 2);
        path.lineTo(center_X, size - strokeWidth);
        canvas.drawPath(path, paint);
    }
}

/**
 * Created by Administrator on 2017/6/10.
 */
import React from 'react';
import EnumArray from './EnumArray';

export default class FontAwesomeEnums extends EnumArray {
    static get() {
        return MyFontAwesome;
    }
}

const MyFontAwesome=[
    {name:"mp4",code:"file-video-o"},
    {name:"aac",code:"file-audio-o"},
    {name:"jpg",code:"file-image-o"},
    {name:"png",code:"file-image-o"},
    {name:"word",code:"file-word-o"},
    {name:"excel",code:"file-excel-o"},
    {name:"zip",code:"file-zip-o"},
    {name:"ppt",code:"file-powerpoint-o"},
    {name:"pdf",code:"file-pdf-o"}
];
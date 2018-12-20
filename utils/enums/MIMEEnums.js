/**
 * Created by Administrator on 2017/6/10.
 */
import React from 'react';
import EnumArray from './EnumArray';

export default class MIMEEnums extends EnumArray {
    static get() {
        return MIME;
    }
}

const MIME=[
    {name:"mp4",code:"application/mpeg"},
    {name:"aac",code:"application/x-aac"},
    {name:"jpg",code:"image/jpg"},
    {name:"png",code:"image/png"},
];
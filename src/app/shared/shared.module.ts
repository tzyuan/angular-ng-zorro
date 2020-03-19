/*
 * @Author: 曹雪原
 * @since: 2020-03-18 11:36:47
 * @lastTime: 2020-03-18 11:40:11
 * @LastAuthor: 曹雪原
 * @FilePath: /kaquantest-web/src/app/shared/shared.module.ts
 * @message:
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


// #注册第三方组件 开始
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { KeywordPipe } from './pipe/keyword.pipe';
import { ConversionPipe } from './pipe/conversion.pipe';
const THIRDMODULES = [
  NgZorroAntdModule,
];
// #注册第三方组件 结束

// #region your componets & directives
const COMPONENTS = [
];
const DIRECTIVES = [
  KeywordPipe,
  ConversionPipe
];
// #endregion

@NgModule({
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    // third libs
    ...THIRDMODULES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class SharedModule { }

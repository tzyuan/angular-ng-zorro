/*
 * @Author: 刘利军
 * @Date: 2019-11-15 10:41:22
 * @LastEditors: 刘利军
 * @LastEditTime: 2020-02-21 21:15:50
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookiesService } from '../cookies/cookies.service';
import { FormGroup } from '@angular/forms';
import { CacheService } from '../cache/cache.service';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // 设备状态
  statusList = [
    { label: '启用', value: '1', disabled: false },
    { label: '禁用', value: '0', disabled: false },
    { label: '废弃', value: '99', disabled: false },
  ];
  // 产品来源
  sourceList = [
    { label: '公司内', value: '1', disabled: false },
    { label: '公司外', value: '2', disabled: false },
  ];

  // 设备绑定状态
  statusBindList = [
    { label: '使用中', value: '1', disabled: false },
    { label: '未使用', value: '0', disabled: false },
  ];

  // 订单状态
  orderStatusList = [
    { label: '待付款', value: '1', disabled: false },
    { label: '已付款', value: '2', disabled: false },
    { label: '已关闭', value: '99', disabled: false },
  ];

  // 商家类型
  MERCHANT_TYPE = [
    { label: '企业', value: '01' },
    { label: '事业单位', value: '02' },
    { label: '个体商户', value: '07' },
  ];

  // 商户证件类型
  CERTTYPE_LIST = [
    { label: '营业执照', value: '201' },
    { label: '营业执照(多证合一)', value: '2011' },
    { label: '事业单位法人证书', value: '218' },
  ];

  // 商户联系人类型
  CONTACTTYPE_LIST = [
    { label: '法人', value: 'LEGAL_PERSON' },
    { label: '实际控制人', value: 'CONTROLLER' },
    { label: '代理人', value: 'AGENT' },
    { label: '其它', value: 'OTHER' },
  ];

  // 法人证件类型
  LEGAL_PERSON_DOCUMENT_TYPE = [
    { label: '大陆身份证', value: '100' },
    { label: '港澳居民往来内地通行证', value: '105' },
    { label: '台湾同胞往来大陆通行证', value: '106' },
    { label: '外国人居留证', value: '108' },
  ];

  // 商户联系人标识枚举
  TAG_LIST = [
    { label: '异议处理接口人', value: '02' },
    { label: '商户关键联系人', value: '06' },
    { label: '数据反馈接口人', value: '11' },
    { label: '服务联动接口人', value: '08' },
  ];
  // 商户使用服务
  SERVICE_LIST = [
    { label: '当面付', value: '当面付', disabled: false },
    { label: 'app支付', value: 'app支付', disabled: true },
    { label: 'wap支付', value: 'wap支付', disabled: true },
    { label: '电脑支付', value: '电脑支付', disabled: true },
  ];
  // 账号类型
  USAGETYPE_LIST: any[] = [
    { label: '对公', value: '01' },
    { label: '对私', value: '02' },
  ];
  // 卡类型
  ACCPUNTTYPE_LIST: any[] = [
    { label: '借记卡', value: 'DC' },
    { label: '信用卡', value: 'CC' },
  ];

  // 申请状态
  APPLICATION_STATUS: any[] = [
    { label: '草稿', value: '10' },
    { label: '申请中', value: '20' },
    { label: '成功', value: '30' },
    { label: '失败', value: '40' },
    { label: '作废', value: '99' },
  ];

  constructor(
    private http: HttpClient,
    private cookies: CookiesService,
    private cache: CacheService,
  ) { }

  /**
   * @description: 获取运营商
   * @param type 是否根据业务员获取
   * @return: []
   */
  getOperator(type = false) {
    let url = '/point_manage/selectShopId';
    if (type && this.cookies.getCookie('grade').split(',').indexOf('7') > -1
      || this.cookies.getCookie('grade').split(',').indexOf('9') > -1
      || this.cookies.getCookie('grade').split(',').indexOf('11') > -1) {
      url = '/user_manage/manage_provider';
    }
    return this.cache.getCache(url)
      .pipe(
        map(res => {
          return res.map(operator => {
            return {
              value: operator.FPROVIDER_NO,
              label: operator.FPROVIDER_NAME,
            };
          });
        })
      );
  }

  /**
   * @description: 获取机型
   * @return: []
   */
  getModel() {
    return this.cache.getCache('/point_manage/selectVendType')
      .pipe(
        map(res => {
          return res.map(model => {
            return {
              label: model.FPOINT_TYPE,
              value: model.FID
            };
          });
        })
      );
  }

  /**
   * @description: 获取商品
   * @param price 根据价格获取商品
   * @return: []
   */
  getSku(price = null) {
    const http = price ? this.http.get<any>('/exchange_product/find_by_price', { params: { price } }) : this.cache.getCache('/customer_complain/getsku');
    return http.pipe(
      map(res => {
        return res.map(sku => {
          return price ? {
            label: sku.PRODUCT_CODE_NAME,
            labelStock: `${sku.PRODUCT_CODE_NAME}~${sku.SUM_QTY}`,
            value: sku.PRODUCT_CODE,
            price: sku.PRICE,
            stock: sku.SUM_QTY,
          } : {
              label: sku.FNAME,
              value: sku.FBARCODE
            };
        });
      })
    );
  }


  /**
   * @description: 获取机台(点位)
   * @return: []
   */
  getMachine = () => {
    return this.http.get<any>('/abnormal_screen/get_machines').pipe(
      map(res => {
        return res.map(machine => {
          return {
            label: machine.FPLACE_ID,
            all: `${machine.FPLACE_ID}-${machine.FSELL_POINT_NO}`,
            value: machine.FSELL_POINT_NO
          };
        });
      })
    );
  }


  // form 验证
  formValid = (validateForm: FormGroup) => {
    Object.keys(validateForm.controls).map((key, item) => {
      validateForm.controls[key].markAsDirty();
      validateForm.controls[key].updateValueAndValidity();
    });
    return validateForm.valid;
  }

  // 多图片分隔
  imgSeparate = (imgData: string, url = `${environment.SERVER_URL}`) => {
    const img = imgData.split(',');
    return img.map((item, index) => {
      const label = index > 0 ? `，${item}` : item;
      return { value: `${url}/../upload/point/${item}`, label };
    });
  }

  // 去除字符串最后一个逗号,type=true，过滤相同的字符串
  deleteStringComma = (value, type = false) => {
    let data = '';
    value = value.replace(/(.*)[,，||:：]$/, '$1');
    if (type) {
      Array.from(new Set(value.split(','))).forEach(element => {
        data += `${element},`;
      });
      data = data.replace(/(.*)[,，]$/, '$1');
    } else {
      data = value;
    }
    return data;
  }

}

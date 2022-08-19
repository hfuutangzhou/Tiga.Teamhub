/*
 * @Author: wangxian
 * @Date: 2022-03-01 09:16:39
 * @LastEditTime: 2022-08-19 18:18:14
 */
import baseHttp from '@/utils/request';

const HttpClient = baseHttp.HttpClient;

export default class ProjectApi {
  /**
   *  获取当前用户项目列表
   * @returns
   */
  static getMyProjectList() {
    const api = '/api/project/list';
    return HttpClient.fetch<any>(api, { method: 'get' });
  }
}

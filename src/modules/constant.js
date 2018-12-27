exports.queryParams = function queryParams(params) {
  let returndata = [];
  switch (params) {
    case 'STATUS_TASK':
      returndata = [{ key: 1, value: '未上传' }, { key: 2, value: '已上传' }, { key: 3, value: '已解析' }];
      break;
    case 'STATUS_TASK_OPERAT':
      returndata = [{ key: 1, value: '上传' }, { key: 2, value: '替换' }, { key: 3, value: '' }];
      break;
    case 'STAUS_TASK_ANALY':
      returndata = [{ key: 1, value: '解析' }, { key: 2, value: '分析' }];
      break;
    case 'STAUS_UP2CHAIN':
      returndata = [{ key: false, value: '未上链' }, { key: true, value: '已上链' }];
      break;
    case 'STAUS_SIDER_BAR':
      returndata = [
        { key: 'root', value: '顶级菜单' },
        { key: 'overview', value: '概览' },
        { key: 'daily_data', value: '每日数据' },
        { key: 'yyrb_sheet', value: '营业日报表' },
        { key: 'kyfx_sheet', value: '客源分析表' },
        { key: 'dlfx_sheet', value: '店龄分析表' },
        { key: 'daily_analysis', value: '每日数据分析' },
        { key: 'monthly_data', value: '每月数据' },
        { key: 'balance_sheet', value: '资产负债表' },
        { key: 'income_sheet', value: '利润表' },
        { key: 'business_analysis_sheet', value: '经营分析表' },
        { key: 'monthly_analysis', value: '每月数据分析' },
        { key: 'all-round_ability', value: '综合能力' },
        { key: 'daily_upload_task', value: '每日上传任务' },
        { key: 'monthly_upload_task', value: '每月上传任务' },
        { key: 'operate_analysis_budget_sheet', value: '经营分析预算表' },
        { key: 'monthly_task', value: '每月任务' },
        { key: 'setup', value: '设置' },
      ];
      break;
    case 'STAUS_TASK_MODEL':
      returndata = [
        { key: 'daily_data', value: 'd' },
        { key: 'yyrb_sheet', value: 'd' },
        { key: 'kyfx_sheet', value: 'd' },
        { key: 'dlfx_sheet', value: 'd' },
        { key: 'daily_analysis', value: 'd' },
        { key: 'monthly_data', value: 'm' },
        { key: 'balance_sheet', value: 'm' },
        { key: 'income_sheet', value: 'm' },
        { key: 'business_analysis_sheet', value: 'y' },
        { key: 'monthly_analysis', value: 'm' },
        { key: 'all-round_ability', value: 'm' },
        { key: 'daily_upload_task', value: 'd' },
        { key: 'monthly_upload_task', value: 'd' },
        { key: 'operate_analysis_budget_sheet', value: 'y' },
        { key: 'monthly_task', value: 'm' },
      ];
      break;
    case 'STAUS_SIDER_ICON':
      returndata = [
        { key: 1, value: 'home' },
        { key: 3, value: 'laptop' },
        { key: 8, value: 'notification' },
        { key: 100, value: 'setting' },
        { key: 17, value: 'laptop' },
        { key: 14, value: 'appstore-o' },
      ];
      break;
  }
  return returndata;
};

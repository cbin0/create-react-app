import _ from 'lodash';

const languageType = localStorage.getItem('locale') || 'zh';
const language = {
  en: require('../locales/en.json'),
  zh: require('../locales/zh.json')
};

/**
 * 输入
 * @param {string} str My name is {0}, age is {1}
 * @param {any[]} args ['Chaiteng', '18'] 可以是string也可以是number，标量
 * @returns {string} My name is chaiteng, age is 18
 */
export const t = (str, args) => {
  if (!(str && str.trim)) return str;
  str = str.trim();
  let typeJson = language[languageType];
  let languageStr = _.get(typeJson, str, str);
  // 循环args 根据key去找对应到的位置
  // TODO 更换为format那种更正规些
  _.each(args, (val, key) => {
    const regexp = new RegExp(`\\{${key}\\}`, 'igm');
    languageStr = languageStr.replace(regexp, val);
  });
  return languageStr;
};

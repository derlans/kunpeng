import { h, VNode } from 'vue';
import { renderDateTime } from '@/render/date/index';
import { NTag } from 'naive-ui';
import { dailyRecord, levelOpations } from './index';
import { BasicColumn } from '@/components/Table/index';
interface dailyRecordColumn extends BasicColumn {
  render?: (row: dailyRecord) => VNode;
}
export const renderLevelTag = (level) => {
  const LevelOpation = levelOpations.find((LevelOpation) => LevelOpation.value === level);
  const type = LevelOpation?.meta.tagType || 'default';
  const label = LevelOpation?.label;
  return h(NTag, { type }, label);
};
export const columns: dailyRecordColumn[] = [
  {
    title: 'id',
    key: 'id',
    width: 200,
  },
  {
    title: '微服务名称',
    key: 'index',
    width: 120,
  },
  {
    title: '时间',
    width: 140,
    align: 'center',
    key: 'sourceAsMap[date]',
    render(row) {
      return renderDateTime(row.sourceAsMap.date);
    },
  },
  {
    title: '文件',
    key: 'sourceAsMap[file]',
    render(row) {
      return h('span', row.sourceAsMap.file);
    },
  },
  {
    title: '类',
    key: 'sourceAsMap[class]',
    align: 'center',

    width: 400,
    render(row) {
      return h('span', row.sourceAsMap.class);
    },
  },
  {
    title: 'thread',
    key: 'sourceAsMap[thread]',
    width: 80,
    render(row) {
      return h('span', row.sourceAsMap.thread);
    },
  },
  {
    title: '信息',
    key: 'sourceAsMap[message]',
    align: 'center',

    width: 400,
    render(row) {
      return h('span', row.sourceAsMap.message);
    },
  },
  {
    title: '等级',
    key: 'sourceAsMap[level]',
    align: 'center',

    render(row) {
      return renderLevelTag(row.sourceAsMap.level);
    },
  },
];

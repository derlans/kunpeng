import { reactive } from 'vue';
interface Props {
  schemas: FormSchema[];
}
interface FormSchema {
  field: string;
  label: string;
  defaultValue?: any;
  rules?: object | object[];
}
export function useForm(props: Props) {
  const { schemas } = props;
  const defaultForm = getDefaultForm(schemas);
  const form = reactive({ ...defaultForm });
  const formMethods = {
    getDefaultForm: () => getDefaultForm(schemas),
    getFormValues: () => getFormValues(form),
    setFieldsValue: (values) => setFieldsValue(form, schemas, values),
    resetFieldsValues: () => resetFieldsValues(form, schemas),
  };
  return [form as any, formMethods];
}

/**
 *
 * @description 获取表单默认值
 */
export function getDefaultForm(schemas: FormSchema[]) {
  return schemas.reduce((pre, cur) => {
    if (cur.defaultValue !== undefined) {
      pre[cur.field] = cur.defaultValue;
    }
    return pre;
  }, {});
}

export function getFormValues(form) {
  return { ...form };
}

/**
 *
 * @description 设置表单值
 */
export function setFieldsValue(form, schemas: FormSchema[], values: object) {
  const fields = getFields(schemas);
  Object.keys(values).forEach((key) => {
    if (fields.includes(key)) {
      form[key] = values[key];
    }
  });
}

/**
 *
 * @description 获取表单字段
 */
export function getFields(schemas: FormSchema[]) {
  return schemas.map((schema) => schema.field);
}

/**
 *
 * @description 设置表单初始值
 */
export function resetFieldsValues(form, schemas) {
  setFieldsValue(form, schemas, getDefaultForm(schemas));
}

/*
 * @Author: yifeng
 * @Date: 2022-08-24 20:43:59
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-09 20:14:55
 * @Description: 
 */
import { ref } from "vue";

interface User {
  username: string;
  password: string;
}

export const loginUser = ref<User>({
  username: "",
  password: "",
});

interface Rules {
  username: {
    message: string;
    required: boolean;
    min?: undefined;
    max?: undefined;
  }[];
  password: ({
    required: boolean;
    message: string;
    trigger: string;
    min?: undefined;
    max?: undefined;
  } | {
    min: number;
    max: number;
    message: string;
    trigger: string;
    required?: undefined;
  })[];
  
}

// 校验规则
export const rules = ref<Rules>({
  username: [
    {
      required: true,
      message: "用户名不能为空",
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    },
    {
      min: 6,
      max: 30,
      message: "Password's length has to be 6 to 30 characters...",
      trigger: "blur",
    },
  ],
});
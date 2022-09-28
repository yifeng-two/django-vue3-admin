/*
 * @Author: yifeng
 * @Date: 2022-08-24 20:43:59
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-24 23:15:19
 * @Description: 
 */
import { FormInstance } from "element-plus";
import { ref } from "vue";

interface User {
  username: string;
  password: string;
}

export const loginUser = ref<User>({
  username: "",
  password: "",
});

interface usernameRule {
  username: {
    message: string;
    required: boolean;
    min?: undefined;
    max?: undefined;
  }[];
}

interface pwd {
  password: string;
  password2: string;
}

interface pwd1Rule {
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

interface pwd2Rule {
  password2: ({
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
interface pwdRule extends pwd1Rule, pwd2Rule {

}

export const pwdRule = ref<pwdRule>({
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
  password2: [
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
})


interface Rules extends usernameRule, pwd1Rule {

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
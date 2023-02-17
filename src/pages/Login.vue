<template>
  <div class="container">
    <div class="login">
      <div class="title">Log in</div>
      <!---Form-->
      <div>
        <q-input
          rounded
          borderless
          v-model="text"
          :dense="dense"
          label="Username"
          label-color="white"
          class="uname"
        >
          <template v-slot:prepend>
            <q-icon name="person" color="white" />
          </template>
        </q-input>
      </div>
      <div>
        <q-input
          rounded
          borderless
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          :dense="dense"
          label="Password"
          label-color="white"
          class="pword"
          color="white"
        >
          <template v-slot:prepend>
            <q-icon name="lock_open" color="white" />
          </template>
        </q-input>
      </div>
      <div class="forgot">
        <q-btn flat unelevated class="forgotbtn">Forgot Password?</q-btn>
      </div>
      <div>
        <q-btn unelevated rounded label="Login" class="loginbtn" />
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      text: ref(""),
      ph: ref(""),
      dense: ref(false),
      password: ref(""),
      isPwd: ref(true),
    };
  },
};
</script>
<style lang="scss" scope>
//Desktop
.container {
  background-color: rgba(37, 44, 62, 1);
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  position: fixed;
  .title {
    color: white;
    font-family: "Source Sans Pro";
    font-weight: 700;

    min-height: 34px;
    min-width: 58px;
    font-size: 32px;
    white-space: nowrap;
  }
  .uname,
  .pword {
    border-radius: 12px;
    width: 500px;
    background-color: rgba(78, 86, 109, 1);
    color: white;
    padding-left: 19.6px;
    padding-top: 0;
    padding-bottom: 0;
    opacity: 0.8;
  }
  .uname {
    margin-top: 43px;
  }
  .pword {
    margin-top: 33px;
  }
  .forgot {
    font-weight: 400;
    font-size: 16px;
    margin-top: 12px;
    text-align: right;
    color: white;
  }
  .forgotbtn {
    text-transform: capitalize;
  }

  .loginbtn {
    border-radius: 30px;
    background-color: #e0384a;
    font-family: "Source Sans Pro";
    font-size: 20px;
    font-weight: 400; // regular
    color: #ffffff;
    text-transform: none;
    text-align: center;
    padding: 2px 83px;
    height: 55px;
    font-weight: bold;
    margin-top: 123px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    width: 320px;
  }
}
//Mobile
@media screen and (max-width: 767px) {
  .container {
    height: 100%;

    .login {
      min-height: 374px;
      width: 320px;
      position: absolute;
    }
    .title {
      font-weight: 700;
      line-height: 22px;
      min-height: 34px;
      min-width: 58px;
      font-size: 22px;
    }
    .uname,
    .pword {
      border-radius: 12px;
      width: 320px;
    }
    .uname {
      margin-top: 43px;
    }
    .pword {
      margin-top: 33px;
    }
    .forgot {
      font-weight: 400;
      line-height: 15px;
      margin-top: 12px;
      text-align: right;
      color: white;
    }

    .loginbtn {
      border-radius: 8px;

      font-size: 12px;

      height: 32px;
      font-weight: bold;

      width: 201px;
    }
  }
}
//Tablet
@media screen and (min-width: 768px) and (max-width: 1023px) {
  .container {
    min-width: 768px;
    max-height: 1024px;
    .login {
      min-height: 334px;
      width: 549px;
      position: absolute;
    }
    .title {
      font-size: 20px;
    }
    .uname,
    .pword {
      width: 546px;
    }
    .uname {
      margin-top: 50px;
    }
    .pword {
      margin-top: 38px;
    }
    .forgot {
      font-size: 16px;
    }

    .loginbtn {
      border-radius: 20px;

      font-size: 14px;

      height: 41px;
    }
  }
}

@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,700,600");
</style>

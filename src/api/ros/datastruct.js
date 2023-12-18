import {uint8array} from "jszip/lib/support";

export function getDataStruct(topic) {
  if (topic=="/rosout"||topic== "/rosout_agg"){
    return{
      Seq_start: -1,
      Seq_end: -1,
      Stamp_start:-1,
      Stamp_end:-1,
      FrameId :"",
      Level_start:-1,
      Level_end:-1,
      Name :"",
      Msg :"",
      File:"",
      Function_start:-1,
      Function_end:-1,
      Line_start:-1,
      Line_end:-1,
      Topic:""
    }
  }else if(topic=="/turtle1/color_sensor" || topic=="/turtle2/color_sensor"){
    return {
      R_start:-1,
      R_end:-1,
      G_start:-1,
      G_end:-1,
      B_start:-1,
      B_end:-1
    }
  }else if(topic=="/turtle1/pose"||topic== "/turtle2/pose"){
    return {
      X_start:-1,
      X_end:-1,
      Y_start:-1,
      Y_end:-1,
      Theta_start:-1,
      Theta_end:-1,
      Linear_velocity_start:-1,
      Linear_velocity_end:-1,
      Angular_velocity_start:-1,
      Angular_velocity_end:-1
    }
  }else if(topic=="/turtle1/cmd_vel" || topic=="/turtle2/cmd_vel"){
    return {
      LinearVel_X_start:-1,
      LinearVel_X_end:-1,
      LinearVel_Y_start:-1,
      LinearVel_Y_end:-1,
      LinearVel_Z_start:-1,
      LinearVel_Z_end:-1,
      AngularVel_X_start:-1,
      AngularVel_X_end:-1,
      AngularVel_Y_start:-1,
      AngularVel_Y_end:-1,
      AngularVel_Z_start:-1,
      AngularVel_Z_end:-1,
    }
  }else if(topic == "/visensor/imu"){
    return {
      Seq_start: -1,
      Seq_end: -1,
      Stamp_start:-1,
      Stamp_end:-1,
      FrameId :"",
      Orientation_X_start:-1,
      Orientation_X_end:-1,
      Orientation_Y_start:-1,
      Orientation_Y_end:-1,
      Orientation_Z_start:-1,
      Orientation_Z_end:-1,
      Orientation_W_start:-1,
      Orientation_W_end:-1,
      Orientation_covariance:"",
      Angular_velocity_X_start:-1,
      Angular_velocity_X_end:-1,
      Angular_velocity_Y_start:-1,
      Angular_velocity_Y_end:-1,
      Angular_velocity_Z_start:-1,
      Angular_velocity_Z_end:-1,
      Angular_velocity_covariance:"",
      Linear_acceleration_X_start:-1,
      Linear_acceleration_X_end:-1,
      Linear_acceleration_Y_start:-1,
      Linear_acceleration_Y_end:-1,
      Linear_acceleration_Z_start:-1,
      Linear_acceleration_Z_end:-1,
      Linear_acceleratio_covariance:""
    }
  }else if(topic == "/visensor/left/camera_info"){
    return {
      Seq_start: -1,
      Seq_end: -1,
      Stamp_start:-1,
      Stamp_end:-1,
      FrameId :"",
      Height_start:-1,
      Height_end:-1,
      Width_start:-1,
      Width_end:-1,
      Distortion_model:"",
      D:"",
      K:"",
      R:"",
      P:"",
      BinningX_start:-1,
      BinningX_end:-1,
      BinningY_start:-1,
      BinningY_end:-1,
      XOffset_start:-1,
      XOffset_end:-1,
      YOffset_start:-1,
      YOffset_end:-1,
      Height_roi_start:-1,
      Height_roi_end:-1,
      Width_roi_start:-1,
      Width_roi_end:-1,
      DoRectify:""
    }
  }else if(topic == "/visensor/left/image_raw") {
    return {
      Seq_start: -1,
      Seq_end: -1,
      Stamp_start: -1,
      Stamp_end: -1,
      FrameId: "",
      Height_start: -1,
      Height_end: -1,
      Width_start: -1,
      Width_end: -1,
      Encoding: "",
      Is_bigendian: -1,
      Step_start: -1,
      Step_end: -1,
      Data: ""
    }
  } else if(topic =="/tf"||topic == "/tf_static"){
    return {
      Seq_start: -1,
      Seq_end: -1,
      Stamp_start: -1,
      Stamp_end: -1,
      FrameId: "",
      ChildFrameId:"",
      TranslationX_start:-1,
      TranslationX_end:-1,
      TranslationY_start:-1,
      TranslationY_end:-1,
      TranslationZ_start:-1,
      TranslationZ_end:-1,
      RotationX_start:-1,
      RotationX_end:-1,
      RotationY_start:-1,
      RotationY_end:-1,
      RotationZ_start:-1,
      RotationZ_end:-1,
      RotationW_start:-1,
      RotationW_end:-1,
    }
  }else {
    return{
    name: '2222',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: ''
  }}

}

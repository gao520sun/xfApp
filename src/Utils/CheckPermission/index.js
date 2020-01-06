/*
 * @Author: gaozhonglei
 * @Date: 2019-04-24 11:05:43
 * @Last Modified by: gaozhonglei
 * @Last Modified time: 2019-04-24 11:33:29
 */

import {Platform} from 'react-native';

import {check, PERMISSIONS, request} from 'react-native-permissions';

const checkPermissionUtils = {
    checkPrmission: function permissionUtils(type) {
        return new Promise((resolve) => {
            if(Platform.OS === 'ios') {
                let typePis = PERMISSIONS.IOS.PHOTO_LIBRARY;
                if(type === 'photo') {
                    typePis = PERMISSIONS.IOS.PHOTO_LIBRARY;
                }else if(type === 'camera') {
                    typePis = PERMISSIONS.IOS.CAMERA;
                }else if(type === 'audio') {
                    typePis = PERMISSIONS.IOS.MICROPHONE;
                }
                check(typePis).then((response) => {
                    if(response === 'unavailable') {
                        resolve(false);
                        return;
                    }
                    if(response === 'granted') {
                        resolve(response === 'granted');
                    }else if(response === 'denied') {
                        request(typePis).then((res) => {
                            resolve(res === 'granted');
                        });
                    }else {
                        resolve(false);
                    }
                });
            }else{
                let typeUse = '';
                if(type === 'photo') {
                    typeUse = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
                }else if(type === 'camera') {
                    typeUse = PERMISSIONS.ANDROID.CAMERA;
                }else if(type === 'audio') {
                    typeUse = PERMISSIONS.ANDROID.RECORD_AUDIO;
                }
                if(typeUse) {
                    check(typeUse).then((response) => {
                        if(response === 'unavailable' || response === 'blocked') {
                            resolve(false);
                            return;
                        }else if(response === 'granted') {
                            resolve(true);
                            return;
                        }
                        request(typeUse).then((res) => {
                            resolve(res === 'granted');
                        });
                    });
                }
            }
        });
    }
};

export default checkPermissionUtils;

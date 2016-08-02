/**
 * Created by 24192 on 2016/8/1.
 */
angular.module("indexApp", [])
    .controller("indexCtrl", ["$scope", "formatData", function ($scope, formatData) {
        $scope.formData = formatData;
        //$scope.formData.getCityData();
        $scope.isExistJob = true;
        $scope.cityIndex = 0;
        $scope.positionIndex = 0;
        $scope.city = $scope.formData.city;
        $scope.selectedCity = $scope.city[$scope.cityIndex].name;
        $scope.position = $scope.formData.position;
        $scope.selectedPosition = $scope.position[$scope.positionIndex].name;
        $scope.grade = $scope.formData.grade;
        $scope.changeCity = function (city) {
            $scope.cityIndex = $scope.formData.getId($scope.city, city);

        };
        $scope.enrollClick = function (positionIndex) {
            //console.log("职位id="+positionIndex);
            //console.log("职位数据="+JSON.stringify($scope.position));
            //console.log($scope.position[positionIndex].name);
            $scope.selectedPosition = $scope.position[positionIndex].name;
            //console.log($scope.selectedPosition);


        };
        $scope.changePosition = function (position) {
            $scope.positionIndex = $scope.formData.getId($scope.position, position);
        };
        $scope.submit = function () {
            if ($scope.userInfo.$valid) {
                var param = {
                    sex: $scope.info.sex,
                    city: $scope.info.city,
                    name: $scope.info.name,
                    phone: $scope.info.phone,
                    grade: $scope.info.grade,
                    school: $scope.info.school,
                    position: $scope.info.position
                };
                $scope.formData.submitData(param);
            } else if ($scope.userInfo.college.$invalid) {//学校
                console.log("学校必填");
            } else if ($scope.userInfo.name.minlength.$invalid) {//名字
                console.log("名字不小于两个字符");
            } else if ($scope.userInfo.pattern.$invalid) {//手机号
                console.log("手机号格式不正确");

            }

        };
        console.log(JSON.stringify($scope.city))
    }])
    .factory("formatData", ["$http", "$q", "urlConfig", function ($http, $q, urlConfig) {
        var formatData = {};
        formatData.city = [
            {id: 0, name: "武汉", venue: "wh"},
            {id: 1, name: "北京", venue: "bj"},
            {id: 2, name: "上海", venue: "sh"},
            {id: 3, name: "南京", venue: "nj"},
            {id: 4, name: "长沙", venue: "cs"}
        ];
        formatData.position = [
            {id: 0, name: "直播录音员岗"},
            {id: 1, name: "运营网宣岗"},
            {id: 2, name: "线下运营岗"}
        ];
        formatData.grade = [
            {id: 0, name: "大一"},
            {id: 1, name: "大二"},
            {id: 2, name: "大三"},
            {id: 3, name: "大四"}
        ];
        formatData.getId = function (arr , item) {
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                if (arr[i].name == item) {
                    console.log(i);
                    return i;
                }
            }
        };
        formatData.getCityData = function () {
            var delay = $q.defer();
            $http.get({
                method: "get",
                url: urlConfig.getCity
            })
                .success(function (data) {
                    delay.resolve(data);
                })
                .error(function (data) {
                    console.log("get city data failed");
                    delay.reject(data);
                });
            return delay.promise;
        };
        formatData.submitData = function (params) {
            $http.get({
                method: "get",
                url: urlConfig.getCity,
                params: params
            })
                .success(function (data) {
                    delay.resolve(data);
                })
                .error(function (data) {
                    console.log("get city data failed");
                    delay.reject(data);
                });
            return delay.promise;
        };
        return formatData;
    }])
    .factory("validate", [function () {
        var validate = {};
        validate.school = function () {

        };
        validate.phone = function () {

        };
        validate.name = function () {

        };
        return validate;
    }])
    .constant("urlConfig", {
        getCity: ""
    });
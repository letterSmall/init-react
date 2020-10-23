import Mock from 'mockjs'

let common = 'http://redux.demo.com/mock_demo'
Mock.mock(RegExp(common), 'get', function(option){
    return Mock.mock({
        meta:{
            code:200,
            type:"success",
            message:"success"
        },
        data:{
            showing: Mock.Random.integer(1,5),
            total: Mock.Random.integer(1,500)
        }
    })
})
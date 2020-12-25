import Vue from 'vue'
import { mount } from '@vue/test-utils'
import login from '@/views/login/index.vue'
import elementUI from 'element-ui'
import { expect } from 'chai'
Vue.use(elementUI)
describe('login-Text', () => {
    let wrapper, username, password
    beforeEach(() => {
        wrapper = mount(login) // 每次测试前确保我们的测试实例都是是干净完整的。返回一个wrapper对象
    })

    it("验证用户名", () => {
        username = wrapper.find('input.username')
        username.setValue('ctt')
            // expect(wrapper.find('input.username').element.value).toBe('ctt')
        expect(wrapper.find('input.username').element.value).to.be.equal('ctt')
    })

    it("验证密码", () => {
        password = wrapper.find('input.password')
        password.setValue('11')
            // expect(wrapper.find('input.password').element.value).toBe('11')
        expect(wrapper.find('input.password').element.value).to.be.equal('11')
    })


    it("用户名密码不为空", () => {
        wrapper.find('input.username').setValue('ctt')
        wrapper.find('input.password').setValue('11')
            // expect(wrapper.vm.check()).toBe(true)
        expect(wrapper.vm.check()).to.be.equal(true)
            //wrapper.find('button').trigger('click')
    })

});
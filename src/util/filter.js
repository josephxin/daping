import Vue from 'vue'

//菜单类型
Vue.filter('menuTypeFilter', function(value) {
	let name = '';
	switch(value) {
		case 1:
			name = '菜单项';
			break;
		case 2:
			name = '子菜单';
			break;
	}
	return name;
})
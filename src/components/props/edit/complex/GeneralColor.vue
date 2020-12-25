<template>
	<div class="root">
	  <el-color-picker v-model="colorValue" show-alpha size="small" class="comp-color" ></el-color-picker>
	  <el-input v-model="colorValue" placeholder="" disabled="disabled" size="small" class="comp-input" ></el-input>
	</div>
</template>

<script>
	export default {
	  name: 'GeneralColor',

	  props:['value'],

	  computed:{
	  	colorValue:{
	  		get(){
	  			let value = this.value;

	  			/* if(!value){
	  				return 'rgba(0,0,0,0)'
	  			} */

	  			return this.value;
	  		},
	  		set(val){
	  			this.$emit('input',val);
	  		}
	  	}
	  }
	}
</script>
<style scoped>

	.comp-input{
		position: absolute;
		display: inline-block;
		width: 120px;
		left: 0px;
	}

	.comp-color{
		position: absolute;
		display: inline-block;
		margin-top: 5px;
		padding-right: 0px;
		margin-right: 0px;
		right: 0px;
	}
</style>
